import BaseLayout from '../layouts/BaseLayout.js'

export default function ErrorPage({ error }) {
  return (
    <>
      <BaseLayout>
        <article>
          <header>Oop! Something went wrong...</header>
          {error}
        </article>
      </BaseLayout>
    </>
  )
}
