function trackSummary(points) {
    const totalTime = calculateTime();
    const pace = totalTime / 60 / totalDistance(points);
    return {
      time: totalTime,
      distance: totalDistance(points),
      pace: pace,
    };
  
    function calculateDistance() {
      let result = 0;
      for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
      }
      return result;

      function distance(p1, p2){...}
      function radians(degrees) {...}
    }
  
      function calculateTime() {...}
  }

  function top_calculateDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;

    function distance(p1, p2){...}
    function radians(degrees) {...}
  }
  
  /*
  distance 함수는 calculateDistance 함수 안에서만 사용되므로 이 함수를 calculateDistance 함수 안으로 옮긴다.
  그리고 radians 함수는 distance 함수 안에서만 사용되므로 distance 함수와 함께 컨텍스트를 옮긴다. 
  
  */