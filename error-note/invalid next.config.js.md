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

이렇게 해도 에러가 발생한다. 

---
이번에는 sentry를 제거하고 배포해보았다. 

```js
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	images: {
		domains: ['recoen.s3.ap-northeast-2.amazonaws.com'],
		formats: ['image/avif', 'image/webp'],
	},
};
```

sentry를 제거하니까 invalid에러는 제거되었다. 그런데 해당 에러는 withSentry를 사용하지 않은채로 사용했기 때문에 발생했던 에러인 것 같다. 다시 withSentry를 사용해서 확인을 해보자. 

---
withSentry를 사용하고나니 마찬가지로 Invalid에러는 제거된 상태를 확인할 수 있었다. 
이제 남아있는 에러는 다음과 같다. 

```js
Run borales/actions-yarn@v3.0.0

[4](https://github.com/noy3928/RECOEN/actions/runs/4413356253/jobs/7733726073#step:5:5)/usr/bin/docker run --name a5c76bf5af3f10dbda43ed8d4f748311529f33_9b7c6d --label a5c76b --workdir /github/workspace --rm -e "INPUT_CMD" -e "INPUT_AUTH-TOKEN" -e "INPUT_REGISTRY-URL" -e "NPM_AUTH_TOKEN" -e "NPM_REGISTRY_URL" -e "HOME" -e "GITHUB_JOB" -e "GITHUB_REF" -e "GITHUB_SHA" -e "GITHUB_REPOSITORY" -e "GITHUB_REPOSITORY_OWNER" -e "GITHUB_REPOSITORY_OWNER_ID" -e "GITHUB_RUN_ID" -e "GITHUB_RUN_NUMBER" -e "GITHUB_RETENTION_DAYS" -e "GITHUB_RUN_ATTEMPT" -e "GITHUB_REPOSITORY_ID" -e "GITHUB_ACTOR_ID" -e "GITHUB_ACTOR" -e "GITHUB_TRIGGERING_ACTOR" -e "GITHUB_WORKFLOW" -e "GITHUB_HEAD_REF" -e "GITHUB_BASE_REF" -e "GITHUB_EVENT_NAME" -e "GITHUB_SERVER_URL" -e "GITHUB_API_URL" -e "GITHUB_GRAPHQL_URL" -e "GITHUB_REF_NAME" -e "GITHUB_REF_PROTECTED" -e "GITHUB_REF_TYPE" -e "GITHUB_WORKFLOW_REF" -e "GITHUB_WORKFLOW_SHA" -e "GITHUB_WORKSPACE" -e "GITHUB_ACTION" -e "GITHUB_EVENT_PATH" -e "GITHUB_ACTION_REPOSITORY" -e "GITHUB_ACTION_REF" -e "GITHUB_PATH" -e "GITHUB_ENV" -e "GITHUB_STEP_SUMMARY" -e "GITHUB_STATE" -e "GITHUB_OUTPUT" -e "RUNNER_OS" -e "RUNNER_ARCH" -e "RUNNER_NAME" -e "RUNNER_TOOL_CACHE" -e "RUNNER_TEMP" -e "RUNNER_WORKSPACE" -e "ACTIONS_RUNTIME_URL" -e "ACTIONS_RUNTIME_TOKEN" -e "ACTIONS_CACHE_URL" -e GITHUB_ACTIONS=true -e CI=true -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "/home/runner/work/_temp/_runner_file_commands":"/github/file_commands" -v "/home/runner/work/RECOEN/RECOEN":"/github/workspace" a5c76b:f5af3f10dbda43ed8d4f748311529f33 "test"

[5](https://github.com/noy3928/RECOEN/actions/runs/4413356253/jobs/7733726073#step:5:6)

[6](https://github.com/noy3928/RECOEN/actions/runs/4413356253/jobs/7733726073#step:5:7)--watch is not supported without git/hg, please use --watchAll
```

뭔가 --watch를 사용하지 말고, --watchAll을 사용하라고 하는 것 같아서 해당 문구와 같이 수정해보기로했다. 
package.json의 script에서 test에 해당하는 부분을 watchAll로 수정해보자. 

