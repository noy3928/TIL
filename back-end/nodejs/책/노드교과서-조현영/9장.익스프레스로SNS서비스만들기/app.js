const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan") // 로그를 남기는 모듈
const path = require("path")
const session = require("express-session")
const nunjucks = require("nunjucks") // 템플릿 엔진
const dotenv = require("dotenv") // 환경변수 관리

dotenv.config() // .env 파일을 읽어서 process.env로 만듬
const passport = require("passport")

const pageRouter = require("./routes/page")
const { sequelize } = require("./models")
const passportConfig = require("./passport")

const app = express()
passportConfig()
app.set("port", process.env.PORT || 8001) // PORT 번호를 설정
app.set("view engine", "html") // 템플릿 엔진을 html로 설정
nunjucks.configure("views", {
  // views 폴더를 템플릿 폴더로 지정
  express: app,
  watch: true,
})

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공")
  })
  .catch(err => {
    console.error(err)
  })

app.use(morgan("dev")) // 로그를 남김
app.use(express.static(path.join(__dirname, "public"))) // 정적 파일을 제공
app.use(express.json()) // JSON 형식의 본문을 처리
app.use(express.urlencoded({ extended: false })) // 폼 데이터를 처리
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키를 암호화
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // 쿠키 설정
      httpOnly: true,
      secure: false,
    },
  })
) // 세션을 암호화

/*
req.session 객체는 express-session 에서 생성하는 것이므로 
passport 미들웨어는 express-session 미들웨어보다 뒤에 연결되어야 한다. 
*/
app.use(passport.initialize())
app.use(passport.session())

app.use("/", pageRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  // 에러 처리 미들웨어
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중")
})
