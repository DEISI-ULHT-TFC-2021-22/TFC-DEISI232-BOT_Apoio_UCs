require('dotenv').config();

//***********************************************************************************************\\
//   https://discord.com/oauth2/authorize?client_id=904855826647379969&scope=bot&permissions=8    \\
//*************************************************************************************************\\

const express = require("express");
//const bodyParser = require("body-parser");
const db = require('../database/_database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');


app.get("/login", async function (req, res){
    res.render('/login');
});


app.get("/", async function (req, res) {

    try {
        const { email, password } = req.body;
        //const user = await User.find({ email });
        if (user.length > 0 ) {
            const authResult = await bcrypt.compare(password, user[0].password);
            if (authResult) {
                const token = jwt.sign({ id: user[0].id}, 'secretsecret', { expiresIn: '24h' });
                res.cookie('token', token);
                res.status(200).render('/main-menu')
            } else {
                res.send('Auth Failed');
            }
        }
    } catch (err) {
        res.send('Auth Failed');
    }
    
});


app.get("/main-menu", async function(req, res){
    db.query('select * from unidades_curriculares', (error, results) => {
        if (error) {
          throw error
        }
        //res.status(200).json(results.rows);
        res.status(200).render("main-menu", { ucs: results.rows });
      });



    //res.sendFile(__dirname + "/main-menu.html");
});

app.get("/uc-details", function(req, res){
    res.render("uc-details");
    //res.sendFile(__dirname + "/uc-details.html");
});

app.listen(process.env.PORT || 80, function(){
    db.connect();
    console.log("Server started on port 3000");
});