const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
//solution 1
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
function addAllParameters(cart, productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addAllParameters(cart, productId, name, price, quantity);
  res.json({ result });
});

//solution 2

function updateQuantityBasedOnproductId(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantityBasedOnproductId(cart, productId, quantity);
  res.json({ result });
});

//solution 3
function deleteItemBasedOnproductId(cart, productId) {
  return cart.productId !== productId;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) =>
    deleteItemBasedOnproductId(cart, productId)
  );
  res.json({ result: cart });
});

//solution 4

function getCartItems(cart) {
  return { cartItems: cart };
}
app.get('/cart', (req, res) => {
  let result = getCartItems(cart);
  res.json({ result });
});
//solution 5

function getCartTotalItems(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].quantity;
  }
  return sum;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = getCartTotalItems(cart);
  res.json({ result });
});
//solution 6

function getCartTotalPrice(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].price;
  }
  return sum;
}
app.get('/cart/total-price', (req, res) => {
  let result = getCartTotalPrice(cart);
  res.json({ result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

