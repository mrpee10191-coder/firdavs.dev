import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'messages.json')

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL

const emailEnabled = Boolean(RESEND_API_KEY && CONTACT_TO_EMAIL)
const resend = emailEnabled ? new Resend(RESEND_API_KEY) : null

if (!emailEnabled) {
  console.warn('[mail] RESEND_API_KEY / CONTACT_TO_EMAIL not set in .env — emails will NOT be sent, only saved locally.')
}

const app = express()
app.use(cors())
app.use(express.json())

async function readMessages() {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function saveMessage(entry) {
  const messages = await readMessages()
  messages.push(entry)
  await writeFile(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8')
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {}
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required' })
  }

  const entry = { name, email, message, receivedAt: new Date().toISOString() }

  try {
    await saveMessage(entry)
  } catch (err) {
    console.error('[storage] Failed to save message:', err)
  }

  if (resend) {
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
    } catch (err) {
      console.error('[mail] Failed to send email:', err)
      return res.status(502).json({ ok: false, error: 'email_send_failed' })
    }
  } else {
    console.log(`[contact] (email disabled) message from ${name} <${email}> saved locally only`)
  }

  res.json({ ok: true })
})

app.get('/api/contact', async (_req, res) => {
  res.json(await readMessages())
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, emailEnabled })
})

const PORT = process.env.API_PORT || 3001
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
  console.log(`Email sending: ${emailEnabled ? 'ENABLED (Resend)' : 'DISABLED (set RESEND_API_KEY / CONTACT_TO_EMAIL in .env)'}`)
})
