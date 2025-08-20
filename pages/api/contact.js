import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, category, message } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: '이름/연락처는 필수입니다.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"GAON Website" <${process.env.EMAIL_USER}>`,
      to,
      subject: `상담요청: ${name} (${phone})`,
      text: `이름: ${name}
연락처: ${phone}
구분: ${category || ''}
내용:
${message || ''}`
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
