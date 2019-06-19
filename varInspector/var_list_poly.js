function var_dic_list() {

    let exportVars = [];

    let localBindings = Polyglot.import("__bindings");

    localBindings.forEach((binding) => {
        if (binding !== "polyglot") {
            let polyglotImport = Polyglot.import(binding);
            exportVars.push({
                "varName": binding,
                "varSize": polyglotImport.length ? polyglotImport.length : 'n/a',
                "varType": typeof polyglotImport == "object" ? (polyglotImport.length ? "array" : "object") : typeof polyglotImport,
                "varContent": '' + polyglotImport
            })
        }
    })
        
    return JSON.stringify(exportVars);
}

console.log(var_dic_list())