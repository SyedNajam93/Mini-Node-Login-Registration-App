const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const  bcrypt = require('bcryptjs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const User = require('./model/user.js');

//connecting to mongodb
mongoose.connect('mongodb://localhost/login', ()=>{
console.log('connected');
})





// Creating the register router/
app.post('/register', (req, res)=>{
 
const newUser = new User({
email: req.body.email,
password:req.body.password,
});

bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(newUser.password, salt,(err, hash)=> {
    if(err) return err;
    
    //setting the password to hash
    newUser.password = hash;
// saving the user to the database
newUser.save()
.then(userSaved=>{
res.send('Hey the user was saved');
})
.catch(err=>{
res.send(`the user was not saved bcz ${err}` );
});
});
});
});// end of register route




// creating the login route using findone method User= Model we created
app.post('/login', (req, res)=>{
User.findOne({email:req.body.email}).then(user=>{

if(user){
    bcrypt.compare(req.body.password,user.password,(err, matched)=>{
     if(err) throw err;

     if(matched){
         res.send('the user was able to login');
     }
     else{
         res.send('User was not able to login');
     }

    })
}
})
});









app.listen(4111);