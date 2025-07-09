const orderSummaryContainer = document.getElementById('order-summary');
const submitOrderButton = document.getElementById('submit-order');
const cart = JSON.parse(localStorage.getItem('cart')) || {};

function displayOrderSummary() {
  let totalAmount = 0;
  orderSummaryContainer.innerHTML = '';

  Object.keys(cart).forEach(dishId => {
    const dish = cart[dishId];
    const dishElement = document.createElement('div');
    dishElement.className = 'order-item';
    dishElement.innerHTML = `
      <img src="${dish.img}" alt="${dish.name}" />
      <div>
        <h3>${dish.name}</h3>
        <p>₹${dish.price}</p>
        <p>Quantity: ${dish.quantity}</p>
      </div>
    `;
    orderSummaryContainer.appendChild(dishElement);
    totalAmount += dish.price * dish.quantity;
  });

  const totalElement = document.createElement('div');
  totalElement.innerHTML = `<h3>Total: ₹${totalAmount}</h3>`;
  orderSummaryContainer.appendChild(totalElement);
}

submitOrderButton.addEventListener('click', async () => {
  if (Object.keys(cart).length > 0) {
    const order = {
      items: cart,
      totalAmount: Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    try {
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
      });

      const result = await response.json();
      alert(result.message);
      localStorage.removeItem('cart');
      window.location.href = 'order-success.html';
    } catch (err) {
      alert('Error submitting order!');
    }
  } else {
    alert('Your cart is empty!');
  }
});

displayOrderSummary();
