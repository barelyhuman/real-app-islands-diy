import { db } from '../lib/db'
import LoginPage from '../pages/LoginPage'
import { hashSync, genSaltSync, compare } from 'bcrypt'
import SignupPage from '../pages/SignupPage'
import crypto from 'crypto'
import qs from 'querystring'

export async function signup(req, res) {
  let trx
  try {
    const trx = await db.transaction()
    const existingUser = await trx('users')
      .where({
        email: req.body.email,
      })
      .first()

    if (existingUser) {
      return res.render(SignupPage, [{ errors: 'Already a user' }])
    }

    await trx('users').insert({
      email: req.body.email,
      password: hashSync(req.body.password, genSaltSync(12)),
    })

    await trx.commit()
    // in a real life you'd also update the session for the user in cookies
    return res.redirect('/login')
  } catch (err) {
    trx && (await trx.rollback())
    console.error(err)
    return res.status(500).send({
      message: 'Oops! Something went wrong',
    })
  }
}

export async function login(req, res) {
  try {
    const userDetails = await db('users')
      .where({
        email: req.body.email,
      })
      .first()

    if (!userDetails) {
      const q = qs.stringify({
        errors: ["User doesn't exist, please signup first"],
      })
      return res.redirect(`/login?${q}`)
    }

    const isValid = compare(req.body.password, userDetails.password)
    if (!isValid) {
      return res.render(LoginPage, [{ errors: 'Invalid Credentials' }])
    }

    const token = Buffer.from(crypto.randomBytes(64)).toString('base64url')
    const age = 24 * 60 * 60
    const expires_at = new Date().getTime() + age

    await db('tokens').insert({
      user_id: userDetails.id,
      access_token: token,
      expires_at: expires_at,
    })

    res.cookie('auth', token, { maxAge: age, httpOnly: true })

    // in a real life you'd also update the session for the user in cookies
    // we're using query strings here for simple stuff instead
    if (req.body.redir) {
      return res.redirect(req.body.redir)
    }
    return res.redirect(`/?alert=Logged In`)
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      message: 'Oops! Something went wrong',
    })
  }
}

export async function logout(req, res) {
  res.clearCookie('auth')
  res.redirect('/?alert=Logged Out!')
}

export async function fetchMe(req, res) {
  const token = req.cookies.auth
  if (!token) {
    return res.send({
      loggedIn: false,
    })
  }

  const userData = await db('tokens')
    .where({
      access_token: token,
    })
    .leftJoin('users', 'users.id', 'tokens.user_id')
    .select(['users.id'])
    .first()

  return res.send({
    loggedIn: !!userData,
  })
}
