function Model(): Function {
    return function<T extends {new(...args: any[]): {}}>(targetConstructor: T): Function  {
        console.log('in decorator');
        return class extends targetConstructor {
            constructor(...args) {
                super(args);
                console.log('in class');
            }
        }
    }
}



@Model()
class TestingModel {
    public id: number;
    public name: string;
}


new TestingModel();
