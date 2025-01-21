import { cart } from './cart.js';
import { items } from './items.js';
import { discounts } from './discounts.js';

let itemsHTML = '';
let cartHTML = '';
let totalPrice = 0;
let appliedDiscount = null; // Track the currently applied discount

function updateCartDisplay() {
  cartHTML = '';
  cart.forEach((cartItem) => {
    if (cartItem.quantity > 0) {
      cartHTML += `
        <div class="order-sum-info-row">
          <p class="item-name">${cartItem.itemName}</p>
          <div class="item-controls">
            <button class="item-controls-button js-decrement" data-item-name="${cartItem.itemName}">-</button>
            <p class="item-controls-quantity">${cartItem.quantity}</p>
            <button class="item-controls-button js-increment" data-item-name="${cartItem.itemName}">+</button>
          </div>
          <p class="item-price">$${((cartItem.itemPrice * cartItem.quantity) / 100).toFixed(2)}</p>
        </div>
      `;
    }
  });

  document.querySelector('.js-order-sum-info').innerHTML = cartHTML;

  // Add listeners for increment and decrement buttons
  document.querySelectorAll('.js-increment').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.dataset.itemName;
      const cartItem = cart.find((item) => item.itemName === itemName);
      if (cartItem) {
        cartItem.quantity += 1;
        updateCartDisplay();
        calcTotal();
      }
    });
  });

  document.querySelectorAll('.js-decrement').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.dataset.itemName;
      const cartItem = cart.find((item) => item.itemName === itemName);
      if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity -= 1;
        updateCartDisplay();
        calcTotal();
      }
    });
  });
}




function calcTotal() {
  totalPrice = cart.reduce((sum, cartItem) => sum + cartItem.itemPrice * cartItem.quantity, 0);

  // Apply discount if one is selected
  if (appliedDiscount) {
    const discountAmount = totalPrice * appliedDiscount.percentage;
    totalPrice -= discountAmount;
    document.querySelector('.js-discount-info').innerText = `${appliedDiscount.name} applied: -$${(discountAmount / 100).toFixed(2)}`;
  } else {
    document.querySelector('.js-discount-info').innerText = 'No discount applied.';
  }

  // Add tax (6%)
  const tax = totalPrice * 0.06;
  totalPrice += tax;

  // Update total display
  document.querySelector('.js-total-price').innerText = `Total: $${(totalPrice / 100).toFixed(2)}`;
}






function setupDiscountButtons() {
  const discountButtons = document.querySelectorAll('.selection-discounts button');
  discountButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      appliedDiscount = discounts[index]; // Apply the corresponding discount
      calcTotal(); // Recalculate the total with the discount
    });
  });
}







// Generate food items HTML
items.forEach((item) => {
  itemsHTML += `
    <div class="grid-item">
      <p>${item.name}</p>
      <p>$${(item.price / 100).toFixed(2)}</p>
      <button class="js-add-item" data-item-name="${item.name}" data-item-price="${item.price}">Add Item</button>
    </div>
  `;
});
document.querySelector('.js-selection-food').innerHTML = itemsHTML;

// Create Cart
document.querySelectorAll('.js-add-item').forEach((button) => {
  button.addEventListener('click', () => {
    const itemName = button.dataset.itemName;
    const itemPrice = parseInt(button.dataset.itemPrice, 10);

    let matchingItem = cart.find((item) => item.itemName === itemName);

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        itemName: itemName,
        quantity: 1,
        itemPrice: itemPrice,
      });
    }
    updateCartDisplay();
    calcTotal();
  });
});

// Initialize the app
setupDiscountButtons();
