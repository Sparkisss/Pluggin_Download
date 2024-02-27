import { ID } from './utils'

export default class Product {
    readonly id: number
    readonly name: string
    readonly price: number

    constructor (name: string, price: number) {
        this.id = ID.getNewId()
        this.name = name
        this.price = price
    }
}