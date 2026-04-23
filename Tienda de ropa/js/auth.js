let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;


function registerUser(email, password, name) {

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('El correo electrónico ya está registrado.');
        return false;
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));


    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert('Registro exitoso. ¡Bienvenido/a ' + name);
    window.location.href = 'index.html';
    return true;
}


function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Inicio de sesión exitoso. Bienvenido/a ' + user.name);
        window.location.href = 'index.html';
        return true;
    } else {
        alert('Correo electrónico o contraseña incorrectos.');
        return false;
    }
}


function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'index.html';
}




document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (password.length < 4) {
                alert('La contraseña debe tener al menos 4 caracteres.');
                return;
            }

            registerUser(email, password, name);
        });
    }


    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            loginUser(email, password);
        });
    }
});