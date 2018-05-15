declare module '*';

interface ProxyHandler<T extends object, TOut extends object> {
    get?<K extends keyof TOut>(target: T, p: K, receiver: TOut): TOut[K];
    set?<K extends keyof TOut>(target: T, p: K, value: TOut[K], receiver: TOut): boolean;
}
interface ProxyConstructor {
    new <T extends object, TOut extends object>(target: T, handler: ProxyHandler<T, TOut>): TOut;
}
declare var Proxy: ProxyConstructor;
