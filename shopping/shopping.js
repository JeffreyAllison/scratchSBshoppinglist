import {
  checkAuth,
  logout,
  createItem,
  getShoppingList,
  deleteShoppingList,
  purchaseItem

} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const listItemForm = document.querySelector('.list-item-form');

logoutButton.addEventListener('click', () => {
  logout();
});

listItemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(listItemForm);;

  await createItem({
    amount: data.get('amount'),
    item: data.get('item'),
    purchased: false,
  });

  await fetchAndDisplayItems();

});