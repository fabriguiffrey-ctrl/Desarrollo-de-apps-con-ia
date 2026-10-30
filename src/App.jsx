import { useEffect, useState } from 'react'
import avatarImg from './assets/mifoto.jpeg'
import './App.css'

const INSTAGRAM_URL = 'https://www.instagram.com/fabriguiffrey'
const WORK_URL = 'https://fabriguiffrey-ctrl.github.io/portfolio/'
const INITIAL_LIKES = 128

const PROFILE = {
  name: 'Fabri',
  role: 'Desarrollador Web · Creativo',
  bio:  'Construyo soluciones digitales simples, rápidas y con personalidad.',
  interests: [
    'Apps',
    'IA',
    'Open source',
    'Linux',
    'Mate',
    'Música',
  ],
}

const THEME_KEY = 'mi-tarjeta-theme'
const LIKES_KEY = 'mi-tarjeta-likes'
const LIKED_KEY = 'mi-tarjeta-liked'

function readStorage(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // El estado se mantiene en memoria durante la visita.
  }
}

function getInitialTheme() {
  return readStorage(THEME_KEY) === 'light' ? 'light' : 'dark'
}

function getInitialLikes() {
  const storedLikes = Number(readStorage(LIKES_KEY))
  return Number.isFinite(storedLikes) && storedLikes >= INITIAL_LIKES
    ? storedLikes
    : INITIAL_LIKES
}

function getInitialLiked() {
  return readStorage(LIKED_KEY) === 'true'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [likes, setLikes] = useState(getInitialLikes)
  const [isLiked, setIsLiked] = useState(getInitialLiked)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'light' ? '#eef0ea' : '#14161a',
      )
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      writeStorage(THEME_KEY, nextTheme)
      return nextTheme
    })
  }

  const handleLike = () => {
    if (isLiked) {
      const nextLikes = likes - 1
      setLikes(nextLikes)
      setIsLiked(false)
      writeStorage(LIKES_KEY, String(nextLikes))
      writeStorage(LIKED_KEY, 'false')
      return
    }

    const nextLikes = likes + 1
    setLikes(nextLikes)
    setIsLiked(true)
    writeStorage(LIKES_KEY, String(nextLikes))
    writeStorage(LIKED_KEY, 'true')
  }

  return (
    <>
      <a className="skip-link" href="#primary">
        Saltar al contenido
      </a>

      <main id="primary" className="page">
        <article className="card" aria-labelledby="card-title">
          <header className="card__toolbar">
            <div className="card__actions">
              <button
                type="button"
                className="icon-btn"
                data-theme-toggle
                aria-pressed={theme === 'dark'}
                aria-label="Tema oscuro"
                onClick={toggleTheme}
              >
                <svg
                  className="icon-sun"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
                </svg>
                <svg
                  className="icon-moon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>

              <a
                className="ghost-btn"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Seguir en Instagram</span>
                <span className="screen-reader-text">
                  (se abre en una pestaña nueva)
                </span>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>

              <a
                className="ghost-btn"
                href={WORK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Work!</span>
                <span className="screen-reader-text">
                  (se abre en una pestaña nueva)
                </span>
              </a>
            </div>
          </header>

          <section className="identity" aria-labelledby="card-title">
            <img
              className="avatar"
              src={avatarImg}
              alt={`Avatar de ${PROFILE.name}`}
              width="112"
              height="112"
fetchPriority="high"
            />
            <div>
              <p className="eyebrow">Hola, soy</p>
              <h1 id="card-title">{PROFILE.name}</h1>
              <p className="role">{PROFILE.role}</p>
            </div>
          </section>

          <div className="card__details">
            <section className="section bio" aria-labelledby="bio-title">
              <h2 id="bio-title">Bio</h2>
              <p>{PROFILE.bio}</p>
            </section>

            <section className="section interests" aria-labelledby="interests-title">
              <h2 id="interests-title">Intereses</h2>
              <ul>
                {PROFILE.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="card__footer">
            <button
              type="button"
              className="like-btn"
              aria-pressed={isLiked}
              onClick={handleLike}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 21s-7.5-4.6-9.7-9A5.6 5.6 0 0 1 12 5.3 5.6 5.6 0 0 1 21.7 12c-2.2 4.4-9.7 9-9.7 9z" />
              </svg>
              <span>{isLiked ? 'Ya me gusta' : 'Me gusta'}</span>
            </button>

            <p className="like-count" aria-live="polite">
              <strong>{likes}</strong>
              <span>me gusta</span>
            </p>
          </footer>
        </article>
      </main>
    </>
  )
}

export default App
