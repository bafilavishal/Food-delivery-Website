const dishContainer = document.getElementById("dish-container");

// Array of dishes (you'll fetch this data from the backend)
const sampleDishes = [
   {
    _id:"1",
    name: "Masala Samosa",
    price: 15,
    img: "img/samosha 1.jpg",
    rating: 4,
  },
  {
    _id:"2",
    name: "Cheese Burger",
    price: 80,
    img: "img/burger.jpg",
    rating: 5,
  },
  {_id:"3",
    name: "Biryani",
    price: 100,
    img: "img/biryani1.jpg",
    rating: 5,
  },
  {_id:"4",
    name: "Butter Chicken",
    price: 160,
    img: "img/butter chicken 2.jpg",
    rating: 5,
  },
  {_id:"5",
    name: "Massala chaat",
    price: 50,
    img: "img/chaat1.jpg",
    rating: 5,
  },
  {_id:"6",
    name: "Massala Chai",
    price: 40,
    img: "img/chai1.jpg",
    rating: 4,
  },
  {_id:"7",
    name: "Grilled Sandwich",
    price: 70,
    img: "img/sandwitch.jpg",
    rating: 4,
  },
  {_id:"8",
    name: "Hakka Noodles",
    price: 110,
    img: "img/chilly noodles.jpg",
    rating: 4,
  },
  {_id:"9",
    name: "Hot Coffee",
    price: 50,
    img: "img/hott cffe.avif",
    rating: 4,
  },
  {_id:"10",
    name: "Beverages",
    price: 125,
    img: "img/beverages.jpg",
    rating: 4,
  },
  {_id:"11",
    name: "Chola Bathora",
    price: 50,
    img: "img/chola bathora2.jpg",
    rating: 4,
  },
  {_id:"12",
    name: "Creamy veg pasta",
    price: 160,
    img: "img/ppsta.avif",
    rating: 4,
  },
  {_id:"13",
    name: "Dal Makhani",
    price: 120,
    img: "img/Dal-Makhani2.jpg",
    rating: 5,
  },
  {_id:"14",
    name: "Desserts",
    price: 50,
    img: "img/desserts.jpg",
    rating: 4,
  },
  {_id:"15",
    name: "Massala Dosha",
    price: 100,
    img: "img/dosha 1.webp",
    rating: 5,
  },
  {_id:"16",
    name: "Fresh Garden Salad",
    price: 40,
    img: "img/frsh salad.jpg",
    rating: 4,
  },
  {_id:"17",
    name: "Idli",
    price: 80,
    img: "img/idli2.jpg",
    rating: 4,
  },
  {_id:"18",
    name: "Sweet Lassi",
    price: 60,
    img: "img/lassi.webp",
    rating: 4,
  },
  {_id:"19",
    name: "Malai Koffta",
    price: 120,
    img: "img/malai kofta.jpg",
    rating: 4,
  },
  {_id:"20",
    name: "Nimbu Pani",
    price: 40,
    img: "img/nimbu pani.jpg",
    rating: 4,
  },
  {_id:"21",
    name: "Paalak Panner",
    price: 220,
    img: "img/plak panner2.avif",
    rating: 5,
  },
  {_id:"22",
    name: "Spicy chicken",
    price: 260,
    img: "img/Spicy chicken.jpeg",
    rating: 4,
  },
  {_id:"23",
    name: "Vadda Paav",
    price: 60,
    img: "img/vada paav 1.webp",
    rating: 4,
  },
  {_id:"24",
    name: "Veg Roll",
    price: 90,
    img: "img/roll.jpg",
    rating: 4,
  },
  {_id:"25",
    name: " Veg Pizza",
    price: 150,
    img: "img/pizza.jpg",
    rating: 4,
  },
  {_id:"26",
    name: "Grilled Panner",
    price: 120,
    img: "img/PANNER.jpg",
    rating: 5,
  },
  {_id:"27",
    name: " Veg-Momos",
    price: 100,
    img: "img/momo.jpg",
    rating: 5,
  },
   {_id:"28",
    name: "French Fries",
    price: 150,
    img: "img/fries.jpg",
    rating: 4,
  },
  {_id:"29",
    name: "Cold Coffee",
    price: 90,
    img: "img/coffe.jpg",
    rating: 4,
  },
  {_id:"30",
    name: "Pani Puri",
    price: 30,
    img: "img/pani puri1.jpg",
    rating: 4,
  },
  {_id:"31",
    name: "Matar Kulcha",
    price: 80,
    img: "img/matar kulcha.webp",
    rating: 4,
  },
  {_id:"32",
    name: "Ice Cream ",
    price: 60,
    img: "img/icce cream.avif",
    rating: 4,
  },
  {_id:"33",
    name: "Gulab Jamun",
    price: 120,
    img: "img/gulab jamun.jpg",
    rating: 5,
  },
   {_id:"34",
    name: "Chana Masala",
    price: 80,
    img: "img/chana masala.webp",
    rating: 4,
  },
  {_id:"35",
    name: " Malai Kulfi",
    price: 120,
    img: "img/kulfi.webp",
    rating: 5,
  },
  {_id:"36",
    name: "Tandoori Chicken",
    price: 220,
    img: "img/tandoori chicken.webp",
    rating: 5,
  },
  {_id:"37",
    name: "Aloo Gobi",
    price: 120,
    img: "img/aloo gobi.webp",
    rating: 4,
  },
  {_id:"38",
    name: "Dal Tadka",
    price: 120,
    img: "img/dal tadka.jpg",
    rating: 4,
  },
  {_id:"39",
    name: "Jal Jeera Mojito",
    price: 90,
    img: "img/jal jeera mojito.webp",
    rating: 4,
  },
  {_id:"40",
    name: "Kichdi",
    price: 90,
    img: "img/khichdi.webp",
    rating: 5,
  },
  {_id:"41",
    name: "Mango Lassi",
    price: 90,
    img: "img/mango lassi.webp",
    rating: 4,
  },
  {_id:"42",
    name: "Naan",
    price: 90,
    img: "img/naan.jpg",
    rating: 4,
  },
  {_id:"43",
    name: "Barfi",
    price: 210,
    img: "img/barfi.webp",
    rating: 5,
  },
  {_id:"44",
    name: "Pakora",
    price: 150,
    img: "img/pakora.webp",
    rating: 5,
  },
  {_id:"45",
    name: "Paratha",
    price: 40,
    img: "img/paratha.jpg",
    rating: 5,
  },
  {_id:"46",
    name: "Ras Malai",
    price: 90,
    img: "img/rasmalai.webp",
    rating: 5,
  },
  {_id:"47",
    name: "Shahi Panner",
    price: 220,
    img: "img/shahi panner.jpg",
    rating: 5,
  },
  {_id:"48",
    name: "Water Melon Mojito",
    price: 90,
    img: "img/watermelon mojitos.webp",
    rating: 5,
  },
];

// Render dishes to the page
function renderDishes(dishes) {
  dishes.forEach((dish, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${dish.img}" alt="${dish.name}" />
      <h3>${dish.name}</h3>
      <div class="price">₹${dish.price.toFixed(2)}</div>
      <div class="stars">${getStars(dish.rating)}</div>
      <div class="qty">
        <button onclick="decreaseQty(${index})">-</button>
        <span id="qty-${index}">0</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>
     <button class="add-btn" id="btn-${index}" onclick="addToCart(${index}, '${dish._id}')">Add to Cart</button>
    `;
    dishContainer.appendChild(card);
  });
}

// Generate stars based on rating
function getStars(rating) {
  const maxStars = 5;
  let stars = "";
  for (let i = 1; i <= maxStars; i++) {
    stars += i <= rating ? "★" : "☆";
  }
  return stars;
}

// Increase quantity of the dish
function increaseQty(index) {
  const span = document.getElementById(`qty-${index}`);
  span.textContent = parseInt(span.textContent) + 1;
}

// Decrease quantity of the dish
function decreaseQty(index) {
  const span = document.getElementById(`qty-${index}`);
  let current = parseInt(span.textContent);
  if (current > 0) span.textContent = current - 1;
}

// Add selected dish to the cart
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(index, dishId) {
  const qty = parseInt(document.getElementById(`qty-${index}`).textContent);
  const dish = sampleDishes[index];

  if (qty > 0) {
    if (!cart[dishId]) {
      cart[dishId] = { ...dish, quantity: qty };
    } else {
      cart[dishId].quantity += qty;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const btn = document.getElementById(`btn-${index}`);
    btn.classList.add("added");
    btn.textContent = `Added (${cart[dishId].quantity})`;

    updateCartBadge(); // Only once
  } else {
    alert("Please select quantity before adding to cart!");
  }
}


// Update the cart badge
function updateCartBadge() {
  // Assuming 'cart' is an object containing dish items, not an array
  const cartItems = Object.values(cart);  // Convert cart object to an array of items

  // Calculate total quantity safely
  const totalQuantity = cartItems.reduce((sum, item) => {
    if (item && item.quantity !== undefined) {
      return sum + item.quantity;
    }
    return sum;  // Skip invalid items
  }, 0);

  // Update the cart badge (example)
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = totalQuantity;
    badge.style.display = totalQuantity > 0 ? "inline-block" : "none"; // Hide if empty
  }
}

// Call these when page loads
window.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderDishes(sampleDishes);
});
