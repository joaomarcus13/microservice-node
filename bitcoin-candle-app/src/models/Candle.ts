export default class Candle {
    currency!: string
    finalDateTime!: Date
    open!: number
    close!: number
    high!: number
    low!: number
    color!: string

    constructor(cnadleObj: any){
        Object.assign(this, cnadleObj)
        this.finalDateTime = new Date(this.finalDateTime)
    }
}