import * as nodemailer from "nodemailer";
import config from '../config/config';

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string,
  ) { }

  sendMail() {
    const mailOptions = {
      from: '<josematias.dev@gmail.com> Relicário | Redefinição de senha',
      to: this.to,
      subject: this.subject,
      html: this.message
    };

    const transporter = nodemailer.createTransport({
      host: String(config.NodeMailer.host),
      port: Number(config.NodeMailer.port),
      secure: false,
      auth: {
        user: String(config.NodeMailer.user),
        pass: String(config.NodeMailer.pass),
      },
      tls: { rejectUnauthorized: false }
    });

    const teste = transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return error;
      } else {
        return "Email successfully sent";
      }
    });
  }
}

export default new Mail;
