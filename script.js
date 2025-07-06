let cartItemsCount = 0;
let cartProducts = [];
let currentProduct = null;

function initMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&=+-_';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff9d';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

function showProductDetails(imageSrc, title, price, description) {
    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const qtyInput = document.getElementById('quantity'); 

    modalImg.src = imageSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDesc.innerHTML = description; 
    qtyInput.value = 1;
        
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
    }, 10);
        
    currentProduct = {
        imageSrc,
        title,
        price,
        description
    };
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) { 
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function formatPrice(price) {
    return `$${price.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function saveCart() {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('cartItemsCount', cartItemsCount);
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartItemsCount;
    cartCountElement.style.display = cartItemsCount > 0 ? 'flex' : 'none';
}

function addToCart() {
    const qtyInput = document.getElementById('quantity');
    const quantity = parseInt(qtyInput.value);

    if (!currentProduct) {
        console.error("No hay producto seleccionado para añadir al carrito.");
        return;
    }

    const productId = currentProduct.title.replace(/\s/g, '') + currentProduct.price.replace(/[^0-9]/g, ''); 
    
    const numericPrice = parseFloat(currentProduct.price.replace('$', '').replace('.', '').replace(',', '.'));

    const productToAdd = {
        id: productId,
        imageSrc: currentProduct.imageSrc,
        title: currentProduct.title,
        price: numericPrice,
        quantity: quantity
    };

    const existingProductIndex = cartProducts.findIndex(item => item.id === productToAdd.id);

    if (existingProductIndex > -1) {
        cartProducts[existingProductIndex].quantity += quantity;
    } else {
        cartProducts.push(productToAdd);
    }

    cartItemsCount = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    
    updateCartCount();
    saveCart();
    showNotification(`Añadido: ${quantity} ${currentProduct.title}`); 
    closeModal();
    renderCartItems();
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('show');
    document.body.style.overflow = cartModal.classList.contains('show') ? 'hidden' : 'auto';
    renderCartItems();
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    if (cartProducts.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        cartProducts.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>${formatPrice(item.price)} x ${item.quantity}</p>
                    <span class="cart-item-quantity">Subtotal: ${formatPrice(item.price * item.quantity)}</span>
                </div>
                <button class="remove-item-btn" onclick="removeItemFromCart('${item.id}')">&times;</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
    }
    cartTotalElement.textContent = formatPrice(total);
}

function removeItemFromCart(productId) {
    cartProducts = cartProducts.filter(item => item.id !== productId);
    cartItemsCount = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    updateCartCount();
    saveCart(); 
    renderCartItems();
    showNotification("Producto eliminado del carrito.");
}

function clearCart() {
    if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
        cartProducts = [];
        cartItemsCount = 0;
        updateCartCount();
        saveCart();
        renderCartItems();
        showNotification("Carrito vaciado.");
        closeCartModal();
    }
}

function proceedToCheckout() {
    if (cartProducts.length === 0) {
        showNotification("Tu carrito está vacío. Añade productos antes de comprar.");
        return;
    }
    window.location.href = 'pago.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    initMatrix();

    cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    cartItemsCount = parseInt(localStorage.getItem('cartItemsCount')) || 0;

    updateCartCount();
    renderCartItems(); 
    document.querySelector('.add-to-cart').addEventListener('click', addToCart);
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.querySelector('.cart-icon').addEventListener('click', function(e) {
        e.preventDefault(); 
        toggleCart();
    });
    
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) { 
            closeModal();
        }
    });
    
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCartModal();
        }
    });
    
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    document.querySelector('.cart-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
