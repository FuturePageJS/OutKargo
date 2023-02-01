//1. Crear a depencia de express
const { query } = require('express');
const express = require('express');
const { Result } = require('express-validator');
const conexion = require('../Database/env')
//2. Traer el controlador

//3. Definir la variable del router
const router = express.Router();

//4. Crear las rutas

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/Salir', (req, res) => {
    if (req.session.loggedin) {
        req.session.destroy(()=>{
            res.render('login',{
                alert: true,
                alertTitle: "Cerrando Sesión",
                alertMessage: "Hemos cerrado tu sesión",
                alertIcon: "success",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login'
            })
        })
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login'
		})
	}
});

router.post('/Validar', (req, res)=>{
    const Email = req.body.email
    const Password = req.body.clave
    console.log(Email+" - "+ Password)
    if (Email && Password) {
        conexion.query('SELECT * FROM usuarios WHERE Email=?',[Email],(error, results)=>{
            //MOSTRAR LOS DATOS TRAIDOS
            if (!results.length == 0) {
                console.log("Email: "+ results[0].Email + " - " + "Clave: "+ results[0].Clave + " - " +  "Cargo: " + results[0].Cargo + " - " + "Estado: "+ results[0].Estado)
            }
            //MOSTRAR ERROR SI NO LLEGA NADA
            if (results.length == 0){
                res.render('login',{
                    alert: true,
                    alertTitle: "Error!",
                    alertMessage: "El usuario ingresado no existe",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
            }else{
                // ERROR DATOS
                if (results.length == 0 || !(Password == results[0].Clave)) {
                    res.render('login',{
                        alert: true,
                        alertTitle: "Error!",
                        alertMessage: "Correo y/o Contraseña son incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }
                //ERROR CARGO VISITANTE
                if (results[0].Cargo == 1 || !results[0].Estado == 1 ) {
                    res.render('login',{    
                        alert: true,
                        alertTitle: "¡ERROR!",
                        alertMessage: "Tu usuario es visitante contacta a un administrador para asignarte un cargo.",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'login'
                    })
                }
                //ERROR USUARIO DESACTIVA
                if (results[0].Estado == 2) {
                    res.render('login',{
                        alert: true,
                        alertTitle: "¡ERROR!",
                        alertMessage: "Tu usuario se encuentra desactivado contacta con un administrador si crees que es un error.",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'login'
                    })
                }
                //OPERADOR
                if (results[0].Cargo == 2 && results[0].Estado == 1) {
                    req.session.loggedin = true;
                    req.session.ID = results[0].ID
                    req.session.Cargo = results[0].Cargo
                    res.render('login',{
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡Iniciaste sesión como Operador!",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'Operador/'
                    });
                }
                //MECANICO
                if (results[0].Cargo == 3 && results[0].Estado == 1) {
                    req.session.loggedin = true;
                    req.session.ID = results[0].ID
                    req.session.Cargo = results[0].Cargo
                    res.render('login',{
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡Iniciaste sesión como Mecanico!",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'Mecanico/'
                    });
                }
                //SUPERVISOR
                if (results[0].Cargo == 4 && results[0].Estado == 1) {
                    req.session.loggedin = true;
                    req.session.ID = results[0].ID
                    req.session.Cargo = results[0].Cargo
                    res.render('login',{
                        alert: true,
                        alertTitle: "Conexión exitosa", 
                        alertMessage: "¡Iniciaste sesión como supervisor!",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'Supervisor/'
                    });
                }
                //ADMINISTRADOR
                if (results[0].Cargo == 5 && results[0].Estado == 1) {
                    req.session.loggedin = true;
                    req.session.ID = results[0].ID
                    req.session.Cargo = results[0].Cargo
                    res.render('login',{
                        alert: true,
                        alertTitle: "Conexión exitosa", 
                        alertMessage: "¡Iniciaste sesión como Administrador!",
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'Administrador/'
                    });
                }
            }
        })
    }else{
        res.send('El correo o la contraseña se encuentran vacios');
    }
})
    
    
//5. Exportar las rutas
module.exports = router