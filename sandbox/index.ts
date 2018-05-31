import {Autowired, prop} from '../src';
import { Model } from '../src';

@Model()
class CycleDepModel {
    @prop id: number;
    @prop name: string;

    @Autowired(CycleDepModel) cycleChild: CycleDepModel;

    constructor(params) {}
}

const testingParams = {
    id: 24,
    name: 'D11ke',
    children: [
        {data: 'foo'},
        {data: 'bar'},
    ],
    cycleChild: {data: 'foo', id: 25, name: 'kek'},
};

const model = new CycleDepModel(testingParams);

(model as any).children = [1, 2 ,3];

console.log(JSON.stringify(model));