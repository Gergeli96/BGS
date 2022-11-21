export class BitNumber {

    public static parseInt(value: any): number | null {
        return isNaN(parseInt(value)) ? null : parseInt(value)
    }

}
