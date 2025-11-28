
// index.js



function showOfferDialog(hisName, stats, img, price) {
    let cdialog = document.createElement("dialog");
    const title_div = document.createElement("div");

    title_div.id = "title_div";
    const Name_dialog = document.createElement("h1");
    Name_dialog.id = "dialog_title";
    Name_dialog.innerHTML = hisName;

    const button_close = document.createElement("button");
    button_close.onclick = () => { cdialog.close(); cdialog.remove() };
    button_close.id = "close";
    button_close.innerHTML = "&#10006";

    const orderbtn = document.createElement("button");
    orderbtn.innerHTML = "Order";
    orderbtn.id="button_order";
    orderbtn.onclick = function(){Addtobasket(hisName,price);};

    title_div.appendChild(button_close);

    title_div.appendChild(Name_dialog);
    
    title_div.appendChild(orderbtn);

    cdialog.appendChild(title_div);
    const img_div = document.createElement("div");
    const div_img = document.createElement("img");
    div_img.alt = hisName;
    div_img.src = img;
    img_div.id = "dialog_img";

    img_div.appendChild(div_img);

    cdialog.appendChild(img_div);

    const text_div = document.createElement("div");

    const Stats_dialog = document.createElement("h2");
    text_div.id = "dialog_text";
    Stats_dialog.innerHTML = stats;
    const price_dialog = document.createElement("h3");
    price_dialog.innerHTML = price;

    text_div.appendChild(Stats_dialog);
    text_div.appendChild(price_dialog);
    cdialog.appendChild(text_div);




    const section_dialog = document.querySelector(".showcase-products");

    section_dialog.appendChild(cdialog);

    cdialog.showModal();
}
function Addtobasket(Name,price) {
    const basket_div = document.getElementById("order_basket");
    if (!document.getElementById("unique_order")) {
        const para_basket = document.createElement("p");
        para_basket.id="unique_order";

        para_basket.innerHTML = "Order : Summoning of "+Name;
        const detail =document.createElement("P");
        detail.innerHTML= "Rental for 1 battle";
        const basket_price = document.createElement("p");
        basket_price.innerHTML= price;
        basket_div.appendChild(para_basket);
        basket_div.appendChild(detail);
        basket_div.appendChild(basket_price);
    }
    else{
        alert("An item already in basket");
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addCourseForm");
    const NameInput = document.getElementById("Name");
    const EmailInput = document.getElementById("Email");
    const PhoneInput = document.getElementById("PhoneNumber");
    const DOBInput = document.getElementById("DOB");
    const TermsCheckbox = document.getElementById("TermsCheckbox");


    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const ErrorDisplay = inputControl.querySelector('.error');

        ErrorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const ErrorDisplay = inputControl.querySelector('.error');

        ErrorDisplay.innerText = '';
        inputControl.classList.remove('error');
        inputControl.classList.add('success');

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
        }

        return validSubmit;
    }





    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!TermsCheckbox.checked) {
            alert("You must agree with the Terms before submitting.");
            return;
        }
        const validSubmit = validateForm();
        if (validSubmit === 4) {
            if(document.getElementById("unique_order")){
            window.location.href = 'Thanks.html';
            }
            else{
                alert("Your basket is empty!");
            }
        }



    });
});



