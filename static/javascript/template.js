if (sessionStorage.getItem("email") == null){ //not logged in
    sessionStorage.setItem("loggedIn", false);
    //document.getElementById("loginButton").innerHTML = 
    //display_image();
    //alert("here");
    //show_image("static/assets/img/userIcon.png",64,64,"profilePic");
    //imageHere("static/assets/img/userIcon.png",64,64,"profilePic");

} else { //logged in
    sessionStorage.setItem("loggedIn", true);
    document.getElementById("signupButton").innerHTML = null;
    document.getElementById("loginButton").innerHTML = null;

    //change login button to display user profile pic.
    document.getElementById("loginButton").innerHTML = "<img id=\"profilePic\" src=\"static/assets/img/userIcon.png/\" style=\"width:60px;height:60px;\"  onclick=\"goToAccount()\"> ";
    
}

function goToAccount(){
    document.location.href = "/account";
}