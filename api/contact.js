import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL

const emailEnabled = Boolean(RESEND_API_KEY && CONTACT_TO_EMAIL)
const resend = emailEnabled ? new Resend(RESEND_API_KEY) : null

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const { name, email, message } = req.body ?? {}
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required' })
  }

  if (!emailEnabled) {
    console.warn('[mail] RESEND_API_KEY / CONTACT_TO_EMAIL not set in Vercel env vars — email not sent')
    return res.status(200).json({ ok: true, emailSent: false })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Новое сообщение от ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\n\nСообщение:\n${message}`,
      html: `
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    console.log(`[mail] Sent message from ${name} <${email}> to ${CONTACT_TO_EMAIL}`)
    return res.status(200).json({ ok: true, emailSent: true })
  } catch (err) {
    console.error('[mail] Failed to send email:', err)
    return res.status(502).json({ ok: false, error: 'email_send_failed' })
  }
}
