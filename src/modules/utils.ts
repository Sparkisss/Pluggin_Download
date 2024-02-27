export class ID {
    static _id: number = 1

    static getNewId(): number {
        return this._id++
    }
}