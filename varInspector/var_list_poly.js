function var_dic_list() {

    let exportVars = [];

        let localBindings = Polyglot.import("bindings");

        Object.keys(localBindings).forEach((variable) => {
            if (variable !== "polyglot") {
                exportVars.push({
                    "varName": variable,
                    "varSize": localBindings[variable].length ? localBindings[variable].length : 'n/a',
                    "varType": typeof localBindings[variable] == "object" ? (localBindings[variable].length ? "array" : "object") : typeof localBindings[variable],
                    "varContent": localBindings[variable],
                    "objectContent": typeof localBindings[variable] == "object" ? Object.keys(localBindings[variable]).map((key) => [key, localBindings[variable][key]]) : ""
                })
            }
        })

    
    return JSON.stringify(exportVars);
}

console.log(var_dic_list())