// ===== STATIC SVGs (оптимизация: не нагружаем Lucide на каждый маркер) =====
const ICONS = {
    flame: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    skull: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
    meh: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

// ===== MAP INIT =====
const map = L.map("map", { zoomControl: false }).setView([41.2995, 69.2401], 13);

const tileLayers = {
    dark: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20, attribution: '&copy; Stadia Maps'
    }),
    light: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20, attribution: '&copy; CartoDB'
    })
};

let isDark = true;
tileLayers.dark.addTo(map);

// ===== ДАННЫЕ — синхронизация с админ-панелью через localStorage =====
const STORAGE_KEY = 'vibecity_places';
const EVENTS_KEY = 'vibecity_events';

const DEFAULT_PLACES = [
    {
        name: "Бродвей (Сайилгох)", coords: [41.3117, 69.2797], category: "Развлечения",
        description: "Главная пешеходная улица Ташкента. Артисты, стритфуд, живая музыка — тут всегда движ.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sayilgoh_Street_in_Tashkent.jpg/1280px-Sayilgoh_Street_in_Tashkent.jpg",
        fire: 24, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 15
    },
    {
        name: "Magic City", coords: [41.3015, 69.2455], category: "Развлечения",
        description: "Тематический парк с замком, фонтанами и ночной подсветкой. Сказка для всех возрастов.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Magic_City_Tashkent.jpg/1280px-Magic_City_Tashkent.jpg",
        fire: 15, dead: 2, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 40
    },
    {
        name: "Ташкент Сити", coords: [41.3031, 69.2662], category: "Парк",
        description: "Современный деловой комплекс с небоскрёбами, фонтанами и вечерней подсветкой.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Tashkent_city_2021.jpg/1280px-Tashkent_city_2021.jpg",
        fire: 8, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 5
    },
    {
        name: "Minor Mosque", coords: [41.3330, 69.2815], category: "Культура",
        description: "Белоснежная мечеть на берегу канала Анхор. Архитектурный шедевр нового Ташкента.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Minor_Mosque_Tashkent.jpg/1280px-Minor_Mosque_Tashkent.jpg",
        fire: 4, dead: 0, crying: 1, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 120
    },
    {
        name: "Chorsu Bazaar", coords: [41.3264, 69.2292], category: "Шопинг",
        description: "Легендарный базар под голубыми куполами. Специи, сухофрукты, свежий хлеб — аутентичный Ташкент.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chorsu_Bazaar%2C_Tashkent.jpg/1280px-Chorsu_Bazaar%2C_Tashkent.jpg",
        fire: 10, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 30
    },
    {
        name: "Amir Temur Square", coords: [41.3111, 69.2789], category: "Культура",
        description: "Центральная площадь столицы с конной статуей Амира Тимура и фонтанами.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Amir_Timur_square_Tashkent.jpg/1280px-Amir_Timur_square_Tashkent.jpg",
        fire: 5, dead: 2, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 60
    },
    {
        name: "Телебашня Ташкента", coords: [41.3425, 69.2858], category: "Культура",
        description: "375-метровая телевизионная башня — самое высокое сооружение в Центральной Азии. Ресторан с панорамным видом.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tashkent_Tower.jpg/800px-Tashkent_Tower.jpg",
        fire: 7, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 45
    },
    {
        name: "Театр Навои", coords: [41.3131, 69.2768], category: "Культура",
        description: "Государственный академический Большой театр имени Алишера Навои. Опера и балет мирового уровня.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tashkent_Navoi_Theater.jpg/1280px-Tashkent_Navoi_Theater.jpg",
        fire: 3, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 180
    },
    {
        name: "Хазрати Имам", coords: [41.3382, 69.2327], category: "Культура",
        description: "Священный исламский комплекс с мечетями и медресе. Хранится старейший Коран в мире.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Hazrat_Imam_Mosque_Tashkent.jpg/1280px-Hazrat_Imam_Mosque_Tashkent.jpg",
        fire: 6, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 90
    },
    {
        name: "Парк Навруз", coords: [41.3245, 69.3124], category: "Парк",
        description: "Огромный этно-парк с озером, каруселями и колесом обозрения. Лучшее место для семейного отдыха.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/New_Uzbekistan_Park.jpg/1280px-New_Uzbekistan_Park.jpg",
        fire: 11, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 20
    },
    {
        name: "Oqtepa Lavash (Чиланзар)", coords: [41.2858, 69.2131], category: "Еда",
        description: "Культовый ташкентский фастфуд. Самса, лаваш и шаурма — очередь показатель качества.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Uzbek_samsa.jpg/1280px-Uzbek_samsa.jpg",
        fire: 9, dead: 3, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 50
    },
    {
        name: "Central Asian Plov Center", coords: [41.3225, 69.2878], category: "Еда",
        description: "Легендарное место, где готовят 1000 кг плова в день. Must visit для каждого гостя Ташкента.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Plov_Tashkent.jpg/1280px-Plov_Tashkent.jpg",
        fire: 20, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 10
    },
    {
        name: "ТЦ Samarqand Darvoza", coords: [41.3272, 69.2339], category: "Шопинг",
        description: "Современный торговый центр рядом с Чорсу. Бренды, кинотеатр, фудкорт.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Tashkent_shopping_center.jpg/1280px-Tashkent_shopping_center.jpg",
        fire: 3, dead: 5, crying: 1, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 200
    },
    {
        name: "Mega Planet", coords: [41.2978, 69.2176], category: "Шопинг",
        description: "Один из крупнейших ТРЦ Ташкента. IMAX кинотеатр, боулинг, рестораны.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Modern_shopping_mall_interior.jpg/1280px-Modern_shopping_mall_interior.jpg",
        fire: 4, dead: 2, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 100
    },
    {
        name: "Ташкентское метро", coords: [41.3115, 69.2800], category: "Культура",
        description: "Одно из красивейших метро мира. Каждая станция — произведение искусства с уникальным дизайном.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tashkent_metro_Kosmonavtlar_station.jpg/1280px-Tashkent_metro_Kosmonavtlar_station.jpg",
        fire: 6, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 70
    },
    {
        name: "Japanese Garden", coords: [41.3420, 69.2040], category: "Парк",
        description: "Тихий уголок Японии в Ташкенте. Мостики, карпы кои, сакура и медитативная атмосфера.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Japanese_Garden_Tashkent.jpg/1280px-Japanese_Garden_Tashkent.jpg",
        fire: 5, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 35
    },
    {
        name: "Milliy Bog", coords: [41.2963, 69.2045], category: "Парк",
        description: "Национальный парк для утренних пробежек и семейного пикника.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tashkent_park_green.jpg/1280px-Tashkent_park_green.jpg",
        fire: 2, dead: 4, crying: 2, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 300
    },
    {
        name: "Humo Arena", coords: [41.3150, 69.2950], category: "Развлечения",
        description: "Современная ледовая арена на 12000 мест. Хоккей, концерты и шоу мирового уровня.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Humo_Arena_Tashkent.jpg/1280px-Humo_Arena_Tashkent.jpg",
        fire: 13, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 25
    },
    {
        name: "Ankhor Canal", coords: [41.3280, 69.2750], category: "Парк",
        description: "Набережная канала Анхор — популярное место для вечерних прогулок и джоггинга.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Anhor_canal_Tashkent.jpg/1280px-Anhor_canal_Tashkent.jpg",
        fire: 7, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 55
    },
    {
        name: "Kukeldash Madrasah", coords: [41.3258, 69.2308], category: "Культура",
        description: "Средневековое медресе XVI века рядом с Чорсу. Действующее учебное заведение и памятник архитектуры.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kukeldash_Madrasah_in_Tashkent.jpg/1280px-Kukeldash_Madrasah_in_Tashkent.jpg",
        fire: 3, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 150
    },
    {
        name: "Музей Искусств", coords: [41.3065, 69.2755], category: "Культура",
        description: "Государственный музей искусств Узбекистана. Коллекция от древности до современности.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Art_Museum_Tashkent.jpg/1280px-Art_Museum_Tashkent.jpg",
        fire: 2, dead: 0, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 240
    },
    {
        name: "Лаби Хауз Ресторан", coords: [41.3090, 69.2650], category: "Еда",
        description: "Уютный ресторан узбекской кухни с летней террасой. Шашлык, манты и лагман.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Uzbek_cuisine_plov.jpg/1280px-Uzbek_cuisine_plov.jpg",
        fire: 8, dead: 1, crying: 0, myVibe: null, lastUpdate: Date.now() - 1000 * 60 * 80
    }
];

// Загружаем из localStorage (или используем дефолтные)
const savedData = localStorage.getItem(STORAGE_KEY);
const places = savedData ? JSON.parse(savedData) : [...DEFAULT_PLACES];

// Загружаем ивенты
const savedEvents = localStorage.getItem(EVENTS_KEY);
let events = savedEvents ? JSON.parse(savedEvents) : [];

let currentPlace = null;
let activeFilter = 'all';
let markers = [];

// ===== УТИЛИТЫ =====

function getPlaceStatus(place) {
    if (place.isEvent) return 'event';
    const total = place.fire + place.dead + place.crying;
    if (total === 0) return 'mid';
    const ratio = place.fire / total;
    if (ratio >= 0.6 && place.fire >= 5) return 'fire';
    if (place.dead > place.fire) return 'dead';
    return 'mid';
}

function getCrowdedness(place) {
    const total = place.fire + place.dead + place.crying;
    const percent = Math.min(total * 8, 100);
    let estimate;
    if (total <= 3) estimate = '~50 чел.';
    else if (total <= 8) estimate = '~200 чел.';
    else if (total <= 15) estimate = '~500 чел.';
    else if (total <= 25) estimate = '~800 чел.';
    else estimate = '1000+ чел.';
    return { percent, estimate };
}

function getFreshness(lastUpdate) {
    const diff = Date.now() - lastUpdate;
    const hours = diff / (1000 * 60 * 60);
    if (hours < 1) return { text: 'Данные свежие · обновлено недавно', cls: '' };
    if (hours < 3) return { text: `Обновлено ${Math.floor(hours)}ч назад · актуально`, cls: 'stale' };
    return { text: `Обновлено ${Math.floor(hours)}ч+ назад · устарело`, cls: 'old' };
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== МАРКЕРЫ =====

function createIcon(status, isHot) {
    const iconSvg = status === 'event' ? ICONS.star : (status === 'dead' ? ICONS.skull : (status === 'mid' ? ICONS.meh : ICONS.flame));
    return L.divIcon({
        html: `<div class="marker-container marker-${status} ${isHot ? 'hot' : ''}">
                    <div class="marker-bg"></div>
                    ${iconSvg}
               </div>`,
        className: 'custom-div-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
}

function renderMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const allData = [...places, ...events];
    const filtered = activeFilter === 'all'
        ? allData
        : allData.filter(p => p.category === activeFilter);

    filtered.forEach(place => {
        const status = getPlaceStatus(place);
        const isHot = status === 'fire' && place.fire >= 10;
        const marker = L.marker(place.coords, { icon: createIcon(status, isHot) }).addTo(map);
        marker.on('click', () => showPlaceInfo(place));
        place.marker = marker;
        markers.push(marker);
    });
}

// ===== ПАНЕЛЬ ИНФОРМАЦИИ =====

function showPlaceInfo(place) {
    currentPlace = place;
    const status = getPlaceStatus(place);
    const crowd = getCrowdedness(place);
    const fresh = getFreshness(place.lastUpdate);

    document.getElementById('panel-name').innerText = place.name;
    document.getElementById('panel-category').innerText = place.category;
    document.getElementById('panel-description').innerText = place.description || '';
    document.getElementById('count-fire').innerText = place.fire;
    document.getElementById('count-dead').innerText = place.dead;
    document.getElementById('count-crying').innerText = place.crying;

    const statusEl = document.getElementById('panel-status');
    const statusLabels = { fire: '🔥 Fire', mid: '😐 Mid', dead: '💀 Dead', event: '✨ EVENT' };
    statusEl.className = `status-badge status-${status}`;
    statusEl.innerHTML = statusLabels[status];

    const freshEl = document.getElementById('freshness');
    freshEl.className = `freshness ${fresh.cls}`;
    document.getElementById('freshness-text').innerText = fresh.text;

    document.getElementById('crowd-fill').style.width = crowd.percent + '%';
    document.getElementById('crowd-estimate').innerText = crowd.estimate;

    const imgDiv = document.getElementById('panel-image');
    if (place.image) {
        imgDiv.classList.add('loading-skeleton');
        imgDiv.style.backgroundImage = 'none';
        const img = new Image();
        img.src = place.image;
        img.onload = () => {
            imgDiv.classList.remove('loading-skeleton');
            imgDiv.style.backgroundImage = `url('${place.image}')`;
        };
        img.onerror = () => {
            imgDiv.classList.remove('loading-skeleton');
            imgDiv.style.backgroundImage = 'none';
        };
    } else {
        imgDiv.classList.remove('loading-skeleton');
        imgDiv.style.backgroundImage = 'none';
    }

    document.querySelectorAll('.vote-btn').forEach(btn => btn.classList.remove('active'));
    if (place.myVibe === '🔥') document.querySelector('.vote-fire')?.classList.add('active');
    if (place.myVibe === '💀') document.querySelector('.vote-dead')?.classList.add('active');
    if (place.myVibe === '😭') document.querySelector('.vote-cry')?.classList.add('active');

    document.getElementById('info-panel').classList.add('active');
    lucide.createIcons();
}

// ===== ПАРСЕР ТЕЛЕГРАМ =====

window.parseTelegramPost = function(text) {
    const foundPlace = places.find(p => text.toLowerCase().includes(p.name.toLowerCase()));
    if (foundPlace) {
        const newEvent = {
            ...foundPlace,
            name: `ФЕСТИВАЛЬ: ${foundPlace.name}`,
            description: text,
            isEvent: true,
            lastUpdate: Date.now()
        };
        events.push(newEvent);
        renderMarkers();
        showToast("✨ Новое событие добавлено!");
    }
};

// ===== ГОЛОСОВАНИЕ =====

window.handleVote = function(vibe) {
    if (!currentPlace) return;
    vote(currentPlace, vibe);
    showPlaceInfo(currentPlace);
    const labels = { '🔥': 'Кайф!', '💀': 'Глухо...', '😭': 'Скучно :(' };
    showToast(`Твой голос: ${labels[vibe]}`);
};

function vote(place, vibe) {
    if (place.myVibe === vibe) {
        if (vibe === '🔥') place.fire = Math.max(0, place.fire - 1);
        else if (vibe === '💀') place.dead = Math.max(0, place.dead - 1);
        else if (vibe === '😭') place.crying = Math.max(0, place.crying - 1);
        place.myVibe = null;
    } else {
        if (place.myVibe === '🔥') place.fire = Math.max(0, place.fire - 1);
        if (place.myVibe === '💀') place.dead = Math.max(0, place.dead - 1);
        if (place.myVibe === '😭') place.crying = Math.max(0, place.crying - 1);
        if (vibe === '🔥') place.fire++;
        if (vibe === '💀') place.dead++;
        if (vibe === '😭') place.crying++;
        place.myVibe = vibe;
    }
    place.lastUpdate = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
    renderMarkers();
    updateStats();
}

// ===== СПИСОК HOT PLACES =====

function updateStats() {
    const list = document.getElementById('places-list');
    if (!list) return;
    list.innerHTML = '';
    const filtered = activeFilter === 'all' ? places : places.filter(p => p.category === activeFilter);
    const sorted = [...filtered].sort((a, b) => b.fire - a.fire);

    sorted.forEach((place, i) => {
        const item = document.createElement('div');
        item.className = 'place-item';
        item.innerHTML = `
            <span class="place-rank">#${i + 1}</span>
            <div class="place-info">
                <strong>${place.name}</strong>
                <small>${place.category}</small>
            </div>
            <div class="place-fire">
                <i data-lucide="flame"></i> ${place.fire}
            </div>
        `;
        item.onclick = () => {
            map.flyTo(place.coords, 16, { duration: 1.2 });
            showPlaceInfo(place);
        };
        list.appendChild(item);
    });
    lucide.createIcons();
}

// ===== ФИЛЬТРАЦИЯ =====

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.category;
        renderMarkers();
        updateStats();
    };
});

// ===== ТЕМА =====

const themeBtn = document.getElementById('theme-toggle');
themeBtn.onclick = () => {
    isDark = !isDark;
    document.body.classList.toggle('light-mode', !isDark);

    if (isDark) {
        map.removeLayer(tileLayers.light);
        tileLayers.dark.addTo(map);
    } else {
        map.removeLayer(tileLayers.dark);
        tileLayers.light.addTo(map);
    }
    lucide.createIcons();
    showToast(isDark ? '🌙 Тёмная тема' : '☀️ Светлая тема');
};

// ===== ГЕОЛОКАЦИЯ =====

document.getElementById('locate-btn').onclick = () => {
    if (!navigator.geolocation) return showToast('Геолокация недоступна');
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            map.flyTo([latitude, longitude], 16, { duration: 1.5 });
            L.circleMarker([latitude, longitude], { radius: 8, fillColor: '#3b82f6', fillOpacity: 1, color: 'white', weight: 3 }).addTo(map).bindPopup('Вы здесь');
            showToast('📍 Вы здесь!');
        },
        () => showToast('Не удалось определить местоположение')
    );
};

// ===== ЗУМ =====

document.getElementById('zoom-in').onclick = () => map.zoomIn();
document.getElementById('zoom-out').onclick = () => map.zoomOut();

// ===== ЗАКРЫТИЕ ПАНЕЛИ =====

document.getElementById('close-panel').onclick = () => {
    document.getElementById('info-panel').classList.remove('active');
};

map.on('click', () => {
    document.getElementById('info-panel').classList.remove('active');
});

// ===== ПОИСК =====

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) return;
    const result = places.find(p => p.name.toLowerCase().includes(query));
    if (result) {
        map.flyTo(result.coords, 16, { duration: 1 });
        showPlaceInfo(result);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase().trim();
        const result = places.find(p => p.name.toLowerCase().includes(query));
        if (result) {
            map.flyTo(result.coords, 16, { duration: 1 });
            showPlaceInfo(result);
            searchInput.blur();
        } else {
            showToast('Место не найдено');
        }
    }
});

// ===== ГОТОВНОСТЬ К API (заглушка для будущей интеграции) =====

// Когда девочка допишет API, замени эту функцию на fetch
async function fetchPlaces() {
    // TODO: Интеграция с бэкендом
    // const response = await fetch('/api/places');
    // return await response.json();
    return places; // Пока возвращаем локальные данные
}

async function sendVibe(placeId, vibeType) {
    // TODO: Отправка на сервер
    // await fetch('/api/vibe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ place_id: placeId, vibe_type: vibeType })
    // });
    console.log(`[API Mock] Отправлен вайб: ${vibeType} для места #${placeId}`);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

renderMarkers();
updateStats();
lucide.createIcons();