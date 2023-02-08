const $name = document.getElementById("name");
const $email = document.getElementById("email");
const $subject = document.getElementById("subject");
const $message = document.getElementById("message");

//Show input error message
function showError(input, message) {
  const contactBox = input.parentElement;
  const span = contactBox.querySelector("span");
  span.textContent = message;
  input.classList.add("error-input");
  input.classList.remove("success-input");
}

//Show success outline
function showSuccess(input) {
  const contactBox = input.parentElement;
  contactBox.querySelector(".error-msg").textContent = "";
  input.classList.add("success-input");
}

//Check email is valid
function checkMail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Check required fields
function checkRequired(inputArr) {
  let isValid = false;
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      isValid = true;
    }
  });
  return isValid;
}

//Check input length
function checkLenght(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

document.addEventListener("submit", (e) => {
  if (e.target.matches(".form")) {
    e.preventDefault();

    if (checkRequired([$name, $email, $subject, $message])) {
      checkLenght($name, 3, 15);
      checkLenght($subject, 4, 15);
      checkLenght($message, 10, 255);
      checkMail($email);
    }
  }
});
