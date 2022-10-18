function extend(value: number): number | string {
    return value > 10 ? value : `0${value}`
}

export class BitDate {

    public static toLongString(date: Date): string {
        return `${date.getFullYear()}-${extend(date.getMonth() + 1)}-${extend(date.getDate())}`
    }

}
