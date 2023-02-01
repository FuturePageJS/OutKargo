const conexion = require('../../Database/env')

exports.save = (req, resp)=>{
        const Documento = req.body.Documento;
        const Clave = req.body.Clave;
        const Cargo = req.body.Cargo;
        const Estado = req.body.Estado;
        const Asignado = req.body.Asignado;

    conexion.query('INSERT INTO usuarios SET ?',{email:Documento, clave:Clave, cargo:Cargo, estado:Estado, Asignado:Asignado}, (error,results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/Usuarios/');
        }
    })
}

exports.update = (req, resp)=> {
    const id  = req.body.id;
    const Documento = req.body.Documento;
        const Clave = req.body.Clave;
        const Estado = req.body.Estado;
    conexion.query('UPDATE usuarios SET ? WHERE ID=?',[{email:Documento, clave:Clave, estado:Estado}, id], (error,results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/Usuarios/');
        }
    })
}