import nodemailer from 'nodemailer';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });
  try {
    const { name='', phone='', type='', memo='', origin='', keyword='' } = req.body || {};
    if (!name || !phone) return res.status(400).json({ ok:false, error:'name/phone required' });

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to   = process.env.EMAIL_TO || user;

    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    const text = [
      '손해사정사무소 가온 - 상담 요청',
      '--------------------------------',
      `이름: ${name}`,
      `연락처: ${phone}`,
      `유형: ${type}`,
      `키워드: ${keyword}`,
      `유입경로: ${origin || '웹사이트'}`,
      '--------------------------------',
      memo || '(메모 없음)'
    ].join('\n');

    await transporter.sendMail({
      from: `"가온 상담봇" <${user}>`,
      to,
      subject: `가온 상담요청 - ${name} / ${phone}`,
      text
    });
    return res.status(200).json({ ok:true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, error: 'send_failed' });
  }
}
