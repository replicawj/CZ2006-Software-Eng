if (sessionStorage.getItem("email") == null){
    alert("You have not logged in. Returning to home page...")
    document.location.href = "/"; //goes to home
}

//document.getElementById("email").innerHTML = "fish";

//<script> document.getElementById("email").innerHTML = "fish" </script>

//sessionStorage.setItem("email", "abc@hotmail.com"); //for testing
