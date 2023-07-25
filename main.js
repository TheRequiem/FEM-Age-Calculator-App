// Everything runs when the calculate button is clicked!
const calculate = () => {
  // Variable delcarations for reusability
  const dayInput = document.getElementById("day").value;
  const monthInput = document.getElementById("month").value;
  const yearInput = document.getElementById("year").value;
  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");
  const dayText = document.getElementById("day-text");
  const monthText = document.getElementById("month-text");
  const yearText = document.getElementById("year-text");
  const dayResult = document.getElementById("day-result");
  const monthResult = document.getElementById("month-result");
  const yearResult = document.getElementById("year-result");
  const currentDate = new Date();
  const yearRegex = /^\d{4}$/;
  let flagErrorDay = false;
  let flagErrorMonth = false;
  let flagErrorYear = false;

  // Function Definitions for conditional rendering
  const dayErrorState = () => {
    flagErrorDay = true;
    dayText.style.color = "var(--clr-primary-light-red)";
    document.getElementById("day").style.borderColor =
      "var(--clr-primary-light-red)";
  };
  const monthErrorState = () => {
    flagErrorMonth = true;
    monthText.style.color = "var(--clr-primary-light-red)";
    document.getElementById("month").style.borderColor =
      "var(--clr-primary-light-red)";
  };
  const yearErrorState = () => {
    flagErrorYear = true;
    yearText.style.color = "var(--clr-primary-light-red)";
    document.getElementById("year").style.borderColor =
      "var(--clr-primary-light-red)";
  };
  // Callback funtions for error state along with an extra line of code for the error text
  const dayInvalid = () => {
    dayError.style.display = "block";
    dayError.innerHTML = "Must be a valid day";
    dayErrorState();
  };
  const monthInvalid = () => {
    monthError.style.display = "block";
    monthError.innerHTML = "Must be a valid month";
    monthErrorState();
  };
  const yearInvalid = () => {
    yearError.style.display = "block";
    yearError.innerHTML = "Must be in the past";
    yearErrorState();
  };
  // Revert functions revert state back to normal when the errors are resolved
  const revertDayState = () => {
    errorDay = false;
    dayError.style.display = "none";
    dayText.style.color = "var(--clr-neutral-smokey-grey)";
    document.getElementById("day").style.borderColor = "hsla(0, 1%, 44%, 0.2)";
  };
  const revertMonthState = () => {
    flagErrorMonth = false;
    monthError.style.display = "none";
    monthText.style.color = "var(--clr-neutral-smokey-grey)";
    document.getElementById("month").style.borderColor =
      "hsla(0, 1%, 44%, 0.2)";
  };
  const revertYearState = () => {
    flagErrorYear = false;
    yearError.style.display = "none";
    yearText.style.color = "var(--clr-neutral-smokey-grey)";
    document.getElementById("year").style.borderColor = "hsla(0, 1%, 44%, 0.2)";
  };
  // conditional rendering for errors
  const validateDay = () => {
    dayInput > 31 || dayInput <= 0 ? dayInvalid() : revertDayState();
  };
  const validateMonth = () => {
    monthInput > 12 || monthInput <= 0 ? monthInvalid() : revertMonthState();
  };
  const validateYear = () => {
    // For year, I am using RegEx to validate that is 4 digits long and that the number cant exceed the present year
    yearInput > currentDate.getFullYear() ||
    yearInput < 0 ||
    !yearRegex.test(yearInput)
      ? yearInvalid()
      : revertYearState();
  };
  const dayBlank = () => {
    dayError.style.display = "block";
    dayErrorState();
    dayError.innerHTML = "This field is required";
  };
  const monthBlank = () => {
    monthErrorState();
    monthError.style.display = "block";
    monthError.innerHTML = "This field is required";
  };
  const yearBlank = () => {
    yearErrorState();
    yearError.style.display = "block";
    yearError.innerHTML = "This field is required";
  };
  dayInput == "" ? dayBlank() : validateDay();
  monthInput == "" ? monthBlank() : validateMonth();
  yearInput == "" ? yearBlank() : validateYear();
  // Date Validator
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const isValidDate = (year, month, day) => {
    if (
      year < 1 ||
      year > 9999 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return false;
    }

    const daysInMonth = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const maxDay = daysInMonth[month - 1];

    return day <= maxDay;
  };

  if (
    !isValidDate(yearInput, monthInput, dayInput) &&
    !flagErrorDay &&
    !flagErrorMonth &&
    !flagErrorYear
  ) {
    dayErrorState();
    monthErrorState();
    yearErrorState();
    dayError.style.display = "block";
    dayError.innerHTML = "Must be a valid date";
  }

  // Algorithm to calculate approximation of years, months and days difference
  // The inputs are taken from input fields in number format, month input is subtracted by 1 because JavaScript counts months from 0-11
  const chosenDate = new Date(yearInput, monthInput - 1, dayInput);
  const finalDate = currentDate - chosenDate;

  const msInADay = 1000 * 60 * 60 * 24;
  const msInAYear = msInADay * 365.25; // Accounting for leap years

  const years = Math.floor(finalDate / msInAYear);
  const remainingMs = finalDate - years * msInAYear;

  // Calculate months and days
  const months = Math.floor(remainingMs / (msInADay * 30.44)); // Assuming average month length of 30.44 days
  const days = Math.floor((remainingMs - months * msInADay * 30.44) / msInADay);

  // The approximation are passed on and voila!
  const passValues = () => {
    dayResult.innerHTML = days;
    monthResult.innerHTML = months;
    yearResult.innerHTML = years;
  };
  const blankValues = () => {
    dayResult.innerHTML = "--";
    monthResult.innerHTML = "--";
    yearResult.innerHTML = "--";
  };

  flagErrorDay || flagErrorMonth || flagErrorYear
    ? blankValues()
    : passValues();
};
