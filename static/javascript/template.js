if (sessionStorage.getItem("email") == null){ //not logged in
    //alert("not logged in");
    sessionStorage.setItem("loggedIn", false);
    document.getElementById("signupButton").innerHTML = "<a class = \"signup\" onclick=\"goToSignup()\">Signup</a>"
    document.getElementById("loginButton").innerHTML = "<button> <a class = \"text-white\" onclick=\"goToLogin()\"> Log in </a> </button>"
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
    document.getElementById("signupButton").innerHTML = "<a class = \"signup\"  onclick=\"goToAccount()\">Account</a>"
    document.getElementById("loginButton").innerHTML = "<button onclick=\"goToSignout()\"> <div class = \"searchText my-auto mx-auto\"> Logout </div> </button>"
}

function goToAccount(){
    document.location.href = "/account";
}

function goToSignout(){
    sessionStorage.clear();
    document.location.href = "/signout";
}

function goToSignup(){
    document.location.href = "/signup";
}

function goToLogin(){
    document.location.href = "/login";
}