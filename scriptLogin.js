let inputsLogin = document.querySelectorAll('input');
let errorsLogin = {
    "email" : [],
    "password" : []
};
inputsLogin.forEach(element =>{
    element.addEventListener('input', e =>{
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

            errorsLogin[inputName] = [];
            switch(inputName){
                case 'email':
                    if(!validateEmail(inputValue)){
                        errorsLogin[inputName].push('Invalid email address');
                    } 
                    break;
                case 'password':
                    if(!validatePassword(inputValue)){
                        errorsLogin[inputName].push('Invalid password');
                    } 
                    break;
            }
        popErrorsLogin(inputName);
    })
});
const popErrorsLogin = (inputName) => {
    document.querySelectorAll('input').forEach(input => {
        let parentElement = input.parentElement;
        let errorsElement = parentElement.querySelector('ul');

        if (errorsElement) {
            errorsElement.remove(); // Ukloni postojeći ul element
        }

        let key = input.getAttribute('name');

        // Kreiraj novi ul element samo ako postoje greske za trenutni input
        if (errorsLogin[key] && errorsLogin[key].length > 0) {
            errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            // Dodaj li elemente za svaku gresku
            errorsLogin[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            });
        }
    });
};
const validateEmail = email =>{
    if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
        return true;
    }
    return false;
}
const validatePassword = (password) => {
    let isValid = true;
    if (password.length < 8) {
        errorsLogin['password'].push('Password must have at least 8 characters');
        isValid = false;
    }
    if (!/\d/.test(password)) {
        errorsLogin['password'].push('Password must have at least one number');
        isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
        errorsLogin['password'].push('Password must have at least one large character');
        isValid = false;
    } 
    if(isValid){
        return true;
    }
    else {
        return false;
    }
};

const Login = () =>{
    const email = document.getElementById('email2').value; 
    const password = document.getElementById('password').value;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password); 
    if(isEmailValid && isPasswordValid){
        checkUser(email,password);
    }
    else{
        alert("Incorrectly filled form");
    }
    
};

const checkUser = (email, password) => {
    fetch('https://65ae2e201dfbae409a7427a2.mockapi.io/users')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const users = data;
                const user = users.find(u => u.email === email);

                if (!user) {
                    alert("Unknown user email");
                    return;
                }

                hash(password)
                    .then(hashPassword => {
                        console.log(hashPassword);
                        if (user.password === hashPassword) {
                            alert("Successfully login");
                            localStorage.setItem('ulogovan', true);
                            window.location.href = 'index.html';
                        } else {
                            alert("Wrong password");
                        }
                    })
                    .catch(error => {
                        console.error('Error hashing password:', error);
                        location.reload();
                    });
            } else {
                alert("Data not exist");
                location.reload();
            }
        })
        .catch(error => console.log(error));
};