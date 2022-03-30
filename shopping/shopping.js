import {
  checkAuth,
  createItem,
  buyItem,
  getShoppingList,
  logout,
  deleteShoppingList,

} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const itemsListEl = document.querySelector('.items-list');
const listItemForm = document.querySelector('.list-item-form');
const logoutButton = document.getElementById('logout');
const deleteButton = document.querySelector('.delete-list');
const loadingEl = document.querySelector('.loading-spinner');


listItemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(listItemForm);

  const item = data.get('item');

  await createItem(item);

  listItemForm.reset();

  await fetchAndDisplayItems();

});


async function fetchAndDisplayItems () {
  toggleLoadingSpinner();
  const items = await getShoppingList();
  itemsListEl.textContent = '';

  for (let item of items) {
    const itemEl = renderItem(item);

    itemEl.addEventListener('click', async () => {
      await buyItem(item.id);

      fetchAndDisplayItems();
    });
    itemsListEl.append(itemEl);
  }

  toggleLoadingSpinner();
}

function toggleLoadingSpinner () {
  loadingEl.classList.toggle('invisible');
}

window.addEventListener('load', () => {
  fetchAndDisplayItems();
});

logoutButton.addEventListener('click', () => {
  logout();
});

deleteButton.addEventListener('click', async () => {
  await deleteShoppingList();
  await fetchAndDisplayItems();
});