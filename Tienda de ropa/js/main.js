const products = [
    {
        id: 1,
        name: "Bermuda Hombre Negra",
        price: 45000,
        category: "hombre",
        image: "Img/bermuda hombre negro.webp"
    },
    {
        id: 2,
        name: "Camiseta Hombre Blanca",
        price: 32000,
        category: "hombre",
        image: "img/camiseta hombre blanca.webp"
    },
    {
        id: 3,
        name: "Buzo Azul Oscuro Hombre",
        price: 55000,
        category: "hombre",
        image: "img/buzo azul oscuro hombre.webp"
    },
    {
        id: 4,
        name: "Chaqueta Hombre Negra",
        price:74000,
        category: "hombre",
        image: "img/chaqueta hombre negra.webp"
    },
    {
        id: 5,
        name: "Blusa Mujer",
        price: 36000,
        category: "mujer",
        image: "img/blusa mujer.webp"
    },
    {
        id: 6,
        name: "Pantalón Mujer Negro",
        price: 65000,
        category: "mujer",
        image: "img/pantalon mujer negro.webp"
    },
    {
        id: 7,
        name: "Vestido Mujer",
        price: 87000,
        category: "mujer",
        image: "img/vestido mujer.webp"
    },
    {
        id: 8,
        name: "Blazer Mujer",
        price: 54000,
        category: "mujer",
        image: "img/blazer mujer.webp"
    },
    {
        id: 9,
        name: "Vestido Overol Mujer",
        price: 69000,
        category: "mujer",
        image: "img/vestido overol mujer.webp"
    }
];

// Función para mostrar productos en el catálogo
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');

    // Verificar si el elemento existe
    if (!productsGrid) {
    console.log('No se encontro el contenedor .products-grid');
        return;
    }

    // Limpiar el contenedor
    productsGrid.innerHTML = '';

    // Recorrer todos los productos y crear las tarjetas
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Crear el contenedor de la tarjeta
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Crear la imagen con manejo de errores
        const img = document.createElement('img');
        img.className = 'product-img';
        img.alt = product.name;
        img.src = product.image;

        // Si la imagen no carga, usar el logo como respaldo
        img.onerror = function() {
            this.src = 'img/Logo empresa.png';
            console.log('No se pudo cargar: ' + product.image);
        };

        // Crear contenedor de info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.name;

        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = '$' + product.price.toLocaleString('es-CO');

        const button = document.createElement('button');
        button.className = 'add-to-cart';
        button.setAttribute('data-id', product.id);
        button.textContent = 'Agregar al carrito';

        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(button);

        productCard.appendChild(img);
        productCard.appendChild(infoDiv);

        productsGrid.appendChild(productCard);
    }

    // Agregar event listeners a los botones
    const buttons = document.querySelectorAll('.add-to-cart');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', addToCart);
    }
}

function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));

    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = [];

    let existingItem = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            existingItem = cart[i];
            break;
        }
    }

    if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Notificación
    const notification = document.createElement('div');
    notification.textContent = '✓ ' + product.name + ' agregado al carrito';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4caf50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(function() {
        notification.remove();
    }, 2000);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = [];

        let totalItems = 0;
        for (let i = 0; i < cart.length; i++) {
            totalItems = totalItems + cart[i].quantity;
        }
        cartCount.textContent = totalItems;
    }
}

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');

    if (authLink) {
        if (currentUser) {
            authLink.innerHTML = '<a href="#" id="logout-btn">Cerrar Sesión (' + currentUser.name + ')</a>';
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                });
            }
        } else {
            authLink.innerHTML = '<a href="login.html">Iniciar Sesión</a>';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
    checkAuthStatus();
});