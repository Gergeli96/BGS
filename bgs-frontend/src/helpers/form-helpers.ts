import { BitControlType, IBitControl } from "../BitForm/bitform-types";

export function getControlDefaultValue(control: IBitControl): any {
    if (control.value != undefined) {
        return control.value
    }
    else {
        switch (control.type) {
            case BitControlType.select:
                return Array.isArray(control.options) && control.options.length > 0 ? (control.options[0] as any).value : ''
            case BitControlType.checkbox:
                return false
            case BitControlType.file:
                return [ ]
        
            default:
                return ''
        }
    }
}
