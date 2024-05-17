// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// const user = [
//     {
//         id:1,
//         name: 'Trang',
//         age: 13,
//         status: "single"
//     },
//     {
//         id:2,
//         name: 'Nhun',
//         age: 17,
//         status: "single"
//     },
//     {
//         id:3,
//         name: 'Tran',
//         age: 14,
//         status: "single"
//     }
// ]
// // query : "?" => query pragram
// //paragram: truyền tham số
// app.get('/user', (req, res) => {
//     console.log(req.query)
//     user.sort((a,b) => b.id - a.id)
//     res.send(user)
// })
// app.get('/user/:id', (req, res) => {
//     console.log(req.params)
//     user.filter(user => user.id == parseInt(req.params.id))
//     res.send(user)
// })


const express = require('express');
const app = express();
const port = 3000;

// Tạo array  users

app.use(express.json());

app.use((req, res, next) => {
    console.log(req);
    console.log('Query:', req.query);
    console.log('Headers:', req.headers);
    next();
});

app.get('/', (req, res) => {
    res.send('Day la may cua trang');
});

// GET tất cả users
app.get('/users', (req, res) => {
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
    } else {
        res.status(404).send('User not found');
    }
});

app.get('user/ngu',(req,res) => {
    res.send('Vao day')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
