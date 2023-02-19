import express from 'express'
import { fetchMe, login, signup } from '../controllers/auth'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

export default function setupRouter(app) {
  const router = new express.Router()
  router.get('/', async (req, res) => {
    return res.render(HomePage, {
      ...req.query,
    })
  })

  router
    .route('/login')
    .get(async (req, res) => {
      return res.render(
        LoginPage,
        {
          ...req.query,
        },
        { title: 'Login' }
      )
    })
    .post(login)

  router
    .route('/signup')
    .get(async (req, res) => {
      return res.render(SignupPage, {}, { title: 'Sign Up' })
    })
    .post(signup)

  router.get('/api/me', fetchMe)

  return router
}
