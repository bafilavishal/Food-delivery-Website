// Sign-up form logic
// Sign-up form logic
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    if (!name || !email || !password) {
        document.getElementById('signup-message').textContent = 'All fields are required!';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.status === 409) {  // User already exists
            console.error('Signup failed: User with this email already exists.');
            document.getElementById('signup-message').textContent = data.message || 'Signup failed: User already exists.';
        } else if (!response.ok) {  // Other error (400, 500, etc.)
            console.error('Signup failed:', response.status, response.statusText);
            document.getElementById('signup-message').textContent = data.message || 'Signup failed. Please try again.';
        } else {  // Success
            console.log('Signup successful:', data);
            localStorage.setItem('userId', data.userId);  // Store MongoDB _id
            localStorage.setItem('loggedInUser', data.userName);
            localStorage.setItem('email', email);
            localStorage.setItem('isLoggedIn', 'true');

            setTimeout(() => {
                window.location.href = 'main_page.html';
            }, 1000);
        }
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('signup-message').textContent = 'Signup failed. Try again.';
    }
});

// Login form logic
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    if (!email || !password) {
        document.getElementById('login-message').textContent = 'Both fields are required!';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('login-message').textContent = 'Login Successful!';

            if (data.userId) {
                localStorage.setItem('userId', data.userId);  // Store MongoDB _id
            } else {
                document.getElementById('login-message').textContent = 'Error: User ID not found';
                return;
            }

            localStorage.setItem('loggedInUser', data.userName);
            localStorage.setItem('email', email);
            localStorage.setItem('isLoggedIn', 'true');

            setTimeout(() => {
                window.location.href = 'main_page.html';
            }, 1000);
        } else {
            document.getElementById('login-message').textContent = data.message || 'An error occurred. Please try again.';
        }
    } catch (err) {
        document.getElementById('login-message').textContent = 'Login failed. Try again.';
        console.error(err);
    }
});
