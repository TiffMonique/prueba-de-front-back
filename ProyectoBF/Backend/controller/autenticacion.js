//Autenticación del login

const express = require("express");
const app = express();
const bcryptjs = require('bcryptjs');
const pool = require("../database/database");
const auth = require("./sesiones.js");

const login= async (req, res)=>{
    const {correo, pass} = req.body;
    const valores = [correo, pass]
    console.log(req.body);
    await pool.query("SELECT * FROM Usuarios WHERE correo = ?", [correo], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            if(result.length > 0){
                console.log("len >0");
                console.log(result)
                const comparacion = bcryptjs.compareSync(pass, result[0].pass);
                if(comparacion) {
                    req.session.ingresado = true;
                    req.session.user = correo;
                    req.session.admin = false;
                    console.log(req.session);
                    res.status(200).json({
                        message: "Autenticado"
                    });
                } else {
                    res.status(400).json({
                        message: "Usuario o contraseña incorrecta"
                    })
                }
            }else{
                res.status(400).json({
                    message: "Usuario o contraseña incorrecta"
                })
            }
        }
    })
}

app.post('/prueba', auth, async(req, res) => {
    res.send("Entra!!!");
});

module.exports = {login};
