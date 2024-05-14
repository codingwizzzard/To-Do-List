const express = require('express');
const app = express();
const port = 1303;

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

let userData = [
    { taskId: '1', name: 'Task 1' },
    { taskId: '2', name: 'Task 2' }
];

app.get('/', (req, res) => {
    return res.render('form', {
        user: userData
    });
});

app.post('/insertData', (req, res) => {
    let editId = req.body.editId;

    const { taskId, name } = req.body;
    if (editId) {
        userData.forEach((data) => {
            if (data.taskId == editId) {
                data.name = name;
            }
        });
        return res.redirect('/');
    }

    let obj = {
        taskId: req.body.taskId,
        name: req.body.name,
        completed: false
    };
    userData.push(obj);
    return res.redirect('back');
});

app.get('/deleteData', (req, res) => {
    let taskId = req.query.taskId;
    userData = userData.filter((val) => val.taskId != taskId);
    console.log(userData);
    return res.redirect('back');
});

app.get('/completeTask', (req, res) => {
    let taskId = req.query.taskId;
    let task = userData.filter((val) => val.taskId == taskId);
    if (task.length > 0) {
        task[0].completed = true;
    }
    return res.redirect('/');
});

app.get('/editData', (req, res) => {
    let taskId = req.query.taskId;
    let data = userData.filter((val) => val.taskId == taskId);
    if (data.length > 0) {
        return res.render('edit', { task: data[0] });
    } 
});

app.post('/updateData', (req, res) => {
    let editId = req.body.editId;

    const { taskId, originalTaskId, name } = req.body;
    if (editId) {
        let task = userData.filter((data) => data.taskId == originalTaskId);
        if (task.length > 0) {
            task[0].taskId = taskId;
            task[0].name = name;
        }
        return res.redirect('/');
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server is not starting on port");
        return false;
    }
    console.log("Server started at http://localhost:" + port);
});