export function renderItem (item) {

  const itemDivEl = document.createElement('div');
  const itemPEl = document.createElement('p');

  if (item.complete) {
    itemDivEl.classList.add('complete');
  } else {
    itemDivEl.classList.add('incomplete');
  }

  itemDivEl.classList.add('item');

  itemPEl.textContent = item.item;

  itemDivEl.append(itemPEl);

  return itemDivEl;

}