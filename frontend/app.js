const apiBaseUrl = 'http://localhost:3000/api';

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${apiBaseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('message').textContent = data.message;
    }
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('message').textContent = data.message;
    }
}

async function loadDashboard() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const response = await fetch(`${apiBaseUrl}/dashboard`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('welcome-message').textContent = `Welcome, User ${data.userId}!`;
    } else {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
}

// Load dashboard data when the dashboard page is opened
if (window.location.pathname.endsWith('dashboard.html')) {
    loadDashboard();
}
