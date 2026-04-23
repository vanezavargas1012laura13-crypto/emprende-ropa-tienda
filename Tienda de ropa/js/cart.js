// Función para mostrar el carrito
function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>Explora nuestro catálogo para agregar productos.</p>
                <a href="index.html" class="btn">Ver Catálogo</a>
            </div>
        `;
        return;
    }

    // Mostrar items del carrito
    let cartHTML = '<h2>Tu Carrito de Compras</h2>';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='img/logo.png'">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toLocaleString('es-CO')}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p class="cart-item-total">$${itemTotal.toLocaleString('es-CO')}</p>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            </div>
        `;
    });

    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartHTML += `
        <div class="cart-total-section">
            <p>Total: $${total.toLocaleString('es-CO')}</p>
            <button class="checkout-btn">Proceder al Pago</button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;

    // Agregar event listeners
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

// Función para disminuir cantidad
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Función para aumentar cantidad
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Función para eliminar item
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Función para finalizar compra
function checkout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!currentUser) {
        alert('Por favor inicia sesión para continuar con la compra.');
        window.location.href = 'login.html';
        return;
    }

    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    alert(`✅ Compra realizada con éxito!\n\nGracias por tu compra, ${currentUser.name}!\nTotal: $${total.toLocaleString('es-CO')}\n\nLos productos serán enviados a tu dirección registrada.`);

    // Vaciar carrito
    localStorage.setItem('cart', JSON.stringify([]));
    displayCart();
    updateCartCount();
}

// Función para actualizar contador (sincronizada con main.js)
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
    updateCartCount();
});