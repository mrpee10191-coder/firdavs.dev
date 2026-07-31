import React, { useState, useEffect, useRef, createContext, useContext } from 'react'

// ─── Theme & Language context ─────────────────────────────────────────────────

type Theme = 'dark' | 'light'
type Lang = 'en' | 'ru' | 'uz'

const ThemeCtx = createContext<{ theme: Theme; toggle: (el?: HTMLElement) => void }>({ theme: 'dark', toggle: () => {} })
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

function useTheme() { return useContext(ThemeCtx) }
function useLang() { return useContext(LangCtx) }

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    available: 'AVAILABLE FOR WORK · REMOTE',
    role: 'Frontend Developer · Software Engineer',
    heroBio: "I build interfaces with React and TypeScript, with a focus on clean code and interfaces that feel right to use. PROWEB-certified frontend developer, currently growing from junior toward middle level through hands-on projects.",
    viewWork: 'VIEW WORK',
    getInTouch: 'GET IN TOUCH',
    stats: ['Projects built', 'Months of training', 'Certificate earned', 'Lessons completed'],
    aboutLabel: 'About',
    aboutTitle: ['Interfaces that feel', 'as good as they', 'look.'],
    aboutP1: "I'm a frontend developer who cares equally about the code and what it produces on screen. I completed a 7-month Frontend Development course at PROWEB and have since been building real projects with React and TypeScript to push my skills from junior toward middle level.",
    aboutP2: "I focus on writing clean, maintainable components, learning best practices around accessibility and performance, and steadily taking on more complex projects.",
    expLabel: 'Education',
    projectsLabel: 'Projects',
    projectsTitle: 'Selected work',
    allProjects: 'ALL PROJECTS →',
    skillsLabel: 'Skills',
    skillsTitle: 'Tech stack',
    contactLabel: 'Contact',
    contactTitle: ['Let\'s build', 'something fast.'],
    contactBio: 'Open to senior frontend roles, design-system consulting, and interesting open-source collaboration. Response time: usually within 24h.',
    formName: 'NAME', formEmail: 'EMAIL', formMsg: 'MESSAGE',
    namePlaceholder: 'Your name', emailPlaceholder: 'you@company.com', msgPlaceholder: 'Tell me about what you\'re building...',
    send: 'SEND MESSAGE →',
    sentTitle: 'Message sent!', sentSub: "I'll get back to you within 24 hours.",
    sendAnother: 'SEND ANOTHER',
    footerBuilt: 'Built with React + Vite + Tailwind CSS',
    footerHH: 'Go to hh.uz →',
    nav: { About: 'About', Projects: 'Projects', Skills: 'Skills', Contact: 'Contact' },
    projects: [
      { desc: 'Landing page for a sleep-tracking concept, built as a practice project during my PROWEB frontend course.' },
      { desc: 'A shoe store landing inspired by Nike, focused on responsive layout and clean product presentation.' },
      { desc: 'A clock app combining a live clock, countdown timer, and stopwatch in one interface.' },
    ],
    experience: [
      { role: 'Frontend Development Course', company: 'PROWEB, Tashkent', desc: '7-month course, 64 lessons. Covered HTML, CSS, JavaScript, TypeScript, and React fundamentals. Certificate ID 15461, issued July 6, 2026.' },
      { role: 'Python Course', company: 'PROWEB, Tashkent', desc: '2-month introductory course on the PROWEB Backend Python track: Python basics, variables, conditionals, loops, lists, dictionaries and functions, plus an introduction to functional and object-oriented programming.' },
      { role: 'Digital Information Processing Technician', company: 'College No. 1, Chilanzar District, Tashkent', desc: 'Full-time vocational program. Enrolled in 2026, expected graduation in 2028.' },
    ],
  },
  ru: {
    available: 'ОТКРЫТ К РАБОТЕ · УДАЛЁННО',
    role: 'Frontend-разработчик · Software Engineer',
    heroBio: 'Создаю интерфейсы на React и TypeScript, с вниманием к чистоте кода и удобству использования. Сертифицированный frontend-разработчик (PROWEB), сейчас расту от junior к middle уровню на реальных проектах.',
    viewWork: 'СМОТРЕТЬ РАБОТЫ',
    getInTouch: 'НАПИСАТЬ МНЕ',
    stats: ['Проектов сделано', 'Месяцев обучения', 'Сертификат получен', 'Уроков пройдено'],
    aboutLabel: 'Обо мне',
    aboutTitle: ['Интерфейсы, которые', 'ощущаются так же хорошо,', 'как выглядят.'],
    aboutP1: 'Я frontend-разработчик, которому одинаково важны код и то, что он производит на экране. Прошёл 7-месячный курс Frontend Development в PROWEB и с тех пор делаю реальные проекты на React и TypeScript, чтобы вырасти от junior к middle уровню.',
    aboutP2: 'Фокусируюсь на чистых, поддерживаемых компонентах, изучаю best practices по доступности и производительности, постепенно берусь за более сложные проекты.',
    expLabel: 'Образование',
    projectsLabel: 'Проекты',
    projectsTitle: 'Избранные работы',
    allProjects: 'ВСЕ ПРОЕКТЫ →',
    skillsLabel: 'Навыки',
    skillsTitle: 'Технологии',
    contactLabel: 'Контакт',
    contactTitle: ['Давайте создадим', 'что-то быстрое.'],
    contactBio: 'Рассматриваю senior frontend-вакансии, консультирование по дизайн-системам и интересное open-source сотрудничество. Отвечаю обычно в течение 24 часов.',
    formName: 'ИМЯ', formEmail: 'EMAIL', formMsg: 'СООБЩЕНИЕ',
    namePlaceholder: 'Ваше имя', emailPlaceholder: 'вы@компания.ru', msgPlaceholder: 'Расскажите, что вы создаёте...',
    send: 'ОТПРАВИТЬ →',
    sentTitle: 'Сообщение отправлено!', sentSub: 'Отвечу в течение 24 часов.',
    sendAnother: 'ОТПРАВИТЬ ЕЩЁ',
    footerBuilt: 'Создано на React + Vite + Tailwind CSS',
    footerHH: 'Перейти на hh.uz →',
    nav: { About: 'Обо мне', Projects: 'Проекты', Skills: 'Навыки', Contact: 'Контакт' },
    projects: [
      { desc: 'Лендинг для сон-трекера — учебный проект, сделанный во время курса Frontend Development в PROWEB.' },
      { desc: 'Лендинг обувного магазина в стиле Nike, с акцентом на адаптивную вёрстку и чистую подачу товара.' },
      { desc: 'Приложение с часами, таймером и секундомером в одном интерфейсе.' },
    ],
    experience: [
      { role: 'Курс Frontend Development', company: 'PROWEB, Ташкент', desc: '7-месячный курс, 64 урока. Изучил HTML, CSS, JavaScript, TypeScript и основы React. Сертификат ID 15461, выдан 6 июля 2026.' },
      { role: 'Курс Python', company: 'PROWEB, Ташкент', desc: 'Вводный курс на направлении Backend-разработка на Python. 2 месяца обучения: основы Python — переменные, условия, циклы, списки, словари, функции, а также начало функционального и объектно-ориентированного программирования.' },
      { role: 'Мастер по обработке цифровой информации', company: 'Колледж №1 Чиланзарского района, Ташкент', desc: 'Очное обучение по специальности. Поступил в 2026 году, окончание — в 2028 году.' },
    ],
  },
  uz: {
    available: 'ISH UCHUN OCHIQ · MASOFAVIY',
    role: 'Yuqori darajali Frontend muhandis · Dizayn tizimlar · Veb-unumdorlik',
    heroBio: "React va TypeScript'da interfeyslar yarataman, toza kod va qulay foydalanishga e'tibor bilan. PROWEB sertifikatiga ega frontend dasturchi, hozirda amaliy loyihalar orqali junior'dan middle darajasiga o'sib bormoqdaman.",
    viewWork: 'ISHLARNI KO\'RISH',
    getInTouch: 'BOG\'LANISH',
    stats: ['Bajarilgan loyiha', 'O\'qish oylari', 'Olingan sertifikat', 'O\'tilgan darslar'],
    aboutLabel: 'Men haqimda',
    aboutTitle: ["Ko'rinishi kabi", 'yaxshi his qildiradigan', 'interfeyslar.'],
    aboutP1: "Men ham kod, ham u ekranda nima hosil qilishi uchun teng darajada qayg'uradigan frontend dasturchiman. PROWEB'da 7 oylik Frontend Development kursini tugatdim va shundan beri React va TypeScript'da haqiqiy loyihalar qurib, junior'dan middle darajasiga o'sishga harakat qilmoqdaman.",
    aboutP2: "Toza va qo'llab-quvvatlanadigan komponentlar yozishga, accessibility va unumdorlik bo'yicha best practice'larni o'rganishga e'tibor qarataman, asta-sekin murakkabroq loyihalarni qabul qilaman.",
    expLabel: "Ta'lim",
    projectsLabel: 'Loyihalar',
    projectsTitle: "Tanlangan ishlar",
    allProjects: 'BARCHA LOYIHALAR →',
    skillsLabel: 'Ko\'nikmalar',
    skillsTitle: 'Texnologiyalar',
    contactLabel: 'Aloqa',
    contactTitle: ['Keling, biror tez narsa', 'qurайик.'],
    contactBio: "Yuqori darajali frontend lavozimlari, dizayn tizim bo'yicha maslahat va qiziqarli open-source hamkorlik uchun ochiqman. Javob vaqti: odatda 24 soat ichida.",
    formName: 'ISM', formEmail: 'EMAIL', formMsg: 'XABAR',
    namePlaceholder: 'Ismingiz', emailPlaceholder: 'siz@kompaniya.uz', msgPlaceholder: "Nima qurayotganingizni ayting...",
    send: 'XABAR YUBORISH →',
    sentTitle: 'Xabar yuborildi!', sentSub: "24 soat ichida javob beraman.",
    sendAnother: 'YANA YUBORISH',
    footerBuilt: 'React + Vite + Tailwind CSS bilan qurilgan',
    footerHH: "hh.uz'ga o'tish →",
    nav: { About: 'Men haqimda', Projects: 'Loyihalar', Skills: "Ko'nikmalar", Contact: 'Aloqa' },
    projects: [
      { desc: "Uyqu-trekeri uchun landing sahifa — PROWEB'dagi Frontend Development kursi davomida qilingan amaliy loyiha." },
      { desc: "Nike uslubidagi poyabzal do'koni landingi, moslashuvchan verstka va toza mahsulot taqdimotiga urg'u bilan." },
      { desc: "Bitta interfeysda soat, taymer va sekundomerni birlashtirgan ilova." },
    ],
    experience: [
      { role: 'Frontend Development kursi', company: 'PROWEB, Toshkent', desc: "7 oylik kurs, 64 dars. HTML, CSS, JavaScript, TypeScript va React asoslarini o'rgandim. Sertifikat ID 15461, 2026-yil 6-iyulda berilgan." },
      { role: 'Python kursi', company: 'PROWEB, Toshkent', desc: "PROWEB'ning Backend Python yo'nalishidagi kirish kursi, 2 oy davom etdi: Python asoslari — o'zgaruvchilar, shartlar, tsikllar, ro'yxatlar, lug'atlar va funksiyalar, shuningdek funksional va obyektga yo'naltirilgan dasturlashga kirish." },
      { role: "Raqamli axborotni qayta ishlash ustasi", company: "1-son kollej, Chilonzor tumani, Toshkent", desc: "Kunduzgi bo'lim bo'yicha ta'lim. 2026-yilda o'qishga kirdim, bitirish — 2028-yilda." },
    ],
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS_BASE = [
  { index: '01', name: 'Sleep Tracker Landing', tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Flexbox/Grid', 'CSS Animations', 'Vercel'], url: 'https://sleep-ten-red.vercel.app/', year: '2026', status: 'Pet Project' },
  { index: '02', name: 'Nike Store Landing', tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Responsive Design', 'Flexbox/Grid', 'Vercel'], url: 'https://nike-bice-three.vercel.app/', year: '2026', status: 'Pet Project' },
  { index: '03', name: 'Clock App', tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'DOM API', 'CSS Animations', 'Vercel'], url: 'https://clock-finished.vercel.app/', year: '2026', status: 'Pet Project' },
]

const EXPERIENCE_BASE = [
  { year: '2026' },
  { year: '2025' },
  { year: '2026 — 2028' },
]

const SKILLS_EN = {
  Core: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'SVG', 'Web APIs'],
  Frameworks: ['React', 'Vite', 'Zustand', 'React Query'],
  Styling: ['Tailwind CSS', 'SASS', 'BEM', 'Framer Motion', 'Figma'],
  Tooling: ['Git', 'GitHub', 'REST API', 'Vercel', 'Vitest'],
}

const NAV_KEYS = ['About', 'Projects', 'Skills', 'Contact'] as const

// ─── Icons ────────────────────────────────────────────────────────────────────

const icons: Record<string, JSX.Element> = {
  About: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Projects: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  Skills: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Contact: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Sun: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Menu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
}

// ─── Colour tokens ────────────────────────────────────────────────────────────

function tokens(theme: Theme) {
  if (theme === 'dark') return {
    bg: '#08080F', surface: '#0F0F1A', border: '#1A1A2E',
    fg: '#E8E8F0', muted: '#5A5A7A', sub: '#8080A0',
    accent: '#00E5FF', accentBg: '#00E5FF18',
  }
  return {
    bg: '#F5F5FA', surface: '#EAEAF2', border: '#D4D4E8',
    fg: '#0A0A18', muted: '#8888AA', sub: '#6060808',
    accent: '#0055FF', accentBg: '#0055FF14',
  }
}

// ─── Cursor dot (desktop only) ────────────────────────────────────────────────

// ─── Page loader ──────────────────────────────────────────────────────────────

function PageLoader({ c, hidden }: { c: ReturnType<typeof tokens>; hidden: boolean }) {
  return (
    <div
      className={`loader-overlay${hidden ? ' loader-hidden' : ''}`}
      style={{
        backgroundColor: c.bg,
        // @ts-expect-error CSS custom properties
        '--loader-step': c.fg,
        '--loader-accent': c.accent,
      }}
      aria-hidden={hidden}
    >
      <div className="loader" />
    </div>
  )
}

function CursorDot({ c }: { c: ReturnType<typeof tokens> }) {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      dot.current?.style.setProperty('transform', `translate(${e.clientX - 3}px,${e.clientY - 3}px)`)
      ring.current?.style.setProperty('transform', `translate(${e.clientX - 16}px,${e.clientY - 16}px)`)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <div ref={dot} style={{ position: 'fixed', top: 0, left: 0, width: 6, height: 6, borderRadius: '50%', backgroundColor: c.accent, pointerEvents: 'none', zIndex: 9999, transition: 'transform 0.05s linear' }} />
      <div ref={ring} style={{ position: 'fixed', top: 0, left: 0, width: 32, height: 32, borderRadius: '50%', border: `1px solid ${c.accent}55`, pointerEvents: 'none', zIndex: 9998, transition: 'transform 0.15s ease-out' }} />
    </>
  )
}

// ─── Desktop Navbar ───────────────────────────────────────────────────────────

function DesktopNav({ active, c }: { active: string; c: ReturnType<typeof tokens> }) {
  const { theme, toggle } = useTheme()
  const { lang, setLang } = useLang()
  const t = T[lang]
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${c.border}`, backgroundColor: `${c.bg}CC`, backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: c.accent, letterSpacing: '0.05em' }}>
          firdavs.dev<span style={{ color: c.muted }}>_</span>
        </span>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {NAV_KEYS.map((key) => (
            <button key={key} onClick={() => scrollTo(key)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: active === key ? c.accent : c.muted, letterSpacing: '0.02em', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = active === key ? c.accent : c.muted)}
            >
              {t.nav[key]}
            </button>
          ))}

          {/* Divider */}
          <span style={{ width: 1, height: 20, backgroundColor: c.border }} />

          {/* Language switcher */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['en', 'ru', 'uz'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ background: lang === l ? c.accent : 'none', border: `1px solid ${lang === l ? c.accent : c.border}`, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: lang === l ? c.bg : c.muted, padding: '3px 7px', letterSpacing: '0.06em', transition: 'all 0.2s', textTransform: 'uppercase' }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button onClick={e => toggle(e.currentTarget)}
            style={{ background: 'none', border: `1px solid ${c.border}`, cursor: 'pointer', color: c.muted, padding: '5px 8px', display: 'flex', alignItems: 'center', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.accent; (e.currentTarget as HTMLElement).style.color = c.accent }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.color = c.muted }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? icons.Sun : icons.Moon}
          </button>
        </nav>
      </div>
    </header>
  )
}

// ─── Mobile: Top bar + Left Sidebar ──────────────────────────────────────────

function MobileLayout({ active, c, children }: { active: string; c: ReturnType<typeof tokens>; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { lang, setLang } = useLang()
  const t = T[lang]

  const SIDEBAR_COLLAPSED = 52
  const SIDEBAR_MIN = 160
  const SIDEBAR_MAX = 320
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!dragging) return
    const onMove = (ev: MouseEvent) => {
      const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, ev.clientX))
      setSidebarWidth(next)
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Backdrop: closes the sidebar when tapping outside of it */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 190, backgroundColor: 'rgba(0,0,0,0.35)', transition: 'opacity 0.2s' }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        onClick={() => { if (!open) setOpen(true) }}
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 200,
          width: open ? sidebarWidth : SIDEBAR_COLLAPSED,
          backgroundColor: c.surface,
          borderRight: `1px solid ${c.border}`,
          transition: dragging ? 'none' : 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          cursor: open ? 'default' : 'pointer',
        }}
      >
        {/* Burger button */}
        <button
          onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
          style={{ width: '100%', height: SIDEBAR_COLLAPSED, display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-end' : 'center', padding: open ? '0 14px' : '0', background: 'none', border: 'none', borderBottom: `1px solid ${c.border}`, color: c.muted, cursor: 'pointer', flexShrink: 0, transition: 'color 0.2s', gap: 0 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = c.accent)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = c.muted)}
          aria-label="Toggle navigation"
        >
          {open ? icons.Close : icons.Menu}
        </button>

        {/* Nav items */}
        <nav style={{ flex: 1, paddingTop: 8 }}>
          {NAV_KEYS.map((key) => {
            const isActive = active === key
            return (
              <button key={key} onClick={e => { e.stopPropagation(); scrollTo(key) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: 14, padding: '14px 0', paddingLeft: open ? 18 : 0,
                  justifyContent: open ? 'flex-start' : 'center',
                  background: isActive ? c.accentBg : 'none',
                  border: 'none', borderLeft: isActive ? `2px solid ${c.accent}` : '2px solid transparent',
                  cursor: 'pointer', color: isActive ? c.accent : c.muted,
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = c.fg }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = c.muted }}
              >
                <span style={{ flexShrink: 0, display: 'flex' }}>{icons[key]}</span>
                {open && (
                  <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: '0.01em', opacity: open ? 1 : 0, transition: 'opacity 0.2s' }}>
                    {t.nav[key]}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Language + theme at bottom */}
        <div style={{ borderTop: `1px solid ${c.border}`, paddingBottom: 12 }}>
          {open ? (
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['en', 'ru', 'uz'] as Lang[]).map(l => (
                  <button key={l} onClick={e => { e.stopPropagation(); setLang(l) }}
                    style={{ flex: 1, minHeight: 36, background: lang === l ? c.accent : 'none', border: `1px solid ${lang === l ? c.accent : c.border}`, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: lang === l ? c.bg : c.muted, padding: '8px 2px', letterSpacing: '0.06em', transition: 'all 0.2s' }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button onClick={e => { e.stopPropagation(); toggle(e.currentTarget) }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: `1px solid ${c.border}`, color: c.muted, cursor: 'pointer', padding: '7px 10px', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.2s', letterSpacing: '0.04em' }}
              >
                {theme === 'dark' ? icons.Sun : icons.Moon}
                <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '12px 0' }}>
              <button onClick={e => { e.stopPropagation(); toggle(e.currentTarget) }} style={{ background: 'none', border: 'none', color: c.muted, cursor: 'pointer', display: 'flex', padding: 4 }}>
                {theme === 'dark' ? icons.Sun : icons.Moon}
              </button>
            </div>
          )}
        </div>
        {open && (
          <div
            onMouseDown={e => { e.stopPropagation(); setDragging(true) }}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: 6,
              cursor: 'ew-resize', zIndex: 210,
            }}
          />
        )}
      </aside>

      {/* Top bar */}
      <div style={{ position: 'fixed', top: 0, left: SIDEBAR_COLLAPSED, right: 0, zIndex: 150, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: `1px solid ${c.border}`, backgroundColor: `${c.bg}EE`, backdropFilter: 'blur(10px)', transition: 'left 0.28s cubic-bezier(0.4,0,0.2,1)' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.accent, letterSpacing: '0.05em' }}>
          firdavs.dev<span style={{ color: c.muted }}>_</span>
        </span>
        {/* Current section name — only one word from nav key */}
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {active}
        </span>
      </div>

      {/* Main content offset */}
      <div style={{ flex: 1, marginLeft: SIDEBAR_COLLAPSED, paddingTop: 52, minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ index, label, c }: { index: string; label: string; c: ReturnType<typeof tokens> }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.accent, letterSpacing: '0.08em' }}>{index} /</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  )
}

function Tag({ label, c }: { label: string; c: ReturnType<typeof tokens> }) {
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, border: `1px solid ${c.border}`, padding: '3px 8px', letterSpacing: '0.02em' }}>
      {label}
    </span>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero({ c }: { c: ReturnType<typeof tokens> }) {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(72px, 18vw, 80px) clamp(18px, 6vw, 32px) clamp(40px, 10vw, 60px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${c.border}70 1px, transparent 1px), linear-gradient(90deg, ${c.border}70 1px, transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', left: '60%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${c.accent}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.accent, letterSpacing: '0.1em', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 32, height: 1, backgroundColor: c.accent, display: 'inline-block' }} />
          {t.available}
        </div>

        <h1 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 13vw, 112px)', lineHeight: 0.95, letterSpacing: '-0.03em', color: c.fg, margin: 0, marginBottom: 8, wordBreak: 'break-word' }}>
          Firdavs<br />
          <span style={{ color: c.accent }}>Shoxidov</span>
        </h1>

        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: c.muted, marginTop: 24, marginBottom: 40, letterSpacing: '0.02em' }}>
          {t.role}
        </p>

        <p style={{ fontSize: 18, color: c.sub, maxWidth: 520, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>
          {t.heroBio}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '14px 32px', backgroundColor: c.accent, color: c.bg, fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', letterSpacing: '0.04em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            {t.viewWork}
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '14px 32px', backgroundColor: 'transparent', color: c.accent, fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 600, fontSize: 14, border: `1px solid ${c.accent}60`, cursor: 'pointer', letterSpacing: '0.04em', transition: 'border-color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = c.accent)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = `${c.accent}60`)}
          >
            {t.getInTouch}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 'clamp(24px, 6vw, 48px)', marginTop: 'clamp(48px, 10vw, 72px)', paddingTop: 'clamp(28px, 6vw, 40px)', borderTop: `1px solid ${c.border}`, flexWrap: 'wrap' }}>
          {(['5', '7', '1', '64'] as const).map((num, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: c.fg, lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, marginTop: 6, letterSpacing: '0.06em' }}>{t.stats[i].toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection({ c }: { c: ReturnType<typeof tokens> }) {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <section style={{ padding: 'clamp(56px, 14vw, 100px) clamp(18px, 6vw, 32px)', borderTop: `1px solid ${c.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(40px, 9vw, 80px)' }}>
        <div>
          <SectionLabel index="00" label={t.aboutLabel} c={c} />
          <h2 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', color: c.fg, marginTop: 24, marginBottom: 28, lineHeight: 1.1 }}>
            {t.aboutTitle[0]}<br />
            <span style={{ color: c.accent }}>{t.aboutTitle[1]}</span><br />
            {t.aboutTitle[2]}
          </h2>
          <p style={{ fontSize: 16, color: c.sub, lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>{t.aboutP1}</p>
          <p style={{ fontSize: 16, color: c.sub, lineHeight: 1.8, fontWeight: 300 }}>{t.aboutP2}</p>
        </div>

        <div>
          <SectionLabel index="01" label={t.expLabel} c={c} />
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EXPERIENCE_BASE.map((exp, i) => {
              const tr = t.experience[i]
              return (
                <div key={i} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: i < EXPERIENCE_BASE.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.accent, letterSpacing: '0.08em', marginBottom: 8 }}>{exp.year}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: c.fg, marginBottom: 4 }}>{tr.role}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.muted, marginBottom: 10 }}>{tr.company}</div>
                  <div style={{ fontSize: 14, color: c.sub, lineHeight: 1.7, fontWeight: 300 }}>{tr.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection({ c, isMobile }: { c: ReturnType<typeof tokens>; isMobile: boolean }) {
  const { lang } = useLang()
  const t = T[lang]
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="projects" style={{ padding: 'clamp(56px, 14vw, 100px) clamp(18px, 6vw, 32px)', borderTop: `1px solid ${c.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(36px, 8vw, 60px)', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <SectionLabel index="02" label={t.projectsLabel} c={c} />
            <h2 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', color: c.fg, marginTop: 12, lineHeight: 1.1 }}>
              {t.projectsTitle}
            </h2>
          </div>
          <a href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.accent, textDecoration: 'none', letterSpacing: '0.06em' }}>{t.allProjects}</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PROJECTS_BASE.map((p, i) => {
            const desc = t.projects[i].desc
            const isH = hovered === p.index
            const statusColor = p.status === 'Production' ? '#00FF88' : c.accent
            return (
              <a key={p.index} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', padding: 'clamp(24px, 5vw, 36px) 0', borderTop: `1px solid ${c.border}` }}
                onMouseEnter={() => setHovered(p.index)} onMouseLeave={() => setHovered(null)}
              >
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr auto' : 'clamp(32px, 8vw, 48px) 1fr auto', gap: '16px clamp(12px, 3vw, 24px)', alignItems: 'start' }}>
                  {!isMobile && (
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: isH ? c.accent : c.muted, transition: 'color 0.2s', paddingTop: 4 }}>{p.index}</span>
                  )}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 700, fontSize: 20, color: isH ? c.accent : c.fg, transition: 'color 0.2s', margin: 0 }}>{p.name}</h3>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '3px 8px', border: `1px solid ${statusColor}60`, color: statusColor, letterSpacing: '0.06em' }}>{p.status}</span>
                    </div>
                    <p style={{ fontSize: 15, color: c.sub, lineHeight: 1.7, maxWidth: 560, margin: '0 0 16px', fontWeight: 300 }}>{desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {p.tags.map(tag => <Tag key={tag} label={tag} c={c} />)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', paddingTop: 4 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, marginBottom: 12 }}>{p.year}</div>
                    <span style={{ fontSize: 20, color: isH ? c.accent : c.muted, transition: 'color 0.2s, transform 0.2s', display: 'inline-block', transform: isH ? 'translateX(4px)' : 'none' }}>→</span>
                  </div>
                </div>
              </a>
            )
          })}
          <div style={{ borderTop: `1px solid ${c.border}` }} />
        </div>
      </div>
    </section>
  )
}

function SkillsSection({ c }: { c: ReturnType<typeof tokens> }) {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <section id="skills" style={{ padding: 'clamp(56px, 14vw, 100px) clamp(18px, 6vw, 32px)', borderTop: `1px solid ${c.border}`, backgroundColor: c.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel index="03" label={t.skillsLabel} c={c} />
        <h2 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', color: c.fg, marginTop: 12, marginBottom: 'clamp(32px, 8vw, 56px)', lineHeight: 1.1 }}>
          {t.skillsTitle}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'clamp(28px, 6vw, 48px)' }}>
          {Object.entries(SKILLS_EN).map(([cat, items]) => (
            <div key={cat}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.accent, letterSpacing: '0.1em', marginBottom: 20, textTransform: 'uppercase' }}>{cat}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: c.muted, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: c.sub, fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({ c }: { c: ReturnType<typeof tokens> }) {
  const { lang } = useLang()
  const t = T[lang]
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(() => {
    if (typeof window === 'undefined') return { name: '', email: '', message: '' }
    try {
      const saved = window.localStorage.getItem(CONTACT_DRAFT_KEY)
      return saved ? JSON.parse(saved) : { name: '', email: '', message: '' }
    } catch {
      return { name: '', email: '', message: '' }
    }
  })

  useEffect(() => {
    if (sent) return
    window.localStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(form))
  }, [form, sent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('request_failed')
      setSent(true)
      window.localStorage.removeItem(CONTACT_DRAFT_KEY)
    } catch {
      setError(lang === 'ru' ? 'Не удалось отправить. Проверьте, запущен ли сервер.' : lang === 'uz' ? 'Yuborib bo\'lmadi. Server ishlab turganini tekshiring.' : 'Could not send. Check that the API server is running.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', backgroundColor: c.surface, border: `1px solid ${c.border}`, color: c.fg,
    fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 16, padding: '14px 16px',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: 'clamp(56px, 14vw, 100px) clamp(18px, 6vw, 32px)', borderTop: `1px solid ${c.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(40px, 9vw, 80px)' }}>
        <div>
          <SectionLabel index="04" label={t.contactLabel} c={c} />
          <h2 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', color: c.fg, marginTop: 12, marginBottom: 24, lineHeight: 1.1 }}>
            {t.contactTitle[0]}<br /><span style={{ color: c.accent }}>{t.contactTitle[1]}</span>
          </h2>
          <p style={{ fontSize: 16, color: c.sub, lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>{t.contactBio}</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { label: 'Email', value: 'mr.pee10191@gmail.com', href: 'mailto:mr.pee10191@gmail.com', mask: true },
              { label: 'Phone', value: '+998 93 394 34 00', href: 'tel:+998933943400', mask: false },
              { label: 'Phone', value: '+998 99 101 39 81', href: 'tel:+998991013981', mask: false },
              { label: 'GitHub', value: 'github.com/mrpee10191-coder', href: 'https://github.com/mrpee10191-coder', mask: true },
              { label: 'LinkedIn', value: 'linkedin.com/in/mr-pee-421aab416', href: 'https://www.linkedin.com/in/mr-pee-421aab416/', mask: true },
              { label: 'Telegram', value: '@muraqoba', href: 'https://t.me/muraqoba', mask: false },
            ].map(link => {
              const comIdx = link.mask ? link.value.indexOf('.com') : -1
              const cut = comIdx === -1 ? link.value.length : comIdx + 4
              const visible = link.value.slice(0, cut)
              const hidden = link.value.slice(cut)
              return (
              <a key={link.label + link.value} href={link.href} style={{ display: 'flex', gap: 16, alignItems: 'center', textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${c.border}` }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, letterSpacing: '0.08em', width: 64, flexShrink: 0 }}>{link.label.toUpperCase()}</span>
                <span style={{ fontSize: 14, color: c.sub, transition: 'color 0.2s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = c.accent)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = c.sub)}
                >
                  {visible}
                  {hidden && <span style={{ color: c.muted }}>..</span>}
                </span>
              </a>
              )
            })}
          </div>
        </div>

        <div>
          {sent ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <div style={{ fontSize: 48, color: c.accent }}>✓</div>
              <h3 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: c.accent }}>{t.sentTitle}</h3>
              <p style={{ color: c.muted, fontSize: 15 }}>{t.sentSub}</p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                style={{ marginTop: 16, background: 'none', border: `1px solid ${c.border}`, color: c.muted, padding: '10px 24px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em' }}
              >
                {t.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {([
                { key: 'name' as const, label: t.formName, type: 'text', ph: t.namePlaceholder },
                { key: 'email' as const, label: t.formEmail, type: 'email', ph: t.emailPlaceholder },
              ]).map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>{f.label}</label>
                  <input style={inputStyle} type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.ph} required
                    onFocus={e => ((e.target as HTMLElement).style.borderColor = c.accent)}
                    onBlur={e => ((e.target as HTMLElement).style.borderColor = c.border)}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.muted, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>{t.formMsg}</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={t.msgPlaceholder} required
                  onFocus={e => ((e.target as HTMLElement).style.borderColor = c.accent)}
                  onBlur={e => ((e.target as HTMLElement).style.borderColor = c.border)}
                />
              </div>
              {error && (
                <div style={{ fontSize: 13, color: '#FF5C5C', fontFamily: "'JetBrains Mono', monospace" }}>{error}</div>
              )}
              <button type="submit" disabled={sending} style={{ padding: '16px', backgroundColor: c.accent, color: c.bg, fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 700, fontSize: 14, border: 'none', cursor: sending ? 'default' : 'pointer', letterSpacing: '0.04em', transition: 'opacity 0.2s', marginTop: 8, opacity: sending ? 0.6 : 1 }}
                onMouseEnter={e => { if (!sending) (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={e => { if (!sending) (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                {sending ? '...' : t.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer({ c, isMobile }: { c: ReturnType<typeof tokens>; isMobile: boolean }) {
  const { lang } = useLang()
  const t = T[lang]
  const hhLink = React.createElement(
    "a",
    {
      href: "https://tashkent.hh.uz/applicant/profile/me?hhtmFrom=resume_profile_front",
      target: "_blank",
      rel: "noopener noreferrer",
      style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.accent, textDecoration: "none", letterSpacing: "0.02em", fontWeight: 600, transition: "opacity 0.2s" },
      onMouseEnter: (e) => { e.currentTarget.style.opacity = "0.75" },
      onMouseLeave: (e) => { e.currentTarget.style.opacity = "1" },
    },
    isMobile ? "hh.uz →" : t.footerHH
  )
  const nameLabel = (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.muted }}>© 2026 Firdavs Shoxidov</span>
  )
  return (
    <footer style={{ borderTop: '1px solid ' + c.border, padding: isMobile ? '18px 18px' : '24px 18px', backgroundColor: c.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        {isMobile ? (
          <>
            {hhLink}
            {nameLabel}
          </>
        ) : (
          <>
            {nameLabel}
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              {hhLink}
            </div>
          </>
        )}
      </div>
    </footer>
  )
}
// ─── Root ─────────────────────────────────────────────────────────────────────

const THEME_KEY = 'portfolio:theme'
const LANG_KEY = 'portfolio:lang'
const CONTACT_DRAFT_KEY = 'portfolio:contactDraft'

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(THEME_KEY)
  return saved === 'dark' || saved === 'light' ? saved : 'light'
}

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'ru'
  const saved = window.localStorage.getItem(LANG_KEY)
  return saved === 'en' || saved === 'ru' || saved === 'uz' ? saved : 'ru'
}

function Portfolio() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)
  const [lang, setLang] = useState<Lang>(readStoredLang)
  const [active, setActive] = useState('About')
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)

  const c = tokens(theme)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = c.bg
    document.body.style.color = c.fg
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang)
  }, [lang])

  useEffect(() => {
    const sections = ['about', 'projects', 'skills', 'contact']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const match = NAV_KEYS.find(k => k.toLowerCase() === id)
            if (match) setActive(match)
          }
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const toggle = (el?: HTMLElement) => {
    const rect = el ? el.getBoundingClientRect() : null
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    document.documentElement.style.setProperty('--theme-x', `${x}px`)
    document.documentElement.style.setProperty('--theme-y', `${y}px`)
    document.documentElement.style.setProperty('--theme-r', `${r}px`)
    const flip = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
    const anyDoc = document as unknown as { startViewTransition?: (cb: () => void) => void }
    if (anyDoc.startViewTransition) {
      anyDoc.startViewTransition(flip)
    } else {
      flip()
    }
  }

  const content = (
    <main style={{ backgroundColor: c.bg }}>
      <Hero c={c} />
      <AboutSection c={c} />
      <ProjectsSection c={c} isMobile={isMobile} />
      <SkillsSection c={c} />
      <ContactSection c={c} />
      <Footer c={c} isMobile={isMobile} />
    </main>
  )

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <LangCtx.Provider value={{ lang, setLang }}>
        <div style={{ backgroundColor: c.bg, minHeight: '100vh' }}>
          <PageLoader c={c} hidden={!loading} />
          {!isMobile && <CursorDot c={c} />}
          {isMobile ? (
            <MobileLayout active={active} c={c}>
              {content}
            </MobileLayout>
          ) : (
            <>
              <DesktopNav active={active} c={c} />
              <div style={{ paddingTop: 60 }}>{content}</div>
            </>
          )}
        </div>
      </LangCtx.Provider>
    </ThemeCtx.Provider>
  )
}

export default Portfolio