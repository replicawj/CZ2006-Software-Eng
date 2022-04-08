var data = [];
// console.log(data);

let loginData = {
    email : sessionStorage.getItem("email"),
    password : sessionStorage.getItem("password")
}
//console.log(sessionStorage.getItem("password"));

//if sessionStorage.getItem("email") == NULL ....

function loadInArray(doc){
	let email = doc.data().email;
	let password = doc.data().password;
	data.push([email, password]);
	//console.log(data);
	//console.log(email+password);
}

function checkEmailExists(email){
	for (var i = 0; i < data.length; i++) {
		if (data[i][0] == email) {
			return true;
		}
	}
	return false;
}

db.collection('accounts').get().then((snapshot) => { //get all documents from 'accounts' collection
		snapshot.docs.forEach(doc =>  {
			loadInArray(doc);
		})
	})


const form = document.forms["addAccount"]; //form reference

form.addEventListener('submit', (e) => {
    e.preventDefault(); //remove default because default will reload the page.

    var email = form.floatingInput.value;
    var password = form.floatingPassword.value;
    var verifyPassword = form.floatingVerifyPassword.value;


    if (email == "" && password == "") {
        alert("Please fill in the details");
        return false;

        } else if (email == ""){
        alert("Email must be filled out");

        } else if(password == ""){
            alert("Password must be filled out");

        } else if (form.floatingPassword.value != form.floatingVerifyPassword.value){
        alert("Password does not match");
    
        } else {
            //var docRef = ;
            db.collection('accounts').doc(email).get().then((doc) => { //find if document(account) exist
                if (doc.exists) { //if exist
                    //console.log("Document data:", doc.data());
                    alert("Account already exists");
                } else { //if no exist
                    db.collection('accounts').doc(email).set( //set document ID as email input from user. Field is password.
                    { password : form.floatingPassword.value}
                    );
                    alert("Account Created!");

                    form.floatingInput.value = ''; //clear the form after submit
                    form.floatingPassword.value = '';
                    form.floatingVerifyPassword.value = '';
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

    
    
	//document.location.href = "/login";

    }
}); 

