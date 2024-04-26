function findMatch(){
        console.log("entered findMatch")
        const intandhob = []; // Array to store the selected interests and hobbies
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked'); // Get all the checked checkboxes
        const rollNumber = document.getElementById('rollNumber').value; // Get the roll number of the user
        var preferredGender = document.getElementById("preferredGender").value; // Get the prefferedGender
        var ageGroup = document.getElementById("ageGroup").value; // Get the prefferedAgeGroup
        //const urlParams = new URLSearchParams(window.location.search); 
        //const loginid = parseInt(urlParams.get('user')); // Get the index of user in login.json for which the match is to be found
        if(ageGroup == "46+"){
            lowerBound = 46;
            upperBound = Infinity; // Set the upper bound to infinity for age group 46+
        }
        else if(ageGroup == "no_preference"){
            lowerBound = 0; // Set the lower bound to 0 for no preference
            upperBound = Infinity; // Set the upper bound to infinity for no preference
        }
        else{
        var ageBounds = ageGroup.split('-'); // Split the age group string and set lower and upper bounds
        var lowerBound = parseInt(ageBounds[0]);
        var upperBound = parseInt(ageBounds[1]);
        }
        checkboxes.forEach(checkbox => {
            intandhob.push(checkbox.value); // Push the selected interests and hobbies to the array
        });
        fetch('student.json') // Fetch the student.json file
        .then(response => response.json())
        .then(data => { 
            interest_count= []; // Array to store the count of interests
            for (var i = 0; i < data.length; i++) {
                var count=0; 
                for (var j = 0; j < data[i].Interests.length; j++) {
                    if(intandhob.includes(data[i].Interests[j])){ // Check if the interests of the user match with the selected interests
                        count++;
                    }
                    else {
                        count -= 0.1; // Penalize for not having the interest
                    }
                }
                interest_count.push(count); // Push the count of interests to the array
            }
            hobby_count=[]; // Array to store the count of hobbies
            for (var i = 0; i < data.length; i++) {
                var count=0;
                for (var j = 0; j < data[i].Hobbies.length; j++) {
                    if(intandhob.includes(data[i].Hobbies[j])){ // Check if the hobbies of the user match with the selected hobbies
                        count++;
                    }
                    else
                    {
                        count-=0.1; // Penalize for not having the hobby
                    
                    }
                }
                hobby_count.push(count); // Push the count of hobbies to the array
            }
            age_preference=[]; // Array to store the age preference
            for(var i=0; i<data.length; i++)
            {
                if(data[i]["Age"]>=lowerBound && data[i]["Age"]<=upperBound)
                {
                    age_preference.push(1); // Push 1 if the age of the user is within the age group else push 0
                }
                {
                    age_preference.push(0); 
                }
            }
            var k=0;
            for (; k < data.length; k++) {
                if(data[k]["IITB Roll Number"]==rollNumber){ // find the studentjson index of the user
                    j=k;
                    break;
                }
            }
            j=k;

            weights=[] // initialize the weights array
            for(var i=0; i<data.length; i++)
            {   if(data[i]["Gender"]==preferredGender || preferredGender=="no_preference") // push weights iff the gender filte ris satisfied
                    weights.push(10*interest_count[i]+ 5*hobby_count[i] + 15*age_preference[i]);
                else
                    weights.push(0);
            }
            max=0;
            max_index=0;
            for(var i=0; i<data.length; i++)
            {
                if(weights[i]>max && data[i]["IITB Roll Number"]!=rollNumber ) // make sure the person is not matched with themselves
                {
                    max=weights[i]; 
                    max_index=i; 
                } 
                if(weights[i]==max && data[i]["IITB Roll Number"]!=rollNumber)
                {
                    if (age_preference[i] > age_preference[bestMatchIndex]) {
                        // Higher age preference, update best match
                        bestMatchIndex = i;
                    } else if (age_preference[i] == age_preference[bestMatchIndex]) {
                        // Age preference is the same, check interest count
                        if (interest_count[i] > interest_count[bestMatchIndex]) {
                            // Higher interest count, update best match, if even this is same ignore
                            bestMatchIndex = i;
                        }
                    }
                }
            }
            if(weights[max_index]==0) // no intersection nor age preference case
            {
                window.location.replace(`match.html?index=${-1}&user=${j}`); // give index as -1 to active no match version of match.html

            }
            else{
            window.location.replace(`match.html?index=${max_index}&user=${j}`); // pass the match's and user's studentjson index as url parameters for match.html
        } 
        })
        .catch(error => {
        console.error('Error:', error); // handle json data loading error
     });
        
}
