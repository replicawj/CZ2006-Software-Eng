if (sessionStorage.getItem("email") == null){
    alert("You have not logged in. Returning to home page...")
    document.location.href = "/"; //goes to home
}


function newPlan(){
    console.log("Saving plan...");
    var startDate = document.getElementById("startDateSelection").value;
    var endDate = document.getElementById("endDateSelection").value;
    var planName = document.getElementById("planName").value;
    console.log(startDate);
    console.log(endDate);
    console.log(planName);

    //console.log(sessionStorage.getItem("numberOfPlans"));

    //---Access db to add new plan---
    db.collection('accounts').doc(sessionStorage.getItem("email")).get().then((doc) => {
        var plans = doc.data().plans;
        var object = plans; //three plans
        console.log(object);

        var planDetails = {
            startDate:startDate,
            endDate:endDate,
            attractions : null,
            hotels : null,
            flights : null
        }
        if(!checkPlanField(startDate,endDate,planName)){
            return ;
            
        }

        var planNumber = parseInt(sessionStorage.getItem("numberOfPlans")) + 1;
        var newPlan = {}
        //planNumber : planDetails
        newPlan[planNumber] = planDetails;

        
        
        /*
        db.collection('accounts').doc(sessionStorage.getItem("email")).update({
            plans : planDetails
        });
        */

        db.collection('accounts').doc(sessionStorage.getItem("email")).set({
            plans : newPlan
        }, { merge : true});
        
        
        //db.ref("accounts/" + sessionStorage.getItem("email") + "/plans").push(planDetails);

        //Object.assign(object,newPlan);


    });

    planName = ""; //clean out the inputs on the modal

    alert("Plan saved!");
    planMade = true;

}
function checkPlanField(startDate, endDate){
    if(!startDate){
        alert("Start date not added. Please try again.");
        return 0;
    }
    else if(!endDate){
        alert("End date not added. Please try again.");
        return 0;
    }
    else if(startDate>endDate){
        alert("Start date cannot be later than End date. ");
        return 0;
    }
    else{
        return 1;
    }
}



//document.getElementById("email").innerHTML = "fish";

//<script> document.getElementById("email").innerHTML = "fish" </script>

//sessionStorage.setItem("email", "abc@hotmail.com"); //for testing
