ci 단계에서 테스트코드가 돌아가는 부분과 번들 분석하는 부분에서 계속 invalid next.config.js 에러가 발생한다. 
이것저것 무엇이 문제인지 테스트하는 중이다. 

---
withPlugin이 문제인가 싶어서 확인을 해보았다. 

> module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions); 

withPlugin을 사용하지 않고, 그냥 위와 같이 곧바로 사용하도록 만들었는데, 
그래도 에러가 발생한다. 이것은 문제가 아닌것 같다. 

---
이번에는 아예 순수하게 nextConfig만 Export했다. 

> module.exports = nextConfig;

