const passport = require("passport")
const local = require("./localStrategy")
const kakao = require("./kakaoStrategy")
const User = require("../models/user")

module.exports = () => {
  /*
  serializeUser : 
  로그인 시 실행되는 모듈. 
  req.session 객체에 어떤 데이터를 저장할지 정하는 메서드이다. 
  매개변수로 user를 받아서 user.id를 세션에 저장한다.
  모든 데이터를 저장하면 세션의 용량이 커지는 문제가 있기 때문에 id만 저장하는 것이다. 
   */
  passport.serializeUser((user, done) => {
    done(null, user.id) // 첫번째 인수는 에러 발생 시 사용하는 것이고 두번째 인수는 저장하고 싶은 데이터
  })

  /*
  deserializeUser : 
  매 요청 시 실행되는 메서드 
  passport.session() 미들웨어가 이 메서드를 호출한다.
  serializeUser의 두번째 인수로 받았던 데이터가 이 메서드의 매개변수가 된다. 
  
  현재는 serializeUser에서 받아온 id를 통해 사용자 정보를 조회한다.
  */
  passport.deserializeUser(async (id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err))
  })

  local()
  kakao()
}
