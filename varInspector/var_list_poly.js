var sc = require('smart-circular');

function var_dic_list() {

    let exportVars = [];

        let localBindings = Polyglot.import("bindings");

        Object.keys(localBindings).forEach((variable) => {
            try {
                let varValue = typeof localBindings[variable] == "object" && !Array.isArray(localBindings[variable]) ? sc(localBindings[variable]) : localBindings[variable];
                JSON.stringify(varValue);
                if (localBindings[variable])  {
                    exportVars.push({
                        "varName": variable,
                        "varContent": varValue
                    })
                }
            }
            catch(e) {
            }
        })
    
    return JSON.stringify(exportVars)
}

console.log(var_dic_list())