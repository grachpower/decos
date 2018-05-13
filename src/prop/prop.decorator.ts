export function prop(target: any, key: string) {
    console.log(`target: ${JSON.stringify(target)}; key: ${key}`);
    console.log('__________');
    target[key] = undefined;
}
