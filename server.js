const express = require('express')
const app = express()
const Users = require('./db').Users
const spawn = require("child_process").spawn;

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('Server started');
})


app.post('/login',(req,res)=>{
    if(req.body.pass)
    {
        Users.findOne({
            where:{
                id: req.body.pass
            }
        }).then((user)=>{
            if(!user)
            {
                res.send('No such user');
            }
            var aId = user.aadharId;
            let filePath = './data/'+req.body.key;
            
            const pythonProcess = spawn('python',['decrypt_n_save.py', aid]);
            pythonProcess.stdout.on('data', function(data) {
                res.send('101010');
            } )
        })
    }
})

const host = '0.0.0.0'

app.listen(process.env.PORT||8080,host,()=>{
    console.log("server started at port 8080");
})