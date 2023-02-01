//1. Crear a depencia de express
const express = require('express');
const conexion = require('../Database/env')
//2. Traer el controlador
const MantenimientoCECController = require('../controllers/Mantenimientos/MantenimientosCECController')
const MantenimientoCEPAController = require('../controllers/Mantenimientos/MantenimientosCEPAController')
const MantenimientoCETPController = require('../controllers/Mantenimientos/MantenimientosCETPController')
const MantenimientoCSController = require('../controllers/Mantenimientos/MantenimientosCSController')
const MantenimientoCCIController = require('../controllers/Mantenimientos/MantenimientosCCIController')
const MecanicoController = require('../controllers/MecanicoController')
//3. Definir la variable del router
const router = express.Router();
//4. Crear las rutas

router.get('', (req, res) => {
	if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
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
                                                                                            res.render('Mecanico/menu',{
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
                    alertMessage: "¡Debes ser mecanico para continuar!",
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

/* READ */
router.get('/ListaEC/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaec WHERE Mantenimiento=2',(error, listaec)=>{
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
                    conexion.query('SELECT * FROM SeccionesT ',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaEC/index',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas});
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.get('/ListaEC/MantenimientoCEC/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaec where Mantenimiento=1',(error, listaec)=>{
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
                    conexion.query('SELECT * FROM mantenimientocec',(error, mantenimientoc)=>{
                        if (error) {
                            throw error
                        }else{
                            res.render('Mecanico/ListaEC/Mantenimiento',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,mantenimientoc:mantenimientoc});
                        }
                    })
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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
            res.render('Mecanico/ListaEC/ListaVer',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec});
        }})}})}})}})}})}})}})}
    })
});

/* VER POR SEPARADO */
router.get('/ListaEC/MantenimientoCEC/Ver/:id', (req, res) => {
    const id = req.params.id
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
            conexion.query('SELECT * FROM mantenimientocec where ID=?',[id],(error, mantenimientoc)=>{
        if (error) {
            throw error
        }else{
            conexion.query('SELECT * FROM mecanico',(error, mecanico)=>{
        if (error) {
            throw error
        }else{
            conexion.query('SELECT * FROM mantenimientocec WHERE ID=?',[id],(error, mantenimientocec)=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaEC/MantenimientoVer',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec,mantenimientoc:mantenimientoc,mecanico:mecanico,mantenimientocec:mantenimientocec});
                }})
        }})}})}})}})}})}})}})}})}})}
    })
});

/* REALIZAR MANTENIMIENTO */
router.get('/ListaEC/MantenimientoCEC/:id', (req, res) => {
    const idmeca = req.session.ID
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaec where ID=?',[id],(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador where ID=?',[listaec[0].ID_Operador],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor Where ID=?',[listaec[0].ID_Supervisor],(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT Where ID=?',[listaec[0].ID_CentrosT],(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT Where ID_CentrosT=?',[CentrosT[0].ID],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas Where ID=?',[listaec[0].ID_Montacargas],(error, ID_Montacargas )=>{
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
                    conexion.query('SELECT * FROM mecanico Where ID_Usuario=?',[idmeca],(error, mecanico)=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaEC/MantenimientoC',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec,mecanico:mecanico});
                }})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.post('/ListaEC/MantenimientoCEC/Crear', MantenimientoCECController.save)


/* LISTA EPA */

/* READ */
router.get('/ListaEPA/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaepa WHERE Mantenimiento=2',(error, listaepa)=>{
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
                    conexion.query('SELECT * FROM SeccionesT ',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaEPA/index',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas});
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.get('/ListaEPA/MantenimientoCEPA/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaepa where Mantenimiento=1',(error, listaepa)=>{
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
                    conexion.query('SELECT * FROM mantenimientocepa',(error, mantenimientoc)=>{
                        if (error) {
                            throw error
                        }else{
                            res.render('Mecanico/ListaEPA/Mantenimiento',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,mantenimientoc:mantenimientoc});
                        }
                    })
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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
            res.render('Mecanico/ListaEPA/ListaVer',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa});
        }})}})}})}})}})}})}})}
    })
});

/* VER POR SEPARADO */
router.get('/ListaEPA/MantenimientoCEPA/Ver/:id', (req, res) => {
    const id = req.params.id
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
            conexion.query('SELECT * FROM mantenimientocepa where ID=?',[id],(error, mantenimientoc)=>{
        if (error) {
            throw error
        }else{
            conexion.query('SELECT * FROM mecanico',(error, mecanico)=>{
        if (error) {
            throw error
        }else{
            res.render('Mecanico/ListaEPA/MantenimientoVer',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa,mantenimientoc:mantenimientoc,mecanico:mecanico});
        }})}})}})}})}})}})}})}})}})}
    })
});

/* REALIZAR MANTENIMIENTO */
router.get('/ListaEPA/MantenimientoCEPA/:id', (req, res) => {
    const idmeca = req.session.ID
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaepa where ID=?',[id],(error, listaepa)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador where ID=?',[listaepa[0].ID_Operador],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor Where ID=?',[listaepa[0].ID_Supervisor],(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT Where ID=?',[listaepa[0].ID_CentrosT],(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT Where ID_CentrosT=?',[CentrosT[0].ID],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas Where ID=?',[listaepa[0].ID_Montacargas],(error, ID_Montacargas )=>{
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
                    conexion.query('SELECT * FROM mecanico Where ID_Usuario=?',[idmeca],(error, mecanico)=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaEPA/MantenimientoC',{ listaepa:listaepa,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudepa:reportedesolicitudepa,reportedecondicionesepa:reportedecondicionesepa,mecanico:mecanico});
                }})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.post('/ListaEPA/MantenimientoCEPA/Crear', MantenimientoCEPAController.save)

/* LISTA ETP */

/* READ */
router.get('/ListaETP/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaetp WHERE Mantenimiento=2',(error, listaetp)=>{
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
                    conexion.query('SELECT * FROM SeccionesT ',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{  
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaETP/index',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas});
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.get('/ListaETP/MantenimientoCETP/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaetp where Mantenimiento=1',(error, listaetp)=>{
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
                    conexion.query('SELECT * FROM mantenimientocetp',(error, mantenimientoc)=>{
                        if (error) {
                            throw error
                        }else{
                            res.render('Mecanico/ListaETP/Mantenimiento',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,mantenimientoc:mantenimientoc});
                        }
                    })
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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
            res.render('Mecanico/ListaETP/ListaVer',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp});
        }})}})}})}})}})}})}})}
    })
});

/* VER POR SEPARADO */
router.get('/ListaETP/MantenimientoCETP/Ver/:id', (req, res) => {
    const id = req.params.id
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
            conexion.query('SELECT * FROM mantenimientocetp where ID=?',[id],(error, mantenimientoc)=>{
        if (error) {
            throw error
        }else{
            conexion.query('SELECT * FROM mecanico',(error, mecanico)=>{
        if (error) {
            throw error
        }else{
            res.render('Mecanico/ListaETP/MantenimientoVer',{ listaetp:listaetp,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudetp:reportedesolicitudetp,reportedecondicionesetp:reportedecondicionesetp,mantenimientoc:mantenimientoc,mecanico:mecanico});
        }})}})}})}})}})}})}})}})}})}
    })
});

/* REALIZAR MANTENIMIENTO */
router.get('/ListaETP/MantenimientoCETP/:id', (req, res) => {
    const idmeca = req.session.ID
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaec where ID=?',[id],(error, listaec)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador where ID=?',[listaec[0].ID_Operador],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor Where ID=?',[listaec[0].ID_Supervisor],(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT Where ID=?',[listaec[0].ID_CentrosT],(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT Where ID_CentrosT=?',[CentrosT[0].ID],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas Where ID=?',[listaec[0].ID_Montacargas],(error, ID_Montacargas )=>{
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
                    conexion.query('SELECT * FROM mecanico Where ID_Usuario=?',[idmeca],(error, mecanico)=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaEC/MantenimientoC',{ listaec:listaec,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudec:reportedesolicitudec,reportedecondicionesec:reportedecondicionesec,mecanico:mecanico});
                }})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.post('/ListaETP/MantenimientoCETP/Crear', MantenimientoCETPController.save)


/* LISTA S*/

/* READ */
router.get('/ListaS/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listas WHERE Mantenimiento=2',(error, listas)=>{
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
                    conexion.query('SELECT * FROM SeccionesT ',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaS/index',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas});
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.get('/ListaS/MantenimientoCS/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listas where Mantenimiento=1',(error, listas)=>{
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
                    conexion.query('SELECT * FROM mantenimientocs',(error, mantenimientoc)=>{
                        if (error) {
                            throw error
                        }else{
                            res.render('Mecanico/ListaS/Mantenimiento',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,mantenimientoc:mantenimientoc});
                        }
                    })
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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
router.get('/ListaS/Ver/:id', (req, res) => {
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
            res.render('Mecanico/ListaS/ListaVer',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness});
        }})}})}})}})}})}})}})}
    })
});

/* VER POR SEPARADO */
router.get('/ListaS/MantenimientoCS/Ver/:id', (req, res) => {
    const id = req.params.id
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
            conexion.query('SELECT * FROM mantenimientocs where ID=?',[id],(error, mantenimientoc)=>{
        if (error) {
            throw error
        }else{
            conexion.query('SELECT * FROM mecanico',(error, mecanico)=>{
        if (error) {
            throw error
        }else{
            res.render('Mecanico/ListaS/MantenimientoVer',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness,mantenimientoc:mantenimientoc,mecanico:mecanico});
        }})}})}})}})}})}})}})}})}})}
    })
});

/* REALIZAR MANTENIMIENTO */
router.get('/ListaS/MantenimientoCS/:id', (req, res) => {
    const idmeca = req.session.ID
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listas where ID=?',[id],(error, listas)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador where ID=?',[listas[0].ID_Operador],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor Where ID=?',[listas[0].ID_Supervisor],(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT Where ID=?',[listas[0].ID_CentrosT],(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT Where ID_CentrosT=?',[CentrosT[0].ID],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas Where ID=?',[listas[0].ID_Montacargas],(error, ID_Montacargas )=>{
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
                    conexion.query('SELECT * FROM mecanico Where ID_Usuario=?',[idmeca],(error, mecanico)=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaS/MantenimientoC',{ listas:listas,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicituds:reportedesolicituds,reportedecondicioness:reportedecondicioness,mecanico:mecanico});
                }})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.post('/ListaS/MantenimientoCS/Crear', MantenimientoCSController.save)

/* LISTA CI */

/* READ */
router.get('/ListaCI/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaci WHERE Mantenimiento=2',(error, listaci)=>{
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
                    conexion.query('SELECT * FROM SeccionesT ',(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas',(error, ID_Montacargas )=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaCI/index',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas});
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.get('/ListaCI/MantenimientoCCI/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaci where Mantenimiento=1',(error, listaci)=>{
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
                    conexion.query('SELECT * FROM mantenimientocci',(error, mantenimientoc)=>{
                        if (error) {
                            throw error
                        }else{
                            res.render('Mecanico/ListaCI/Mantenimiento',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,mantenimientoc:mantenimientoc});
                        }
                    })
                }})}})}})}})} })}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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
router.get('/ListaCI/Ver/:id', (req, res) => {
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
            res.render('Mecanico/ListaCI/ListaVer',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci});
        }})}})}})}})}})}})}})}
    })
});

/* VER POR SEPARADO */
router.get('/ListaCI/MantenimientoCCI/Ver/:id', (req, res) => {
    const id = req.params.id
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
            conexion.query('SELECT * FROM mantenimientocci where ID=?',[id],(error, mantenimientoc)=>{
        if (error) {
            throw error
        }else{
            conexion.query('SELECT * FROM mecanico',(error, mecanico)=>{
        if (error) {
            throw error
        }else{
            res.render('Mecanico/ListaCI/MantenimientoVer',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci,mantenimientoc:mantenimientoc,mecanico:mecanico});
        }})}})}})}})}})}})}})}})}})}
    })
});

/* REALIZAR MANTENIMIENTO */
router.get('/ListaCI/MantenimientoCCI/:id', (req, res) => {
    const idmeca = req.session.ID
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM listaci where ID=?',[id],(error, listaci)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM operador where ID=?',[listaci[0].ID_Operador],(error, operador)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Supervisor Where ID=?',[listaci[0].ID_Supervisor],(error, supervisor)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM CentrosT Where ID=?',[listaci[0].ID_CentrosT],(error, CentrosT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM SeccionesT Where ID_CentrosT=?',[CentrosT[0].ID],(error, SeccionesT)=>{
                if (error) {
                    throw error
                }else{
                    conexion.query('SELECT * FROM Montacargas Where ID=?',[listaci[0].ID_Montacargas],(error, ID_Montacargas )=>{
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
                    conexion.query('SELECT * FROM mecanico Where ID_Usuario=?',[idmeca],(error, mecanico)=>{
                if (error) {
                    throw error
                }else{
                    res.render('Mecanico/ListaCI/MantenimientoC',{ listaci:listaci,operador:operador,supervisor:supervisor,CentrosT:CentrosT,SeccionesT:SeccionesT,ID_Montacargas:ID_Montacargas,id,reportedesolicitudci:reportedesolicitudci,reportedecondicionesci:reportedecondicionesci,mecanico:mecanico});
                }})}})}})}})}})}})}})}})}
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser mecanico para continuar!",
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

router.post('/ListaCI/MantenimientoCCI/Crear', MantenimientoCCIController.save)

// Configuraciones 
router.get('/Config/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 3) {
            conexion.query('SELECT * FROM usuarios Where ID=?',[req.session.ID],(error, usuario)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM mecanico where ID_Usuario=?',[req.session.ID],(error, mecanico)=>{
                if(error){
                    throw error
                }else{
                    res.render('Mecanico/Config',{
                        usuario:usuario,
                        mecanico:mecanico
                    });
                    console.log("El usuario de "+"ID: "+ req.session.ID + " esta realizando una modificacion es sus datos.")
                }})}})
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

router.post('/Config/Update', MecanicoController.config)

//5. Exportar las rutas
module.exports = router