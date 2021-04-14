import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
export class EmailBusiness {
	SendMail(to: string, subject: string, message: string) {
		var mailer = createTransport({
			service: "gmail",
			auth: {
				user: "serviciosrational@gmail.com",
				pass: "$lcs1648_*"
			}
		});

		var mailOpt = {
			from: "serviciosrational@gmail.com",
			to: to,
			subject: subject,
			text: message
		};

		mailer.sendMail(mailOpt, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}

	SendMailNewServicio(nombre: string, to: string, servicio: string) {
		var mailer = createTransport({
			service: "gmail",
			auth: {
				user: "serviciosrational@gmail.com",
				pass: "$lcs1648_*"
			}
		});
		var messageHtml = "Estimado usuario " + nombre;
		messageHtml += "<br><br>Recibimos su solicitud de <b>" + servicio + "</b> para ser asignado a un proveedor de nuestro equipo.";
		messageHtml += "<br><br>En momentos recibirá información detallada del colaborador que atenderá su servicio";
		messageHtml += "<br><br>Recuerda que puedes consultar el estado de tus servicios en la sección \"Servicios\"";
		messageHtml += "</b><br>----<br>Equipo AppSistonio \n\r";

		var mailOpt = {
			from: "serviciosrational@gmail.com",
			to: to,
			subject: "Soliciud de servicio",
			html: messageHtml
		};

		mailer.sendMail(mailOpt, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}

	SendMailPagRechazado(nombre: string, to: string) {
		var mailer = createTransport({
			service: "gmail",
			auth: {
				user: "serviciosrational@gmail.com",
				pass: "$lcs1648_*"
			}
		});
		var messageHtml = "Estimado usuario " + nombre;
		messageHtml += "<br><br>Su pago ha sido rechazado.";
		messageHtml += "<br><br>Por favor verifique sus datos y puede reintentar el pago desde la opcion \"Mis Servicios\"";
		messageHtml += "</b><br>----<br>Equipo AppSistonio \n\r";

		var mailOpt = {
			from: "serviciosrational@gmail.com",
			to: to,
			subject: "Pago rechazado",
			html: messageHtml
		};

		mailer.sendMail(mailOpt, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}

	SendMailAsigando(nombre: string, to: string, fechaEnvio: string) {
		var mailer = createTransport({
			service: "gmail",
			auth: {
				user: "serviciosrational@gmail.com",
				pass: "$lcs1648_*"
			}
		});

		var messageHtml = "Estimado usuario " + nombre;
		messageHtml += "<br><br>Tu pedido ya esta asignado y se ejecutara el " + fechaEnvio + " ";
		messageHtml += "<br><br>Recuerda que puedes consultar el estado de tus pedidos en la sección \"Mis pedidos\"";
		messageHtml += "</b><br>----<br>Equipo AppSistonio \n\r";

		var mailOpt = {
			from: "serviciosrational@gmail.com",
			to: to,
			subject: "Pedido en ruta.",
			html: messageHtml
		};

		mailer.sendMail(mailOpt, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}

	SendMailTerminado(nombre: string, to: string) {
		var mailer = createTransport({
			service: "gmail",
			auth: {
				user: "serviciosrational@gmail.com",
				pass: "$lcs1648_*"
			}
		});

		var messageHtml = "Estimado usuario " + nombre;
		messageHtml += "<br><br>Tu pedido ya esta fue ejecutado. ";
		messageHtml += "<br><br>Recuerda que puedes consultar el estado de tus pedidos en la sección \"Mis pedidos\"";
		messageHtml += "</b><br>----<br>Equipo AppSistonio \n\r";

		var mailOpt = {
			from: "serviciosrational@gmail.com",
			to: to,
			subject: "Pedido en ruta.",
			html: messageHtml
		};

		mailer.sendMail(mailOpt, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	}
}
