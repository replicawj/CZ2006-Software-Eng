function cal_days(){
    var start_date = new Date(document.getElementById("checkIndate"));
    var end_date = new Date(document.getElementById("checkOutDate"));
    return end_date-start_date;
}
function cal_pax(){
    var select_a = document.getElementById("adults");
    var select_c = document.getElementById("children");
    var a = parseInt(select_a.options[select_a.selectedIndex].value);
    var c = parseInt(select_c.options[select_c.selectedIndex].value);
    document.getElementById("total_pax").value = a+c;
}