export class BitString {
    public static empty(value: string): boolean {
        return value === null || value === undefined || value === ''
    }

    public static emptyOrWhiteSpace(value: string): boolean {
        return BitString.empty(value) || value === ' '
    }
}
