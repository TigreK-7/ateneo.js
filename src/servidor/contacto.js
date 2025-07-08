const mysql = require("mysql");

class Contacto {
    constructor(oConfig) {
        this.oConfig = oConfig;
    }

    /**
     * Recibe un correo y nombre y si no existe en la base de datos lo inserta
     */
    agregarUsuario(nombre, correo) {
        const con = mysql.createConnection(this.oConfig);

        con.connect((error) => {
            try {
                if (error) {
                    console.error("Error al establecer la conexión a la BD:", error);
                } else {
                    console.log("Conexión exitosa");

                    con.query(`SELECT COUNT(*) AS USUARIO FROM USUARIOS WHERE correo = '${correo}'`,function(error, res, campo){
                        if (error) {
                            console.error("Error en SELECT BD:", error);
                        } else {
                            console.log("Resultado del SELECT:", res);
                            const cantidad = parseInt(res[0].USUARIO);

                            console.log("Usuarios encontrados:", cantidad);

                            if (cantidad === 0) {
                                console.log("Insertando nuevo usuario...");

                                const sql = "INSERT INTO usuarios (nombre, correo) VALUES (?, ?)";
                                con.query(sql, [nombre, correo], (error, res, campo) => {
                                    if (error) {
                                        console.error("Error al insertar nuevo usuario en BD:", error);
                                    } else {
                                        console.log("Nuevo usuario registrado");
                                    }
                                });
                            }
                        }
                    });
                }
            } catch (x) {
                console.error("Contacto.agregarUsuario.connect -- Error --", x);
            }
        });
    }
}

module.exports = Contacto;
