import { onClientOnly } from '../lib/client.js'
import { setup, styled } from 'goober'
import BaseLayout from '../layouts/BaseLayout.js'
import Alert from '../components/Alert.island.js'

onClientOnly(() => setup(h))

const AvatarWrapper = styled('div')`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  overflow: hidden;

  & > img {
    object-fit: contain;
  }
`

const Flex = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const content = [
  {
    userId: 1,
    content: "It's all about not adding JS",
  },
  {
    userId: 12,
    content: "It's all about not adding un-needed JS",
  },
]

function Avatar({ userId }) {
  return (
    <AvatarWrapper>
      <img src={`https://icotar.com/avatar/${userId}`} />
    </AvatarWrapper>
  )
}

function Card({ userId, heading, content }) {
  return (
    <>
      <article>
        {content}
        <footer>
          <Flex>
            <Avatar userId={userId} />
            <small class="secondary">
              Posted on: {new Date().toLocaleString()}
            </small>
          </Flex>
        </footer>
      </article>
    </>
  )
}

export default function HomePage({ alert }) {
  return (
    <>
      <BaseLayout>
        {alert && <Alert>{alert}</Alert>}
        <div class="headings">
          <h1>Feed</h1>
          <h1>Your timeline of some stuff</h1>
        </div>
        {/* <section>
          <a href="/new" role="button" class="contrast">
            Add Post
          </a>
        </section> */}
        <section>
          {content.map(x => (
            <Card {...x} />
          ))}
        </section>
      </BaseLayout>
    </>
  )
}
