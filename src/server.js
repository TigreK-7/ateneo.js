var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config');
var badyParser = require("body-parser");

const email = require("./servidor/email");
const contacto = require("./servidor/contacto");

var app = express();
app.set('port',(process.env.PORT || 3000));

app.use('/static', express.static('dist'));
app.use(badyParser.json());
app.use(badyParser.urlencoded({extended:true}));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

const oEmail = new email({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    "auth":{
        "user":"kevinsanabria5b@gmail.com",
        "pass":"toii eqxx duvw zedz"
    }
});

const oContacto = new contacto({
host:"localhost",
user:"desarrollo",
password:"desarrollo",
database:"desarrollo"
});


app.get('/',function(req,res,next){
    res.send('Ateneo');
});

app.post('/api/contacto',function(req, res, next){
 let email={
    from:"admin@usuario.com.mx",
    to:"contacto@admin.com.mx",
    subject:"Nuevo Mensaje de usuario",
    html:`
    <div>
    <p>Correo: ${req.body.c}</p>
    <p>Nombre: ${req.body.n}</p>
    <p>Mensaje: ${req.body.m}</p>
    </div>
    `
 };
    oContacto.agregarUsuario(req.body.n,req.body.c);

 oEmail.enviarCorreo(email);
 res.send("ok");
});

app.listen(app.get('port'),()=>{
    console.log('servidor activo');
})
