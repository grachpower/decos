import { getAutowired } from '../autowired/autowired.decorator';
import { getMappedClass } from '../mapped-class/mapped-class.decorator';

function handler(allowStrictMode: boolean) {
    return {
        get(target, prop) {
            if (allowStrictMode) {
                if (prop in target) {
                    console.log(`${prop} найдено`);
                } else {
                    console.log(`${prop} не найдено`);
                    throw new Error(`Property '${prop}' is not a part of target model`);
                }
            }

            console.log(`Чтение ${prop}`);

            return target[prop];
        },
        set(target, prop, value) {
            if (allowStrictMode) {
                if (prop in target) {
                    console.log(`${prop} найдено`);
                } else {
                    console.log(`${prop} не найдено`);
                    throw new Error(`Property '${prop}' is not a part of target model`);
                }
            }

            console.log(`Запись ${prop} ${value}`);

            target[prop] = value;

            return true;
        }
    };
}

/**
 * allowStrictMode: boolean; true by default
 */
export interface ModelConstructorInterface {
    allowStrictMode: boolean;
}

export function Model({allowStrictMode = true}: ModelConstructorInterface): Function {
    /* tslint:disable:only-arrow-functions*/
    return function<T extends {new(...args: any[]): {}}>(targetConstructor: T): Function  {
        return class extends targetConstructor {
            constructor(...params) {
                super(params);

                return new Proxy(this, handler(allowStrictMode));
            };

            public resolveParams(params?: any): void {
                params.forEach((value: any, key: string) => {
                    if (!(key in this) && allowStrictMode) {
                        throw new Error(`Property '${prop}' is not a part of target model`);
                    }

                    if (!Array.isArray(value)) {
                        const autowiredClass: new (data: any) => any = getAutowired(this, key);

                        if (autowiredClass !== undefined) {
                            (this as any)[key] = new autowiredClass(value);

                            return;
                        }

                        (this as any)[key] = value;

                        return;
                    }

                    const mappedClass: any = getMappedClass(this, key);

                    if (mappedClass !== undefined) {
                        (this as any)[key] = value.map((param: any) => new mappedClass(param));

                        return;
                    }

                    (this as any)[key] = value;
                });
            }
        };
    };
}
