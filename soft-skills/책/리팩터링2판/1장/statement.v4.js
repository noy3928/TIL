function volumeCredits(perf) {
  let result = 0;
  result += Math.max(perf.audience - 30, 0);
  if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function amountFor(aPerformance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }

  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function totalVolumeCredits() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += volumeCredits(perf);
  }
  return result;
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${play.name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${usd(totalAmount / 100)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}

/*
1.반복문 쪼개기 
2. 문장 슬라이드하기 : 변수 초기화 문장을 변수 값 누적 코드 바로 압ㅍ으로 옮긴다. 
3. 함수 추출하기 : 적립 포인트 계산 부분을 별도 함수로 추출한다. 
4. 변수 인라인하기 : volumeCredits 변수를 제거한다.

*/
