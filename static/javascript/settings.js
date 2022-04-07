//sessionStorage.setItem("email", "we");
//sessionStorage.setItem("password", "ew");


if (sessionStorage.getItem("email") == null){
    alert("You have not logged in. Returning to home page...")
    document.location.href = "/"; //goes to home
}


function changePassword(){
    var newPassword = document.getElementById('newPassword').value;
    var verifyPassword =  document.getElementById('verifyPassword').value;
    if(newPassword != verifyPassword){
        alert("Password does not match");
    } else if(newPassword == ""){
        alert("Password cannot be empty");
    } else{
        //sessionStorage.getItem("password");
        alert(sessionStorage.getItem("password"));
        updatePasswordDP(sessionStorage.getItem("email"), verifyPassword); //update into firebase
        sessionStorage.setItem("password", newPassword); //update session details.
        alert("Password changed!");
        alert(sessionStorage.getItem("password"));
    }
}

function updatePasswordDP(email, newPassword){
	for (var i = 0; i < data.length; i++) {
		if (data[i][0] == email) {
			data[i][1] = newPassword;
		}
	}
}

