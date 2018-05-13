const AUTOWIRED_METADATA_KEY: string = 'AUTOWIRED_';

const reflect: any = Reflect;

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
    reflect.defineMetadata(AUTOWIRED_METADATA_KEY + key, targetClass, target, key);
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
  return reflect.getMetadata(AUTOWIRED_METADATA_KEY + propertyKey, target, propertyKey);
}
