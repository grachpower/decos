const MAPPED_CLASS_METADATA_KEY: string = 'MappedClass_';

const reflect: any = (window as any).Reflect;

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
    reflect.defineMetadata(MAPPED_CLASS_METADATA_KEY + key, targetClass, target, key);
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
  return reflect.getMetadata(MAPPED_CLASS_METADATA_KEY + propertyKey, target, propertyKey);
}
