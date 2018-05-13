import { prop } from '../src';
import { Model } from '../src';

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
(<any>testingModel).heh = 25;
