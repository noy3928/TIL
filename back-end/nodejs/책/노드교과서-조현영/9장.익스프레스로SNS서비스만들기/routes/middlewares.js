exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // 로그인 중이면 true, 아니면 false
    next()
  } else {
    res.status(403).send("로그인 필요")
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // 로그인 중이면 false, 아니면 true
    next()
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.")
    res.redirect(`/?error=${message}`)
  }
}
