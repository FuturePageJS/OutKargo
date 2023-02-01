const { Result } = require('express-validator');
const conexion = require('../../Database/env')
 
//Guardar
exports.save = (req, resp)=>{
    const ID_Centro = req.body.ID_Centro;
    const ID_Seccion = req.body.ID_Seccion;
    const ID_Montacargas = req.body.ID_Montacargas;
    const ID_Operador = req.body.ID_Operador;
    const ID_Supervisor  = req.body.ID_Supervisor;
    const ID_Mecanico  = req.body.ID_Mecanico ;
    const DESCRIPCION_DE_LA_FALLA = req.body.DESCRIPCION_DE_LA_FALLA;
    const REPARACION_REALIZADA = req.body.REPARACION_REALIZADA;
    const INSUMOS_Y_REPUESTOS_INSTALADOS = req.body.INSUMOS_Y_REPUESTOS_INSTALADOS;
    const FALLA_CORREGIDA = req.body.FALLA_CORREGIDA;
    const PROGRAMAR = req.body.PROGRAMAR;
    const PENDIENTE_POR = req.body.PENDIENTE_POR;
    const REFERENCIA = req.body.REFERENCIA;
    const DESCRIPCION = req.body.DESCRIPCION;
    const CANTIDAD = req.body.CANTIDAD;
    const OBSERVACIONES = req.body.OBSERVACIONES;
    const Estado =  req.body.Estado;
    const ID_Lista = req.body.ID_Lista;
        //Fecha y hora
        let FechaActual = new Date()
        console.log(FechaActual)
        Dia = FechaActual.getDate()
        Mes = FechaActual.getMonth()+1
        Año = FechaActual.getFullYear()
        if (FechaActual.getHours() > 12) {
            Hora = FechaActual.getHours() -12
        }else{
            Hora = FechaActual.getHours()   
        }   
        Minutos = FechaActual.getMinutes()
        if (FechaActual.getHours() > 12) {
            HoraCompleta = (Hora + ":" + Minutos + " " + "PM")
        }else{
            HoraCompleta = (Hora + ":" + Minutos + " " + "AM")
        }
        FechaCompleta = ( Año + "-" + Mes + "-" + Dia )
        const FechaI = FechaCompleta;
        const HoraF = HoraCompleta;

        conexion.query('INSERT INTO mantenimientocci SET ?',{
            ID_Centro:ID_Centro,
            ID_Seccion:ID_Seccion,
            ID_Montacargas:ID_Montacargas,
            ID_Operador:ID_Operador,
            ID_Supervisor:ID_Supervisor,
            ID_Mecanico:ID_Mecanico,
            ID_Lista:ID_Lista,
            FechaI:FechaI,
            HoraF:HoraF,
            DESCRIPCION_DE_LA_FALLA:DESCRIPCION_DE_LA_FALLA,
            REPARACION_REALIZADA:REPARACION_REALIZADA,
            INSUMOS_Y_REPUESTOS_INSTALADOS:INSUMOS_Y_REPUESTOS_INSTALADOS,
            FALLA_CORREGIDA:FALLA_CORREGIDA,
            PROGRAMAR:PROGRAMAR,
            PENDIENTE_POR:PENDIENTE_POR,
            REFERENCIA:REFERENCIA,
            DESCRIPCION:DESCRIPCION,
            CANTIDAD:CANTIDAD,
            OBSERVACIONES:OBSERVACIONES,
            Estado:Estado
        },(error,result)=>{
            if (error) {
                resp.render('Mecanico/',{
                    alert: true,
                    alertTitle: "Error.",
                    alertMessage: "¡El mantenimiento no se pudo registrar intentelo nuevamente",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'Mecanico/'
                })
            }else{
                conexion.query('UPDATE listaci SET ? Where ID=?',[{
                    Mantenimiento:1
            },[ID_Lista]],(error,result)=>{
                if (error) {
                    resp.render('Mecanico/',{
                        alert: true,
                        alertTitle: "Error.",
                        alertMessage: "¡El mantenimiento no se pudo registrar intentelo nuevamente",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Mecanico/'
                    })
                }else{
                    resp.render('Mecanico/',{
                        alert: true,
                        alertTitle: "Mantenimiento Registrado.",
                        alertMessage: "¡El mantenimiento fue registrado exitosamente",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Mecanico/'
                    })
                }
            })
        }
        })
}