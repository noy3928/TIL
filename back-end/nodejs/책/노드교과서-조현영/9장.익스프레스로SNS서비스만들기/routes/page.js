const express = require("express")
const router = express.Router() // 라우터 분리

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

router.get("/profile", (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" })
})

router.get("/join", (req, res) => {
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
