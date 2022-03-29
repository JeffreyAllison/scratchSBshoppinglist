import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  logout();
});

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

});