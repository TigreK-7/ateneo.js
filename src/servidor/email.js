const nodemailer = require("nodemailer");

class Email {
    constructor(oConfig) {
        this.transporter = nodemailer.createTransport(oConfig);
    }

    enviarCorreo(oEmail) {
        try {
            const transporter = this.transporter; // guarda la referencia
            transporter.sendMail(oEmail, function (error, info) {
                if (error) {
                    console.log("Error al enviar email:", error);
                } else {
                    console.log("Correo enviado correctamente:", info.response);
                }
                transporter.close(); // esto ahora funciona correctamente
            });
        } catch (x) {
            console.log("Email.enviarCorreo -- Error --", x);
        }
    }
}

module.exports = Email;
