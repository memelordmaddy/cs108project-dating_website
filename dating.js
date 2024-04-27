function findMatch(){
    const intandhob = []; // array to store interests and hobbies
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked'); //getting user's input
    const rollNumber = document.getElementById('rollNumber').value; 
    var preferredGender = document.getElementById("preferredGender").value;
    var ageGroup = document.getElementById("ageGroup").value;
    const urlParams = new URLSearchParams(window.location.search);
    const loginid = parseInt(urlParams.get('user'));
    if(ageGroup == "46+"){
        lowerBound = 46; // setting appropriate upper bound
        upperBound = Infinity;
    }
    else if(ageGroup == "no_preference"){
        lowerBound = 0; // setting appropiate bounds
        upperBound = Infinity;
    }
    else{ // splitting the string
    var ageBounds = ageGroup.split('-');
    var lowerBound = parseInt(ageBounds[0]);
    var upperBound = parseInt(ageBounds[1]);
    }
    checkboxes.forEach(checkbox => {
        intandhob.push(checkbox.value); // storing check box values
    });
    fetch('student.json')
    .then(response => response.json())
    .then(data => {
        interest_count= [];
        var length = data.length;
        for (var i = 0; i < data.length; i++) {
            var count=0;
            for (var j = 0; j < data[i].Interests.length; j++) {     // checking for intests intersection            
                if( intandhob.includes(data[i].Interests[j])){
                    count++;
                }
                else
                {
                    count -= 0.05;
                }
            }
            interest_count.push(count);
        }
        hobby_count=[];
        for (var i = 0; i < data.length; i++) {
            var count=0;
            for (var j = 0; j < data[i].Hobbies.length; j++) { // checking for hobby intersection
                if(intandhob.includes(data[i].Hobbies[j])){
                    count++;
                }
                else
                {
                    count -= 0.05;
                }
            }
            hobby_count.push(count);
        }
        age_preference=[];
        for(var i=0; i<data.length; i++)
        { // checking for age preference match
            if(data[i]["Age"]>=lowerBound && data[i]["Age"]<=upperBound)
            {
                age_preference.push(1);
            }
            {
                age_preference.push(0);
            }
        }
        var j=data.length;
        for (var i = 0; i < data.length; i++) {
            if(data[i]["IITB Roll Number"]==rollNumber){
                j=i; // getting user's studentjson index
                break;
            }
        }
        weights=[]
        for(var i=0; i<data.length; i++) // calculating weights for each student json elements
        {   if(data[i]["Gender"]==preferredGender || preferredGender=="no_preference")
                weights.push(interest_count[i]+ 0.5*hobby_count[i]);
            else
                weights.push(0);
        }
        max=0;
        max_index=0;
        for(var i=0; i<data.length; i++)
        { // finding best match
            if(weights[i]>max && data[i]["IITB Roll Number"]!=rollNumber )
            {
                max=weights[i];
                max_index=i;
            }
        }
        if(weights[max_index]==0)
        {  // handiling the no match case
            window.location.replace(`match.html?index=${-1}&user=${j}`);

        }
        else{ // sending the match's id and user's id as url parameters
        window.location.replace(`match.html?index=${max_index}&user=${j}`);}

    })
    .catch(error => {
    console.error('Error:', error);
 });
    
}
