function var_dic_list() {

    let varlist = [];
    // console.log("GLOBAL VARLIST IN EXTENSION", global["varlist"]);

    // Polyglot not available in this context
    // console.log(Polyglot.import)

    try {
        // avoid regarding the console statement as a variable
        varlist = global["varlist"].filter(variableName => {return variableName && variableName != "console.log(var_dic_list())"})   
        //console.log("VARLIST", varlist);
    }
    catch(error) {
        //console.log("LOGGING ERROR");
        //console.log(error);
    }
    
    
    // returning test json for now
    return JSON.stringify([{"varName": "varNico", "varType": "int", "varSize": "28", "varShape": "", "varContent": Polyglot.import('varNico')}])
}

console.log(var_dic_list())