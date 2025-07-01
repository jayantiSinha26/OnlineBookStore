// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Loading animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading');
    loader.classList.add('hidden');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Add hover effect to book cards
if (document.querySelectorAll('.book-card').length) {
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add smooth scroll to all links
if (document.querySelectorAll('a[href^="#"]').length) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// --- CART FUNCTIONALITY ---
// Book data for cart
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

// Add cart count badge to navbar
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

// Add to cart event
if (document.querySelectorAll('.book-card .btn-outline-primary').length) {
    document.querySelectorAll('.book-card .btn-outline-primary').forEach((btn, idx) => {
        btn.addEventListener('click', function() {
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
            btn.textContent = 'Added!';
            setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1000);
        });
    });
}

// On page load, update cart count
updateCartCount(); 