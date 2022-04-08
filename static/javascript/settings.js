//sessionStorage.setItem("email", "we");
//sessionStorage.setItem("password", "ew");

//const { getDocs } = require("@firebase/firestore");



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
    } else{ //save password
        db.collection('accounts').doc(sessionStorage.getItem("email")).update({ //get the document
            password:verifyPassword
        }).then(function(){
            alert("Password updated!");
        }).catch(function(error){
            console.log(error);
        })
        sessionStorage.setItem("password",verifyPassword);
        document.getElementById("password").innerHTML = sessionStorage.getItem("password"); //update the html account password display.
        //db.collection('accounts').doc(sessionStorage.getItem("email")).update({password: verifyPassword});
        //sessionStorage.getItem("password");
        //alert(sessionStorage.getItem("password"));
        //updatePasswordDP(sessionStorage.getItem("email"), verifyPassword); //update into firebase
        //sessionStorage.setItem("password", newPassword); //update session details.
        //alert("Password changed!");
        //alert(sessionStorage.getItem("password"));
        }  
}

function updatePasswordDP(email, newPassword){
	for (var i = 0; i < data.length; i++) {
		if (data[i][0] == email) {
			data[i][1] = newPassword;
		}
	}
}

/*
db.collection('accounts').get().then((snapshot) => { //get all documents from 'accounts' collection and display in console log
    snapshot.docs.forEach(doc =>  {
        //console.log(doc.data());
        //check(doc);
        if(doc.data().email == 'fish@hotmail.com'){
            doc.update({"password": "fish"});
            console.log('updated');
        }
        console.log(doc.data());
    })
})

/*
db.collection('accounts').doc('peach@hotmail.com').update({password: "peach"});

var one = null;

function check(doc){
	let email = doc.data().email;
	let password = doc.data().password;
	if(email == 'fish@hotmail.com'){
        one = doc;
        console.log(one.data());
        saveDoc(doc);
        doc.update({password: "fish"});
        
    } else{
        console.log("next");
    }
}
var here = null;
function saveDoc(doc){
    sessionStorage.setItem("current",doc);
    here = doc;
    console.log(here.data());
}

console.log(here);
console.log(sessionStorage.getItem("current") + "session storage");
var theDocument = sessionStorage.getItem("current");
console.log(theDocument);


var accounts = db.collection('accounts');


var result = accounts.where('email', '==', true).get();

if (result.empty) {
    console.log('No matching documents.');
} else{
    console.log('Document found');
    console.log(result.data());
}

/*
async function getDoc(accounts){
    //var doc;
    const stateQueryRes = await accounts.where('email', '==', 'CA').get().then((snapshot) => {
        console.log('Read succeeded!');
        //doc = snapshot;
    });
    console.log(stateQueryRes);
    
    if (!stateQueryRes.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    //console.log(doc.data());
    
}
*/


//console.log(getDoc(accounts));

//var results = await accounts.where('email', '==', 'peepee@poopoo.com').get();
/*
The promise will always log pending as long as its results are not resolved yet. 
You must call .then on the promise to capture the results regardless of the promise state (resolved or still pending)
*/

/*
if (!result.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }

*/