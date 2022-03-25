import { signUp, signIn } from './fetch-utils.js';

const signUpForm = document.querySelector('#sign-up');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const data = new FormData(signUpForm);
    const email = data.get('email');
    const password = data.get('password');

    await signUp(email, password);

    window.location.href = './polls';
});

const signInForm = document.querySelector('#sign-in');

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(signInForm);
    const email = data.get('email');
    const password = data.get('password');

    await signIn(email, password);

    window.location.href = './polls';
});
