import {cart} from '../data/cart.js'
import {items} from '../data/items.js'
import {discounts} from '../data/discounts.js';

let itemsHTML = '';
let cartHTML = '';
let discountSelected = null;
let cartBottomHTML ='';
let serverName = 'Bob William';
let orders = JSON.parse(localStorage.getItem('orders')) || [];


function format(number){
  return (number/100).toFixed(2);
}


//display for header
function displayTime() {
  const now = new Date();
  let timeString = now.toLocaleTimeString();

  document.querySelector('.js-header-info').innerHTML = `
  <div class="header-info">
      <p class="heder-info-time">${timeString}</p>
      <p class="heder-info-name">${serverName}</p>
    </div>
  `
}

setInterval(displayTime, 1000); 


//update the cart display
function updateCartDisplay() {

  //if cart is not empty
  cartHTML = '';
  let total=0;

  cart.forEach((cartItem) => {
    if (cartItem.quantity > 0) {
      const itemTotal = cartItem.itemPrice * cartItem.quantity;
      total+=itemTotal;
      cartHTML += `
        <div class="order-sum-info-row">
          <p class="item-name">${cartItem.itemName}</p>
          <div class="item-controls">
            <button class="item-controls-button js-decrement" data-item-name="${cartItem.itemName}">-</button>
            <p class="item-controls-quantity">${cartItem.quantity}</p>
            <button class="item-controls-button js-increment" data-item-name="${cartItem.itemName}">+</button>
          </div>
          <p class="item-price">$${format(itemTotal)}</p>
        </div>
      `;
    }
  });

  document.querySelector('.js-order-sum-info').innerHTML = cartHTML;


  
  //update bottom section of cart here 
  //if discount has been selected
  let discountAmount = 0;
  if(discountSelected){
    //display discount selected 
    discountAmount = total * discountSelected.price;
    total = total - discountAmount;
    document.querySelector('.js-discount').innerHTML = `
      <div class="order-item">
              <p class="item-name">${discountSelected.name} Discount (${(discountSelected.price * 100).toFixed(0)}%) </p>
            </div>
            <p class="item-price">$${format(discountAmount)}</p>
    `;
    console.log(discountAmount);
  }else{
    document.querySelector('.js-discount').innerHTML = `
      <div class="order-item">
        <p class="item-name">No Discount Selected</p>
      </div>
      <p class="item-price">$0.00</p>
    `;
  }

  console.log(discountAmount);
  //taxes
  const tax = .06;
  const taxAmount =total *tax;
  total +=taxAmount;


 document.querySelector('.js-tax').innerHTML = `
   <div class="order-item">
          <p class="item-name">Tax(6%)</p>
        </div>
        <p class="item-price">$${format(taxAmount)}</p>
  `;

  //display total here no matter 
  document.querySelector('.js-total').innerHTML = `
  <div class="order-sum-total js-total">
    <p><b>Total: ${format(total)}</b></p>
    <button class="js-place-order">Place Order</button>
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

   // Place order button
    document.querySelector('.js-place-order').addEventListener('click', () => {
      function doSomethingFirst() {
        return new Promise((resolve, reject) => {
          console.log(cart);

          // Create a copy
          //if dont make deep copy, we have a pointer of array so this wont work out 
          const cartCopy = JSON.parse(JSON.stringify(cart));
          

          if(discountSelected ===null){
            const orderObject = {
              items: cartCopy, // Use the copied cart
              discountSelected:'None',
              discountAmount: 0,
              total: format(total),
              serverName: serverName,
              time: new Date().toLocaleTimeString(), 
            };

            orders.push(orderObject);
          }else{
            const orderObject = {
              items: cartCopy, // Use the copied cart
              discountSelected:discountSelected.name,
              discountAmount: discountAmount,
              total:  format(total),
              serverName: serverName,
              time: new Date().toLocaleTimeString(), 
            };

            orders.push(orderObject);
          }
          //write orders into local memory 
          localStorage.setItem('orders',JSON.stringify(orders));
          console.log("storage");
          console.log(localStorage.getItem('orders'));

          resolve();
        });
      }
      
      doSomethingFirst()
        .then(() => {
          console.log('Order Placed:', orders);
          alert('Order placed!');
          cart.length = 0; 
          discountSelected = null; 
          updateCartDisplay();
        });
    });
}



// Generate food items
items.forEach((item) => {
  itemsHTML += `
    <div class="grid-item">
      <p>${item.name}</p>
      <p>$${format(item.price)}</p>
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

// Set up discount buttons
document.querySelectorAll('.js-selection-discounts').forEach((button, index) => {
  button.addEventListener('click', () => {
    console.log(discounts[index]);
    discountSelected = discounts[index];
    updateCartDisplay();
  });
});

// Initialize cart display
updateCartDisplay();