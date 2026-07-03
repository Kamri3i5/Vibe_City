// ===== ADMIN PANEL — VibeCity =====

// Уровни доступа: PIN → роль
//  owner  — полный доступ (всё, включая удаление и сброс данных)
//  editor — только добавление/редактирование мест и запуск ивентов
const ADMIN_PINS = {
    '1234': 'owner',
    '7777': 'editor'
};
let adminRole = null;

const STORAGE_KEY = 'vibecity_places';
const EVENTS_KEY = 'vibecity_events';

// Дефолтные данные (если localStorage пуст)
const DEFAULT_PLACES = [
    {
        name: "Бродвей (Сайилгох)", coords: [41.3126, 69.2746], category: "Развлечения",
        description: "Пешеходная улица с уличными художниками и стритфудом.",
        image: "",
        fire: 24, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 15
    },
    {
        name: "Magic City", coords: [41.3036, 69.2450], category: "Развлечения",
        description: "Тематический парк с замком и поющими фонтанами.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Magic_city_tungi_ko%27rinishi.jpg/960px-Magic_city_tungi_ko%27rinishi.jpg",
        fire: 15, dead: 2, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 40
    },
    {
        name: "Ташкент Сити", coords: [41.3165, 69.2484], category: "Парк",
        description: "Современный парк с небоскребами и планетарием.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tashkent_city_8.jpg/960px-Tashkent_city_8.jpg",
        fire: 8, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 5
    },
    {
        name: "Minor Mosque", coords: [41.3345, 69.2770], category: "Культура",
        description: "Белоснежная мечеть на берегу канала.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Minor_Mosque_Tashkent.jpg/960px-Minor_Mosque_Tashkent.jpg",
        fire: 4, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 120
    },
    {
        name: "Chorsu Bazaar", coords: [41.3262, 69.2369], category: "Шопинг",
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
    const savedRole = sessionStorage.getItem('vibecity_admin');
    if (savedRole === 'owner' || savedRole === 'editor') {
        adminRole = savedRole;
        lockScreen.style.display = 'none';
        adminApp.style.display = 'flex';
        initAdmin();
        return;
    }

    const tryLogin = () => {
        const role = ADMIN_PINS[pinInput.value];
        if (role) {
            adminRole = role;
            sessionStorage.setItem('vibecity_admin', role);
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
    // Список локаций мог измениться — обновляем селект
    if (tabId === 'events') {
        populateEventPlaces();
    }
};

// ===== ИНИЦИАЛИЗАЦИЯ АДМИНКИ =====
function applyRole() {
    document.body.classList.add('role-' + adminRole);
    const badge = document.querySelector('.sidebar-logo .badge');
    if (badge) badge.textContent = adminRole === 'owner' ? 'OWNER' : 'EDITOR';
}

function initAdmin() {
    applyRole();
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
        if (adminRole !== 'owner') {
            showToast('⛔ Сброс доступен только владельцу');
            return;
        }
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

    // Форма ивентов
    initEventForm();

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
    if (adminRole !== 'owner') {
        showToast('⛔ Удаление доступно только владельцу');
        return;
    }
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

// ===== ФОРМА ИВЕНТОВ =====
function populateEventPlaces() {
    const select = document.getElementById('ev-place');
    if (!select) return;
    const current = select.value;
    select.innerHTML = '<option value="">Выберите место...</option>' +
        [...places]
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
            .map(p => `<option value="${p.name.replace(/"/g, '&quot;')}">${p.name} · ${p.category}</option>`)
            .join('');
    select.value = current;
}

function initEventForm() {
    populateEventPlaces();

    document.getElementById('event-form').onsubmit = (e) => {
        e.preventDefault();

        const placeName = document.getElementById('ev-place').value;
        const title = document.getElementById('ev-title').value.trim();
        const desc = document.getElementById('ev-desc').value.trim();
        const hours = parseInt(document.getElementById('ev-hours').value, 10) || 24;

        const place = places.find(p => p.name === placeName);
        if (!place || !title) {
            showToast('Выбери локацию и укажи название');
            return;
        }

        events.push({
            name: title,
            originalPlace: place.name,
            description: desc || `${title} — ${place.name}`,
            coords: place.coords,
            category: place.category,
            isEvent: true,
            fire: 0, dead: 0, crying: 0, myVibe: null,
            createdAt: Date.now(),
            lastUpdate: Date.now(),
            expiresAt: Date.now() + hours * 60 * 60 * 1000
        });

        saveEvents();
        renderEvents();
        updateDashboard();
        document.getElementById('event-form').reset();
        showToast(`✨ Ивент «${title}» запущен в «${place.name}»`);
    };
}

// ===== ТЕЛЕГРАМ ПАРСЕР =====

// Варианты названия места: полное, до скобок и внутри скобок.
// "Oqtepa Lavash (Чиланзар)" -> ["oqtepa lavash (чиланзар)", "oqtepa lavash", "чиланзар"]
function placeAliases(p) {
    const names = [p.name];
    const m = p.name.match(/^(.+?)\s*\((.+?)\)\s*$/);
    if (m) names.push(m[1], m[2]);
    return names.map(n => n.trim().toLowerCase()).filter(n => n.length >= 3);
}

// Название ивента = первые предложения поста (короткие «Внимание!» пропускаем)
function extractEventTitle(text) {
    const parts = text.split(/[.!?\n]/).map(s => s.trim()).filter(Boolean);
    let title = '';
    for (const p of parts) {
        title = title ? title + '. ' + p : p;
        if (title.length >= 15) break;
    }
    if (!title) return 'Событие';
    return title.length > 70 ? title.slice(0, 67) + '…' : title;
}

function initParser() {
    document.getElementById('parse-btn').onclick = () => {
        const text = document.getElementById('tg-text').value.trim();
        if (!text) return showToast('Вставь текст поста');

        const lowerText = text.toLowerCase();
        const matches = places.filter(p => placeAliases(p).some(a => lowerText.includes(a)));

        const resultDiv = document.getElementById('parse-result');
        const outputDiv = document.getElementById('parse-output');

        if (matches.length > 0) {
            resultDiv.style.display = 'block';
            outputDiv.innerHTML = `
                <p class="form-hint">📌 Ивент: «${extractEventTitle(text)}»</p>
            ` + matches.map(m => `
                <div class="parse-match">
                    <span>✨</span>
                    <div>
                        <strong>${m.name}</strong><br>
                        <small>${m.category} · 🔥 ${m.fire}</small>
                    </div>
                    <button class="btn-primary" style="margin-left:auto; padding: 6px 14px; font-size: 12px;"
                            onclick="createEventFromPost('${m.name.replace(/'/g, "\\'")}', '${text.replace(/'/g, "\\'").replace(/\n/g, ' ')}')">
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

// ВАЖНО: имя не должно совпадать с document.createEvent —
// в инлайновых onclick document перекрывает глобальную функцию
window.createEventFromPost = function(placeName, postText) {
    const place = places.find(p => p.name === placeName);
    if (!place) return;

    const newEvent = {
        name: extractEventTitle(postText),
        originalPlace: place.name,
        description: postText,
        coords: place.coords,
        category: place.category,
        isEvent: true,
        fire: 0, dead: 0, crying: 0, myVibe: null,
        createdAt: Date.now(),
        lastUpdate: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
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

    container.innerHTML = events.map((ev, i) => {
        const until = ev.expiresAt
            ? ` · до ${new Date(ev.expiresAt).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
            : '';
        return `
        <div class="event-item">
            <span>✨</span>
            <strong>${ev.name}</strong>
            <small style="color: var(--text-muted)">${ev.originalPlace ? '📍 ' + ev.originalPlace : ''}${until}</small>
            <button class="remove-event" onclick="removeEvent(${i})">✕</button>
        </div>`;
    }).join('');
}

// ===== ЗАПУСК =====
initAuth();
