
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message, duration = 2500) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/* ===== Horizontal scroll arrows ===== */
function setupScroll(scrollId, prevId, nextId, amount = 300) {
    const scrollEl = document.getElementById(scrollId);
    document.getElementById(prevId).addEventListener('click', () => {
        scrollEl.scrollBy({ left: -amount, behavior: 'smooth' });
    });
    document.getElementById(nextId).addEventListener('click', () => {
        scrollEl.scrollBy({ left: amount, behavior: 'smooth' });
    });
}

setupScroll('foodScroll', 'foodPrev', 'foodNext');
setupScroll('groceryScroll', 'groceryPrev', 'groceryNext');
setupScroll('dineoutScroll', 'dineoutPrev', 'dineoutNext', 340);

/* ===== Hero card "arrow" buttons -> scroll to matching section ===== */
document.querySelectorAll('.card-arrow').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.dataset.scroll;
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

/* ===== Offer badges (hero cards) ===== */
document.querySelectorAll('.offer-badge').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(btn.dataset.message || 'Offer applied!');
    });
});

/* ===== Dineout "book a table / offer" buttons ===== */
document.querySelectorAll('.dineout-offer').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showToast(btn.dataset.message || 'Table booked!');
    });
});

/* ===== Food items & grocery items -> simple feedback on click ===== */
document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('click', () => {
        const name = item.dataset.name || 'this category';
        showToast(`🔎 Showing restaurants for "${name}"`);
    });
});

/* ===== City pills ===== */
document.querySelectorAll('.city-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const city = pill.dataset.city || 'your city';
        const locationInput = document.getElementById('locationInput');
        if (locationInput) {
            locationInput.value = city;
        }
        showToast(`📍 Switched delivery location to ${city}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

/* ===== Search ===== */
const searchInput = document.getElementById('searchInput');
const searchIcon = document.getElementById('searchIcon');

function runSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showToast('Type something to search for restaurants or items');
        return;
    }
    showToast(`🔎 Searching for "${query}"...`);
}

if (searchIcon) {
    searchIcon.addEventListener('click', runSearch);
}
if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') runSearch();
    });
}

/* ===== Get the App buttons (navbar + banner) -> open QR modal ===== */
const appModal = document.getElementById('appModal');

function openAppModal() {
    appModal.classList.add('active');
}
function closeAppModalFn() {
    appModal.classList.remove('active');
}

document.getElementById('getAppBtn').addEventListener('click', openAppModal);
document.getElementById('bannerAppBtn').addEventListener('click', openAppModal);
document.getElementById('closeAppModal').addEventListener('click', closeAppModalFn);
appModal.addEventListener('click', (e) => {
    if (e.target === appModal) closeAppModalFn();
});

/* ===== Sign In Modal ===== */
const loginModal = document.getElementById('loginModal');

document.getElementById('signInBtn').addEventListener('click', () => {
    loginModal.classList.add('active');
});

document.getElementById('closeModal').addEventListener('click', () => {
    loginModal.classList.remove('active');
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

document.getElementById('continueBtn').addEventListener('click', () => {
    const phone = document.getElementById('phoneInput').value.trim();
    if (phone.length !== 10 || isNaN(phone)) {
        showToast('Please enter a valid 10-digit mobile number');
        return;
    }
    showToast('OTP sent to +91 ' + phone + ' (demo only, no real SMS sent)');
    loginModal.classList.remove('active');
});

/* ===== Close any open modal with Escape key ===== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        loginModal.classList.remove('active');
        closeAppModalFn();
    }
});