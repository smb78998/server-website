import {orders} from '../data/orders.js';
  
  orders.forEach((order) => {
    
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
          <div class="orders-top-items">
            <p>Hotdog</p>
            <p>2</p>
            <p>2.00</p>
          </div>
  
          <div class="orders-top-items">
            <p>Waffle</p>
            <p>2</p>
            <p>2.00</p>
          </div>
  
          <div class="orders-top-items">
            <p>Hamburger</p>
            <p>2</p>
            <p>2.00</p>
          </div>
        </div>
        
      </div>

      <div>
        <div class="js-order-sum-bot">
          <div class="order-sum-info-row">
            <div class="order-item">
              <p class="item-name">Total No tax</p>
            </div>
            <p class="item-price">0.00</p>
          </div>
  
        <div class="js-order-sum-bot">
          <div class="order-sum-info-row">
            <div class="order-item">
              <p class="item-name">Tax(6%)</p>
            </div>
            <p class="item-price">0.00</p>
          </div>
    
          <div class="order-sum-info-row js-discount">
            <div class="order-item">
              <p class="item-name">No Discount Selected</p>
            </div>
            <p class="item-price">$0.00</p>
          </div>
      
          <div class="order-sum-total js-total">
            <p><b>Total: $00.00</b></p>
          </div>

        </div>
      </div>
      </div>
    </div>
      `;
    
  });

  document.querySelector('js-allOrders').innerHTML = allOrdersHTML;