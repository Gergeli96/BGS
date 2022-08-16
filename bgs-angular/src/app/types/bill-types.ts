export interface IBill {
    id?: number
    from: string
    to: string
    amount: number
    paid: boolean
    project_id: number
}
