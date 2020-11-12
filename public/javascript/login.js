
let logInButton = document.getElementById('login-popin');
let signupButton = document.getElementById('signup-popin');
let logInContainer = document.getElementById('login-container');
let signupContainer = document.getElementById('signup-container');
let buttonContainer = document.getElementById('button-container');
let logInInstead = document.getElementById('login-instead');
let signupInstead = document.getElementById('signup-instead');


// async tells us "This function does something asynchronous!"
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        // await gets assigned to a variable, so we don't need to use then() or catch() at Promise completion. 
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type' : 'application/json'}
        });

          // check the response status
        if (response.ok) {
            console.log('Success!');
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
};

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type' : 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


logInButton.addEventListener('click', function(e) {
    logInContainer.classList.toggle('is-open');
    buttonContainer.classList.toggle('is-closed');
});

signupButton.addEventListener('click', function(f) {
    signupContainer.classList.toggle('is-open');
    buttonContainer.classList.toggle('is-closed');
});

logInInstead.addEventListener('click', function(g) {
    signupContainer.classList.toggle('is-open');
    logInContainer.classList.toggle('is-open');
});

signupInstead.addEventListener('click', function(g) {
    signupContainer.classList.toggle('is-open');
    logInContainer.classList.toggle('is-open');
});