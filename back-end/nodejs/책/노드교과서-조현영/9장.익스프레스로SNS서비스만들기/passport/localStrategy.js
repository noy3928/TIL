const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const User = require("../models/user")

module.exports = () => {
  passport.use(
    // 전략을 설정하는 곳
    new LocalStrategy(
      {
        usernameField: "email", // 일치하는 로그인 라우터의 req.body 속성명을 적으면 된다.
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } })
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password)
            if (result) {
              return done(null, exUser)
            } else {
              return done(null, false, {
                message: "비밀번호가 일치하지 않습니다.",
              })
            }
          } else {
            return done(null, false, { message: "가입되지 않은 회원입니다." })
          }
        } catch (error) {
          console.error(error)
          return done(error)
        }
      }
    )
  )
}
