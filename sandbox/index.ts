function handler() {
    return {
        get(target, prop) {
            if (target.hasOwnProperty(prop)) {
                console.log(`${prop} найдено`);
            } else {
                console.log(`${prop} не найдено`);
            }

            console.log(`Чтение ${prop}`);

            return target[prop];
        },
        set(target, prop, value) {
            if (target.hasOwnProperty(prop)) {
                console.log(`${prop} найдено`);
            } else {
                console.log(`${prop} не найдено`);
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

                for (let prop in this) {
                    console.log(prop);
                }

                console.log('in class');
                return new Proxy(this, handler());
            }
        }
    }
}



@Model()
class KekModel {
    public id: number;
    public name: string;

    constructor(params: any = {}) {
        this.id = params.id;
        console.log('in nested constructor');
    }
}


console.log('kek kek kek');

const testingModel = new KekModel();
testingModel.id = 25;
testingModel.name = 'kekes';
(<any>testingModel).heh = 25;
