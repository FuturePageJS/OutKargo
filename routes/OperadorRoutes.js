//1. Crear a depencia de express
const express = require('express');
const conexion = require('../Database/env')
//2. Traer el controlador
const OperadorController = require('../controllers/OperadorController')
const ListaECController = require('../controllers/listas/ListaECController')
const ListaEPAController = require('../controllers/listas/ListaEPAController')
const ListaETPController = require('../controllers/listas/ListaETPController')
const ListaSController = require('../controllers/listas/ListaSController')
const ListaCIController = require('../controllers/listas/ListaCIController')
const { Router } = require('express');
//3. Definir la variable del router
const router = express.Router();
//4. Crear las rutas
    
/* Menu */
router.get('', (req, res) => {
	if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM operador',(error, results)=>{
                if (error) {
                    throw error
                } else {
                    conexion.query('SELECT * FROM usuarios',(error, usuarios)=>{
                        if (error) {
                            throw error
                        }else{
                            conexion.query('SELECT * FROM listaec',(error, listaec)=>{
                                if (error) {
                                   throw error
                                } else {
                                    conexion.query('SELECT * FROM listaepa',(error, listaepa)=>{
                                        if (error) {
                                           throw error
                                        } else {
                                            conexion.query('SELECT * FROM listas',(error, listas)=>{
                                                if (error) {
                                                   throw error
                                                } else {
                                                    conexion.query('SELECT * FROM listaetp',(error, listaetp)=>{
                                                        if (error) {
                                                           throw error
                                                        } else {
                                                            conexion.query('SELECT * FROM listaci',(error, listaci)=>{
                                                                if (error) {
                                                                   throw error
                                                                } else {
                                                                    conexion.query('SELECT * FROM centrost',(error, centrost)=>{
                                                                        if (error) {
                                                                           throw error
                                                                        } else {
                                                                            conexion.query('SELECT * FROM operador',(error, operador)=>{
                                                                                if (error) {
                                                                                   throw error
                                                                                } else {
                                                                                    conexion.query('SELECT * FROM montacargas',(error, montacargas)=>{
                                                                                        if (error) {
                                                                                           throw error 
                                                                                        } else {
                                                                                            res.render('Operador/menu',{
                                                                                                results:results,
                                                                                                usuarios:usuarios,
                                                                                                listaec:listaec,
                                                                                                listaepa:listaepa,
                                                                                                listas:listas,
                                                                                                listaetp:listaetp,
                                                                                                listaci:listaci,
                                                                                                centrost:centrost,
                                                                                                operador:operador,
                                                                                                montacargas:montacargas
                                                                                            });
                                                                                        }
                                                                                    })  
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } 
            })
        }else {
            req.session.destroy(()=>{
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser operador para continuar!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'Login/'
                })
            })
        }   
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
        
/* LISTA EC */

/* CREAR */
router.post('/ListaEC/Crea/', (req, res) => {
    const NumeroMontacarga = req.body.NumeroMontacargas;
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaec',(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT WHERE ID_CentrosT=?',[operador[0].ID_Centro],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas WHERE Numero=?',[NumeroMontacarga],(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudec',(error, reportedesolicitudec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesec',(error, reportedecondicionesec)=>{
                if (error) {
                    throw error
                }else {
                if (ID_Montacargas.length == 0) {
                    res.render('Operador/',{
                        alert: true,
                        alertTitle: "Error montacargas no encontrado.",
                        alertMessage: "¡Por favor ingrese un numero de montacargas existente!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                }else{
                    if (ID_Montacargas[0].EstadoF == 2) {
                        res.render('Operador/',{
                            alert: true,
                            alertTitle: "Error un operador no finalizo la lista de chequeo",
                            alertMessage: "¡Por favor comuniquese con un supervisor ´para solucionar el problema!",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'Operador/'
                        })
                    } else {
                        res.render('Operador/ListaEC/create',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
                    }
                }}})}})}})}})}})}})}})}
            })
        }else {
            req.session.destroy(()=>{
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser operador para continuar!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'Login/'
                })
            })
        }           
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
})
router.post('/ListaEC/Crea/save', ListaECController.save)

/* READ */
router.get('/ListaEC/', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaec',(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudec',(error, reportedesolicitudec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesec',(error, reportedecondicionesec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaEC',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

/* VER POR SEPARADO */
router.get('/ListaEC/Ver/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaec',(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudec',(error, reportedesolicitudec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesec',(error, reportedecondicionesec)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaEC/ListaVer',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

/* Completar */
router.get('/ListaEC/Completar/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaec',(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudec',(error, reportedesolicitudec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesec',(error, reportedecondicionesec)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaEC/Completar',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
router.post('/ListaEC/Completar/Update', ListaECController.update)

/* Papelera */
router.get('/ListaEC/Papelera/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaec',(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador Where ID_Usuario=?',[req.session.ID],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudec',(error, reportedesolicitudec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesec',(error, reportedecondicionesec)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaEC/Papelera',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

// FIN LISTA EC

/* LISTA EPA */

/* CREAR */
router.post('/ListaEPA/Crea/', (req, res) => {
    const NumeroMontacarga = req.body.NumeroMontacargas;
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaepa',(error, listaepa)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT WHERE ID_CentrosT=?',[operador[0].ID_Centro],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas WHERE Numero=?',[NumeroMontacarga],(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudec',(error, reportedesolicitudec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesec',(error, reportedecondicionesec)=>{
                if (error) {
                    throw error
                }else {
                if (ID_Montacargas.length == 0) {
                    res.render('Operador/',{
                        alert: true,
                        alertTitle: "Error montacargas no encontrado.",
                        alertMessage: "¡Por favor ingrese un numero de montacargas existente!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                }else{
                    if (ID_Montacargas[0].EstadoF == 2) {
                        res.render('Operador/',{
                            alert: true,
                            alertTitle: "Error un operador no finalizo la lista de chequeo",
                            alertMessage: "¡Por favor comuniquese con un supervisor !",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'Operador/'
                        })
                    } else {
                        res.render('Operador/ListaEPA/create',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
                    }
                }}})}})}})}})}})}})}})}
            })
        }else {
            req.session.destroy(()=>{
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser operador para continuar!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'Login/'
                })
            })
        }           
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
})
router.post('/ListaEPA/Crea/save', ListaEPAController.save)

/* READ */
router.get('/ListaEPA/', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaepa',(error, listaepa)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudepa',(error, reportedesolicitudepa)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesepa',(error, reportedecondicionesepa)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaEPA',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

/* VER POR SEPARADO */
router.get('/ListaEPA/Ver/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaepa',(error, listaepa)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudepa',(error, reportedesolicitudepa)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesepa',(error, reportedecondicionesepa)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaEPA/ListaVer',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

/* Completar */
router.get('/ListaEPA/Completar/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaepa',(error, listaepa)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudepa',(error, reportedesolicitudepa)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesepa',(error, reportedecondicionesepa)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaEPA/Completar',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
router.post('/ListaEPA/Completar/Update', ListaEPAController.update)

/* Papelera */
router.get('/ListaEPA/Papelera/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaepa',(error, listaepa)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador Where ID_Usuario=?',[req.session.ID],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudepa',(error, reportedesolicitudepa)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesepa',(error, reportedecondicionesepa)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaEPA/Papelera',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

// FIN LISTA EPA

// LISTA ETP
//CREAR
router.post('/ListaETP/Crea/', (req, res) => {
    const NumeroMontacarga = req.body.NumeroMontacargas;
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaetp',(error, listaetp)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT WHERE ID_CentrosT=?',[operador[0].ID_Centro],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas WHERE Numero=?',[NumeroMontacarga],(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudetp',(error, reportedesolicitudetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesetp',(error, reportedecondicionesetp)=>{
                if (error) {
                    throw error
                }else {
                if (ID_Montacargas.length == 0) {
                    res.render('Operador/',{
                        alert: true,
                        alertTitle: "Error montacargas no encontrado.",
                        alertMessage: "¡Por favor ingrese un numero de montacargas existente!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                }else{
                    if (ID_Montacargas[0].EstadoF == 2) {
                        res.render('Operador/',{
                            alert: true,
                            alertTitle: "Error un operador no finalizo la lista de chequeo",
                            alertMessage: "¡Por favor comuniquese con un supervisor !",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'Operador/'
                        })
                    } else {
                        res.render('Operador/ListaETP/create',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp});
                    }
                }}})}})}})}})}})}})}})}
            })
        }else {
            req.session.destroy(()=>{
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser operador para continuar!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'Login/'
                })
            })
        }           
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
})
router.post('/ListaETP/Crea/save', ListaETPController.save)

//READ
router.get('/ListaETP/', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaetp',(error, listaetp)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudetp',(error, reportedesolicitudetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesetp',(error, reportedecondicionesetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaETP',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

/* VER POR SEPARADO */
router.get('/ListaETP/Ver/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaetp',(error, listaetp)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudetp',(error, reportedesolicitudetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesetp',(error, reportedecondicionesetp)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaETP/ListaVer',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
/* Completar */
router.get('/ListaETP/Completar/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaetp',(error, listaetp)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudetp',(error, reportedesolicitudetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesetp',(error, reportedecondicionesetp)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaETP/Completar',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
router.post('/ListaETP/Completar/Update', ListaETPController.update)

//PAPELERA
router.get('/ListaETP/Papelera', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaetp',(error, listaetp)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudetp',(error, reportedesolicitudetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesetp',(error, reportedecondicionesetp)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                        if (!estadofec.length == 0 ){
                            res.render('Operador',{
                                alert: true,
                                alertTitle: "Error",
                                alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                                alertIcon: "error",
                                showConfirmButton: true,
                                timer: 1500,    
                                ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                            })
                        }
                        if (!estadofepa.length == 0) {
                            res.render('Operador',{
                                alert: true,
                                alertTitle: "Error",
                                alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                                alertIcon: "error",
                                showConfirmButton: true,
                                timer: 1500,
                                ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                            })
                        }
                        if (!estadofetp.length == 0) {
                            res.render('Operador',{
                                alert: true,
                                alertTitle: "Error",
                                alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                                alertIcon: "error",
                                showConfirmButton: true,
                                timer: 1500,
                                ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                            })
                        }
                        else{
                            res.render('Operador/ListaETP/Papelera',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp});
                        }
                    })
                }})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

// FIN LISTA ETP

//LISTA S   
router.post('/ListaS/Crea/', (req, res) => {
    const NumeroMontacarga = req.body.NumeroMontacargas;
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listas',(error, listas)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT WHERE ID_CentrosT=?',[operador[0].ID_Centro],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas WHERE Numero=?',[NumeroMontacarga],(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicituds)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicioness',(error, reportedecondicioness)=>{
                if (error) {
                    throw error
                }else {
                if (ID_Montacargas.length == 0) {
                    res.render('Operador/',{
                        alert: true,
                        alertTitle: "Error montacargas no encontrado.",
                        alertMessage: "¡Por favor ingrese un numero de montacargas existente!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                }else{
                    if (ID_Montacargas[0].EstadoF == 2) {
                        res.render('Operador/',{
                            alert: true,
                            alertTitle: "Error un operador no finalizo la lista de chequeo",
                            alertMessage: "¡Por favor comuniquese con un supervisor !",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'Operador/'
                        })
                    } else {
                        res.render('Operador/ListaS/create',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness});
                    }
                }}})}})}})}})}})}})}})}
            })
        }else {
            req.session.destroy(()=>{
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser operador para continuar!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'Login/'
                })
            })
        }           
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
})
router.post('/ListaS/Crea/save', ListaSController.save)

//READ
router.get('/ListaS/', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listas',(error, listas)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicituds)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicioness',(error, reportedecondicioness)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaS/',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
//VER POR SEPARADO
router.get('/ListaS/Ver/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listas',(error, listas)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicituds)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicioness',(error, reportedecondicioness)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaS/ListaVer',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

//Papelera
router.get('/ListaS/Papelera', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listas',(error, listas)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicituds)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicioness',(error, reportedecondicioness)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaS/Papelera',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
//COMPLETAR

router.get('/ListaS/Completar/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listas',(error, listas)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicituds)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicioness',(error, reportedecondicioness)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaS/Completar',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
router.post('/ListaS/Completar/Update', ListaSController.update)

// FIN LISTA S


//LISTA CI

//LISTA S   
router.post('/ListaCI/Crea/', (req, res) => {
    const NumeroMontacarga = req.body.NumeroMontacargas;
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaci',(error, listaci)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT WHERE ID_CentrosT=?',[operador[0].ID_Centro],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas WHERE Numero=?',[NumeroMontacarga],(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudci',(error, reportedesolicitudci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesci',(error, reportedecondicionesci)=>{
                if (error) {
                    throw error
                }else {
                if (ID_Montacargas.length == 0) {
                    res.render('Operador/',{
                        alert: true,
                        alertTitle: "Error montacargas no encontrado.",
                        alertMessage: "¡Por favor ingrese un numero de montacargas existente!",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'Operador/'
                    })
                }else{
                    if (ID_Montacargas[0].EstadoF == 2) {
                        res.render('Operador/',{
                            alert: true,
                            alertTitle: "Error un operador no finalizo la lista de chequeo",
                            alertMessage: "¡Por favor comuniquese con un supervisor !",
                            alertIcon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'Operador/'
                        })
                    } else {
                        res.render('Operador/Listaci/create',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci});
                    }
                }}})}})}})}})}})}})}})}
            })
        }else {
            req.session.destroy(()=>{
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser operador para continuar!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'Login/'
                })
            })
        }           
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
})
router.post('/ListaCI/Crea/save', ListaCIController.save)

//READ
router.get('/ListaCI/', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaci',(error, listaci)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicitudci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesci',(error, reportedecondicionesci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaCI/',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

//VER POR SEPARADO
router.get('/ListaCI/Ver/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaci',(error, listaci)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudci',(error, reportedesolicitudci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesci',(error, reportedecondicionesci)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaCI/ListaVer',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

router.get('/ListaCI/Papelera', (req, res) => {
    if (req.session.loggedin) {
        IdUsuario= req.session.ID
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaci',(error, listaci)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador WHERE ID_Usuario=?',[IdUsuario],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT ',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicituds',(error, reportedesolicitudci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesci',(error, reportedecondicionesci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaec WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofec)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM listaepa WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofepa)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaetp WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofetp)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listas WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofs)=>{
                if(error){
                    throw error
                }else{
                    conexion.query('SELECT * FROM listaci WHERE EstadoF=2 AND ID_Operador=?',[operador[0].ID],(error, estadofci)=>{
                if(error){
                    throw error
                }else{
                    if (!estadofec.length == 0 ){
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,    
                            ruta: 'Operador/ListaEC/Completar/'+estadofec[0].ID
                        })
                    }
                    if (!estadofepa.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaEPA/Completar/'+estadofepa[0].ID
                        })
                    }
                    if (!estadofetp.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaETP/Completar/'+estadofetp[0].ID
                        })
                    }
                    if (!estadofs.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaS/Completar/'+estadofs[0].ID
                        })
                    }
                    if (!estadofci.length == 0) {
                        res.render('Operador',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "¡Tienes una lista de chequeo sin terminar, completala para seguir!",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 1500,
                            ruta: 'Operador/ListaCI/Completar/'+estadofci[0].ID
                        })
                    }
                    else{
                        res.render('Operador/ListaCI/Papelera',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci});
                    }
                                } 
                            })
                        }
                    })
                }})}})}})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
	}else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

//COMPLETAR
router.get('/ListaCI/Completar/:id', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM listaci',(error, listaci)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador',(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor',(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM reportedesolicitudci',(error, reportedesolicitudci)=>{
                if (error) {
                    throw error
                }else {
                    conexion.query('SELECT * FROM reportedecondicionesci',(error, reportedecondicionesci)=>{
                if (error) {
                    throw error
                }else {
                    const id = req.params.id
                    res.render('Operador/ListaCI/Completar',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci});
                }})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});
router.post('/ListaCI/Completar/Update', ListaCIController.update)
// FIN LISTA CI

// Configuraciones 
router.get('/Config/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 2) {
            conexion.query('SELECT * FROM usuarios Where ID=?',[req.session.ID],(error, usuario)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador where ID_Usuario=?',[req.session.ID],(error, operador)=>{
                        if(error){
                            throw error
                        }else{
                            res.render('Operador/Config',{
                                usuario:usuario,
                                operador:operador
                            });
                            console.log("El usuario de "+"ID: "+ req.session.ID + " esta realizando una modificacion es sus datos.")
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser operador para continuar!",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: 'Login/'
            })
        }    
    }else {
		res.render('Login',{
			alert: true,
            alertTitle: "Error",
            alertMessage: "¡Debes iniciar sesión!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 1500,
            ruta: 'Login/'
		})
	}
});

router.post('/Config/Update/', OperadorController.config)

//5. Exportar las rutas
module.exports = router