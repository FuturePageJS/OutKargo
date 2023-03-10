const conexion = require("../Database/env");

exports.save = (req, resp)=>{
    const Nombre1 = req.body.Nombre1;
    const Nombre2 = req.body.Nombre2;
    const Apellido1 = req.body.Apellido1;
    const Apellido2 = req.body.Apellido2;
    const TipoDoc = req.body.TipoDoc;
    const Telefono = req.body.Telefono;
    const Estado = req.body.Estado;
    const ID_Usuario = req.body.ID_Usuario;
    const ID_Centro = req.body.ID_Centro;
    const Asignado = 1;
    const Cargo = 4;

    conexion.query('INSERT INTO supervisor SET ?', {
        Nombre1:Nombre1,
        Nombre2:Nombre2,
        Apellido1:Apellido1,
        Apellido2:Apellido2,        
        TipoDoc:TipoDoc,
        Telefono:Telefono,
        Estado:Estado,
        ID_Centro:ID_Centro,
        ID_Usuario:ID_Usuario
    },(error, results)=>{
        if(error){
            console.log(error)
        }else{
            conexion.query('UPDATE usuarios SET ? WHERE  ID=?',[{
               Asignado:Asignado,
               Cargo:Cargo
            },ID_Usuario],(error, results)=>{
                if(error){
                    console.log(error)
                }else{
                    resp.redirect('/Administrador/Supervisor/');
                }
            })
        }
    })
}

exports.update = (req, resp)=>{
    const Nombre1 = req.body.Nombre1;
    const Nombre2 = req.body.Nombre2;
    const Apellido1 = req.body.Apellido1;
    const Apellido2 = req.body.Apellido2;
    const TipoDoc = req.body.TipoDoc;
    const Telefono = req.body.Telefono;
    const ID_Usuario = req.body.ID_Usuario;
    conexion.query('UPDATE supervisor SET ? WHERE ID=?', [{
        Nombre1:Nombre1,
        Nombre2:Nombre2,
        Apellido1:Apellido1,
        Apellido2:Apellido2,        
        TipoDoc:TipoDoc,
        Telefono:Telefono
    },[ID_Usuario] ],(error, results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/Supervisor/');
        }
    })
}

exports.config = (req, resp)=>{
    const Nombre1 = req.body.Nombre1;
    const Nombre2 = req.body.Nombre2;
    const Apellido1 = req.body.Apellido1;
    const Apellido2 = req.body.Apellido2;
    const TipoDoc = req.body.TipoDoc;
    const Telefono = req.body.Telefono;
    const Estado = req.body.Estado;
    const ID = req.body.ID;
    const ID_Usuario = req.body.idUsuario;
    const Documentonumero = req.body.Documentonumero;
    const claveUsuario = req.body.claveUsuario;
    const rolUsuario = req.body.rolUsuario;
    const estadoUsuario = req.body.estadoUsuario;
    const asignarUsuario = req.body.asignarUsuario;


    conexion.query('UPDATE supervisor SET ? WHERE ID=?', [{
        Nombre1:Nombre1,
        Nombre2:Nombre2,
        Apellido1:Apellido1,
        Apellido2:Apellido2,
        TipoDoc:TipoDoc,
        Telefono:Telefono,
        Estado:Estado
    },ID ],(error, results)=>{
        if(error){
            console.log(error)
        }else{
            conexion.query('UPDATE usuarios SET ? WHERE ID=?', [{
                Email:Documentonumero,
                Clave:claveUsuario
            },ID_Usuario ],(error, results)=>{
                if(error){
                    console.log(error)
                }else{
                    if (req.session.loggedin) {
                        if (req.session.Cargo == 4) {
                            conexion.query('SELECT * FROM usuarios Where ID=?',[req.session.ID],(error, usuario)=>{
                                if (error) {
                                   throw error
                                } else {
                                    conexion.query('SELECT * FROM supervisor where ID_Usuario=?',[req.session.ID],(error, supervisor)=>{
                                        if(error){
                                            throw error
                                        }else{
                                            resp.render('Supervisor/Config',{
                                                alert: true,
                                                alertTitle: "Editado correctamente.",
                                                alertMessage: "??Los datos fueron actualizados correctamente!",
                                                alertIcon: "success",
                                                showConfirmButton: true,
                                                timer: 1500,
                                                ruta: 'Supervisor/Config/',
                                                usuario:usuario,
                                                supervisor:supervisor
                                        })  
                                        }
                                    })
                                }
                            })
                        }else {
                            resp.render('Login',{
                                alert: true,
                                alertTitle: "Error",
                                alertMessage: "??Debes ser operador para continuar!",
                                alertIcon: "error",
                                showConfirmButton: true,
                                timer: 1500,
                                ruta: 'Login/'
                            })
                        }
                    }
                }
            })
        }       
    })
}
                