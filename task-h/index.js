// index.js
// Author: Ville Heikkiniemi
// Date: 2025-10-06
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const CHECK = '✅';
  const CROSS = '❌';
  const dayOrder = ["Fri", "Mon"];

  const form = document.getElementById("addCourseForm");
  const table = document.getElementById("timetable").querySelector("tbody");
  const NameInput = document.getElementById("Name");
  const EmailInput = document.getElementById("Email");
  const PhoneInput = document.getElementById("PhoneNumber");
  const DOBInput = document.getElementById("DOB");
  const TermsCheckbox = document.getElementById("TermsCheckbox");


  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const ErrorDisplay = inputControl.querySelector('.error');

    ErrorDisplay.innerText = message;
    ErrorDisplay.className ="error text-[#ff0000]";
    element.classList.add("border-[#ff0000]");
    element.classList.remove("border-[#66ff40]");
  };

  const setSuccess = element => {
    const inputControl = element.parentElement;
    const ErrorDisplay = inputControl.querySelector('.error');

    ErrorDisplay.innerText = '';
    element.classList.remove("border-[#ff0000]");
    element.classList.add("border-[#66ff40]");

  };

  const validateForm = () => {

    let validSubmit = 0;
    const NameValue = NameInput.value.trim();
    const EmailValue = EmailInput.value.trim();
    const PhoneValue = PhoneInput.value.trim();
    const DOBValue = DOBInput.value.trim();
    if (NameValue === '') {
      setError(NameInput, 'Name must be filled');
    }
    else {
      if (NameValue.indexOf(' ') !== -1) {
        const words = NameValue.split(' ');
        const validWords = words.every(word => word.length >= 2);
        if (validWords) {
          setSuccess(NameInput);
          validSubmit++;
        }
        else {
          setError(NameInput, 'Each word must have at least 2 characters');
        }
      }
      else {
        setError(NameInput, 'there should be at least 2 words');
      }

    }

    if (EmailValue === '') {
      setError(EmailInput, 'Email must be filled');
    }
    else {
      if (!EmailInput.checkValidity()) {
        setError(EmailInput, 'Incorrect Format');
      }
      else {
        setSuccess(EmailInput);
        validSubmit++;
      }

    }

    if (PhoneValue === '') {
      setError(PhoneInput, 'Phone number must be filled');
    }
    else {
      const regex = new RegExp(/^\d+$/);
      if (regex.test(PhoneValue)) {
        const regex_digits = new RegExp(/^\d{10}$/);
        if (regex_digits.test(PhoneValue)) {
          setSuccess(PhoneInput);
          validSubmit++;
        }
        else {
          setError(PhoneInput, 'There should be 10 numbers');
        }

      }
      else {
        setError(PhoneInput, 'It should only have numbers');
      }
    }

    if (DOBValue === '') {
      setError(DOBInput, 'Date of Birth must be given');
    }
    else {
      var today = new Date();
      const dob = new Date(DOBValue);
      if (dob <= today) {

        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        if (age >= 13) {
          setSuccess(DOBInput);
          validSubmit++;
        }
        else {
          setError(DOBInput, 'You should be at least 13 years old');
        }
      }
      else {
        setError(DOBInput, 'Date cannot be in the future');
      }


      return { validSubmit, NameValue, EmailValue, PhoneValue, DOBValue };
    }




  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!TermsCheckbox.checked) {
      alert("You must agree with the Terms before submitting.");
      return;
    }
    const { validSubmit, NameValue, EmailValue, PhoneValue, DOBValue } = validateForm();
    if (validSubmit === 4) {
      const row = document.createElement("tr");
      const TimestampCell = document.createElement("td");
      TimestampCell.textContent = new Date();
      row.appendChild(TimestampCell);

      const NameCell = document.createElement("td");
      NameCell.className = "text-center w-[12%] p-[0.75rem]";
      NameCell.textContent = NameValue;
      row.appendChild(NameCell);

      const EmailCell = document.createElement("td");
      EmailCell.className= "text-center w-[12%] p-[0.75rem]";
      EmailCell.textContent = EmailValue;
      row.appendChild(EmailCell);

      const PhoneCell = document.createElement("td");
      PhoneCell.textContent = PhoneValue;
      PhoneCell.className ="text-center w-[12%] p-[0.75rem]";
      row.appendChild(PhoneCell);

      const DOBCell = document.createElement("td");
      DOBCell.textContent = DOBValue;
      DOBCell.className = "text-center w-[12%] p-[0.75rem]";
      row.appendChild(DOBCell);

      table.appendChild(row);

    }



  });
});

