//1. Crear a depencia de express
const express = require('express');
const conexion = require('../Database/env')
//2. Traer el controlador
const UsuarioController = require('../controllers/Admin/UsuarioController')
const AdministradorController = require('../controllers/AdministradorController')
const CentrosController = require('../controllers/CentrosController')
const SeccionesTAdminController = require('../controllers/Admin/SeccionesController')
const SupervisorController = require('../controllers/SupervisorController')
const MontacargasController = require('../controllers/Admin/MontacargasController')
const MecanicoController = require('../controllers/Admin/MecanicoController')
//3. Definir la variable del router
const router = express.Router();
//4. Crear las rutas

/* Menu */
router.get('', (req, res) => {
	if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
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
                                                                                            res.render('Administrador/menu',{
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
                    alertMessage: "¡Debes ser supervisor para continuar!",
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

//Usuario
//Crear
router.post('/Usuarios/Crea/Save/', UsuarioController.save)
//READ
router.get('/Usuarios/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM usuarios' ,(error, usuarios)=>{
                if (error) {
                   throw error
                } else {
                    res.render('Administrador/Usuario/',{  
                        usuarios:usuarios
                    });
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
//EDITAR
router.get('/Usuarios/Editar/:id', (req, res) => {
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM usuarios WHERE ID=?',[id] ,(error, usuarios)=>{
                if (error) {
                   throw error
                } else {
                    res.render('Administrador/Usuario/Editar',{  
                        usuarios:usuarios
                    });
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser administrador para continuar!",
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
router.post('/Usuarios/Editar/Update', UsuarioController.update)

router.get('/Usuarios/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE usuarios SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/Usuarios/');
        }
    })
})
//Fin Usuario

//Supervisor
//Crear
router.post('/Supervisor/Crea/Save/', SupervisorController.save)
//READ
router.get('/Supervisor/', (req, res) => {
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM supervisor',(error, supervisor)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM usuarios WHERE Estado=1 AND Asignado=2',(error, usuarios)=>{
                        if (error) {
                           throw error
                        } else {
                            conexion.query('SELECT * FROM supervisor' ,(error, supervisor)=>{
                                if (error) {
                                   throw error
                                } else {
                                    conexion.query('SELECT * FROM centrost' ,(error, centros)=>{
                                        if (error) {
                                           throw error
                                        } else {
                                            conexion.query('SELECT * FROM usuarios' ,(error, usuario)=>{
                                                if (error) {
                                                   throw error
                                                } else {
                                                    res.render('Administrador/Supervisor/',{
                                                        supervisor:supervisor,
                                                        usuarios:usuarios,
                                                        usuario:usuario,
                                                        centros:centros
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
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser supervisor para continuar!",
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
//EDITAR
router.get('/Supervisor/Editar/:id', (req, res) => {
    const id = req.params.id
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM supervisor WHERE ID=?',[id],(error, supervisor)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM usuarios WHERE ID=?',[supervisor[0].ID_Usuario],(error, usuarios)=>{
                        if (error) {
                           throw error
                        } else {
                            conexion.query('SELECT * FROM centrost WHERE ID=?',[supervisor[0].ID_Centro] ,(error, centros)=>{
                                if (error) {
                                   throw error
                                } else {
                                    res.render('Administrador/Supervisor/Editar',{
                                        supervisor:supervisor,
                                        usuarios:usuarios,
                                        centros:centros
                                    }); 
                                }
                            })
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
router.post('/Supervisor/Editar/Update', SupervisorController.update)

router.get('/Supervisor/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE supervisor SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/Supervisor/');
        }
    })
})
//Fin supervisor

//Administrador
//Crear
router.post('/Administrador/Crea/Save/', AdministradorController.save)
//READ
router.get('/Administrador/', (req, res) => {
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM Administrador',(error, Administrador)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM usuarios WHERE Estado=1 AND Asignado=2',(error, usuarios)=>{
                        if (error) {
                           throw error
                        } else {
                            conexion.query('SELECT * FROM usuarios' ,(error, usuario)=>{
                                if (error) {
                                   throw error
                                } else {
                                    res.render('Administrador/Administrador/',{
                                        Administrador:Administrador,
                                        usuarios:usuarios,
                                        usuario:usuario
                                    }); 
                                }
                            })
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser supervisor para continuar!",
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
//EDITAR
router.get('/Administrador/Editar/:id', (req, res) => {
    const id = req.params.id
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM administrador WHERE ID=?',[id],(error, administrador)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM usuarios WHERE ID=?',[administrador[0].ID_Usuario],(error, usuarios)=>{
                        if (error) {
                           throw error
                        } else {
                            res.render('Administrador/Administrador/Editar',{
                                administrador:administrador,
                                usuarios:usuarios
                            }); 
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
router.post('/Administrador/Editar/Update', AdministradorController.update)

router.get('/Administrador/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE administrador SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/Administrador/');
        }
    })
})
//Fin Administrador

//CentroT
//Crear
router.post('/CentrosT/Crea/Save/', CentrosController.save)
//READ
router.get('/CentrosT/', (req, res) => {
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM CentrosT',(error, CentrosT)=>{
                if (error) {
                   throw error
                } else {
                    res.render('Administrador/CentrosT/',{
                        CentrosT:CentrosT
                    });
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser administrador para continuar!",
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
//EDITAR
router.get('/CentrosT/Editar/:id', (req, res) => {      
    const id = req.params.id
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM Centrost WHERE ID=?',[id],(error, CentrosT)=>{
                if (error) {
                   throw error
                } else {
                    res.render('Administrador/CentrosT/Editar',{
                        CentrosT:CentrosT
                    }); 
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
router.post('/CentrosT/Editar/Update', CentrosController.update)

router.get('/CentrosT/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE centrost SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/CentrosT/');
        }
    })
})
//Fin CentroT

//Secciones
//Crear
router.post('/SeccionesT/Crea/Save/', SeccionesTAdminController.save)
//READ
router.get('/SeccionesT/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM centrost Where Estado=1',(error, centros)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM seccionest',(error, seccionest)=>{
                        if (error) {
                           throw error
                        } else {
                            res.render('Administrador/Secciones/',{
                                seccionest:seccionest,
                                centros:centros
                            });
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser administrador para continuar!",
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
//EDITAR
router.get('/SeccionesT/Editar/:id', (req, res) => {
    const id = req.params.id
    idsup = req.session.ID
        if (req.session.loggedin) {
            if (req.session.Cargo == 5) {
                conexion.query('SELECT * FROM seccionest Where ID=?',[[id]],(error, seccionest)=>{
                    if (error) {
                       throw error
                    } else {
                        conexion.query('SELECT * FROM centrost Where ID=?',[seccionest[0].ID_CentrosT],(error, centros)=>{
                            if (error) {
                               throw error
                            } else {
                                res.render('Administrador/Secciones/Editar',{
                                    seccionest:seccionest,
                                    centros:centros
                                });
                            }
                        })
                    }
                })
            }else {
                res.render('Login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "¡Debes ser administrador para continuar!",
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
router.post('/SeccionesT/Editar/Update', SeccionesTAdminController.update)

router.get('/SeccionesT/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE Seccionest SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/SeccionesT/');
        }
    })
})
//Fin Secciones

//Mecanico
//Crear
router.post('/Mecanicos/Crea/Save/', MecanicoController.save)
//READ
router.get('/Mecanicos/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM usuarios WHERE Asignado=2 AND Estado=1' ,(error, usuarios)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM mecanico' ,(error, mecanicos)=>{
                        if (error) {
                           throw error
                        } else {
                            conexion.query('SELECT * FROM usuarios' ,(error, usuario)=>{
                                if (error) {
                                   throw error
                                } else {
                                    res.render('Administrador/Mecanico/',{  
                                        usuarios:usuarios,
                                        mecanicos:mecanicos,
                                        usuario:usuario
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
//EDITAR
router.get('/Mecanicos/Editar/:id', (req, res) => { 
    const id = req.params.id
    idsup = req.session.ID
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM mecanico WHERE ID=?',[id],(error, mecanico)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM usuarios',(error, usuarios)=>{
                        if (error) {
                           throw error
                        } else {
                            res.render('Administrador/Mecanico/Editar',{
                                mecanico:mecanico,
                                usuarios:usuarios
                            });
                        }
                    })
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
router.post('/Mecanicos/Editar/Update', MecanicoController.update)

router.get('/Mecanicos/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE mecanico SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/Mecanicos/');
        }
    })
})
//Fin Mecanico

// MONTACARGAS
//Crear
router.post('/Montacargas/Crea/Save/', MontacargasController.save)
//READ
router.get('/Montacargas/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM montacargas',(error, montacargas)=>{
                if (error) {
                   throw error
                } else {
                    res.render('Administrador/Montacargas/',{
                        montacargas:montacargas
                    });
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser Administrador para continuar!",
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
//EDITAR
router.get('/Montacargas/Editar/:id', (req, res) => {
    const id = req.params.id
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM montacargas WHERE ID=?',[id],(error, montacargas)=>{
                if (error) {
                   throw error
                } else {
                    res.render('Administrador/Montacargas/Editar',{
                        montacargas:montacargas
                    });
                }
            })
        }else {
            res.render('Login',{
                alert: true,
                alertTitle: "Error",
                alertMessage: "¡Debes ser supervisor para continuar!",
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
router.post('/Montacargas/Editar/Update', MontacargasController.update)

router.get('/Montacargas/Borrar/:id',(req, res)=>{
    const id = req.params.id
    conexion.query('UPDATE montacargas SET Estado=2 WHERE ID=?',[id], (error, results)=>{
        if (error) {
            throw error
        } else {
            res.redirect('/Administrador/Montacargas/');
        }
    })
})
//FIN MONTACARGAS



// Configuraciones 
router.get('/Config/', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.Cargo == 5) {
            conexion.query('SELECT * FROM usuarios Where ID=?',[req.session.ID],(error, usuario)=>{
                if (error) {
                   throw error
                } else {
                    conexion.query('SELECT * FROM Administrador where ID_Usuario=?',[req.session.ID],(error, supervisor)=>{
                        if(error){
                            throw error
                        }else{
                            res.render('Administrador/Config',{
                                usuario:usuario,
                                supervisor:supervisor
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
                alertMessage: "¡Debes ser supervisor para continuar!",
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

router.post('/Config/Update/', AdministradorController.config)

//5. Exportar las rutas
module.exports = router