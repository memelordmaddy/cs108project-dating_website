const express = require('express');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(__dirname));

// Route for handling user registration
app.post('/register', (req, res) => {
    const { username, password, secret_question, secret_answer } = req.body;
    // Read existing data from login.json
    fs.readFile('login.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const users = JSON.parse(data);
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            res.redirect('/register.html?error=Username already exists');
            return;
        }

        const newUser = {
            username,
            password,
            secret_question,
            secret_answer,
            "match": "none"
        };

        // Add the new user to the existing users array
        users.push(newUser);

        // Write the updated data back to login.json
        fs.writeFile('login.json', JSON.stringify(users, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log('User registered successfully');
            res.redirect('/login.html'); // Redirect to login page
        });
    });
});

app.post('/submitForm', (req, res) => {
    const formData = req.body;

    // Read existing data from student.json
    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let students = JSON.parse(data);
        // Append the new form data to the existing array
        students.push(formData);

        // Write the updated data back to student.json
        fs.writeFile('student.json', JSON.stringify(students, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log('Form data appended successfully');
            res.send('Form submitted successfully');
        });
    });
});


// Catch-all route to serve HTML files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, req.url));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
