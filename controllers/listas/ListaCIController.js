const conexion = require('../../Database/env')
 
//Guardar
exports.save = (req, resp)=>{
    const ID = req.body.id;
    const ID_Operador = req.body.ID_Operador;
    const ID_Supervisor = req.body.ID_Supervisor;
    const ID_CentrosT = req.body.ID_CentrosT;
    const ID_SeccionesT  = req.body.ID_SeccionesT ;
    const ID_Montacargas  = req.body.ID_Montacargas ;
    const Turno = req.body.Turno;
    const Estado  = req.body.Estado ;
    const EstadoV = req.body.EstadoV;
    const Carnet_De_Servicios_Medicos = req.body.Carnet_De_Servicios_Medicos;
    const Consume_Medicamentos = req.body.Consume_Medicamentos;
    const Casco  = req.body.Casco ;
    const Gafas_De_Proteccion  = req.body.Gafas_De_Proteccion ;
    const Protectores_Auditivos = req.body.Protectores_Auditivos;
    const Proteccion_Respiratoria = req.body.Proteccion_Respiratoria;
    const Guantes = req.body.Guantes;
    const Uniforme  = req.body.Uniforme;
    const Botas_Punta_De_Acero  = req.body.Botas_Punta_De_Acero ;
    const Limpieza = req.body.Limpieza; 
    const Presencia_De_Derrames = req.body.Presencia_De_Derrames;
    const Obstaculos = req.body.Obstaculos;
    const Pintura_Y_Limpieza_Exterior  = req.body.Pintura_Y_Limpieza_Exterior ;
    const Cojineria_De_La_Silla  = req.body.Cojineria_De_La_Silla;
    const Cinturon_De_Seguridad = req.body.Cinturon_De_Seguridad;
    const Espejos_Laterales = req.body.Espejos_Laterales;
    const Pedales_De_Freno  = req.body.Pedales_De_Freno ;
    const Freno_De_Mano = req.body.Freno_De_Mano;
    const Pedales_De_Aceleracion = req.body.Pedales_De_Aceleracion;
    const Control_De_Marcha_Adelante_Y_Atras  = req.body.Control_De_Marcha_Adelante_Y_Atras ;
    const Estado_General = req.body.Estado_General;
    const Ruedas_Macizas = req.body.Ruedas_Macizas;
    const LLantas_Neumaticas = req.body.LLantas_Neumaticas;
    const Horquillas = req.body.Horquillas;
    const Carro_Porta_Horquillas_Estado = req.body.Carro_Porta_Horquillas_Estado;
    const Carro_Porta_Horquillas_Engrase = req.body.Carro_Porta_Horquillas_Engrase;
    const Cadenas_De_Levante_Estado = req.body.Cadenas_De_Levante_Estado;
    const Cadenas_De_Levante_Tension = req.body.Cadenas_De_Levante_Tension;
    const Cilindros_De_Levante_Central_Estado = req.body.Cilindros_De_Levante_Central_Estado;
    const Cilindros_De_Levante_Central_Fugas = req.body.Cilindros_De_Levante_Central_Fugas;
    const Cilindros_De_Levante_Laterales_Estado = req.body.Cilindros_De_Levante_Laterales_Estado;
    const Cilindros_De_Levante_Laterales_Fugas = req.body.Cilindros_De_Levante_Laterales_Fugas;
    const Cilindros_De_Direccion_Estado = req.body.Cilindros_De_Direccion_Estado;
    const Cilindros_De_Direccion_Fugas = req.body.Cilindros_De_Direccion_Fugas;
    const Cilindros_De_Inclinacion_Estado = req.body.Cilindros_De_Inclinacion_Estado;
    const Cilindros_De_Inclinacion_Fugas = req.body.Cilindros_De_Inclinacion_Fugas;
    const Terminales_De_Direccion_Estado = req.body.Terminales_De_Direccion_Estado;
    const Terminales_De_Direccion_Fugas = req.body.Terminales_De_Direccion_Fugas;
    const Mangueras_Y_Tuberia_Del_Sistema_Hidraulico = req.body.Mangueras_Y_Tuberia_Del_Sistema_Hidraulico;
    const Palancas_De_Mando_Y_Control_Hidraulico = req.body.Palancas_De_Mando_Y_Control_Hidraulico;
    const Principal = req.body.Principal;
    const Parqueo = req.body.Parqueo;
    const Pito_De_Bocina = req.body.Pito_De_Bocina;
    const Alarma_De_Señal_De_Reversa = req.body.Alarma_De_Señal_De_Reversa;
    const Strober_Luz_Estroboscopica = req.body.Strober_Luz_Estroboscopica;
    const Luces_Direccionales = req.body.Luces_Direccionales;
    const Luces_Del_Freno = req.body.Luces_Del_Freno;
    const Luces_Marcha_Delante = req.body.Luces_Marcha_Delante;
    const Luces_Marcha_Atras = req.body.Luces_Marcha_Atras; 
    const Extintor_De_Incendios = req.body.Extintor_De_Incendios;
    const Liquido_Refrigerante_Del_Radiador = req.body.Liquido_Refrigerante_Del_Radiador;
    const Electrolito_De_La_Bateria = req.body.Electrolito_De_La_Bateria;
    const Liquido_De_Frenos = req.body.Liquido_De_Frenos;
    const Aceite_De_Motor = req.body.Aceite_De_Motor;
    const Aceite_Del_Sistema_Hidraulico = req.body.Aceite_Del_Sistema_Hidraulico;
    const Aceite_De_La_Caja_Automatica = req.body.Aceite_De_La_Caja_Automatica;
    const Aceite_De_Transmision = req.body.Aceite_De_Transmision;
    const Combustible = req.body.Combustible;
    const Horometro = req.body.Horometro;
    const Nivel_De_Combustible = req.body.Nivel_De_Combustible;
    const Presion_Aceite_De_Motor = req.body.Presion_Aceite_De_Motor;
    const Temperatura_Motor = req.body.Temperatura_Motor;
    const Nivel_Liquido_De_Frenos  = req.body.Nivel_Liquido_De_Frenos; 
    const Frenos_Neumaticos = req.body.Frenos_Neumaticos;
    const Nivel_Aceite_Del_Sistema_Hidraulico = req.body.Nivel_Aceite_Del_Sistema_Hidraulico;
    const Estado_De_La_Bateria = req.body.Estado_De_La_Bateria;
    const Estado_De_Los_Bornes_De_La_Bateria = req.body.Estado_De_Los_Bornes_De_La_Bateria;
    const Nivel_De_Electrolito_De_La_Bateria = req.body.Nivel_De_Electrolito_De_La_Bateria;
    const Voltaje_De_La_Bateria = req.body.Voltaje_De_La_Bateria;
    const Cables_De_La_Bateria = req.body.Cables_De_La_Bateria;
    const Estado_Cilindro_De_Gas = req.body.Estado_Cilindro_De_Gas;
    const Soporte_De_Aseguramiento_Del_Cilindro = req.body.Soporte_De_Aseguramiento_Del_Cilindro;
    const Conexiones_Y_Racores = req.body.Conexiones_Y_Racores;
    const Manguera = req.body.Manguera;
    const Llave_De_Paso = req.body.Llave_De_Paso;
    const Valvula_De_Retencion = req.body.Valvula_De_Retencion;
    const Filtro_Del_Sistema = req.body.Filtro_Del_Sistema;
    const Tapa_De_Tanque_De_Combustible = req.body.Tapa_De_Tanque_De_Combustible;
    const Estado_Del_Tanque_De_Combustible = req.body.Estado_Del_Tanque_De_Combustible;
    const Nivel_De_Combustible2 = req.body.Nivel_De_Combustible2;
    const Filtro_De_Aire = req.body.Filtro_De_Aire;
    const Filtro_De_Combustible = req.body.Filtro_De_Combustible;
    const Filtro_De_Hidraulico = req.body.Filtro_De_Hidraulico;
    const HorometroI = req.body.HorometroI;
    const HorometroF  = req.body.HorometroF;
    const HorometroVa = (HorometroI-10+20);
    console.log(HorometroVa);
    const EstadoF = req.body.EstadoF;
    const Mantenimiento = req.body.Mantenimiento;   
    const Observaciones_Generales  = req.body.Observaciones_Generales ;
    //Condiciones
    const ConsecutivoCondiciones = req.body.ConsecutivoCondiciones;
    const DescripcionCondiciones = req.body.DescripcionCondiciones;
    //Solicitud
    const ConsecutivoSolicitud = req.body.ConsecutivoSolicitud;
    const DescripcionSolicitud = req.body.DescripcionSolicitud;
    const ID_ListaCI = req.body.ID_ListaCI;
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

    //Si el horometro final llega vacio
    if (HorometroF == "") {
        conexion.query('INSERT INTO listaci SET ?',{
            ID_Operador:ID_Operador,
            ID_Supervisor:ID_Supervisor,
            ID_CentrosT:ID_CentrosT,
            ID_SeccionesT:ID_SeccionesT,
            ID_Montacargas:ID_Montacargas,
            Fecha:FechaCompleta,
            Turno:Turno,
            Estado:Estado,
            EstadoV:EstadoV,
            Carnet_De_Servicios_Medicos:Carnet_De_Servicios_Medicos,
            Consume_Medicamentos:Consume_Medicamentos,
            Casco:Casco,
            Gafas_De_Proteccion:Gafas_De_Proteccion,
            Protectores_Auditivos:Protectores_Auditivos,
            Proteccion_Respiratoria:Proteccion_Respiratoria,
            Guantes:Guantes,
            Uniforme:Uniforme,
            Botas_Punta_De_Acero:Botas_Punta_De_Acero,
            Limpieza:Limpieza,
            Presencia_De_Derrames:Presencia_De_Derrames,
            Obstaculos:Obstaculos,
            Pintura_Y_Limpieza_Exterior:Pintura_Y_Limpieza_Exterior,
            Cojineria_De_La_Silla:Cojineria_De_La_Silla,
            Cinturon_De_Seguridad:Cinturon_De_Seguridad,
            Espejos_Laterales:Espejos_Laterales,
            Pedales_De_Freno:Pedales_De_Freno,
            Freno_De_Mano:Freno_De_Mano,
            Pedales_De_Aceleracion:Pedales_De_Aceleracion,
            Control_De_Marchas_Adelante_Y_Atras:Control_De_Marcha_Adelante_Y_Atras,
            Estado_General:Estado_General,
            Ruedas_Macizas:Ruedas_Macizas,
            LLantas_Neumaticas:LLantas_Neumaticas,
            Horquillas:Horquillas,
            Carro_Porta_Horquillas_Estado:Carro_Porta_Horquillas_Estado,
            Carro_Porta_Horquillas_Engrase:Carro_Porta_Horquillas_Engrase,
            Cadenas_De_Levante_Estado:Cadenas_De_Levante_Estado,
            Cadenas_De_Levante_Tension:Cadenas_De_Levante_Tension,
            Cilindros_De_Levante_Central_Estado:Cilindros_De_Levante_Central_Estado,
            Cilindros_De_Levante_Central_Fugas:Cilindros_De_Levante_Central_Fugas,
            Cilindros_De_Levante_Laterales_Estado:Cilindros_De_Levante_Laterales_Estado,
            Cilindros_De_Levante_Laterales_Fugas:Cilindros_De_Levante_Laterales_Fugas,
            Cilindros_De_Direccion_Estado:Cilindros_De_Direccion_Estado,
            Cilindros_De_Direccion_Fugas:Cilindros_De_Direccion_Fugas,
            Cilindros_De_Inclinacion_Estado:Cilindros_De_Inclinacion_Estado,
            Cilindros_De_Inclinacion_Fugas:Cilindros_De_Inclinacion_Fugas,
            Terminales_De_Direccion_Estado:Terminales_De_Direccion_Estado,
            Terminales_De_Direccion_Fugas:Terminales_De_Direccion_Fugas,
            Mangueras_Y_Tuberia_Del_Sistema_Hidraulico:Mangueras_Y_Tuberia_Del_Sistema_Hidraulico,
            Palancas_De_Mando_Y_Control_Hidraulico:Palancas_De_Mando_Y_Control_Hidraulico,
            Principal:Principal,
            Parqueo:Parqueo,
            Pito_De_Bocina:Pito_De_Bocina,
            Alarma_De_Señal_De_Reversa:Alarma_De_Señal_De_Reversa,
            Strober_Luz_Estroboscopica:Strober_Luz_Estroboscopica,
            Luces_Direccionales:Luces_Direccionales,
            Luces_Del_Freno:Luces_Del_Freno,
            Luces_Marcha_Delante:Luces_Marcha_Delante,
            Luces_Marcha_Atras:Luces_Marcha_Atras,
            Extintor_De_Incendios:Extintor_De_Incendios,
            Liquido_Refrigerante_Del_Radiador:Liquido_Refrigerante_Del_Radiador,
            Electrolito_De_La_Bateria:Electrolito_De_La_Bateria,
            Liquido_De_Frenos:Liquido_De_Frenos,
            Aceite_De_Motor:Aceite_De_Motor,
            Aceite_Del_Sistema_Hidraulico:Aceite_Del_Sistema_Hidraulico,
            Aceite_De_La_Caja_Automatica:Aceite_De_La_Caja_Automatica,
            Aceite_De_Transmision:Aceite_De_Transmision,
            Combustible:Combustible,
            Horometro:Horometro,
            Nivel_De_Combustible:Nivel_De_Combustible,
            Presion_Aceite_De_Motor:Presion_Aceite_De_Motor,
            Temperatura_Motor:Temperatura_Motor,
            Nivel_Liquido_De_Frenos:Nivel_Liquido_De_Frenos,
            Frenos_Neumaticos:Frenos_Neumaticos,
            Nivel_Aceite_Del_Sistema_Hidraulico:Nivel_Aceite_Del_Sistema_Hidraulico,
            Estado_De_La_Bateria:Estado_De_La_Bateria,
            Estado_De_Los_Bornes_De_La_Bateria:Estado_De_Los_Bornes_De_La_Bateria,
            Nivel_De_Electrolito_De_La_Bateria:Nivel_De_Electrolito_De_La_Bateria,
            Voltaje_De_La_Bateria:Voltaje_De_La_Bateria,
            Cables_De_La_Bateria:Cables_De_La_Bateria,
            Estado_Cilindro_De_Gas:Estado_Cilindro_De_Gas,
            Soporte_De_Aseguramiento_Del_Cilindro:Soporte_De_Aseguramiento_Del_Cilindro,
            Conexiones_Y_Racores:Conexiones_Y_Racores,
            Manguera:Manguera,
            Llave_De_Paso:Llave_De_Paso,
            Valvula_De_Retencion:Valvula_De_Retencion,
            Filtro_Del_Sistema:Filtro_Del_Sistema,
            Tapa_De_Tanque_De_Combustible:Tapa_De_Tanque_De_Combustible,
            Estado_Del_Tanque_De_Combustible:Estado_Del_Tanque_De_Combustible,
            Nivel_De_Combustible2:Nivel_De_Combustible2,
            Filtro_De_Aire:Filtro_De_Aire,
            Filtro_De_Combustible:Filtro_De_Combustible,
            Filtro_De_Hidraulico:Filtro_De_Hidraulico,
            Hora:Hora,
            HorometroI:HorometroI,
            HorometroF:HorometroF,
            EstadoF:EstadoF,
            Mantenimiento:Mantenimiento,
            Observaciones_Generales:Observaciones_Generales
        }, (error,results)=>{
            //ERROR CONSULTA
            if(error){
                resp.render('Operador/',{
                    alert: true,
                    alertTitle: "No se pudo crear la lista de chequeo.",
                    alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'Operador/'
                })
            }else{
                //Si no llenan mantenimiento 
                if (Mantenimiento == 3) {
                    resp.render('Operador/',{
                        alert: true,
                        alertTitle: "No se pudo crear la lista de chequeo.",
                        alertMessage: "¡No se puedo crear ya que no llenaste el campo de mantenimiento!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                }else{
                    //SI NO LLENAN LAS CONDICIONES NI SOLICITUD
                    if (ConsecutivoCondiciones == "" && DescripcionCondiciones == "") {
                        if (ConsecutivoSolicitud == "" && DescripcionSolicitud == "") {
                            conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                if (error) {
                                    console.log(error)
                                }else{
                                    //Valida que existe la session
                                    if (req.session.loggedin) {
                                        //Valida que es operador
                                        if (req.session.Cargo == 2) {
                                            resp.render('Operador/',{
                                                alert: true,
                                                alertTitle: "Lista Creada.",
                                                alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                alertIcon: "success",
                                                showConfirmButton: false,
                                                timer: 1500,
                                                ruta: 'Operador/'
                                            })
                                        //Si no es operador
                                        }else{
                                            resp.render('Login',{
                                                alert: true,
                                                alertTitle: "Error",
                                                alertMessage: "¡Debes ser operador para continuar!",
                                                alertIcon: "error",
                                                showConfirmButton: true,
                                                timer: 1500,
                                                ruta: 'Login/'
                                            })
                                        }
                                    //si no inicio session
                                    }else{
                                        resp.render('Login',{
                                            alert: true,
                                            alertTitle: "Error",
                                            alertMessage: "¡Debes iniciar sesión!",
                                            alertIcon: "error",
                                            showConfirmButton: true,
                                            timer: 1500,
                                            ruta: 'Login/'
                                        })
                                    }
                                }
                            })
                        //Si llenan solicitud pero no condiciones
                        }else{
                            conexion.query('INSERT INTO reportedesolicitudci SET ?', {
                                Fecha:FechaCompleta,
                                ID_Consecutivo:ConsecutivoSolicitud,
                                Descripcion:DescripcionSolicitud,
                                ID_ListaCI:ID_ListaCI
                            },(error, results)=>{
                                if(error){
                                    console.log(error)
                                }else{
                                    conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                        if (error) {
                                            console.log(error)
                                        }else{
                                            //Valida que existe la session
                                            if (req.session.loggedin) {
                                                //Valida que es operador
                                                if (req.session.Cargo == 2) {
                                                    resp.render('Operador/',{
                                                        alert: true,
                                                        alertTitle: "Lista Creada.",
                                                        alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                        alertIcon: "success",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                        ruta: 'Operador/'
                                                    })
                                                //Si no es operador
                                                }else{
                                                    resp.render('Login',{
                                                        alert: true,
                                                        alertTitle: "Error",
                                                        alertMessage: "¡Debes ser operador para continuar!",
                                                        alertIcon: "error",
                                                        showConfirmButton: true,
                                                        timer: 1500,
                                                        ruta: 'Login/'
                                                    })
                                                }
                                            //si no inicio session
                                            }else{
                                                resp.render('Login',{
                                                    alert: true,
                                                    alertTitle: "Error",
                                                    alertMessage: "¡Debes iniciar sesión!",
                                                    alertIcon: "error",
                                                    showConfirmButton: true,
                                                    timer: 1500,
                                                    ruta: 'Login/'
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    //Si llenan condiciones
                    }else{
                        conexion.query('INSERT INTO reportedecondicionesci SET ?', {
                            Fecha:FechaCompleta,
                            ID_Consecutivo:ConsecutivoCondiciones,
                            Descripcion:DescripcionCondiciones,
                            ID_ListaCI:ID_ListaCI
                        },(error, results)=>{
                            if(error){
                                console.log(error)
                            }else{
                                //Si no llenan solicitud
                                if (ConsecutivoSolicitud == "" && DescripcionSolicitud == "") {
                                    conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                        if (error) {
                                            console.log(error)
                                        }else{
                                            //Valida que existe la session
                                            if (req.session.loggedin) {
                                                //Valida que es operador
                                                if (req.session.Cargo == 2) {
                                                    resp.render('Operador/',{
                                                        alert: true,
                                                        alertTitle: "Lista Creada.",
                                                        alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                        alertIcon: "success",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                        ruta: 'Operador/'
                                                    })
                                                //Si no es operador
                                                }else{
                                                    resp.render('Login',{
                                                        alert: true,
                                                        alertTitle: "Error",
                                                        alertMessage: "¡Debes ser operador para continuar!",
                                                        alertIcon: "error",
                                                        showConfirmButton: true,
                                                        timer: 1500,
                                                        ruta: 'Login/'
                                                    })
                                                }
                                            //si no inicio session
                                            }else{
                                                resp.render('Login',{
                                                    alert: true,
                                                    alertTitle: "Error",
                                                    alertMessage: "¡Debes iniciar sesión!",
                                                    alertIcon: "error",
                                                    showConfirmButton: true,
                                                    timer: 1500,
                                                    ruta: 'Login/'
                                                })
                                            }
                                        }
                                    })
                                //Si llenan condiciones y solicitud
                                }else{
                                    conexion.query('INSERT INTO reportedesolicitudci SET ?', {
                                        Fecha:FechaCompleta,
                                        ID_Consecutivo:ConsecutivoSolicitud,
                                        Descripcion:DescripcionSolicitud,
                                        ID_ListaCI:ID_ListaCI
                                    },(error, results)=>{
                                        if(error){
                                            console.log(error)
                                        }else{
                                            conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                                if (error) {
                                                    console.log(error)
                                                }else{
                                                    //Valida que existe la session
                                                    if (req.session.loggedin) {
                                                        //Valida que es operador
                                                        if (req.session.Cargo == 2) {
                                                            resp.render('Operador/',{
                                                                alert: true,
                                                                alertTitle: "Lista Creada.",
                                                                alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                                alertIcon: "success",
                                                                showConfirmButton: false,
                                                                timer: 1500,
                                                                ruta: 'Operador/'
                                                            })
                                                        //Si no es operador
                                                        }else{
                                                            resp.render('Login',{
                                                                alert: true,
                                                                alertTitle: "Error",
                                                                alertMessage: "¡Debes ser operador para continuar!",
                                                                alertIcon: "error",
                                                                showConfirmButton: true,
                                                                timer: 1500,
                                                                ruta: 'Login/'
                                                            })
                                                        }
                                                    //si no inicio session
                                                    }else{
                                                        resp.render('Login',{
                                                            alert: true,
                                                            alertTitle: "Error",
                                                            alertMessage: "¡Debes iniciar sesión!",
                                                            alertIcon: "error",
                                                            showConfirmButton: true,
                                                            timer: 1500,
                                                            ruta: 'Login/'
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            }
        } 
    )
    //Si llenan el horometro al inicio
    }else{
        //Si no llenan mantenimiento 
        if (Mantenimiento == 3) {
            resp.render('Operador/',{
                alert: true,
                alertTitle: "No se pudo crear la lista de chequeo.",
                alertMessage: "¡No se puedo crear ya que no llenaste el campo de mantenimiento!",
                alertIcon: "error",
                showConfirmButton: false,
                timer: 1500,
                ruta: 'Operador/'
            })
        }else{
            //si el horometro inicial es mayor al final
            if (HorometroI > HorometroF) {
                resp.render('Operador/',{
                    alert: true,
                    alertTitle: "No se pudo crear la lista de chequeo.",
                    alertMessage: "¡El horometro Inicial es mayor que el horometro final!",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'Operador/'
                })
            //Si el horometro final es mayor que el inicial
            }else{
                //Si el horometro final es mayor al permitido (10 horas maximo)
                if (HorometroF >= HorometroVa) {
                    resp.render('Operador/',{
                        alert: true,
                        alertTitle: "No se pudo crear la lista de chequeo.",
                        alertMessage: "¡El horometro final no es el correcto o verifique lo ingresado!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                //Si el horometro es mayor que el inicial y se encuentra dentro de lo permitido (Horometro inicial + 10 horas)
                }else{
                    if(HorometroI < HorometroF <= HorometroVa){
                        conexion.query('INSERT INTO listaci SET ?',{
            ID_Operador:ID_Operador,
            ID_Supervisor:ID_Supervisor,
            ID_CentrosT:ID_CentrosT,
            ID_SeccionesT:ID_SeccionesT,
            ID_Montacargas:ID_Montacargas,
            Fecha:FechaCompleta,
            Turno:Turno,
            Estado:Estado,
            EstadoV:EstadoV,
            Carnet_De_Servicios_Medicos:Carnet_De_Servicios_Medicos,
            Consume_Medicamentos:Consume_Medicamentos,
            Casco:Casco,
            Gafas_De_Proteccion:Gafas_De_Proteccion,
            Protectores_Auditivos:Protectores_Auditivos,
            Proteccion_Respiratoria:Proteccion_Respiratoria,
            Guantes:Guantes,
            Uniforme:Uniforme,
            Botas_Punta_De_Acero:Botas_Punta_De_Acero,
            Limpieza:Limpieza,
            Presencia_De_Derrames:Presencia_De_Derrames,
            Obstaculos:Obstaculos,
            Pintura_Y_Limpieza_Exterior:Pintura_Y_Limpieza_Exterior,
            Cojineria_De_La_Silla:Cojineria_De_La_Silla,
            Cinturon_De_Seguridad:Cinturon_De_Seguridad,
            Espejos_Laterales:Espejos_Laterales,
            Pedales_De_Freno:Pedales_De_Freno,
            Freno_De_Mano:Freno_De_Mano,
            Pedales_De_Aceleracion:Pedales_De_Aceleracion,
            Control_De_Marchas_Adelante_Y_Atras:Control_De_Marcha_Adelante_Y_Atras,
            Estado_General:Estado_General,
            Ruedas_Macizas:Ruedas_Macizas,
            LLantas_Neumaticas:LLantas_Neumaticas,
            Horquillas:Horquillas,
            Carro_Porta_Horquillas_Estado:Carro_Porta_Horquillas_Estado,
            Carro_Porta_Horquillas_Engrase:Carro_Porta_Horquillas_Engrase,
            Cadenas_De_Levante_Estado:Cadenas_De_Levante_Estado,
            Cadenas_De_Levante_Tension:Cadenas_De_Levante_Tension,
            Cilindros_De_Levante_Central_Estado:Cilindros_De_Levante_Central_Estado,
            Cilindros_De_Levante_Central_Fugas:Cilindros_De_Levante_Central_Fugas,
            Cilindros_De_Levante_Laterales_Estado:Cilindros_De_Levante_Laterales_Estado,
            Cilindros_De_Levante_Laterales_Fugas:Cilindros_De_Levante_Laterales_Fugas,
            Cilindros_De_Direccion_Estado:Cilindros_De_Direccion_Estado,
            Cilindros_De_Direccion_Fugas:Cilindros_De_Direccion_Fugas,
            Cilindros_De_Inclinacion_Estado:Cilindros_De_Inclinacion_Estado,
            Cilindros_De_Inclinacion_Fugas:Cilindros_De_Inclinacion_Fugas,
            Terminales_De_Direccion_Estado:Terminales_De_Direccion_Estado,
            Terminales_De_Direccion_Fugas:Terminales_De_Direccion_Fugas,
            Mangueras_Y_Tuberia_Del_Sistema_Hidraulico:Mangueras_Y_Tuberia_Del_Sistema_Hidraulico,
            Palancas_De_Mando_Y_Control_Hidraulico:Palancas_De_Mando_Y_Control_Hidraulico,
            Principal:Principal,
            Parqueo:Parqueo,
            Pito_De_Bocina:Pito_De_Bocina,
            Alarma_De_Señal_De_Reversa:Alarma_De_Señal_De_Reversa,
            Strober_Luz_Estroboscopica:Strober_Luz_Estroboscopica,
            Luces_Direccionales:Luces_Direccionales,
            Luces_Del_Freno:Luces_Del_Freno,
            Luces_Marcha_Delante:Luces_Marcha_Delante,
            Luces_Marcha_Atras:Luces_Marcha_Atras,
            Extintor_De_Incendios:Extintor_De_Incendios,
            Liquido_Refrigerante_Del_Radiador:Liquido_Refrigerante_Del_Radiador,
            Electrolito_De_La_Bateria:Electrolito_De_La_Bateria,
            Liquido_De_Frenos:Liquido_De_Frenos,
            Aceite_De_Motor:Aceite_De_Motor,
            Aceite_Del_Sistema_Hidraulico:Aceite_Del_Sistema_Hidraulico,
            Aceite_De_La_Caja_Automatica:Aceite_De_La_Caja_Automatica,
            Aceite_De_Transmision:Aceite_De_Transmision,
            Combustible:Combustible,
            Horometro:Horometro,
            Nivel_De_Combustible:Nivel_De_Combustible,
            Presion_Aceite_De_Motor:Presion_Aceite_De_Motor,
            Temperatura_Motor:Temperatura_Motor,
            Nivel_Liquido_De_Frenos:Nivel_Liquido_De_Frenos,
            Frenos_Neumaticos:Frenos_Neumaticos,
            Nivel_Aceite_Del_Sistema_Hidraulico:Nivel_Aceite_Del_Sistema_Hidraulico,
            Estado_De_La_Bateria:Estado_De_La_Bateria,
            Estado_De_Los_Bornes_De_La_Bateria:Estado_De_Los_Bornes_De_La_Bateria,
            Nivel_De_Electrolito_De_La_Bateria:Nivel_De_Electrolito_De_La_Bateria,
            Voltaje_De_La_Bateria:Voltaje_De_La_Bateria,
            Cables_De_La_Bateria:Cables_De_La_Bateria,
            Estado_Cilindro_De_Gas:Estado_Cilindro_De_Gas,
            Soporte_De_Aseguramiento_Del_Cilindro:Soporte_De_Aseguramiento_Del_Cilindro,
            Conexiones_Y_Racores:Conexiones_Y_Racores,
            Manguera:Manguera,
            Llave_De_Paso:Llave_De_Paso,
            Valvula_De_Retencion:Valvula_De_Retencion,
            Filtro_Del_Sistema:Filtro_Del_Sistema,
            Tapa_De_Tanque_De_Combustible:Tapa_De_Tanque_De_Combustible,
            Estado_Del_Tanque_De_Combustible:Estado_Del_Tanque_De_Combustible,
            Nivel_De_Combustible2:Nivel_De_Combustible2,
            Filtro_De_Aire:Filtro_De_Aire,
            Filtro_De_Combustible:Filtro_De_Combustible,
            Filtro_De_Hidraulico:Filtro_De_Hidraulico,
            Hora:Hora,
            HorometroI:HorometroI,
            HorometroF:HorometroF,
            EstadoF:EstadoF,
            Mantenimiento:Mantenimiento,
            Observaciones_Generales:Observaciones_Generales
                        }, (error,results)=>{
                            //ERROR CONSULTA
                            if(error){
                                resp.render('Operador/',{
                                    alert: true,
                                    alertTitle: "No se pudo crear la lista de chequeo.",
                                    alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                    alertIcon: "error",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'Operador/'
                                })
                            }else{
                                //SI NO LLENAN LAS CONDICIONES NI SOLICITUD
                                if (ConsecutivoCondiciones == "" && DescripcionCondiciones == "") {
                                    if (ConsecutivoSolicitud == "" && DescripcionSolicitud == "") {
                                        conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                            if (error) {
                                                console.log(error)
                                            }else{
                                                //Valida que existe la session
                                                if (req.session.loggedin) {
                                                    //Valida que es operador
                                                    if (req.session.Cargo == 2) {
                                                        resp.render('Operador/',{
                                                            alert: true,
                                                            alertTitle: "Lista Creada.",
                                                            alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                            alertIcon: "success",
                                                            showConfirmButton: false,
                                                            timer: 1500,
                                                            ruta: 'Operador/'
                                                        })
                                                    //Si no es operador
                                                    }else{
                                                        resp.render('Login',{
                                                            alert: true,
                                                            alertTitle: "Error",
                                                            alertMessage: "¡Debes ser operador para continuar!",
                                                            alertIcon: "error",
                                                            showConfirmButton: true,
                                                            timer: 1500,
                                                            ruta: 'Login/'
                                                        })
                                                    }
                                                //si no inicio session
                                                }else{
                                                    resp.render('Login',{
                                                        alert: true,
                                                        alertTitle: "Error",
                                                        alertMessage: "¡Debes iniciar sesión!",
                                                        alertIcon: "error",
                                                        showConfirmButton: true,
                                                        timer: 1500,
                                                        ruta: 'Login/'
                                                    })
                                                }
                                            }
                                        })
                                    //Si llenan solicitud pero no condiciones
                                    }else{
                                        conexion.query('INSERT INTO reportedesolicitudci SET ?', {
                                            Fecha:FechaCompleta,
                                            ID_Consecutivo:ConsecutivoSolicitud,
                                            Descripcion:DescripcionSolicitud,
                                            ID_ListaCI:ID_ListaCI
                                        },(error, results)=>{
                                            if(error){
                                                console.log(error)
                                            }else{
                                                conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                                    if (error) {
                                                        console.log(error)
                                                    }else{
                                                        //Valida que existe la session
                                                        if (req.session.loggedin) {
                                                            //Valida que es operador
                                                            if (req.session.Cargo == 2) {
                                                                resp.render('Operador/',{
                                                                    alert: true,
                                                                    alertTitle: "Lista Creada.",
                                                                    alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                                    alertIcon: "success",
                                                                    showConfirmButton: false,
                                                                    timer: 1500,
                                                                    ruta: 'Operador/'
                                                                })
                                                            //Si no es operador
                                                            }else{
                                                                resp.render('Login',{
                                                                    alert: true,
                                                                    alertTitle: "Error",
                                                                    alertMessage: "¡Debes ser operador para continuar!",
                                                                    alertIcon: "error",
                                                                    showConfirmButton: true,
                                                                    timer: 1500,
                                                                    ruta: 'Login/'
                                                                })
                                                            }
                                                        //si no inicio session
                                                        }else{
                                                            resp.render('Login',{
                                                                alert: true,
                                                                alertTitle: "Error",
                                                                alertMessage: "¡Debes iniciar sesión!",
                                                                alertIcon: "error",
                                                                showConfirmButton: true,
                                                                timer: 1500,
                                                                ruta: 'Login/'
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }
                                //Si llenan condiciones
                                }else{
                                    conexion.query('INSERT INTO reportedecondicionesci SET ?', {
                                        Fecha:FechaCompleta,
                                        ID_Consecutivo:ConsecutivoCondiciones,
                                        Descripcion:DescripcionCondiciones,
                                        ID_ListaCI:ID_ListaCI
                                    },(error, results)=>{
                                        if(error){
                                            console.log(error)
                                        }else{
                                            //Si no llenan solicitud
                                            if (ConsecutivoSolicitud == "" && DescripcionSolicitud == "") {
                                                conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                                    if (error) {
                                                        console.log(error)
                                                    }else{
                                                        //Valida que existe la session
                                                        if (req.session.loggedin) {
                                                            //Valida que es operador
                                                            if (req.session.Cargo == 2) {
                                                                resp.render('Operador/',{
                                                                    alert: true,
                                                                    alertTitle: "Lista Creada.",
                                                                    alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                                    alertIcon: "success",
                                                                    showConfirmButton: false,
                                                                    timer: 1500,
                                                                    ruta: 'Operador/'
                                                                })
                                                            //Si no es operador
                                                            }else{
                                                                resp.render('Login',{
                                                                    alert: true,
                                                                    alertTitle: "Error",
                                                                    alertMessage: "¡Debes ser operador para continuar!",
                                                                    alertIcon: "error",
                                                                    showConfirmButton: true,
                                                                    timer: 1500,
                                                                    ruta: 'Login/'
                                                                })
                                                            }
                                                        //si no inicio session
                                                        }else{
                                                            resp.render('Login',{
                                                                alert: true,
                                                                alertTitle: "Error",
                                                                alertMessage: "¡Debes iniciar sesión!",
                                                                alertIcon: "error",
                                                                showConfirmButton: true,
                                                                timer: 1500,
                                                                ruta: 'Login/'
                                                            })
                                                        }
                                                    }
                                                })
                                            //Si llenan condiciones y solicitud
                                            }else{
                                                conexion.query('INSERT INTO reportedesolicitudci SET ?', {
                                                    Fecha:FechaCompleta,
                                                    ID_Consecutivo:ConsecutivoSolicitud,
                                                    Descripcion:DescripcionSolicitud,
                                                    ID_ListaCI:ID_ListaCI
                                                },(error, results)=>{
                                                    if(error){
                                                        console.log(error)
                                                    }else{
                                                        conexion.query('UPDATE montacargas SET EstadoF = 2 WHERE ID = ?',[ID_Montacargas],(error, results)=>{
                                                            if (error) {
                                                                console.log(error)
                                                            }else{
                                                                //Valida que existe la session
                                                                if (req.session.loggedin) {
                                                                    //Valida que es operador
                                                                    if (req.session.Cargo == 2) {
                                                                        resp.render('Operador/',{
                                                                            alert: true,
                                                                            alertTitle: "Lista Creada.",
                                                                            alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                                            alertIcon: "success",
                                                                            showConfirmButton: false,
                                                                            timer: 1500,
                                                                            ruta: 'Operador/'
                                                                        })
                                                                    //Si no es operador
                                                                    }else{
                                                                        resp.render('Login',{
                                                                            alert: true,
                                                                            alertTitle: "Error",
                                                                            alertMessage: "¡Debes ser operador para continuar!",
                                                                            alertIcon: "error",
                                                                            showConfirmButton: true,
                                                                            timer: 1500,
                                                                            ruta: 'Login/'
                                                                        })
                                                                    }
                                                                //si no inicio session
                                                                }else{
                                                                    resp.render('Login',{
                                                                        alert: true,
                                                                        alertTitle: "Error",
                                                                        alertMessage: "¡Debes iniciar sesión!",
                                                                        alertIcon: "error",
                                                                        showConfirmButton: true,
                                                                        timer: 1500,
                                                                        ruta: 'Login/'
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }else{
                        resp.render('Operador/',{
                            alert: true,
                            alertTitle: "No se pudo crear la lista de chequeo.",
                            alertMessage: "¡El horometro final es incorrecto!",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'Operador/'
                        })
                    }
                }
            }
        }
    }
}


//ACTUALIZAR
exports.update = (req, resp)=>{
    const ID = req.body.id;
    const HorometroI = req.body.HorometroI;
    const HorometroF  = req.body.HorometroF;
    const HorometroVa = (HorometroI-10+20);
    console.log(HorometroVa)
    const Estado  = req.body.Estado ;
    const EstadoV = req.body.EstadoV;
    const EstadoF = req.body.EstadoF;
    const Mantenimiento = req.body.Mantenimiento;
    const Evento_Inesperado = req.body.Evento_Inesperado;
    const ID_Montacargas  = req.body.ID_Montacargas ;
    //Si no llenan todos los campos
    if (Mantenimiento == 3) {
        resp.render('Operador/',{
            alert: true,
            alertTitle: "No se pudo actualizar la lista de chequeo.",
            alertMessage: "¡Verifica todos los datos fueron llenados!",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 1500,
            ruta: 'Operador/'
        })
    //Si llenaron todos los campos
    }else{
        //Valida que el horometro final no este vacio
        if (! HorometroF == "") {
            //Si el horometro inicial es mayor que el horometro final
            if (HorometroI > HorometroF) {
                resp.render('Operador/',{
                    alert: true,
                    alertTitle: "No se pudo crear la lista de chequeo.",
                    alertMessage: "¡El horometro Inicial es mayor que el horometro final!",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'Operador/'
                })
            //Si el horometro final es mayor que el horometro inicial
            }else{
                //Si el horometro final es mayor al permitido (horometro inicial + 10 horas)
                if (HorometroF >= HorometroVa) {
                    resp.render('Operador/',{
                        alert: true,
                        alertTitle: "No se pudo crear la lista de chequeo.",
                        alertMessage: "¡El horometro final no es el correcto o verifique lo ingresado!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                //Si el horometro final es menor al permitido 
                }else{
                    //Si el horometro se encuentra en lo permitido y todo es correcto
                    if(HorometroI < HorometroF <= HorometroVa){
                        conexion.query('UPDATE listaci SET ? WHERE ID=?',[{
                            HorometroF:HorometroF,
                            Estado:Estado,
                            EstadoV:EstadoV,
                            EstadoF:EstadoF,
                            Mantenimiento:Mantenimiento,
                            Evento_Inesperado:Evento_Inesperado
                        },[ID]],(error,results)=>{
                            if (error) {
                                throw error
                            }else{
                                conexion.query('UPDATE montacargas SET ? WHERE ID = ?',[{EstadoF:1,HorometroI:HorometroF},[ID_Montacargas]],(error, results)=>{
                                    if (error) {
                                        console.log(error)
                                    }else{
                                        //Valida que existe la session
                                        if (req.session.loggedin) {
                                            //Valida que es operador
                                            if (req.session.Cargo == 2) {
                                                resp.render('Operador/',{
                                                    alert: true,
                                                    alertTitle: "Lista Creada.",
                                                    alertMessage: "¡La lista de chequeo perteneciente a COMBUSTION INTERNA",
                                                    alertIcon: "success",
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                    ruta: 'Operador/'
                                                })
                                            //Si no es operador
                                            }else{
                                                resp.render('Login',{
                                                    alert: true,
                                                    alertTitle: "Error",
                                                    alertMessage: "¡Debes ser operador para continuar!",
                                                    alertIcon: "error",
                                                    showConfirmButton: true,
                                                    timer: 1500,
                                                    ruta: 'Login/'
                                                })
                                            }
                                        //si no inicio session
                                        }else{
                                            resp.render('Login',{
                                                alert: true,
                                                alertTitle: "Error",
                                                alertMessage: "¡Debes iniciar sesión!",
                                                alertIcon: "error",
                                                showConfirmButton: true,
                                                timer: 1500,
                                                ruta: 'Login/'
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }
        }
    }
}