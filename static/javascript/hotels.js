function cal_days(){
    var start_date = new Date(document.getElementById("checkInDate").value);
    var end_date = new Date(document.getElementById("checkOutDate").value);
    var days = (end_date-start_date)/ (1000 * 60 * 60 * 24);
    document.getElementById("noOfNights").value = days;
    return days;
}
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

function getPax(){
    var total_pax = cal_pax();
    return total_pax;
}
function getHotelSearch(){
    var searchHotel = document.getElementById("SearchHotels");
    return searchHotel;
}

function getNoDays(){
    var noDays = doucment.getElementById("noOfNights");
    return noDays;
}
function getCheckInDate(){
    var result = new Date(document.getElementById("checkInDate").value);
    return result;
}
function getCheckOutDate(){
    var result = new Date(document.getElementById("checkOutDate").value);
    return result;
}








