import { db } from '../lib/db'
import ErrorPage from '../pages/ErrorPage'
import HomePage from '../pages/HomePage'
import { nestie } from 'nestie'
import qs from 'querystring'

export async function viewPosts(req, res) {
  try {
    const posts = await db('posts')
      .where({})
      .leftJoin('users', 'users.id', 'posts.user_id')
      .select([
        'posts.*',
        'users.email as user.email',
        'posts.user_id as userId',
        'posts.created_at as createdAt',
      ])
      .orderBy('posts.created_at', 'desc')

    const modifiedPostData = posts.map(x => nestie(x))

    return res.render(HomePage, {
      ...req.query,
      posts: modifiedPostData,
    })
  } catch (err) {
    console.error(err)
    return res.render(ErrorPage, {
      error: 'We were unable to render posts, please try again in a bit',
    })
  }
}

export async function createPost(req, res) {
  let trx
  try {
    if (!(req.body.post && req.body.post.length > 2)) {
      const q = qs.stringify({
        errors: ['A post needs to be more than 2 characters'],
      })
      return res.redirect(`/new?${q}`)
    }

    trx = await db.transaction()

    await trx('posts').insert({
      user_id: req.currentUser.id,
      content: req.body.post,
    })

    await trx.commit()
    return res.redirect('/')
  } catch (err) {
    console.error(err)
    trx && (await trx.rollback())
    return res.render(ErrorPage, {
      error: 'We were unable to create a post, please try again in a bit',
    })
  }
}
