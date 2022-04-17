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
    var onlyUpper = password.replace(/[a-z]/g, '');
    var onlyLower = password.replace(/[A-Z]/g, '');
    const regex = /\S+@\S+\.\S+/

    console.log(password)
    if (email == "" && password == "") {
        alert("Please fill in the details");
        return false;

        } else if (email == ""){
        alert("Email must be filled out");

        } else if(password == ""){
            alert("Password must be filled out");

        }  else if (form.floatingPassword.value != form.floatingVerifyPassword.value){
        alert("Password does not match");
    
        } else if (form.floatingPassword.value.length <8){
            alert("Password must be at least 8 characters long!");

        } else if (onlyUpper.length < 1) {
            alert("Password must include at least One Upper Case Letter!");
        } else if (onlyLower.length <1) {
            alert("Password must include at least One Lower Case Letter!");
        } else if (/\d/.test(password) === false) {
            alert("Password must include at least One Number!");
        }
        else {
            //var docRef = ;
            db.collection('accounts').doc(email).get().then((doc) => { //find if document(account) exist
                if (doc.exists) { //if exist
                    //console.log("Document data:", doc.data());
                    alert("Account already exists");
                } else { //if no exist
                    var plan = {
                        date : "null",
                        attractions : {},
                        hotels : {},
                        flights : {}
                    }
                    db.collection('accounts').doc(email).set( //set document ID as email input from user. Field is password.
                    {   password : form.floatingPassword.value,
                        plans : null

                    }
                    );

                    /*
                    const initialData = {
                        name: 'Frank',
                        age: 12,
                        favorites: {
                          food: 'Pizza',
                          color: 'Blue',
                          subject: 'recess'
                        }
                      };

                      db.collection('accounts').doc(email).update({
                        age: 13,
                        'favorites.color': 'Red'
                      });

                      */

                    //db.collection('accounts').doc(email).plans.set(()
                    /*
                    db.collection('accounts').doc(email).collection('plans').doc('1').set({
                        date: null
                    });

                    db.collection('accounts').doc(email).collection('plans').doc('2').set({
                        date: null
                    });

                    db.collection('accounts').doc(email).collection('plans').doc('3').set({
                        date: null
                    });
                    */
                    /*
                    db.collection('planner').doc(email).collection('Plan1').doc('date').set(
                        {name: 'placeholder',
                        price: 320}
                    );
                    db.collection('planner').doc(email).collection('Plan2').doc('date').set(
                        {name: 'placeholder',
                        price: 320}
                    );
                    */
                    
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

