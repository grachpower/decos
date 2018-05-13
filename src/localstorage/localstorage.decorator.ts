export function LocalStorage(): (target: any, propertyName: string) => void {
    const setInLocalStorage: (key: string, value: string) =>
        void = (key: string, value: string) =>
        localStorage.setItem(key, JSON.stringify(value));
    const getFromLocalStorage: (key: string) => string = (key: string) => {
        let item = localStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (e) {
            console.warn(`Got invalid JSON from localStorage key "${key}"`);
        }

        return item;
    };

    return (target: any, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            get: () => getFromLocalStorage(propertyName),
            set: (newValue: string) => setInLocalStorage(propertyName, newValue),
            enumerable: true,
            configurable: true,
        });
    };
}
