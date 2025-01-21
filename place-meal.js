import {cart} from './cart.js'
import {items} from './items.js'

let itemsHTML = '';
let cartHTML = '';
let discountSelected = null;
let cartBottomHTML ='';


//update the cart display
function updateCartDisplay() {

  //if cart is not empty
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
          <p class="item-price">$${((cartItem.itemPrice*cartItem.quantity)/ 100).toFixed(2)}</p>
        </div>
      `;
    }
  });

  document.querySelector('.js-order-sum-info').innerHTML = cartHTML;


  
  //update bottom section of cart here 
  //if discount has been selected
  if(discountSelected){
    //display discount selected 
    document.querySelector('.js-discount').innerHTML = `
      <div class="order-item">
              <p class="item-name">Vetern Discount(1%)</p>
            </div>
            <p class="item-price">9.00</p>
    `;
  }else{
    document.querySelector('.js-discount').innerHTML = `
      <div class="order-item">
              <p class="item-name">No Discount Selected</p>
            </div>
            <p class="item-price">9.00</p>
    `;
  }

  //display total here no matter 
  document.querySelector('.js-total').innerHTML = `
  <div class="order-sum-total js-total">
    <p><b>Total: $00.00</b></p>
    <button>Place Order</button>
  </div>
  `;






  //+ button
  document.querySelectorAll('.js-increment').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.dataset.itemName;
      const cartItem = cart.find((item) => item.itemName === itemName);
      if (cartItem) {
        cartItem.quantity += 1;
        updateCartDisplay(); 
      }
    });
  });

  //- button
  document.querySelectorAll('.js-decrement').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.dataset.itemName;
      const cartItem = cart.find((item) => item.itemName === itemName);
      if (cartItem) {
        cartItem.quantity -= 1;
        // if (cartItem.quantity === 0) {
        //   const index = cart.indexOf(cartItem);
        //   cart.splice(index, 1); 
        // }
        updateCartDisplay(); 
      }
    });
  });
}





// Generate food items
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
  });
});

//totaling everything together
//add everything in cart 
//first apply discounts then apply tax
//only one discount can be applied at a time 