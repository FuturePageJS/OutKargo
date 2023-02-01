/* INVOCAR EXPRESS */
const { json } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');


app.use(express(json))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//RUTAS
const OperadorRouter = require('./routes/OperadorRoutes')
const SupervisorRouter = require('./routes/SupervisorRoutes')
const MecanicoRouter = require('./routes/MecanicoRoutes')
const AdministradorRouter = require('./routes/AdministradorRoutes')
const UsuarioRouter = require('./routes/UsuarioRouter')
//DEFINIR LAS RUTAS
/* PRINCIPAL */
app.get('/',(req, res)=>{
    res.render('index')
})
/* SOPORTE */
app.get('/Soporte/',(req, res)=>{
	res.render('Registro')
})

app.use('/Operador/',OperadorRouter)
app.use('/Supervisor/',SupervisorRouter)
app.use('/Mecanico/',MecanicoRouter)
app.use('/Administrador/',AdministradorRouter)
app.use('/Login/',UsuarioRouter)
/* CREAR ASESOR */

/* CARGAR ARCHIVOS CSS */
app.use(express.static('public'));

app.listen(5000, ()=>{
    console.log("SERVER corriendo en http://localhost:5000")
})