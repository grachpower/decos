import 'jest';

import { prop } from "../src";
import { Model } from "../src";

@Model()
class TestingModel {
    @prop data: number;

    constructor(params?) {
        (this as any).resolveParams(params);
    }
}

test('Prop should define model undefined property', () => {
    const model = new TestingModel({});

    expect('data' in model).toBeTruthy();
});

test('Prop should define model defined (24) property', () => {
    const model = new TestingModel({data: 24});

    expect(model.data).toBe(24);
});
