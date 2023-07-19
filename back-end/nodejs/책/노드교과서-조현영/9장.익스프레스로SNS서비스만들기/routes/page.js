const express = require("express")
const router = express.Router() // 라우터 분리
const { isLoggedIn, isNotLoggedIn } = require("./middlewares")

/*
res.locals란 응답에 대한 정보를 저장하는 객체 
템플릿 엔진에서 사용할 변수를 저장하는데 사용
이 값들을 모든 템플릿 엔진에서 공통으로 사용하기 때문
*/
router.use((req, res, next) => {
  res.locals.user = null // res.locals 객체에 user 속성을 넣어줌
  res.locals.followerCount = 0 // res.locals 객체에 followerCount 속성을 넣어줌
  res.locals.followingCount = 0 // res.locals 객체에 followingCount 속성을 넣어줌
  res.locals.followerIdList = [] // res.locals 객체에 followerIdList 속성을 넣어줌
  next()
})

/*
자신의 프로필은 로그인을 해야 볼 수 있다. 
때문에 isLoggedIn 미들웨어를 사용한다. 
req.isAuthenticated() : 로그인 중이면 true가 되어 next()가 호출되고, 
다음 미들웨어로 넘어가게 된다. 
*/
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" })
})

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" })
})

router.get("/", (req, res, next) => {
  const twits = []
  res.render("main", {
    title: "NodeBird",
    twits,
  })
})

module.exports = router
