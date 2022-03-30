/**
 *  onsubmit="validateForm()"
 
 else {
  	alert(name);
  	db.collection('accounts').add({ //adds a document into the collection 'accounts'
        email: name,
        password: password
    });

function validateForm() {
	let email = document.forms["addAccount"]["email"].value;
	let password = document.forms["addAccount"]["password"].value

 */
 
const data = [[1, 2], [3, 4],[3, 4]];

function loadInArray(doc){
	let email = doc.data().email;
	let password = doc.data().password;
	data.push([email, password]);
	//console.log(email+password);
}

db.collection('accounts').get().then((snapshot) => { //get all documents from 'accounts' collection
		snapshot.docs.forEach(doc =>  {
			loadInArray(doc);
		})
	})
	
console.log(data);
console.log(data.length);
data.push([555, 561]);
console.log(data);
    
const form = document.forms["addAccount"]; //form reference
// saving data (add new document under account) - listen for 'submit' buttom.
form.addEventListener('submit', (e) => {
    e.preventDefault(); //remove default because default will reload the page.
    
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
  
//db collection works but not in a function?

