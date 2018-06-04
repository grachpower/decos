import 'jest';

import { Model, prop, Autowired } from '../src';

@Model()
class Child {
    @prop data: string;

    constructor(params?) {}
}

@Model()
class TestingModel {
    @prop id: number;
    @prop name: string;

    @Autowired(Child) child: Child;

    constructor(params?) {}
}

@Model()
class CycleDepModel {
    @prop id: number;
    @prop name: string;

    @Autowired(CycleDepModel) cycleChild: CycleDepModel;

    constructor(private params?) {}
}

test('Should add @Autowired child models', () => {
    const testingParams = {
        id: 24,
        name: 'D11ke',
        children: [
            {data: 'foo'},
            {data: 'bar'},
        ],
        child: {
            id: 26,
            name: 'User',
        },
    };

    const model = new TestingModel(testingParams);

    expect(model.child instanceof Child).toBeTruthy();
    expect('children' in model).toBeFalsy();
});

test('Should work with cycle dependencies', () => {
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

    expect(model.cycleChild instanceof CycleDepModel).toBeTruthy();
    expect(model.cycleChild.id).toBe(testingParams.cycleChild.id);
    expect(model.cycleChild.name).toBe(testingParams.cycleChild.name);
});
