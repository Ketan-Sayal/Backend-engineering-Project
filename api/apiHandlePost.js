const express  = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/login', (req, res)=>{
    const {username, password} = req.body;
    fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8',(err, data)=>{
        if(err){
           return res.status(500).json({message: err});
        }
        const users = JSON.parse(data);
        const user = users.find(user=>user.username === username && user.password === password);
        if(user){
            res
            .status(304)
            .cookie("userData", user)
            .redirect('/home');
        }else{

            res.status(304).redirect('/register');
        }
    })
})


router.post('/signup', (req, res)=>{
    const {username, password, Email} = req.body;
    fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({message: 'Server Error'});
         }
         const users = JSON.parse(data);
         const user = users.find(user=>user.username === username);
         if(user){
             res.status(402).json({message: 'User already registered'})
         }else{
            const id = users.length;
            users.push({id, username, password, email:Email});
            fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users), (err)=>{
                if(!err){
                    res
                    .status(304)
                    .cookie("userData", {id, username, password, email:Email})
                    .redirect('/home');
                }else{
                    res.status(500).json({message: err});
                }
            })
         }
    });
})


module.exports = router;