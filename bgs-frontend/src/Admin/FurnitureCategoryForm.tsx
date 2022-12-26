import { IFurnitureCategory } from "../types/furniture-category-types";
import { BitControlGroup } from "../BitForm/bitform-types";
import { createSignal, For, onMount, Show } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { Delete, Get, Post, Put } from "../helpers/http";
import { BitForm } from "../BitForm/BitForm";

export function FurnitureCategoryForm(): IJsxElement {
    const [categories, setCategories] = createSignal<IFurnitureCategory[]>([])
    const [editMode, setEditMode] = createSignal<boolean>(false)
    const controls = new BitControlGroup<IFurnitureCategory>([
        {label: 'Név', name: 'name'}
    ])
    let editCategoryId: number = 0

    onMount(() => getCategories())

    function getCategories(): void {
        Get<IFurnitureCategory[]>('furniturecategories')
            .then(response => setCategories(response))
            .catch(error => { })
    }

    function startEdit(category: IFurnitureCategory): void {
        setEditMode(true)
        controls.setValue({name: category.name} as any)
        editCategoryId = category.id
    }

    function save(): void {
        controls.save(Post('furniturecategories/create', controls.value))
            .then(response => {
                controls.empty()
                getCategories()
            })
            .catch(error => { })
    }

    function edit(): void {
        controls.save(Put('furniturecategories/edit', {...controls.value, id: editCategoryId}))
            .then(response => {
                controls.empty()
                getCategories()
                editCategoryId = 0
                setEditMode(false)
            })
            .catch(error => { })
    }

    function deleteCategory(category: IFurnitureCategory): void {
        Delete(`furniturecategories/delete/${category.id}`)
            .then(response => getCategories())
            .catch(error => { })
    }

    return (
        <div class="d-flex column">
            <BitForm controls={controls} />

            <div class="d-flex justify-end pt-2 mb-4">
                <Show when={editMode()} fallback={<button class="btn-success" onClick={save}>Mentés</button>}>
                    <button class="btn-warning" onClick={edit}>Módosítás</button>
                </Show>
            </div>

            <ul class="mt-4">
                <For each={categories()}>{x =>
                    <li class="d-flex justify-between">
                        <span>{x.name}</span>

                        <div class="d-flex">
                            <i class="bi bi-pencil cursor-pointer warning-hover mr-2" onClick={() => startEdit(x)}></i>
                            <i class="bi bi-trash3 cursor-pointer danger-hover" onClick={() => deleteCategory(x)}></i>
                        </div>
                    </li>
                }</For>
            </ul>
        </div>
    )
}
