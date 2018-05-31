# Dects: typescript decorators library

## Usage

`npm install dects`

Define model
``` typescript
@Model()
class ExampleModel {
    @prop data: number;
    @prop id: number;
    @prop name: string;

    constructor(params?) {}
}

new ExampleModel({data: 'foo', id: 1, name: 'username');
```

Use Autowired
``` typescript
@Model()
class Child {
    @prop name: string;
    
    constructor(params?) {}
}


@Model()
class ExampleModel {
    @prop data: number;
    @prop id: number;
    @prop name: string;
    @Autowired(Child) child: Child;

    constructor(params?) {}
}

new ExampleModel({
    data: 'foo',
    id: 1,
    name: 'username',
    child: {name: 'childname'},
});
```

Use MappedClass
``` typescript
@Model()
class Child {
    @prop name: string;
    
    constructor(params?) {}
}


@Model()
class ExampleModel {
    @prop data: number;
    @prop id: number;
    @prop name: string;
    @MappedClass(Child) children: Child[];

    constructor(params?) {}
}

new ExampleModel({
    data: 'foo',
    id: 1,
    name: 'username',
    children: [
        {name: 'childname1'},
        {name: 'childname2'},
    ]
});
```
