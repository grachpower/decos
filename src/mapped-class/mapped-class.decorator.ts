import 'reflect-metadata';

const MAPPED_CLASS_METADATA_KEY: string = 'MappedClass_';

/**
 * Decorator MappedClass
 *
 * @param targetClass
 *
 * @return {(target:any, key:string)=>void}
 *
 * @constructor
 */
export function MappedClass(targetClass: { new (data?: any): any; }): (target: any, targetKey?: string) => void {
  return (target: any, key: string): void => {
    if (!(key in target)) {
        target[key] = undefined;
    }

    Reflect.defineMetadata(MAPPED_CLASS_METADATA_KEY + key, targetClass, target, key);
  };
}

/**
 * Get MappedClass
 *
 * @param target
 *
 * @param propertyKey
 *
 * @return {any}
 */
export function getMappedClass(target: any, propertyKey: string): any {
  return Reflect.getMetadata(MAPPED_CLASS_METADATA_KEY + propertyKey, target, propertyKey);
}
