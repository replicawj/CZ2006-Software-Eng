if (sessionStorage.getItem("email") == null){
    sessionStorage.setItem("loggedIn", false);

} else {
    sessionStorage.setItem("loggedIn", true);
    document.getElementById("signupButton").innerHTML = null;
    document.getElementById("loginButton").innerHTML = null;
}


//alert(sessionStorage.getItem("loggedIn"));