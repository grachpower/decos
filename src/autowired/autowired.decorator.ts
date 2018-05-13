import 'reflect-metadata';

const AUTOWIRED_METADATA_KEY: string = 'AUTOWIRED_';

/**
 * Decorator Autowired will support auto init instance of dependency class
 *
 * @param targetClass
 *
 * @return {(target:any, key:string)=>void}
 *
 * @constructor
 */
export function Autowired(targetClass: { new (data?: any): any; }): (target: any, targetKey?: string) => void {
  return (target: any, key: string): void => {
    if (!(key in target)) {
        target[key] = undefined;
    }

    Reflect.defineMetadata(AUTOWIRED_METADATA_KEY + key, targetClass, target, key);
  };
}

/**
 * Get Autowired
 *
 * @param target
 *
 * @param propertyKey
 *
 * @return {any}
 */
export function getAutowired(target: any, propertyKey: string): any {
  return Reflect.getMetadata(AUTOWIRED_METADATA_KEY + propertyKey, target, propertyKey);
}
