function var_dic_list() {
    console.log("************************available variables")
    variables = {};
    for (var name in this) {
        variables[name] = name;
        variables[name]=this[name]
    }

    console.log(variables);
    return JSON.stringify([{"varName": "x", "varType": "int", "varSize": "28", "varShape": "", "varContent": "4"}])
}

console.log(var_dic_list())