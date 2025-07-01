function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

function renderOrders() {
    const orders = getOrders();
    const ordersList = document.getElementById('orders-list');
    if (!orders.length) {
        ordersList.innerHTML = '<p>You have not placed any orders yet.</p>';
        return;
    }
    ordersList.innerHTML = '';
    orders.slice().reverse().forEach(order => {
        let block = `<div class="order-block">
            <div class="order-date"><i class='far fa-calendar-alt mr-1'></i>Order Date: ${order.date}</div>`;
        order.items.forEach(item => {
            block += `<div class="order-item">
                <img src="${item.image}" class="order-cover" alt="${item.title}">
                <div class="order-info flex-grow-1">
                    <h5>${item.title}</h5>
                    <p>By ${item.author}</p>
                </div>
                <span class="order-qty">Qty: ${item.qty}</span>
                <span class="order-price">$${(item.price * item.qty).toFixed(2)}</span>
            </div>`;
        });
        block += '</div>';
        ordersList.innerHTML += block;
    });
}

document.addEventListener('DOMContentLoaded', renderOrders); 