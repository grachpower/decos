function handler() {
    return {
        get(target, prop) {
            if (prop in target) {
                console.log(`${prop} найдено`);
            } else {
                console.log(`${prop} не найдено`);
                throw new Error(`Property '${prop}' is not a part of target model`);
            }

            console.log(`Чтение ${prop}`);

            return target[prop];
        },
        set(target, prop, value) {
            if (prop in target) {
                console.log(`${prop} найдено`);
            } else {
                console.log(`${prop} не найдено`);
                throw new Error(`Property '${prop}' is not a part of target model`);
            }

            console.log(`Запись ${prop} ${value}`);

            target[prop] = value;

            return true;
        }
    };
}

function Model(): Function {
    return function<T extends {new(...args: any[]): {}}>(targetConstructor: T): Function  {
        console.log('in decorator');
        return class extends targetConstructor {
            constructor(...args) {
                super(args);

                console.log('props here:');
                for (let prop in this) {
                    console.log(prop);
                }
                console.log('__________');

                console.log('in decorated class');
                console.log('__________');
                return new Proxy(this, handler());
            }
        }
    }
}


function prop(target: any, key: string) {
    console.log(`target: ${JSON.stringify(target)}; key: ${key}`);
    console.log('__________');
    target[key] = undefined;
}



@Model()
class KekModel {
    @prop public id: number;
    @prop public name: string;

    constructor(params: any = {}) {
        this.id = params.id;
        console.log('in nested constructor');
        console.log('__________');
    }
}

console.log('___________');
console.log('kek kek kek runtime');
console.log('___________');

const testingModel = new KekModel();
testingModel.id = 25;
testingModel.name = 'kekes';
// (<any>testingModel).heh = 25;
