const ITEM_KEY = "_todos";

const getItems = () => {
  let items = localStorage.getItem(ITEM_KEY);

  if (!items) {
    return [];
  }

  return JSON.parse(items);
};

const addItem = (item) => {
  let items = getItems();

  items.push(item);

  localStorage.setItem(ITEM_KEY, JSON.stringify(items));
};

const removeItem = (item) => {
  let items = getItems();

  let newItems = items.filter((it) => it != item);

  localStorage.setItem(ITEM_KEY, JSON.stringify(newItems));
};
const updatedItem = (old, newItem) => {
  let items = getItems();

  let index = items.indexOf(old);

  console.log(index);

  let newItems = items.filter((it) => it != old);

  items.splice(index, 1, newItem);
  localStorage.setItem(ITEM_KEY, JSON.stringify(items));
};

export { getItems, addItem, removeItem, updatedItem };
