//elements
const inputEl = document.getElementById("date-input");
const yearEl = document.getElementById("years");
const monthEl = document.getElementById("months");
const dateEl = document.getElementById("days");
const ouputEl = document.querySelector(".outputs-wrapper");

//global variables
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//functions
//btn onclick
function ageCalculate() {
  if (inputEl.value === "") {
    alert("Enter a valid Date");
  } else {
    let today = new Date();
    let inputDate = new Date(inputEl.value);
    let birthMonth, birthDate, birthYear;
    let birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
    };
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if (
      birthDetails.year > currentYear ||
      (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
      (birthDetails.date > currentDate &&
        birthDetails.month == currentMonth &&
        birthDetails.year == currentYear)
    ) {
      alert("Not Born Yet");
      displayResult("-", "-", "-");
      return;
    }

    birthYear = currentYear - birthDetails.year;

    if (currentMonth >= birthDetails.month) {
      birthMonth = currentMonth - birthDetails.month;
    } else {
      birthYear--;
      birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
      birthDate = currentDate - birthDetails.date;
    } else {
      birthMonth--;
      let days = months[currentMonth - 2];
      birthDate = days + currentDate - birthDetails.date;
      if (birthMonth < 0) {
        birthMonth = 11;
        birthYear--;
      }
    }
    //showing output
    ouputEl.style.visibility = "visible";
    displayResult(birthDate, birthMonth, birthYear);
  }

  //showing the result
  function displayResult(bDate, bMonth, bYear) {
    yearEl.textContent = bYear;
    monthEl.textContent = bMonth;
    dateEl.textContent = bDate;
  }
}

//checking leapyear
function leapChecker(year) {
  if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}

//eventlistners
inputEl.addEventListener("click", function () {
  ouputEl.style.visibility = "hidden";
});