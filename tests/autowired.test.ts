import 'jest';

import { Model, prop, Autowired } from "../src";

@Model()
class Child {
    @prop data: string;

    constructor(params?) {
        (this as any).resolveParams(params);
    }
}

@Model()
class TestingModel {
    @prop id: number;
    @prop name: string;

    @Autowired(Child) child: Child;

    constructor(params?) {
        (this as any).resolveParams(params);
    }
}

test('Should add @Autowired child models', () => {
    const testingParams = {
        id: 24,
        name: 'D11ke',
        children: [
            {data: 'foo'},
            {data: 'bar'},
        ],
        child: {data: 'foo'},
    };

    const model = new TestingModel(testingParams);

    expect(model.child instanceof Child).toBeTruthy();
    expect('children' in model).toBeFalsy();
});