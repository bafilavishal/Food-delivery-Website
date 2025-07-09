// ---------------------- Cart Initialization ----------------------
let cart = loadCartFromStorage();
let totalAmount = 0;

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

function loadCartFromStorage() {
  try {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (!storedCart || typeof storedCart !== "object")
      throw new Error("Invalid cart");
    if (Object.values(storedCart).some((item) => item === null))
      throw new Error("Null items in cart");

    return storedCart;
  } catch {
    localStorage.setItem("cart", JSON.stringify({}));
    return {};
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
}

// ---------------------- UI Helpers ----------------------

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + (item?.quantity || 0),
    0
  );

  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

function renderEmptyCartMessage() {
  cartItemsContainer.innerHTML =
    "<p>Your cart is empty. Please add some items!</p>";
  cartTotalElement.innerHTML = "";
}

function createButton(id, text, onClick) {
  const btn = document.createElement("button");
  btn.id = id;
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
}

// ---------------------- Core Functionalities ----------------------

function addToCart(index, dishId) {
  const qty = parseInt(document.getElementById(`qty-${index}`).textContent);
  const dish = sampleDishes[index];

  if (qty <= 0) {
    return alert("Please select quantity before adding to cart!");
  }

  if (!cart[dishId]) {
    cart[dishId] = { ...dish, quantity: qty };
  } else {
    cart[dishId].quantity += qty;
  }

  saveCartToStorage();
  updateCartBadge();

  const btn = document.getElementById(`btn-${index}`);
  if (btn) {
    btn.classList.add("added");
    btn.textContent = `Added (${cart[dishId].quantity})`;
  }
}

function renderOrder() {
  cartItemsContainer.innerHTML = "";
  totalAmount = 0;

  if (Object.keys(cart).length === 0) {
    renderEmptyCartMessage();
    return;
  }

  for (const [dishId, dish] of Object.entries(cart)) {
    if (!dish) continue;

    const dishElement = document.createElement("div");
    dishElement.className = "order-item";
    dishElement.innerHTML = `
      <div>
        <h3>${dish.name}</h3>
        <p>₹${dish.price}</p>
        <p>Quantity: ${dish.quantity}</p>
      </div>
    `;

    cartItemsContainer.appendChild(dishElement);
    totalAmount += dish.price * dish.quantity;
  }

  cartTotalElement.innerHTML = `<h3>Total: ₹${totalAmount}</h3>`;
  cartTotalElement.appendChild(
    createButton("clear-btn", "Clear Items", clearCart)
  );
  cartTotalElement.appendChild(
    createButton("checkout-btn", "Proceed to Checkout", proceedToCheckout)
  );
}

function clearCart() {
  cart = {};
  saveCartToStorage();
  renderOrder();
  updateCartBadge();
}

function proceedToCheckout() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "pay.html";
}

// ---------------------- Initialization ----------------------
document.addEventListener("DOMContentLoaded", () => {
  renderOrder();
  updateCartBadge();
});

//  backend logic   ohoooo ohhoo ohhhooo
document.getElementById("checkout-btn").addEventListener("click", async () => {
  // Get cart items from the page or your data structure
  const cartItems = getCartItems(); // Replace with your actual function to get cart items
  const total = calculateTotal(cartItems); // Replace with your actual function to calculate the total

  // Prepare data for submission
  const orderData = {
    items: cartItems,
    total: total,
  };

  try {
    const response = await fetch("/api/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Order placed successfully!");
      window.location.href = "/order-history"; // Redirect to order history page
    } else {
      alert("Failed to place order: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
});

// Example function to get cart items
function getCartItems() {
  return [
    { name: "Dish 1", price: 100, quantity: 2 },
    { name: "Dish 2", price: 200, quantity: 1 },
  ];
}

// Example function to calculate total
function calculateTotal(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
document.getElementById("checkout-btn").addEventListener("click", async () => {
  const items = [
    // Get the order items from your cart (replace with dynamic cart items)
    { name: "Dish 1", price: 100, quantity: 2 },
    { name: "Dish 2", price: 150, quantity: 1 },
  ];

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const userId = "USER_ID_HERE"; // Get the logged-in user ID

  try {
    const response = await fetch("http://localhost:5000/api/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, total, userId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully!");
      // Optionally, you can redirect the user to an order history page or clear the cart
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to place order");
  }
});
