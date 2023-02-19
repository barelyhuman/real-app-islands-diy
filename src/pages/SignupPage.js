import BaseLayout from '../layouts/BaseLayout.js'

export default function SignupPage() {
  return (
    <>
      <BaseLayout>
        <section>
          <div class="headings">
            <h1>Sign Up</h1>
            <h3>Let's get you started</h3>
          </div>
        </section>
        <form action="/signup" method="POST">
          <div>
            <label>Email</label>
            <input name="email" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" />
          </div>
          <div>
            <button>Sign Up</button>
          </div>
        </form>
      </BaseLayout>
    </>
  )
}
