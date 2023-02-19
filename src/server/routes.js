import express from 'express'
import { fetchMe, login, logout, signup } from '../controllers/auth'
import { createPost, viewPosts } from '../controllers/post'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NewPostPage from '../pages/NewPostPage'
import SignupPage from '../pages/SignupPage'
import { withAuth } from './middleware/auth'

export default function setupRouter(app) {
  const router = new express.Router()

  setupApp(router)
  setupREST(router)

  return router
}

function setupApp(router) {
  router.get('/', viewPosts)

  router.route('/logout').get(logout)

  router
    .route('/login')
    .get(async (req, res) => {
      return res.render(
        LoginPage,
        {
          ...req.query,
          errors: [].concat(req.query.errors),
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

  router
    .route('/new')
    .get(withAuth, async (req, res) => {
      return res.render(
        NewPostPage,
        {
          ...req.query,
          errors: [].concat(req.query.errors),
        },
        { title: 'New Post' }
      )
    })
    .post(withAuth, createPost)
}

function setupREST(router) {
  router.get('/api/me', fetchMe)
}
