let express = require('express')
let app = express();
let fs = require('fs')
let students = require('./jsondata.json');
let file=require('./file')
app.use(express.json());




console.log(file)
fs.readFile('./file.js','utf-8',(err,text)=>{
    if(err)
    {
        console.error(err);
        return;
    }
    console.log(text)

})
app.get('/', (req, res) => {
    res.status(200).send({ data: students })
})
app.post('/login', (req, res) => {
    //  let data=req.body;     //simple way to understand how req.body work
    //  console.log(data)
    res.status(200).send({ msg: req.body })
    console.log(req.body)
});
let bigData = students;
app.post('/api/post', (req, res) => {

    let user = {
        id: students.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address
    }
    bigData.push(user)
    res.status(200).send({ dataa: students })
    console.log(user.email)


//hbdfhsdkj
    // fs.writeFile('./students.json', JSON.stringify(bigData), err => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('Data written to file');
    //   });
})
app.put('/api/put/:id', (req, res) => {
    console.log("first")
    const id = req.params.id;
    const { first_name, last_name, email, gender, ip_address } = req.body;

    const student = students?.find(student => student.id === Number.parseInt(id));
    if (!student) {
        return res.status(404).send('Student not found');
    }

    student.first_name = first_name;
    student.last_name = last_name;
    student.email = email;
    student.gender = gender;
    student.ip_address = ip_address;

    fs.writeFile(`${__dirname}/jsondata.json`, JSON.stringify(students), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File ${filePath} has been updated.`);
        }
      });

    console.log(student);
    return res.status(200).send('Student updated successfully');
});
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id
    const index = students.findIndex((student) => {
        return (student.id === Number.parseInt(id))
    })
    if (index > 0) {
        const std = students[index]
        students.splice(index)
        
       res.status(200).send("Deleted successfuly")
       

    }
    else{
        res.status(400)
    }




})
 


module.exports = app;

