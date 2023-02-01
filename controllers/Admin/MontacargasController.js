const conexion = require('../../Database/env')

exports.save = (req, resp)=>{
        const NumeroMontacargas = req.body.NumeroMontacargas;
        const Marca = req.body.Marca;
        const Modelo = req.body.Modelo;
        const Serie = req.body.Serie;
        const Estado = req.body.Estado;
        const EstadoF = req.body.EstadoF;
        const horometroI = req.body.horometroI;


    conexion.query('INSERT INTO Montacargas SET ?',{Numero:NumeroMontacargas, Marca:Marca, Modelo:Modelo, Serie:Serie, Estado:Estado, EstadoF:EstadoF, horometroI:horometroI}, (error,results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/');
        }
    })
}

exports.update = (req, resp)=> {
    const ID  = req.body.ID;
    const Numero = req.body.Numero;
    const Marca = req.body.Marca;
    const Modelo = req.body.Modelo;
    const Serie = req.body.Serie;
    const estado = req.body.estado;
    const horometroI = req.body.Horometro;
    conexion.query('UPDATE montacargas SET ? WHERE ID=?',[{numero:Numero, Marca:Marca, Modelo:Modelo, Serie:Serie, estado:estado, HorometroI:horometroI}, ID], (error,results)=>{
        if(error){
            console.log(error)
        }else{
            resp.redirect('/Administrador/Montacargas/');
        }
    })
}