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
  }

    function distance(p1, p2){...}
    function radians(degrees) {...}
    function calculateTime() {...}
}

/*
이 상황에서 calculateDistance 이 함수를 최상위로 옮겨서 추적 거리를 다른 정보와는 독립적으로 계산하고 싶다. 

*/