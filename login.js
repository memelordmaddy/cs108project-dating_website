function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // document.getElementById("debugging").innerHTML= username + password;
    fetch('login.json')
        .then(response => response.json())
        .then(data => {
            var isValidUser = false; 
            for (var i = 0; i < data.length; i++) {
                if (data[i].username == username && data[i].password == password) {
                    isValidUser = true;
                    break;
                }
            }
            if (isValidUser) {
                window.location.replace("dating.html");
                console.log("Valid username");
            } else {
                    console.log("Invalid username or password");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

/*
return fetch('login.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('JSON file fetched successfully:', data);
    // You can perform further operations with the fetched data here
    return data;
})
.catch(error => {
    console.error('There was a problem fetching the JSON file:', error);
});
*/
}