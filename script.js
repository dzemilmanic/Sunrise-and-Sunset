// Prikazivanje ili sakrivanje dugmeta na osnovu pozicije skrola
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// funkcija za pomeranje na vrh stranice

function scrollToTop() {
    const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentPosition > 0) {
        const scrollStep = Math.PI / 5;
        const cosParameter = currentPosition / 5;

        window.requestAnimationFrame(() => {
            document.documentElement.scrollTop = document.body.scrollTop = currentPosition - cosParameter * scrollStep;
            scrollToTop();
        });
    }
}
function hash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return crypto.subtle.digest('SHA-256', data)
        .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        });
}
class User {
    email = '';
    password = '';
    api_url = 'https://65ae2e201dfbae409a7427a2.mockapi.io';
    
    create(){
        let data = {
            email: this.email,
            password: this.password
        }
        data = JSON.stringify(data);
        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            alert('User created');
            window.location.href = 'login.html';
        })
    }
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'en,bs', 
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            gaTrack: false,
            doNotShowInfoBox: true,
            autoDisplay: false,
        },
        'google_translate_element'
    );
    //DOMContentLoaded ceka da dom bude full ucitan
    document.addEventListener('DOMContentLoaded', function () {
        
        var showTranslateMenuButton = document.getElementById('showTranslateMenuButton');
        
        if (showTranslateMenuButton) {
            showTranslateMenuButton.addEventListener('click', function () {
                new google.translate.TranslateElement({ layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
            });
        }
    });
}

if (localStorage.getItem('ulogovan')) {
    document.getElementById('logout').style.display = 'block';
} 
const Logout = () =>{
    localStorage.clear();
    alert('You are logged out');
    location.reload();
}
