const userId = localStorage.getItem("userId");
console.log("User ID from localStorage:", userId); // Log userId for debugging

// Redirect to login if user is not logged in
if (!userId) {
  alert("You must be logged in to view order history");
  window.location.href = "login.html";
} else {
  async function loadOrderHistory(userId) {
    try {
      // Fetch order history from the backend
      const response = await fetch(
        `http://localhost:5000/api/order-history/${userId}`
      );

      // Handle the response status code
      if (!response.ok) {
        throw new Error(
          `Failed to fetch order history: ${response.statusText}`
        );
      }

      const orders = await response.json();
      console.log("Orders from server:", orders); // Log the orders for debugging

      const container = document.getElementById("order-history");
      container.innerHTML = ""; // Clear previous content

      // Handle the case where the response is not an array
      if (!Array.isArray(orders)) {
        container.innerHTML =
          "<p>Failed to load order history: Invalid response format.</p>";
        return;
      }

      // Handle case where no orders are found
      if (orders.length === 0) {
        container.innerHTML = "<p>No orders found.</p>";
        return;
      }

      // Render each order
      orders.forEach((order) => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order");
        orderDiv.innerHTML = `
                    <h3>Order Date: ${new Date(
                      order.date
                    ).toLocaleString()}</h3>
                    <p><strong>Total:</strong> ₹${order.total}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        ${order.items
                          .map(
                            (item) => `
                            <li>${item.name} - ₹${item.price} x ${item.quantity}</li>
                        `
                          )
                          .join("")}
                    </ul>
                `;
        container.appendChild(orderDiv);
      });
    } catch (error) {
      console.error("Error fetching order history:", error);
      document.getElementById(
        "order-history"
      ).innerHTML = `<p>Failed to load order history: ${error.message}</p>`;
    }
  }

  loadOrderHistory(userId);
}
