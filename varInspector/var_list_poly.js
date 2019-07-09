function var_dic_list() {

    let exportVars = [];

        let localBindings = Polyglot.import("bindings");

        Object.keys(localBindings).forEach((variable) => {
            if (variable !== "polyglot") {
                exportVars.push({
                    "varName": variable,
                    "varContent": localBindings[variable] || "",
                })
            }
        })

    
    return JSON.stringify(exportVars);
}

console.log(var_dic_list())