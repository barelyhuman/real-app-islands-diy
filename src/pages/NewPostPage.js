import Alert from '../components/Alert.island.js'
import BaseLayout from '../layouts/BaseLayout.js'

export default function NewPostPage({ errors = [] }) {
  return (
    <>
      <BaseLayout>
        <section>
          <div>
            <h1>New Post</h1>
          </div>
        </section>

        {errors.map(error => (
          <Alert type="error">{error}</Alert>
        ))}

        <form action="/new" method="POST">
          <div>
            <label>Post</label>
            <textarea name="post" />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </BaseLayout>
    </>
  )
}
