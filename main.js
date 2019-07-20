const fact = document.querySelector("#fact");
const factText = document.querySelector("#factText");

// Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often,
// that it stalls the performance of the web page.
// In other words, it limits the rate at which a function gets invoked.
// Hello No matter how many times you click the debounce button, I get executed once every 3 seconds!!

const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const numberOption = document.querySelector("#numOption");
numberOption.addEventListener("change", handleNumberOption);

const numberInput = document.querySelector("#numberInput");
numberInput.addEventListener("input", debounce(getFactAjax, 400));

// Number Option Selected
function handleNumberOption() {
  // Clear input field
  numberInput.value = "";
  switch (numberOption.value) {
    case "Number":
      numberInput.placeholder = "Enter any number...";
      numbersAPIUrl = "http://numbersapi.com/";
      break;
    case "Date":
      numberInput.placeholder = "Enter any date (month/day)...";
      break;
    case "Year":
      numberInput.placeholder = "Enter any year (2005)...";
      break;
    default:
      break;
  }
}

// Construct API URL
function createNumbersAPIURL(para) {
  let numbersAPIUrl;
  switch (numberOption.value) {
    case "Number":
      numbersAPIUrl = "http://numbersapi.com/" + para;
      break;
    case "Date":
      numbersAPIUrl = "http://numbersapi.com/" + para + "/date";
      break;
    case "Year":
      numbersAPIUrl = "http://numbersapi.com/" + para + "/year";
      break;
    default:
      break;
  }
  return numbersAPIUrl;
}

// Fetch with XHR
function getFactAjax() {
  let number = numberInput.value;
  const url = createNumbersAPIURL(number);
  if (number != "") {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function() {
      if (this.status == 200) {
        fact.style.display = "block";
        factText.innerText = this.responseText;
      }
    };

    xhr.send();
  }
}

// Fetch with Fetch API
function getFactFetch() {
  let number = numberInput.value;
  if (number != "") {
    fetch("http://numbersapi.com/" + number)
      .then(response => response.text())
      .then(data => {
        fact.style.display = "block";
        factText.innerText = data;
      })
      .catch(err => console.log(err));
  } else {
    fact.style.display = "none";
  }
}
