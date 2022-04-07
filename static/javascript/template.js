if (sessionStorage.getItem("email") == null){ //not logged in
    //alert("if email null");
    sessionStorage.setItem("loggedIn", false);
    document.getElementById("signupButton").innerHTML = "<a id=\"signupButton\" class = \"signup ml-auto\" <button onclick=\"goToSignup()\">Signup</a>";
    document.getElementById("loginButton").innerHTML = "<button  class = \"mr-5\" > <a class = \"text-white\" <button onclick=\"goToLogin()\"> Log in </a> </button>"
    //document.getElementById("loginButton").innerHTML =
    //display_image();
    //alert("here");
    //show_image("static/assets/img/userIcon.png",64,64,"profilePic");
    //imageHere("static/assets/img/userIcon.png",64,64,"profilePic");

} else { //logged in
    //alert("if email exist");
    document.getElementById("signupButton").innerHTML = null;
    document.getElementById("loginButton").innerHTML = null;

    //change login button to display user profile pic.
    document.getElementById("signupButton").innerHTML = "<img id=\"profilePic\"  src=\"static/assets/img/userIcon.png/\"  class =\"mr-3\"  style=\"width:60px;height:60px;\"  onclick=\"goToAccount()\"> ";
    document.getElementById("loginButton").innerHTML = "<button onclick=\"signout()\" class = \"mr-5\" id = \"none\"> <div class = \"searchText my-auto mx-auto\"> Logout </div> </button>";

}

function goToAccount(){
    document.location.href = "/account";
}

function signout(){
    //sessionStorage.setItem("email",null);
    sessionStorage.clear();
    document.location.href = "/signout";
}

function goToLogin(){
    document.location.href = "/login";
}

function goToSignup(){
    document.location.href = "/signup";
}

//<button href="/transport" class = "mr-5" id = "none"> <div class = "searchText my-auto mx-auto"> Search </div> </button>

//signupString = "<a id=\"signupButton\" class = \"signup ml-auto\" href=\"{{ url_for('signup') }}\">Signup</a>"
