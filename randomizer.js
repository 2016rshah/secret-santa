var GoogleSpreadsheet = require("google-spreadsheet");
var main = function(spreadSheetId, callback){
    console.log(spreadSheetId)
    var my_sheet = new GoogleSpreadsheet(spreadSheetId);

    var names = []
    my_sheet.getRows( 1, function(err, row_data){
        if(err){
            throw err
        }
        console.log("recieved " + row_data.length + " rows from google spreadsheet")
        for(var i = 0; i<row_data.length; i++){
            var entry = row_data[i].content.split(",")
            var name = entry[0].split(":")[1]
            names.push({"person":name})
        }
        if(names.length > 1){
            console.log("enough names to start randomizing")
            names = assignAllNames(names)
            callback(names)
        }
        else{
            console.log("not enough names to randomize")
            callback("error");
        }
    })
}
var assignAllNames = function(names){
    var names2 = names.slice(0); //cheap way to duplicate the array
    var names2 = shuffle(names2)
    for(var i = 0; i<names.length; i++){
        names[i].givingTo = names2[i]
    }
    if(checkWorks(names)){
        console.log("returning names")
        return names
    }
    else{
        console.log("Randomization didn't work, recursing")
        return assignAllNames(names)
    }
}
function shuffle(array) {
  var copy = [], n = array.length, i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);
    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
}
var checkWorks = function(array){
    for (var i = 0; i < array.length; i++) {
        // console.log(array[i])
        if(array[i].person == array[i].givingTo.person){
            return false
        }
    };
    console.log("randomizing worked")
    return true
}
module.exports = {
    getNames : function(spreadSheetId, callback){
        main(spreadSheetId, function(data){
            callback(data)

        })
    }
}