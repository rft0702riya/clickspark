import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // you can change to SMTP if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =============================
// 1. Confirmation Email to User
// =============================
export const sendContactConfirmation = async (contact) => {
  try {
    await transporter.sendMail({
      from: `"ClickSpark Team" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: "We received your message ✅",
      text: `Hi ${contact.firstName}, thanks for reaching out to us. Our team will get back to you shortly.`,
      html: `
        <p>Hi <b>${contact.firstName}</b>,</p>
        <p>Thanks for contacting <b>ClickSpark</b>. We’ve received your message and our team will respond soon.</p>
        <p><i>Your submitted message:</i><br/>${contact.message}</p>
        <br/>
        <p>Best Regards,<br/>ClickSpark Team</p>
      `,
    });

    console.log(`✅ Confirmation email sent to ${contact.email}`);
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error);
  }
};

// =============================
// 2. Admin Notification Email
// =============================
export const sendAdminNotification = async (contact) => {
  try {
    await transporter.sendMail({
      from: `"ClickSpark System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // set this in your .env
      subject: "📩 New Contact Form Submission",
      text: `
        New contact form submission:

        Name: ${contact.firstName} ${contact.lastName}
        Email: ${contact.email}
        Phone: ${contact.phone}
        Company: ${contact.company}
        Website: ${contact.website}
        Revenue: ${contact.revenue}
        Country: ${contact.country}

        Message: ${contact.message}
      `,
      html: `
        <h2>📩 New Contact Submission</h2>
        <p><b>Name:</b> ${contact.firstName} ${contact.lastName}</p>
        <p><b>Email:</b> ${contact.email}</p>
        <p><b>Phone:</b> ${contact.phone}</p>
        <p><b>Company:</b> ${contact.company}</p>
        <p><b>Website:</b> ${contact.website}</p>
        <p><b>Revenue:</b> ${contact.revenue}</p>
        <p><b>Country:</b> ${contact.country}</p>
        <p><b>Message:</b><br/>${contact.message}</p>
      `,
    });

    console.log(`✅ Admin notification email sent to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error("❌ Error sending admin email:", error);
  }
};
