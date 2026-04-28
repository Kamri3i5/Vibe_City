// ===== ADMIN PANEL — VibeCity =====

const ADMIN_PIN = '1234';
const STORAGE_KEY = 'vibecity_places';
const EVENTS_KEY = 'vibecity_events';

// Дефолтные данные (если localStorage пуст)
const DEFAULT_PLACES = [
    {
        name: "Бродвей (Сайилгох)", coords: [41.3117, 69.2797], category: "Развлечения",
        description: "Пешеходная улица с уличными художниками и стритфудом.",
        image: "https://lh5.googleusercontent.com/p/AF1QipP_2v0-M-E-p8rS9z0Q5m8Y7x0R6-P8x3-U-r-s=w1000",
        fire: 24, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 15
    },
    {
        name: "Magic City", coords: [41.3015, 69.2455], category: "Развлечения",
        description: "Тематический парк с замком и поющими фонтанами.",
        image: "https://lh5.googleusercontent.com/p/AF1QipNX9v0-M-E-p8rS9z0Q5m8Y7x0R6-P8x3-U-r-s=w1000",
        fire: 15, dead: 2, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 40
    },
    {
        name: "Ташкент Сити", coords: [41.3031, 69.2662], category: "Парк",
        description: "Современный парк с небоскребами и планетарием.",
        image: "https://lh5.googleusercontent.com/p/AF1QipNq4w8k2rZ0M-Q_G3S_q0o0H6S7LzN6x3_Q8-s=w1000",
        fire: 8, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 5
    },
    {
        name: "Minor Mosque", coords: [41.3330, 69.2815], category: "Культура",
        description: "Белоснежная мечеть на берегу канала.",
        image: "https://lh5.googleusercontent.com/p/AF1QipO9v0-M-E-p8rS9z0Q5m8Y7x0R6-P8x3-U-r-s=w1000",
        fire: 4, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 120
    },
    {
        name: "Chorsu Bazaar", coords: [41.3264, 69.2292], category: "Шопинг",
        description: "Исторический базар под огромным куполом.",
        image: "", fire: 10, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 30
    },
    {
        name: "Amir Temur Square", coords: [41.3111, 69.2789], category: "Культура",
        description: "Сквер в центре города с памятником Тамерлану.",
        image: "", fire: 5, dead: 2, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 60
    }
];

// ===== СОСТОЯНИЕ =====
let places = [];
let events = [];
let adminMap = null;
let pickerMap = null;
let pickerMarker = null;

// ===== ЗАГРУЗКА / СОХРАНЕНИЕ =====
function loadPlaces() {
    const saved = localStorage.getItem(STORAGE_KEY);
    places = saved ? JSON.parse(saved) : [...DEFAULT_PLACES];
}

function savePlaces() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

function loadEvents() {
    const saved = localStorage.getItem(EVENTS_KEY);
    events = saved ? JSON.parse(saved) : [];
}

function saveEvents() {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

// ===== УТИЛИТЫ =====
function getStatus(place) {
    const total = place.fire + place.dead + place.crying;
    if (total === 0) return 'mid';
    if (place.fire / total >= 0.6 && place.fire >= 5) return 'fire';
    if (place.dead > place.fire) return 'dead';
    return 'mid';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== PIN АВТОРИЗАЦИЯ =====
function initAuth() {
    const lockScreen = document.getElementById('lock-screen');
    const adminApp = document.getElementById('admin-app');
    const pinInput = document.getElementById('pin-input');
    const pinSubmit = document.getElementById('pin-submit');

    // Проверяем, авторизован ли уже
    if (sessionStorage.getItem('vibecity_admin') === 'true') {
        lockScreen.style.display = 'none';
        adminApp.style.display = 'flex';
        initAdmin();
        return;
    }

    const tryLogin = () => {
        if (pinInput.value === ADMIN_PIN) {
            sessionStorage.setItem('vibecity_admin', 'true');
            lockScreen.style.display = 'none';
            adminApp.style.display = 'flex';
            initAdmin();
        } else {
            pinInput.style.borderColor = '#ef4444';
            pinInput.value = '';
            pinInput.placeholder = 'Неверный PIN';
            setTimeout(() => {
                pinInput.style.borderColor = '';
                pinInput.placeholder = '••••';
            }, 1500);
        }
    };

    pinSubmit.onclick = tryLogin;
    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') tryLogin();
    });
    pinInput.focus();
}

// ===== НАВИГАЦИЯ ПО ТАБАМ =====
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    document.getElementById('tab-' + tabId)?.classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');

    // Инвалидируем карты при переключении (баг Leaflet)
    if (tabId === 'dashboard' && adminMap) {
        setTimeout(() => adminMap.invalidateSize(), 100);
    }
    if (tabId === 'add-place' && pickerMap) {
        setTimeout(() => pickerMap.invalidateSize(), 100);
    }
};

// ===== ИНИЦИАЛИЗАЦИЯ АДМИНКИ =====
function initAdmin() {
    loadPlaces();
    loadEvents();

    // Навигация
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
        btn.onclick = () => switchTab(btn.dataset.tab);
    });

    // Выход
    document.getElementById('logout-btn').onclick = () => {
        sessionStorage.removeItem('vibecity_admin');
        location.reload();
    };

    // Сброс данных к дефолтным
    document.getElementById('reset-data-btn').onclick = () => {
        if (confirm('Сбросить все данные к начальным? Это удалит все изменения.')) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(EVENTS_KEY);
            location.reload();
        }
    };

    // Дашборд
    updateDashboard();
    initAdminMap();

    // Таблица
    renderTable();
    document.getElementById('table-search').addEventListener('input', renderTable);

    // Форма
    initForm();

    // Парсер
    initParser();

    // Рендер ивентов
    renderEvents();

    lucide.createIcons();
}

// ===== ДАШБОРД =====
function updateDashboard() {
    document.getElementById('stat-places').textContent = places.length;
    document.getElementById('stat-fires').textContent = places.reduce((s, p) => s + p.fire, 0);
    document.getElementById('stat-events').textContent = events.length;

    const hottest = [...places].sort((a, b) => b.fire - a.fire)[0];
    document.getElementById('stat-hottest').textContent = hottest ? hottest.name : '—';
}

function initAdminMap() {
    if (adminMap) return;
    adminMap = L.map('admin-map', { zoomControl: false }).setView([41.3, 69.27], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20, attribution: '&copy; CartoDB &copy; OpenStreetMap'
    }).addTo(adminMap);

    // Ставим маркеры
    places.forEach(p => {
        L.circleMarker(p.coords, {
            radius: Math.min(4 + p.fire, 16),
            fillColor: getStatus(p) === 'fire' ? '#ff4500' : (getStatus(p) === 'dead' ? '#6b7280' : '#3b82f6'),
            fillOpacity: 0.8,
            color: 'transparent'
        }).addTo(adminMap).bindPopup(`<b>${p.name}</b><br>🔥 ${p.fire}`);
    });
}

// ===== ТАБЛИЦА МЕСТ =====
function renderTable() {
    const query = (document.getElementById('table-search')?.value || '').toLowerCase();
    const tbody = document.getElementById('places-tbody');
    tbody.innerHTML = '';

    const filtered = places.filter(p => p.name.toLowerCase().includes(query));

    filtered.forEach((place, idx) => {
        const realIdx = places.indexOf(place);
        const status = getStatus(place);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${realIdx + 1}</td>
            <td><strong>${place.name}</strong></td>
            <td>${place.category}</td>
            <td>${place.fire}</td>
            <td>${place.dead}</td>
            <td><span class="table-status ${status}">${status === 'fire' ? '🔥 Fire' : (status === 'dead' ? '💀 Dead' : '😐 Mid')}</span></td>
            <td>
                <div class="table-actions">
                    <button title="Редактировать" onclick="editPlace(${realIdx})"><i data-lucide="pencil"></i></button>
                    <button title="Удалить" class="delete-btn" onclick="confirmDelete(${realIdx})"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    lucide.createIcons();
}

// ===== УДАЛЕНИЕ =====
let deleteIdx = -1;

window.confirmDelete = function(idx) {
    deleteIdx = idx;
    document.getElementById('confirm-title').textContent = `Удалить "${places[idx].name}"?`;
    document.getElementById('confirm-modal').style.display = 'flex';
};

document.getElementById('confirm-yes').onclick = () => {
    if (deleteIdx >= 0) {
        const name = places[deleteIdx].name;
        places.splice(deleteIdx, 1);
        savePlaces();
        renderTable();
        updateDashboard();
        showToast(`🗑 "${name}" удалено`);
    }
    document.getElementById('confirm-modal').style.display = 'none';
    deleteIdx = -1;
};

document.getElementById('confirm-no').onclick = () => {
    document.getElementById('confirm-modal').style.display = 'none';
    deleteIdx = -1;
};

// ===== РЕДАКТИРОВАНИЕ =====
window.editPlace = function(idx) {
    const place = places[idx];
    document.getElementById('edit-index').value = idx;
    document.getElementById('f-name').value = place.name;
    document.getElementById('f-category').value = place.category;
    document.getElementById('f-lat').value = place.coords[0];
    document.getElementById('f-lng').value = place.coords[1];
    document.getElementById('f-desc').value = place.description || '';
    document.getElementById('f-image').value = place.image || '';
    document.getElementById('form-title').textContent = `Редактировать: ${place.name}`;

    if (pickerMap && pickerMarker) {
        pickerMarker.setLatLng(place.coords);
        pickerMap.setView(place.coords, 15);
    }

    switchTab('add-place');
};

// ===== ФОРМА ДОБАВЛЕНИЯ =====
function initForm() {
    // Мини-карта для выбора координат
    pickerMap = L.map('picker-map', { zoomControl: false }).setView([41.3, 69.27], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20, attribution: '&copy; CartoDB &copy; OpenStreetMap'
    }).addTo(pickerMap);

    pickerMarker = L.marker([41.3, 69.27]).addTo(pickerMap);

    pickerMap.on('click', (e) => {
        const { lat, lng } = e.latlng;
        document.getElementById('f-lat').value = lat.toFixed(4);
        document.getElementById('f-lng').value = lng.toFixed(4);
        pickerMarker.setLatLng([lat, lng]);
    });

    // Сабмит формы
    document.getElementById('place-form').onsubmit = (e) => {
        e.preventDefault();

        const editIdx = parseInt(document.getElementById('edit-index').value);
        const newPlace = {
            name: document.getElementById('f-name').value.trim(),
            coords: [
                parseFloat(document.getElementById('f-lat').value),
                parseFloat(document.getElementById('f-lng').value)
            ],
            category: document.getElementById('f-category').value,
            description: document.getElementById('f-desc').value.trim(),
            image: document.getElementById('f-image').value.trim(),
            fire: 0,
            dead: 0,
            crying: 0,
            myVibe: null,
            lastUpdate: Date.now()
        };

        if (editIdx >= 0) {
            // Сохраняем текущие голоса при редактировании
            newPlace.fire = places[editIdx].fire;
            newPlace.dead = places[editIdx].dead;
            newPlace.crying = places[editIdx].crying;
            places[editIdx] = newPlace;
            showToast(`✏️ "${newPlace.name}" обновлено`);
        } else {
            places.push(newPlace);
            showToast(`✅ "${newPlace.name}" добавлено`);
        }

        savePlaces();
        resetForm();
        renderTable();
        updateDashboard();
        switchTab('places');
    };
}

window.resetForm = function() {
    document.getElementById('place-form').reset();
    document.getElementById('edit-index').value = -1;
    document.getElementById('form-title').textContent = 'Добавить место';
};

// ===== ТЕЛЕГРАМ ПАРСЕР =====
function initParser() {
    document.getElementById('parse-btn').onclick = () => {
        const text = document.getElementById('tg-text').value.trim();
        if (!text) return showToast('Вставь текст поста');

        const lowerText = text.toLowerCase();
        const matches = places.filter(p => lowerText.includes(p.name.toLowerCase()));

        const resultDiv = document.getElementById('parse-result');
        const outputDiv = document.getElementById('parse-output');

        if (matches.length > 0) {
            resultDiv.style.display = 'block';
            outputDiv.innerHTML = matches.map(m => `
                <div class="parse-match">
                    <span>✨</span>
                    <div>
                        <strong>${m.name}</strong><br>
                        <small>${m.category} · 🔥 ${m.fire}</small>
                    </div>
                    <button class="btn-primary" style="margin-left:auto; padding: 6px 14px; font-size: 12px;" 
                            onclick="createEvent('${m.name}', '${text.replace(/'/g, "\\'")}')">
                        Создать ивент
                    </button>
                </div>
            `).join('');
        } else {
            resultDiv.style.display = 'block';
            outputDiv.innerHTML = '<p style="color:var(--text-secondary)">❌ Не нашли совпадений с базой мест. Попробуй упомянуть название из списка.</p>';
        }
    };
}

window.createEvent = function(placeName, postText) {
    const place = places.find(p => p.name === placeName);
    if (!place) return;

    const newEvent = {
        name: `ИВЕНТ: ${place.name}`,
        originalPlace: place.name,
        description: postText,
        coords: place.coords,
        category: place.category,
        isEvent: true,
        createdAt: Date.now()
    };

    events.push(newEvent);
    saveEvents();
    renderEvents();
    showToast(`✨ Ивент для "${place.name}" создан!`);
};

window.removeEvent = function(idx) {
    events.splice(idx, 1);
    saveEvents();
    renderEvents();
    showToast('🗑 Ивент удалён');
};

function renderEvents() {
    const container = document.getElementById('events-list');
    if (events.length === 0) {
        container.innerHTML = '<p class="empty-state">Пока нет активных ивентов</p>';
        return;
    }

    container.innerHTML = events.map((ev, i) => `
        <div class="event-item">
            <span>✨</span>
            <strong>${ev.name}</strong>
            <small style="color: var(--text-muted)">${new Date(ev.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</small>
            <button class="remove-event" onclick="removeEvent(${i})">✕</button>
        </div>
    `).join('');
}

// ===== ЗАПУСК =====
initAuth();
