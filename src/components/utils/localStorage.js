const getStoredCountries = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const saveTolS = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addToLS = (id) => {
  const cart = getStoredCountries();
  cart.push(id);
  saveTolS(cart);
};

const removeFromLS = (id) => {
  const cart = getStoredCountries();
  const remaining = cart.filter((idx) => idx !== id);
  saveTolS(remaining);
};

export { addToLS, getStoredCountries, removeFromLS };
