


let itemsHTML =''

items.forEach((item)=>{
  itemsHTML +=`
    <div class="grid-item">
          <p>${item.name}</p>
          <p>$${(item.price/100).toFixed(2)}</p>
          <button class="js-add-item" data-item-name="${item.name}">Add Item</button>
        </div>
  `
})

//Generate grid of food items 
document.querySelector('.js-selection-food').innerHTML= itemsHTML;


document.querySelectorAll('.js-add-item').forEach((button) => {
  button.addEventListener('click', () => {

    console.log("Added!");
    const itemName = button.dataset.itemName;
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
      })
    }
   
    console.log(cart);

  });
});
