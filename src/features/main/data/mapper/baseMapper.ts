export default abstract class BaseMapper<From, To> {
    abstract mapFrom(from: From): To
    mapArray(fromArray: From[]): To[] {
        return fromArray.map(this.mapFrom)
    }
}