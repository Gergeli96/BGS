import { createSignal, For, onMount } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { BitControl } from "./bitform-types";
import './FileInput.scss';

export interface IFileInputProps {
    onChange: (files: File[]) => void
    control: BitControl
}

export function FileInput(props: IFileInputProps): IJsxElement {
    const [attachments, setAttachments] = createSignal<string[]>([])
    let fileInput: HTMLInputElement | undefined

    onMount(() => props.control.subscribe(value => onControlValueChange(value)))

    function onControlValueChange(value: any): void {
        console.log('Value change!')
        if (!Array.isArray(value) || value.length == 0) {
            setAttachments([])
        }
    }

    function onFileSelect(files: FileList | null | undefined): void {
        let filelist: File[] = [ ]

        if (files) {
            for (let i = 0; i < files.length; i++) {
                filelist.push(files.item(i) as File)
            }
        }

        setAttachments(filelist.map(f => f.name))
        props.onChange(filelist);

        (fileInput as HTMLInputElement).value = ''
    }

    function prevent(event: Event): void {
        event?.stopPropagation(); event?.preventDefault()
    }

    function onDrop(event: DragEvent) {
        event?.stopPropagation(); event?.preventDefault()
        onFileSelect(event?.dataTransfer?.files)
    }

    function selectFiles(): void {
        fileInput?.click()
    }

    return (<div class="bit-file-input-container">
        <input ref={fileInput} type="file" class="d-none" multiple onChange={e => onFileSelect(e.currentTarget.files)} />
        <div class="file-drop-area cursor-pointer d-flex justify-center align-center" onClick={selectFiles} onDrop={e => onDrop(e)} onDragOver={e => prevent(e)}>
            <i class="bi bi-cloud-arrow-up"></i>
        </div>

        <div class="selected-files-container d-flex">
            <For each={attachments()}>{x =>
                <span class="selectedfile">{x}</span>
            }</For>
        </div>
    </div>)
}
