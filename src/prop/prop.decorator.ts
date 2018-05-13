export function prop(target: any, key: string) {
    if (!(key in target)) {
        target[key] = undefined;
    }
}
