// Utility: Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Utility: Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Utility: Get orders from localStorage
function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

// Utility: Save orders to localStorage
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Render cart items
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    let cart = getCart();
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalDiv.textContent = '';
        document.getElementById('buy-now-btn').style.display = 'none';
        return;
    }
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        cartItemsDiv.innerHTML += `
            <div class="cart-item" data-idx="${idx}">
                <img src="${item.image}" class="cart-cover" alt="${item.title}">
                <div class="cart-info flex-grow-1">
                    <h5>${item.title}</h5>
                    <p>By ${item.author}</p>
                    <span class="badge badge-primary">$${item.price.toFixed(2)}</span>
                </div>
                <input type="number" min="1" class="cart-qty" value="${item.qty}" />
                <span class="cart-remove" title="Remove">&times;</span>
            </div>
        `;
    });
    cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('buy-now-btn').style.display = 'inline-block';
}

// Update quantity or remove item
function setupCartEvents() {
    document.getElementById('cart-items').addEventListener('input', function(e) {
        if (e.target.classList.contains('cart-qty')) {
            const idx = e.target.closest('.cart-item').dataset.idx;
            let cart = getCart();
            let qty = parseInt(e.target.value);
            if (qty < 1) qty = 1;
            cart[idx].qty = qty;
            saveCart(cart);
            renderCart();
        }
    });
    document.getElementById('cart-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-remove')) {
            const idx = e.target.closest('.cart-item').dataset.idx;
            let cart = getCart();
            cart.splice(idx, 1);
            saveCart(cart);
            renderCart();
        }
    });
}

// Payment gateway demo
function setupPayment() {
    const buyBtn = document.getElementById('buy-now-btn');
    const paymentDiv = document.getElementById('payment-options');
    const paymentSuccess = document.getElementById('payment-success');
    buyBtn.addEventListener('click', function() {
        paymentDiv.classList.remove('d-none');
        paymentSuccess.classList.add('d-none');
    });
    ['pay-paypal', 'pay-stripe', 'pay-razorpay'].forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            paymentSuccess.classList.remove('d-none');
            // Save current cart as an order
            let cart = getCart();
            if (cart.length > 0) {
                let orders = getOrders();
                orders.push({
                    date: new Date().toLocaleString(),
                    items: cart
                });
                saveOrders(orders);
            }
            setTimeout(() => {
                // Clear cart after payment
                saveCart([]);
                renderCart();
                paymentDiv.classList.add('d-none');
            }, 2000);
        });
    });
}

// On page load
renderCart();
setupCartEvents();
setupPayment(); 