## Same origin policy and CORS 

특정 사이트에 접속하면 브라우저는 해당 사이트가 호스팅되는 서버에 요청을 보낸다. 그러면 해당 서버는 응답으로 HTML을 보내준다. 이 HTML에는 다른 사이트에 대한 URL이 들어있을 수도 있다. 이때 이 URL이 만약 호스팅되는 사이트와 동일하지 않다면 (HTML과 동일한 원본을 공유하지 않는다면) Access-Control-Allow-origin 응답 헤더를 확인해야 한다. 