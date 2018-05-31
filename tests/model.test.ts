import 'jest';

import { Model, prop } from "../src";

@Model()
class TestingModel {
    @prop data: number;
    @prop id: number;
    @prop name: string;

    constructor(params?) {}
}

test('Should create model this props from params', () => {
    const testingParams = {
        data: 24,
        id: 1,
        name: 'D11ke',
    };

    const model = new TestingModel(testingParams);

    expect(model).toBeTruthy();
    expect(model instanceof TestingModel).toBeTruthy();
    expect(model.data).toBe(testingParams.data);
    expect(model.id).toBe(testingParams.id);
    expect(model.name).toBe(testingParams.name);
});

test('Should set only model prop defined with "prop" decorator', () => {
    const testingParams = {
        data: 24,
        id: 1,
        name: 'D11ke',
        lalka: 24,
    };

    const model = new TestingModel(testingParams);

    expect(model).toBeTruthy();
    expect(model.data).toBe(testingParams.data);
    expect(model.id).toBe(testingParams.id);
    expect(model.name).toBe(testingParams.name);
    expect('lalka' in model as any).toBeFalsy();
});

test('Should have no access to set prop that is not a part of a module', () => {
    const testingParams = {
        data: 24,
        id: 1,
    };

    const model = new TestingModel(testingParams);

    expect(model instanceof TestingModel).toBeTruthy();
    (model as any).foo = 'foo';
    expect('foo' in model).toBeFalsy();
});

test('Should have access to set property if part of a model', () => {
    const testingParams = {
    };

    const model = new TestingModel(testingParams);
    model.id = 36;
    expect(model.id).toBe(36);
    expect('data' in model).toBeTruthy();
});

test('Should throw error on getter if property is not a part of target', () => {
    const testingParams = {
        data: 24,
        id: 1,
    };

    const model = new TestingModel(testingParams);

    const getterFunc = () => (model as any).lalka;


    expect(model).toBeTruthy();
    expect(model.data).toBe(testingParams.data);
    expect(model.id).toBe(testingParams.id);
    expect(getterFunc).toThrowError();
});

test('Should return property value if it is a part of target model', () => {
    const testingParams = {
        data: 24,
        id: 1,
    };

    const model = new TestingModel(testingParams);
    expect(model.data).toBe(testingParams.data);
    expect(model.id).toBe(testingParams.id);
});
