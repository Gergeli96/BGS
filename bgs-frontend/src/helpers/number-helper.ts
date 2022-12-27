export class BitNumber {
    
    public static parseInt(value: any): number | null {
        return isNaN(parseInt(value)) ? null : parseInt(value)
    }

    public static empty(value: number | null): boolean {
        return typeof value !== 'number' || value < 0
    }

}
