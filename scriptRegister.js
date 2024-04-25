function sendRequest(){
    const email = document.getElementById('email3').value; 
    const password = document.getElementById('password2').value; 

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if(isEmailValid && isPasswordValid){
       let user = new User();
       user.email = email;
       hash(password)
       .then(hashedPassword => {
           user.password = hashedPassword;
           return user.create();
           
       })
       .catch(error => {
           console.error('Error hashing password:', error);
           alert('Error hashing password');
       });
    }
    else{
    alert("The form is not filled in correctly");
    }
    
};
const validateEmail = (email) =>{
    if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        return true;
    }
    return false;
}
const validatePassword = (password) => {
    let isValid = true;
    if (password.length < 8) {
        errors['password'].push('Password must have at least 8 characters');
        isValid = false;
    }
    if (!/\d/.test(password)) {
        errors['password'].push('Password must have at least one number');
        isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
        errors['password'].push('Password must have at least one large character');
        isValid = false;
    } 
    if(isValid){
        return true;
    }
    else {
        return false;
    }
};
let inputs = document.querySelectorAll('input');
let errors = {
    "email" : [],
    "password" : []
}
inputs.forEach(element =>{
    element.addEventListener('keyup', e =>{
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

            errors[inputName] = [];
            switch(inputName){
                case 'email':
                    if(!validateEmail(inputValue)){
                        errors[inputName].push('Invalid email address');
                    } 
                    break;
                case 'password':
                    if(!validatePassword(inputValue)){
                        errors[inputName].push('Invalid password');
                    } 
                    break;
            }
        popErrors(inputName);
    })
});
const popErrors = (inputName) => {
    document.querySelectorAll('input').forEach(input => {
        let parentElement = input.parentElement;
        let errorsElement = parentElement.querySelector('ul');

        if (errorsElement) {
            errorsElement.remove(); // Ukloni postojeći ul element
        }

        let key = input.getAttribute('name');

        // Kreiraj novi ul element samo ako postoje greske za trenutni input
        if (errors[key] && errors[key].length > 0) {
            errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            // Dodaj li elemente za svaku gresku
            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            });
        }
    });
};