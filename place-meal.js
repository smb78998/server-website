let itemsHTML =''

items.forEach((item)=>{
  itemsHTML +=`
    <div class="grid-item">
          <p>${item.name}</p>
          <p>$${(item.price/100).toFixed(2)}</p>
          <button class="js-add-item" data-item-name="${item.name}" data-item-price="${item.price}">Add Item</button>
        </div>
  `
})

//Generate grid of food items 
document.querySelector('.js-selection-food').innerHTML= itemsHTML;


//Create Cart 
document.querySelectorAll('.js-add-item').forEach((button) => {
  button.addEventListener('click', () => {

    console.log("Added!");
    const itemName = button.dataset.itemName;
   const itemPrice = button.dataset.itemPrice;
    console.log(button.dataset)

    let matchingItem;

    cart.forEach((item)=>{
      if(itemName === item.itemName){
        matchingItem = item;
      }
    })

    if(matchingItem){
      matchingItem.quantity+=1;
    }else{
      cart.push({
        itemName:itemName,
        quantity: 1,
        itemPrice:itemPrice
      })
    }
   
    console.log(cart);

  });
});

//attempt at the list on the side 

let cartHTML =''

cart.forEach((cart)=>{
  cartHTML +=`
   <div class="order-sum-info-row">

          <p class="item-name">${cart.itemName}</p>

          <div class="item-controls">
            <button class="item-controls-button">-</button>
            <p class="item-controls-quantity">${cart.quantity}</p>
            <button class="item-controls-button">+</button>
          </div>

          <p class="item-price">${(cart.itemName)*cart.quantity}</p>

        </div>
  `
})

document.querySelector('.js-selection-food').innerHTML= itemsHTML;
