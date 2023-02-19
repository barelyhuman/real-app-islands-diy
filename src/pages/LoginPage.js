import Alert from '../components/Alert.island.js'
import BaseLayout from '../layouts/BaseLayout.js'

export default function LoginPage({ errors = [], redir }) {
  return (
    <>
      <BaseLayout>
        <section>
          <div class="headings">
            <h1>Login</h1>
            <h3>Let's get you started</h3>
          </div>
        </section>

        {errors.map(error => (
          <Alert type="error">{error}</Alert>
        ))}

        <form action="/login" method="POST">
          <input type="hidden" name="redir" value={redir} />
          <div>
            <label>Email</label>
            <input name="email" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </BaseLayout>
    </>
  )
}
