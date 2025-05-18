let selectedPackage = null;

function loadPackages() {
    const container = document.getElementById('package-cards');
    packages.forEach((pkg, index) => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.dataset.index = index;

        const description = pkg.description ? `<small>${pkg.description}</small><br>` : '';
        card.innerHTML = `
            <h3>${pkg.name}</h3>
            ${description}
            <ul>
                ${pkg.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        `;
        card.addEventListener('click', () => selectPackage(index));
        container.appendChild(card);
    });
}

loadPackages();

function selectPackage(index) {
    selectedPackage = packages[index];

    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });

    const selectedCard = document.querySelector(`[data-index="${index}"]`);
    selectedCard.classList.add('selected');

    document.getElementById('form-section').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    const name = localStorage.getItem('name') || '';
    const phone = localStorage.getItem('phone') || '';
    const notes = localStorage.getItem('notes') || '';
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    document.getElementById('notes').value = notes;
});

function sendMessage() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const errorEl = document.getElementById('error-message');
    const spinner = document.getElementById('spinner');

    errorEl.classList.add('hidden');
    spinner.classList.remove('hidden');

    if (!selectedPackage || !name || !phone) {
        errorEl.textContent = 'Пожалуйста, заполните все обязательные поля.';
        errorEl.classList.remove('hidden');
        spinner.classList.add('hidden');
        return;
    }

    localStorage.setItem('name', name);
    localStorage.setItem('phone', phone);
    localStorage.setItem('notes', notes);

    setTimeout(() => {
        openWhatsAppDirect();
        spinner.classList.add('hidden');
    }, 1000);
}

function openWhatsAppDirect() {
    window.open('https://wa.me/77073628706 ', '_blank');
}

function openTelegram() {
    window.open('https://t.me/+77073628706 ', '_blank');
}

// Генерация QR-кода
QRCODE.makeCode(document.getElementById('qrcode'), 'https://wa.me/77073628706 ');