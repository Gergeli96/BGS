import { IJsxElement } from "../types/general-types";
import { createSignal, For } from "solid-js";
import './FileInput.scss';

export interface IFileInputProps {
    onChange: (files: File[]) => void
}

export function FileInput(props: IFileInputProps): IJsxElement {
    const [attachments, setAttachments] = createSignal<string[]>([])
    let fileInput: HTMLInputElement | undefined

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
