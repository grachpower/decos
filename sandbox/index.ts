import { prop } from '../src';
import { Model } from '../src';

@Model()
class KekModel {
    @prop public id: number;
    @prop public name: string;

    constructor(params?) {
        (this as any).resolveParams(params);
    }
}

const params = {};

const testingModel = new KekModel();
testingModel.id = 25;
testingModel.name = 'kekes';
(<any>testingModel).heh = 25;
