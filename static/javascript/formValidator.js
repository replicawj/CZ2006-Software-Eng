var data = [];
// console.log(data);

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

    } else if (checkEmailExists(email)) {
		alert("Account already exists");
	} else {
        db.collection('accounts').add({ //adds a document into the collection 'accounts'
        email: form.floatingInput.value,
        password: form.floatingPassword.value
    });

    form.floatingInput.value = ''; //clear the form after submit
    form.floatingPassword.value = '';
    form.floatingVerifyPassword.value = '';
    alert("Account Created!");

    }
}); 

