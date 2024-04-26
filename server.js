const express = require('express');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/register', (req, res) => {
    const { username, password, secret_question, secret_answer } = req.body;
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

        
        users.push(newUser);
        fs.writeFile('login.json', JSON.stringify(users, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log('User registered successfully');
            res.redirect('/login.html');
        });
    });
});

app.post('/studentjsonreg', (req, res) => {
    const formData = req.body;

    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let students = JSON.parse(data);

        students.push(formData);

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

app.get('*', (req, res) => {
    
    const requestedFile = req.url.endsWith('.html') ? req.url : '/login.html';
    const filePath = path.join(__dirname, requestedFile);

    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
