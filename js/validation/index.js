// 함수명은 동사로 시작하는 이름이 더 선호
export const checkError = {
  isTime(time) {
    if (time >= "00:00" && time < "12:00") {
      return (time += " AM");
    } else if (time >= "12:00" && time < "24:00") {
      return (time += " PM");
    } else {
      throw new Error("시간 형식이 올바르지 않습니다");
    }
  },
  isEmptyText(text) {
    if (text.trim() === "") {
      alert("빈 값은 입력할 수 없습니다.");
      throw new Error("빈 텍스트 입니다.");
    } else return text;
  },
  isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }
};
