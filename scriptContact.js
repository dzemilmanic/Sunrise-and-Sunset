let inputs = document.querySelectorAll('input');
let errors = {
    "namee" : [],
    "surname" : [],
    "email" : [],
    "message" : []
}
inputs.forEach(element => {
    element.addEventListener('keyup', e => {
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

        errors[inputName] = [];
        switch (inputName) {
            case 'namee':
                if (!validateName(inputValue)) {
                    errors[inputName].push('Invalid name');
                }
                break;
            case 'surname':
                if (!validateSurname(inputValue)) {
                    errors[inputName].push('Invalid last name');
                }
                break;
            case 'email':
                if (!validateEmail(inputValue)) {
                    errors[inputName].push('Invalid e-mail address');
                }
                break;
            case 'message':
                if (!validateMessage(inputValue)) {
                    errors[inputName].push('Invalid message');
                }
                break;
        }
        popErrors(inputName);
    });
});
const popErrors = (inputName) => {
    let input = document.querySelector(`input[name="${inputName}"]`);
    if (input) {
        let parentElement = input.parentElement;
        let errorsElement = parentElement.querySelector('ul');

        if (errorsElement) {
            errorsElement.remove(); // ukloni postojeći ul element
        }

        // kreiraj novi ul element samo ako postoje greske za trenutni input
        if (errors[inputName] && errors[inputName].length > 0) {
            errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            // Dodaj li elemente za svaku gresku
            errors[inputName].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            });
        }
    }
};
const validateEmail = (email) =>{
    if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        return true;
    }
    return false;
}
const validateName = (namee) => {
    let isValid = true;
    if (namee.length < 2) {
        errors['namee'].push('Name must have at least 2 characters.');
        isValid = false;
    }
    if(isValid){
        return true;
    }
    else {
        return false;
    }
};
const validateSurname = (surname) => {
    let isValid = true;
    if (surname.length < 2) {
        errors['surname'].push('Last name must have at least 2 characters.');
        isValid = false;
    }
    if(isValid){
        return true;
    }
    else {
        return false;
    }
};
const validateMessage = (message) => {
    let isValid = true;
    if (message.length < 10) {
        errors['message'].push('Message must have at least 10 characters.');
        isValid = false;
    }
    if(isValid){
        return true;
    }
    else {
        return false;
    }
};

function showPlaceholder1(){
    var outputElement = document.getElementById("output1");
    outputElement.innerHTML = "Name mast have at least 2 characters";
};

function showPlaceholder2(){
    var outputElement = document.getElementById("output2");
    outputElement.innerHTML = "Last name mast have at least 2 characters";
};

function showPlaceholder3(){
    var outputElement = document.getElementById("output3");
    outputElement.innerHTML = "E-mail mast have some text, @, some text, point and some text";
};

function showPlaceholder4(){
    var outputElement = document.getElementById("output4");
    outputElement.innerHTML = "Message must have at least 10 characters";
};

function hidePlaceholder1(){
    var outputElement = document.getElementById("output1");
    outputElement.innerHTML = "";
};

function hidePlaceholder2(){
    var outputElement = document.getElementById("output2");
    outputElement.innerHTML = "";
};

function hidePlaceholder3(){
    var outputElement = document.getElementById("output3");
    outputElement.innerHTML = "";
};

function hidePlaceholder4(){
    var outputElement = document.getElementById("output4");
    outputElement.innerHTML = "";
};
function sendMessage(){
    const email = document.getElementById('email').value; 
    const namee = document.getElementById('namee').value; 
    const surname = document.getElementById('surname').value; 
    const message = document.getElementById('message').value; 

    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(namee);
    const isSurnameValid = validateSurname(surname);
    const isMessageValid = validateMessage(message);
    
    if(isEmailValid && isNameValid && isSurnameValid && isMessageValid){
        alert("Message sent successfully");
    }
    else{
    alert("The form is not filled in correctly");
    }
};
