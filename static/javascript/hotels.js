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

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    hotelInput = getHotelSearch();
    
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }




function savePlans() {
    var hotelSearch = getHotelSearch();
    var numOfDays = getNoDays().value;
    var children = getChildren();
    var adults = getAdults();
    var pax = getPax();
    var checkInDate = getCheckInDate();
    var checkOutDate = getCheckOutDate();
    console.log(numOfDays);

	db.collection('planner').collection(sessionStorage.getItem("email")).collection("Plan1").add({ //adds a document into the collection 'planner'
        //plan_no: plan_no,
        hotelSearch: hotelSearch,
        numOfDays: numOfDays.toString(),
        children: children,
        adults: adults,
        pax: pax.toString(),
        checkInDate: checkInDate,
        checkOutDate, checkOutDate
    });
    alert("Plan saved!");
    
}

