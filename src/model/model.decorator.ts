import { getAutowired } from '../autowired/autowired.decorator';
import { getMappedClass } from '../mapped-class/mapped-class.decorator';

function handler(allowStrictMode: boolean) {
    return {
        get(target, prop) {
            if (prop === 'toJSON') {
                return () => target;
            }

            if (allowStrictMode && !(prop in target)) {
                throw new Error(`Property '${prop}' is not a part of target model`);
            }

            return target[prop];
        },
        set(target, prop, value) {
            if (allowStrictMode && !(prop in target)) {
                console.warn(`Property '${prop}' is not a part of target model`);

                return true;
            }

            target[prop] = value;

            return true;
        },
    };
}

/**
 * allowStrictMode: boolean; true by default
 */
export interface ModelConstructorInterface {
    allowStrictMode: boolean;
}

export function Model(params: ModelConstructorInterface = {allowStrictMode: true}): Function {
    /* tslint:disable:only-arrow-functions*/
    const { allowStrictMode } = params;

    return function<T extends {new(...args: any[]): {}}>(targetConstructor: T): Function  {
        return class extends targetConstructor {
            constructor(...parameters) {
                super(...parameters);

                return new Proxy(this, handler(allowStrictMode));
            }

            public resolveParams(parameters?: any): void {
                if (!parameters) {
                    return;
                }

                (Object as any).entries(parameters).forEach(([key, value]) => {
                    if (!(key in this) && allowStrictMode) {
                        console.warn(`Property '${key}' is not a part of target model`);

                        return;
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
