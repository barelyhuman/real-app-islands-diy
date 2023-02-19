import { useState, useEffect } from 'preact/hooks'

// Could be done on the server
// but just for the sake of it,
// adding an island to represent it
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('/api/me')
      .then(d => d.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn)
      })
      .catch(err => {
        console.log({ err })
      })
  }, [])

  return (
    <header class="container">
      <nav>
        <ul>
          <li>
            <a href="/">
              <strong>Awesome App</strong>
            </a>
          </li>
        </ul>
        {isLoggedIn ? (
          <ul>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/login">Sign In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
