
let fs = require('fs')
let data = fs.readFileSync('D:/Sgroup/BE/src/users.json','utf-8')
let users = JSON.parse(data)


const express = require('express');
const { error } = require('console');
const app = express();
const port = 3000;

// Tạo array  users


const checkAuthentication = (req,res,next) => {
    const accessToken = req.headers.authorization;
    console.log(accessToken !== undefined )
    if(accessToken) {
        console.log("middleware to authentication");
        req.user = accessToken;
        next()
    } else {
        res.send("user chua login")
    }
}

app.use(express.json());

app.use((req, res, next) => {
    console.log('Query:', req.query);
    console.log('Headers:', req.headers);
    next();
});

// app.get('/', (req, res) => {
//     res.send('Day la may cua trang');
// });

// GET tất cả users
app.get('/users',checkAuthentication,  (req, res) => {
    // users = JSON.parse(data)
    console.log('Query:', req.query);
    let filteredUsers = [...users];
    if (req.query.name) {
        filteredUsers = filteredUsers.filter(user => user.name.includes(req.query.name));
    }
    res.json(filteredUsers);
    // res.json(users);
});

// GET chi tiết user
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// POST user : Tạo user
app.post('/users', (req, res) => {
    console.log('Body:', req.body);
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    console.log(newUser)
    users.push(newUser);
    fs.writeFileSync('D:/Sgroup/BE/src/users.json',JSON.stringify(users))  
    res.status(201).json(newUser);
});

// PUT user : Cập nhật user
app.put('/users/:id', (req, res) => {
    console.log('Body:', req.body);
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { id: userId, ...req.body };
        res.json(users[userIndex]);
        fs.writeFileSync('D:/Sgroup/BE/src/users.json',JSON.stringify(users))  
    } else {
        res.status(404).send('User not found');
    }
});

// DELETE user: xóa user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    console.log(`Deleting user with id: ${userId}`);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
        fs.writeFileSync('D:/Sgroup/BE/src/users.json',JSON.stringify(users))  
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
