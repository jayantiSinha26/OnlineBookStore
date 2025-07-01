const books = [
    {
        title: 'The Great Adventure',
        author: 'John Smith',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Mystery of the Night',
        author: 'Sarah Johnson',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Future World',
        author: 'Michael Brown',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Love Stories',
        author: 'Emily Davis',
        price: 21.99,
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Science Today',
        author: 'Robert Wilson',
        price: 27.99,
        image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'History Unveiled',
        author: 'Anna Lee',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
];

function renderCollection() {
    const container = document.getElementById('collection-books');
    container.innerHTML = '';
    books.forEach((book, idx) => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="book-card">
                    <div class="book-image" style="background-image: url('${book.image}')"></div>
                    <div class="book-info">
                        <h4>${book.title}</h4>
                        <p class="text-muted">By ${book.author}</p>
                        <span class="price-tag">$${book.price.toFixed(2)}</span>
                        <button class="btn btn-outline-primary float-right add-to-cart-btn" data-idx="${idx}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let count = cart.reduce((sum, item) => sum + item.qty, 0);
    let cartNav = document.querySelector('.navbar .fa-shopping-cart');
    if (!cartNav) return;
    let badge = cartNav.parentElement.querySelector('.cart-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.style.background = '#e74c3c';
        badge.style.color = 'white';
        badge.style.fontSize = '0.8rem';
        badge.style.borderRadius = '50%';
        badge.style.padding = '2px 7px';
        badge.style.marginLeft = '5px';
        badge.style.verticalAlign = 'top';
        cartNav.parentElement.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    renderCollection();
    updateCartCount();
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.idx);
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            let book = books[idx];
            let found = cart.find(item => item.title === book.title);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ ...book, qty: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            this.textContent = 'Added!';
            setTimeout(() => { this.textContent = 'Add to Cart'; }, 1000);
        });
    });
}); 