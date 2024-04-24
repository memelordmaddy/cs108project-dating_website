function findMatch(){
        const intandhob = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const rollNumber = document.getElementById('rollNumber').value;
        var preferredGender = document.getElementById("preferredGender").value;
        var ageGroup = document.getElementById("ageGroup").value;
        if(ageGroup == "46+"){
            lowerBound = 46;
            upperBound = Infinity;
        }
        else if(ageGroup == "no_preference"){
            lowerBound = 0;
            upperBound = Infinity;
        }
        else{
        var ageBounds = ageGroup.split('-');
        var lowerBound = parseInt(ageBounds[0]);
        var upperBound = parseInt(ageBounds[1]);
        }
        //document.getElementById('debugging').innerHTML = rollNumber;
        checkboxes.forEach(checkbox => {
            intandhob.push(checkbox.value);
        });
        fetch('student.json')
        .then(response => response.json())
        .then(data => {
            interest_count= [];
            for (var i = 0; i < data.length; i++) {
                var count=0;
                for (var j = 0; j < intandhob.length; j++) {
                    if(data[i].Interests.includes(intandhob[j])){
                        count++;
                    }
                }
                interest_count.push(count);
            }
            hobby_count=[];
            for (var i = 0; i < data.length; i++) {
                var count=0;
                for (var j = 0; j < intandhob.length; j++) {
                    if(data[i].Hobbies.includes(intandhob[j])){
                        count++;
                    }
                }
                hobby_count.push(count);
            }
            age_preference=[];
            for(var i=0; i<data.length; i++)
            {
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
                    j=i;
                    break;
                }
            }
            weights=[]
            for(var i=0; i<data.length; i++)
            {   if(data[i]["Gender"]==preferredGender || preferredGender=="no_preference")
                    weights.push(interest_count[i]+ 0.5*hobby_count[i]);
                else
                    weights.push(0);
            }
            max=0;
            max_index=0;
            for(var i=0; i<data.length; i++)
            {
                if(weights[i]>max && data[i]["IITB Roll Number"]!=rollNumber )
                {
                    max=weights[i];
                    max_index=i;
                }
            }
            if(weights[max_index]==0)
            {
                window.location.replace(`match.html?index=${-1}&user=${j}`);

            }
            else{
            window.location.replace(`match.html?index=${max_index}&user=${j}`);}
            //window.location.replace(`match.html?index=${max_index}`); 
            //foundMatch(max_index);
        })
        .catch(error => {
        console.error('Error:', error);
     });
        
}
