import '@babel/polyfill';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { login, loginBtn, logout } from './login';

// DOM elements
const mapBox = document.getElementById('map');
const updateBtn = document.querySelector('.form-user-data');
const updatePasswordBtn = document.querySelector('.form-user-password');
const logOut = document.querySelector('.nav__el--logout');
// DELEGATIONS
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (loginBtn) {
  loginBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logOut) {
  logOut.addEventListener('click', logout);
}

if (updateBtn) {
  updateBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // const photo = document.getElementById('photo').files[0];
    // updateSettings({ name, email }, 'data');
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);
    await updateSettings(form, 'data');
    window.location.reload();
  });
}
if (updatePasswordBtn) {
  updatePasswordBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-confirm').value;
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm, email },
      'password'
    );
  });

  document.getElementById('email-confirm').value = '';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
}
