function getChildren(){
    var childrenObj = document.getElementById("children");
    var result = parseInt(childrenObj.options[childrenObj.selectedIndex].value);
    return result;
}
function getAdults(){
    var adultObj = document.getElementById("adults");
    var result = parseInt(adultObj.options[adultObj.selectedIndex].value);
    return result;
}

function cal_pax(){
    var adults = getAdults();
    var children = getChildren();
    var result = adults + children;
    document.getElementById("total_pax").value = result;
}

function getAttractionSearch(){
    var result = document.getElementById("SearchAtrractions");
    return result;
    
}