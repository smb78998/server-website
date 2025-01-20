document.querySelectorAll('.js-add-item').forEach((button) => {
  button.addEventListener('click', () => {
    console.log("Added!");

    button.dataset
  });
});

const items = [
  {
    id:1,
    name:'hamburger',
    price:'289'
  },
  {
    id:2,
    name:'Nuggets',
    price:'350'
  },
  {
    id:3,
    name:'Fries',
    price:'100'
  },
  {
    id:4,
    name:'Hotdog',
    price:'150'
  },
  {
    id:5,
    name:'soda',
    price:'450'
  },
]

let itemsHTML =''

items.forEach((item)=>{
  itemsHTML +=`
    <div class="grid-item">
          <p>${items.name}</p>
          <p>${items.price}</p>
          <button class="js-add-item">Add Item</button>
        </div>
  `
})

document.querySelector('.js-selection-food').innerHTML= itemsHTML;