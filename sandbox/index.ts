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

const params = {
    id: 256,
    name: 'Artyom',
    heh: 'heh',
};

const testingModel = new KekModel(params);
testingModel.id = 25;
testingModel.name = 'kekes';

(<any>testingModel).lel = 25;
