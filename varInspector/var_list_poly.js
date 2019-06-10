function var_dic_list() {

    let exportVars = [];

    // mock bindings

    let x = "testString"
    Polyglot.export("x", x);
    let y = 4;
    Polyglot.export("y", y);
    let z = [1, 2, "hello"];
    Polyglot.export("z", z);

    let a = Polyglot.eval("python", "object()")
    Polyglot.export("a", a);

    let b = Polyglot.eval("python", "'stringi'")
    Polyglot.export("b", b);

    let c = Polyglot.eval("R", "list(1, 2, 5)")
    Polyglot.export("c", c);
    
    let bindings = []
    bindings.push("x");
    bindings.push("y");
    bindings.push("z");
    bindings.push("a");
    bindings.push("b");
    bindings.push("c");

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray


    Polyglot.export("bindings", bindings);

    let localBindings = Polyglot.import("bindings");


    localBindings.forEach((binding) => {
        let polyglotImport = Polyglot.import(binding);
        exportVars.push({
            "varName": binding,
            "varSize": polyglotImport.length ? polyglotImport.length : '',
            "varType": typeof polyglotImport == "object" ? (polyglotImport.length ? "array" : "object") : typeof polyglotImport,
            "varContent": '' + polyglotImport
        })
    })
    
    // dummy: [{"varName": "varNico", "varType": "int", "varSize": "28", "varShape": "", "varContent": Polyglot.import('varNico')}]
    
    return JSON.stringify(exportVars);
}

console.log(var_dic_list())