const paymentOptions = document.querySelectorAll('input[name="payment"]'); 
const fieldsContainer = document.getElementById('fields-container');
const errorMsg = document.getElementById('error-msg');
const payNowBtn = document.getElementById('pay-now-btn'); 
const proceedBtn = document.getElementById('pay-btn');    

// Initially disable proceed
proceedBtn.disabled = true;

function showError(message) {
  errorMsg.textContent = message;
  return false;
}

function updateFields() {
  const method = document.querySelector('input[name="payment"]:checked').value;
  let html = '';
  errorMsg.textContent = '';

  if (method === 'card') {
    html = `
      <input type="text" id="card-number" placeholder="Card Number (16 digits)" required>
      <input type="text" id="card-name" placeholder="Name on Card" required>
      <input type="text" id="card-expiry" placeholder="Expiry (MM/YY)" required>
      <input type="text" id="card-cvv" placeholder="CVV (3 digits)" required>
    `;
    payNowBtn.disabled = false;
    proceedBtn.disabled = true;
  } else if (method === 'upi') {
    html = `<input type="text" id="upi-id" placeholder="Your UPI ID (e.g. username@upi)" required>`;
    payNowBtn.disabled = false;
    proceedBtn.disabled = true;
  } else if (method === 'netbanking') {
    html = `
      <input type="text" id="bank-name" placeholder="Bank Name" required>
      <input type="text" id="bank-account" placeholder="Account Number" required>
    `;
    payNowBtn.disabled = false;
    proceedBtn.disabled = true;
  } else if (method === 'wallet') {
    html = `<input type="text" id="wallet-id" placeholder="Wallet ID" required>`;
    payNowBtn.disabled = false;
    proceedBtn.disabled = true;
  } else if (method === 'cod') {
    html = `<p>💸 Pay cash at delivery — No details required.</p>`;
    payNowBtn.disabled = true;
    proceedBtn.disabled = false;
  }

  fieldsContainer.innerHTML = html;
}

paymentOptions.forEach(option => option.addEventListener('change', updateFields));
updateFields();

payNowBtn.addEventListener('click', () => {
  errorMsg.textContent = '';
  const method = document.querySelector('input[name="payment"]:checked').value;

  if (method === 'card') {
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardName = document.getElementById('card-name').value.trim();
    const expiry = document.getElementById('card-expiry').value.trim();
    const cvv = document.getElementById('card-cvv').value.trim();
    if (!/^\d{16}$/.test(cardNumber)) return showError('Card number must be 16 digits.');
    if (!cardName) return showError('Cardholder name is required.');
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return showError('Expiry must be in MM/YY format.');
    if (!/^\d{3}$/.test(cvv)) return showError('CVV must be 3 digits.');
  } else if (method === 'upi') {
    const upiId = document.getElementById('upi-id').value.trim();
    if (!upiId.includes('@')) return showError('Please enter a valid UPI ID.');

    const upiUrl = `upi://pay?pa=${upiId}&pn=TestUser&am=1&cu=INR&tn=DemoOrder`;
    window.location.href = upiUrl;

    setTimeout(() => {
      proceedBtn.disabled = false;
      payNowBtn.disabled = true;
      payNowBtn.textContent = "✅ Payment Requested!";
      errorMsg.textContent = '';
    }, 2000);
    return;
  } else if (method === 'netbanking') {
    const bankName = document.getElementById('bank-name').value.trim();
    const accountNo = document.getElementById('bank-account').value.trim();
    if (!bankName || accountNo.length < 6) return showError('Please enter valid bank details.');
  } else if (method === 'wallet') {
    const walletId = document.getElementById('wallet-id').value.trim();
    if (!walletId) return showError('Wallet ID is required.');
  }

  proceedBtn.disabled = false;
  payNowBtn.disabled = true;
  payNowBtn.textContent = "✅ Payment Validated!";
  errorMsg.textContent = '';
});
