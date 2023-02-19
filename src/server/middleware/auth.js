import { db } from '../../lib/db'
import qs from 'querystring'

export async function withAuth(req, res, next) {
  try {
    const token = req.cookies.auth
    if (!token) {
      const q = qs.stringify({
        errors: ["You'll have to login to continue"],
        redir: req.originalUrl,
      })
      return res.redirect(`/login?${q}`)
    }

    const userData = await db('tokens')
      .where({
        access_token: token,
      })
      .leftJoin('users', 'users.id', 'tokens.user_id')
      .select(['users.id'])
      .first()

    req.currentUser = userData

    next()
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Oops! Something went wrong...' })
  }
}
