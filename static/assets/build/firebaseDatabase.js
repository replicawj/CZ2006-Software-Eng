/**
 * For Travello Signup page.
 */
 
const form = document.querySelector('addAccount'); //form reference
 
// Function load contents of the doc onto console.
function loadDocuments(doc){
	let email = doc.data().email;
	let password = doc.data().password;
	console.log(email+password);
}

db.collection('accounts').get().then((snapshot) => { //get all documents from 'accounts' collection
	snapshot.docs.forEach(doc =>  {
		loadDocuments(doc);
		console.log(doc.data());
	})
})