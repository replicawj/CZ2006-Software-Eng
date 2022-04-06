const form = document.div[""]; //form reference
// saving data (add new document under account) - listen for 'submit' buttom.
form.addEventListener('submit', (e) => {
    e.preventDefault(); //remove default because default will reload the page.
    
	var plan_no = form.floatingInput.value;
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

