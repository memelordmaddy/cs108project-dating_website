function findMatch(){
        const intandhob = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const rollNumber = document.getElementById('rollNumber').value;
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
            var j=69;
            for (var i = 0; i < data.length; i++) {
                if(data[i]["IITB Roll Number"]==rollNumber){
                    j=i;
                    break;
                }
            }
            weights=[]
            for(var i=0; i<data.length; i++)
            {
                weights.push(interest_count[i]+ 0.5*hobby_count[i]);
            }
            max=0;
            max_index=0;
            for(var i=0; i<data.length; i++)
            {
                if(weights[i]>max && data[i]["IITB Roll Number"]!=rollNumber)
                {
                    max=weights[i];
                    max_index=i;
                }
            }
            //document.getElementById('match').innerHTML = data[max_index].Name;
            window.location.replace(`match.html?index=${max_index}&user=${j}`);
            //window.location.replace(`match.html?index=${max_index}`); 
            //foundMatch(max_index);
        })
        .catch(error => {
        console.error('Error:', error);
     });
        
}
