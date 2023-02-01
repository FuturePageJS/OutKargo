const conexion = require("../Database/env");

exports.save = (req, resp)=>{
    const Nombre = req.body.Nombre;
    const Estado = req.body.Estado;
    const ID_CentrosT = req.body.ID_CentrosT;

    conexion.query('INSERT INTO seccionest SET ?', {
        Nombre:Nombre,
        ID_CentrosT:ID_CentrosT,
        Estado:Estado
    },(error, results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Supervisor/Secciones/');
        }
    })
}

exports.update = (req, resp)=>{
    const Nombre = req.body.Nombre;
    const Estado = req.body.Estado;
    const ID_CentrosT = req.body.ID_CentrosT;
    const ID = req.body.ID;

    conexion.query('UPDATE seccionest SET ? WHERE ID=?', [{
        Nombre:Nombre,
        ID_CentrosT:ID_CentrosT,
        Estado:Estado
    },ID ],(error, results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Supervisor/Secciones/');
        }
    })
}
