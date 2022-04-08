/* Script includes: Load from database, and login handler.
First part of script loads database from firebase.
*/

var data = [];
// console.log(data);

function loadInArray(doc){ //load database into array.
	let email = doc.data().email;
	let password = doc.data().password;
	data.push([email, password]);
	//console.log(data);
	//console.log(email+password);
}

db.collection('accounts').get().then((snapshot) => { //get all documents from 'accounts' collection
    snapshot.docs.forEach(doc =>  {
        loadInArray(doc);
    })
})

/*
Login handler below
*/

function checkAccountExists(email,password){
	for (var i = 0; i < data.length; i++) {
		if (data[i][0] == email) {
			//console.log(data[i][0]);
			if(data[i][1] == password){
				return true;
			}
			return false;
		}
	}
	return false;
}


const form = document.forms["login"]; //form reference

var login = false; 

form.addEventListener('submit', (e) => {
    e.preventDefault(); //remove default because default will reload the page.

    var email = form.floatingInput.value;
    var password = form.floatingPassword.value;


	db.collection('accounts').doc(email).get().then((doc) => { //find if document(account) exist
		if (doc.exists) { //if exist
			//console.log("Document data:", doc.data());
			sessionStorage.setItem("email", email);
			sessionStorage.setItem("password", password);
			sessionStorage.setItem("doc",doc);
			alert("Login!");
			document.location.href = "/";
		} else { //if no exist
			alert("Incorrect password or username.");
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});

	form.floatingPassword.value = '';

	

});

