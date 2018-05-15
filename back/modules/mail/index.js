import sgMail from '@sendgrid/mail';

const sendMail = (receiverID, content) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  content.to = receiverID;
  sgMail.send(content);
};

export default sendMail;
