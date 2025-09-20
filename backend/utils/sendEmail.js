import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS }
});

export async function sendEmail(type, to, data) {
    let subject, html, text;

    switch (type) {
        //  await sendEmail("verify", user.email, { code: "123456" });
        case "verify":
            subject = "Verify your email";
            text = `Your verification code is ${data.code}`;
            html = `<p>Your verification code is <b>${data.code}</b></p>`;
            break;

        // case "resetPassword":
        //     subject = "Reset your password";
        //     text = `Click this link to reset your password: ${data.resetUrl}`;
        //     html = `<p>Click <a href="${data.resetUrl}">here</a> to reset your password</p>`;
        //     break;

        //  await sendEmail("chargingInfo", user.email, { amount: "$20", balance: "$80" });
        case "chargingInfo":
            subject = "Charging and Price Info";
            text = `Your last charge: ${data.amount}. Balance: ${data.balance}`;
            html = `<p>Your last charge: <b>${data.amount}</b><br/>Balance: <b>${data.balance}</b></p>`;
            break;

        default:
            throw new Error("Unknown email type");
    }

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    });
}
