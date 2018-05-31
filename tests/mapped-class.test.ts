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