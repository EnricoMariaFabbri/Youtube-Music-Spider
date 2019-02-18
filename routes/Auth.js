var AuthController = require('../controllers/AuthController.js')


module.exports = function (app, passport) {

  app.get('/signup', AuthController.signup)

  app.get('/signin', AuthController.signin)

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }))

  app.get('/', AuthController.userLoggedIn, AuthController.dashboard)

  app.get('/logout', AuthController.userLoggedIn, AuthController.logout)

  app.post('/signin', passport.authenticate('local-signin'), function (req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo;
  })

}