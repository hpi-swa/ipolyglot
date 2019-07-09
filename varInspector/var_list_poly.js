function var_dic_list() {

    let exportVars = [];

    try {
        let localBindings = Polyglot.import("bindings");

        console.log("localBindings", localBindings)

        for (var variable in localBindings){
            if (variable !== "polyglot") {
                exportVars.push({
                    "varName": variable,
                    "varSize": localBindings[variable].length ? localBindings[variable].length : 'n/a',
                    "varType": typeof localBindings[variable] == "object" ? (localBindings[variable].length ? "array" : "object") : typeof localBindings[variable],
                    "varContent": localBindings[variable],
                    "objectContent": typeof localBindings[variable] == "object" ? Object.keys(localBindings[variable]).map((key) => [key, localBindings[variable][key]]) : ""
                })
            }
        }
    } catch(error) {
        // pass
    }
    
    return JSON.stringify(exportVars);
}

console.log(var_dic_list())