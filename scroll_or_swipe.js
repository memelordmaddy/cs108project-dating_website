// Fetch student data from student.json and display it dynamically
fetch('student.json')
.then(response => response.json())
.then(data => {
    const studentList = document.getElementById('student-list');

    data.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.innerHTML = `
            <h3>${student.Name}</h3>
            <p>Age: ${student.Age}</p>
            <p>Gender: ${student.Gender}</p>
            <p>Interests: ${student.Interests.join(', ')}</p>
            <p>Hobbies: ${student.Hobbies.join(', ')}</p>
            <img src="${student.Photo}" alt="Student Photo" style="width: 25%; height: auto;"> <br><br>
            <button onclick="acceptStudent('${student.id}')">Smash</button>
            <button onclick="rejectStudent('${student.id}')">Pass</button>
        `;
        studentList.appendChild(studentDiv);
    });
});

// Function to handle accepting a student
function acceptStudent(studentId) {
// Add your logic here
}

// Function to handle rejecting a student
function rejectStudent(studentId) {
// Add your logic here
}