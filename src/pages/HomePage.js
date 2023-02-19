import { styled } from 'goober'

import BaseLayout from '../layouts/BaseLayout.js'
import Alert from '../components/Alert.island.js'
import { Avatar } from '../components/Avatar.js'

const Row = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default function HomePage({ alert, posts }) {
  return (
    <>
      <BaseLayout>
        {alert && <Alert>{alert}</Alert>}
        <div class="headings">
          <h1>Feed</h1>
          <h1>Your timeline of some stuff</h1>
        </div>
        <section>
          <a href="/new" role="button" class="contrast">
            Add Post
          </a>
        </section>
        <section>
          {posts.map(x => (
            <PostCard {...x} />
          ))}
        </section>
      </BaseLayout>
    </>
  )
}

function PostCard({ userId, user, content, createdAt }) {
  return (
    <>
      <article>
        {content}
        <footer>
          <Row>
            <Avatar userId={userId} name={user.email} />
            <small class="secondary">
              Posted on: {new Date(createdAt).toLocaleString()}
            </small>
          </Row>
        </footer>
      </article>
    </>
  )
}
