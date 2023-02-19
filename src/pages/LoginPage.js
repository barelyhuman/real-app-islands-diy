import Alert from '../components/Alert.island.js'
import BaseLayout from '../layouts/BaseLayout.js'

export default function LoginPage({ error }) {
  return (
    <>
      <BaseLayout>
        <section>
          <div class="headings">
            <h1>Login</h1>
            <h3>Let's get you started</h3>
          </div>
        </section>

        {error && <Alert class="danger">{error}</Alert>}

        <form action="/login" method="POST">
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
