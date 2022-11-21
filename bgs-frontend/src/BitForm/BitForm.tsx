import { BitControl, BitControlGroup, BitControlType, IBitControl } from "./bitform-types";
import { createSignal, For, Match, Switch } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { FileInput } from "./FileInput";

export interface IBitFormProps {
    save?: (formValue: any) => void
    controls: BitControlGroup
    children?: any
}

export function BitForm(props: IBitFormProps): IJsxElement {
    const [value, setValue] = createSignal<{[name: string]: any}>({ })

    function setFormValue(config: IBitControl, controlValue: any): void {
        const formValue = value()
        formValue[config.name as any] = controlValue
        setValue(formValue)
    }

    return (
        <div>
            <For each={props.controls.controls}>{x =>
                <div class="d-grid mb-2">
                    <div class="col-12 pb-2">
                        <label>{x.label}</label>
                    </div>

                    <div class="col-12">
                        <BitControlElement config={x} setFormValue={setFormValue}></BitControlElement>
                    </div>
                </div>
            }</For>

            <div class="d-flex justify-end pt-2">
                {props.children}
            </div>
        </div>
    )
}

export interface IBitControlProps {
    setFormValue: (config: IBitControl, value: any) => any
    config: BitControl
}

export function BitControlElement(props: IBitControlProps): IJsxElement {

    function defaultInput(): IJsxElement {
        return (
            <input type="text" name={props.config.name as any} value={props.config.value()} onInput={(e: any) => props.config.setValue(e.target.value)} />
        )
    }

    return (
        <div class="d-flex">
            <Switch fallback={defaultInput()}>
                <Match when={props.config.type == BitControlType.select}>
                    <select name={props.config.name as any} value={props.config.value()} onInput={(e: any) => props.config.setValue(e.target.value)}>
                        <For each={props.config.options()}>{x => <option value={x.value}>{x.name}</option>}</For>
                    </select>
                </Match>
                <Match when={props.config.type == BitControlType.checkbox}>
                    <input type="checkbox" name={props.config.name as any} checked={props.config.value()} onInput={(e: any) => props.config.setValue(e.target.checked)} />
                </Match>
                <Match when={props.config.type == BitControlType.number}>
                    <input type="number" name={props.config.name as any} value={props.config.value()} onInput={(e: any) => props.config.setValue(e.target.value)} />
                </Match>
                <Match when={props.config.type == BitControlType.textarea}>
                    <textarea rows={3} name={props.config.name as any} value={props.config.value()} onInput={(e: any) => props.config.setValue(e.target.value)}></textarea>
                </Match>
                <Match when={props.config.type == BitControlType.file}>
                    <FileInput control={props.config} onChange={value => props.config.setValue(value)}></FileInput>
                </Match>
                <Match when={props.config.type == BitControlType.password}>
                    <input type="password" name={props.config.name as any} value={props.config.value()} onInput={(e: any) => props.config.setValue(e.target.value)} />
                </Match>
            </Switch>
            <span>{props.config.suffix}</span>
        </div>
    )
}
