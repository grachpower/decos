import 'jest';

import { Model, prop, MappedClass } from "../src";

@Model()
class Child {
    @prop data: string;

    constructor(params?) {}
}

@Model()
class TestingModel {
    @prop id: number;
    @prop name: string;

    @MappedClass(Child) children: Child[];

    constructor(params?) {}
}

@Model()
class CycleTestingModel {
    @prop id: number;
    @prop name: string;

    @MappedClass(CycleTestingModel) children: CycleTestingModel[];

    constructor(params?) {}
}

test('Should add @MappedClass child models', () => {
    const testingParams = {
        id: 24,
        name: 'D11ke',
        children: [
            {data: 'foo'},
            {data: 'bar'},
        ],
    };

    const model = new TestingModel(testingParams);

    expect(model.children[0] instanceof Child).toBeTruthy();
    expect(model.children[1] instanceof Child).toBeTruthy();
});

test('Should work with cycle dependencies', () => {
    const testingParams = {
        id: 24,
        name: 'D11ke',
        children: [
            {data: 'foo', id: 25, name: 'lol'},
            {data: 'bar', id: 26, name: 'kek'},
        ],
    };

    const model = new CycleTestingModel(testingParams);

    expect(model.children[0] instanceof CycleTestingModel).toBeTruthy();
    expect(model.children[1] instanceof CycleTestingModel).toBeTruthy();
    expect(model.children[0].name).toBe(testingParams.children[0].name);
    expect(model.children[1].id).toBe(testingParams.children[1].id);
});