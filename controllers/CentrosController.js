const conexion = require('../Database/env')

exports.save = (req, resp)=>{
        const nombre = req.body.Nombre;
        const estado = req.body.Estado;

    conexion.query('INSERT INTO centrost SET ?',{
        Nombre:nombre,
        estado:estado
    }, (error,results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/CentrosT/');
        }
    })
}

exports.update = (req, resp)=> {
    const id  = req.body.ID;
    const nombre = req.body.Nombre;
    const estado = req.body.Estado;
    conexion.query('UPDATE centrosT SET ? WHERE ID=?',[{Nombre:nombre, Estado:estado}, id], (error,results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/CentrosT/');
        }
    })
}