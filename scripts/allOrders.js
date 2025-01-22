import {orders} from '../data/orders.js';
import {format} from '../scripts/format.js'
import { displayTime } from './header.js';

setInterval(displayTime, 1000); 

console.log(orders);
let allOrdersHTML = '';
let itemsHTML = '';


orders.forEach((order) => {
  itemsHTML = '';
order.items.forEach((item) => {
  
  itemsHTML += `
    <div class="orders-top-items">
      <p>${item.itemName}</p>
      <p>${item.quantity}</p>
      <p>$${format(item.itemPrice)}</p>
    </div>
  `;
});
    console.log(orders.discountSelected)
      allOrdersHTML += `
      <div class="order">
      <div class="oder-top">

        <div class="orders-header">
          <p>${order.serverName}</p>
          <div class="timestamp">
            <p>${order.time}</p>
            <p>${order.date}</p>
          </div>
        </div>
        
         <div class="js-generate-items">
          <p>${itemsHTML}<p>
  
        </div>
        
      </div>

      <div>
  
        <div class="js-order-sum-bot">
          <div class="order-sum-info-row">
            <div class="order-item">
              <p class="item-name">Tax(6%)</p>
            </div>
            <p class="item-price">$${format(order.taxAmount)}</p>
          </div>
    
          <div class="order-sum-info-row js-discount">
            <div class="order-item">
              <p class="item-name">${order.discountSelected || 'No Discount Selected'}</p>
            </div>
            <p class="item-price">$${format(order.discountAmount) || '0.00'}</p>
          </div>
      
          <div class="order-sum-total js-total">
            <p><b>Total: $${order.total}</b></p>
          </div>

        </div>
      </div>
      </div>
    </div>
      `;
    
  });

  document.querySelector('.js-allOrders').innerHTML = allOrdersHTML;