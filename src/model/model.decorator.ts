import { getAutowired } from '../autowired/autowired.decorator';
import { getMappedClass } from '../mapped-class/mapped-class.decorator';
import { cloneFunction } from '../helpers/clone-function';

function classDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {};
}

function handler(allowStrictMode: boolean) {
    return {
        get(target, prop) {
            if (prop === 'toJSON') {
                return () => target;
            }

            if (allowStrictMode && !(prop in target)) {
                throw new Error(`Property ', ${prop}, ' is not a part of target model`);
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
        construct(target, [paramObj = {}]) {
            const innerConstructor = classDecorator(target.prototype.constructor);

            const innerTaget = new target(paramObj);
            innerTaget._resolveParams(paramObj, target);

            Object.keys(innerTaget).forEach(key => {
                innerConstructor.prototype[key] = innerTaget[key];
            });

            const targetRes = new innerConstructor(paramObj);

            return new Proxy(targetRes, handler(allowStrictMode));
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

    const resolveParams = function(parameters: any = null, target: any): void {
        if (!parameters) {
            return;
        }

        (Object as any).entries(parameters).forEach(([key, value]) => {
            if (!(key in this) && allowStrictMode) {
                console.warn(`Property '${key}' is not a part of target model`);

                return;
            }

            if (!Array.isArray(value)) {
                let autowiredClass: new (data: any) => any = getAutowired(this, key);

                if (autowiredClass && target) {
                    const testModel = new autowiredClass(null);

                    if (testModel instanceof target) {
                        autowiredClass = Model({allowStrictMode})(autowiredClass);
                    }
                }

                if (autowiredClass !== undefined) {
                    (this as any)[key] = new autowiredClass(value);

                    return;
                }

                (this as any)[key] = value;

                return;
            }

            let mappedClass: any = getMappedClass(this, key);

            if (mappedClass && target) {
                const testModel = new mappedClass(null);

                if (testModel instanceof target) {
                    mappedClass = Model({allowStrictMode})(mappedClass);
                }
            }

            if (mappedClass !== undefined) {
                (this as any)[key] = value.map((param: any) => new mappedClass(param));

                return;
            }

            (this as any)[key] = value;
        });
    };

    return function<T extends {new(...args: any[]): {}}>(targetConstructor: T): Function  {
        targetConstructor.prototype._resolveParams = resolveParams;

        Object.defineProperty(targetConstructor, '_resolveParams', {
            enumerable: false,
        });

        return new Proxy(targetConstructor, handler(allowStrictMode));
    };
}
