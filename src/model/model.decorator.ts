import { getAutowired } from '../autowired/autowired.decorator';
import { getMappedClass } from '../mapped-class/mapped-class.decorator';

export function Model(): Function {
    /* tslint:disable:only-arrow-functions*/
    return function<T extends {new(...args: any[]): {}}>(targetConstructor: T): Function  {
        return class extends targetConstructor {
            public resolveParams(params?: any): void {
                params.forEach((value: any, key: string) => {
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
