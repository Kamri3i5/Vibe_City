/* ============================================================
   VibeCity — Frontend Application
   ============================================================ */

(() => {
    'use strict';

    // ============================================================
    // Constants & Config
    // ============================================================

    const STORAGE_KEY = 'vibecity_places';
    const EVENTS_KEY = 'vibecity_events';
    const FEED_KEY = 'vibecity_feed';
    const THEME_KEY = 'vibecity_theme';

    const TASHKENT_CENTER = [41.3111, 69.2797];
    const DEFAULT_ZOOM = 13;

    const CATEGORY_META = {
        'Развлечения': { icon: 'ferris-wheel', emoji: '🎡', color: '#a855f7' },
        'Еда':         { icon: 'utensils',    emoji: '🍜', color: '#f97316' },
        'Парк':        { icon: 'trees',       emoji: '🌳', color: '#10b981' },
        'Культура':    { icon: 'landmark',    emoji: '🏛️', color: '#38bdf8' },
        'Шопинг':      { icon: 'shopping-bag',emoji: '🛍️', color: '#ec4899' }
    };

    const VIBE_META = {
        '🔥': { label: 'Кайф',   key: 'fire',   field: 'fire',   color: 'var(--fire)' },
        '💀': { label: 'Глухо',  key: 'dead',   field: 'dead',   color: 'var(--dead)' },
        '😭': { label: 'Скучно', key: 'crying', field: 'crying', color: 'var(--cool)' }
    };

    // SVG icons (inline so markers don't depend on lucide)
    const ICONS = {
        flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
        skull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
        meh:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
        star:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    };

    // ============================================================
    // Default seed data
    // ============================================================

    const DEFAULT_PLACES = [
        { name: "Бродвей (Сайилгох)", coords: [41.3117, 69.2797], category: "Развлечения",
          description: "Главная пешеходная улица Ташкента. Артисты, стритфуд, живая музыка — тут всегда движ.",
          fire: 24, dead: 1, crying: 0 },
        { name: "Magic City", coords: [41.3015, 69.2455], category: "Развлечения",
          description: "Тематический парк с замком, фонтанами и ночной подсветкой. Сказка для всех возрастов.",
          fire: 15, dead: 2, crying: 0 },
        { name: "Ташкент Сити", coords: [41.3031, 69.2662], category: "Парк",
          description: "Современный деловой комплекс с небоскрёбами, фонтанами и вечерней подсветкой.",
          fire: 8, dead: 0, crying: 0 },
        { name: "Minor Mosque", coords: [41.3330, 69.2815], category: "Культура",
          description: "Белоснежная мечеть на берегу канала Анхор. Архитектурный шедевр нового Ташкента.",
          fire: 4, dead: 0, crying: 1 },
        { name: "Chorsu Bazaar", coords: [41.3264, 69.2292], category: "Шопинг",
          description: "Легендарный базар под голубыми куполами. Специи, сухофрукты, свежий хлеб — аутентичный Ташкент.",
          fire: 10, dead: 1, crying: 0 },
        { name: "Amir Temur Square", coords: [41.3111, 69.2789], category: "Культура",
          description: "Центральная площадь столицы с конной статуей Амира Тимура и фонтанами.",
          fire: 5, dead: 2, crying: 0 },
        { name: "Телебашня Ташкента", coords: [41.3425, 69.2858], category: "Культура",
          description: "375-метровая телевизионная башня — самое высокое сооружение в Центральной Азии.",
          fire: 7, dead: 1, crying: 0 },
        { name: "Театр Навои", coords: [41.3131, 69.2768], category: "Культура",
          description: "Государственный академический Большой театр имени Алишера Навои. Опера и балет мирового уровня.",
          fire: 3, dead: 0, crying: 0 },
        { name: "Хазрати Имам", coords: [41.3382, 69.2327], category: "Культура",
          description: "Священный исламский комплекс с мечетями и медресе. Хранится старейший Коран в мире.",
          fire: 6, dead: 0, crying: 0 },
        { name: "Парк Навруз", coords: [41.3245, 69.3124], category: "Парк",
          description: "Огромный этно-парк с озером, каруселями и колесом обозрения.",
          fire: 11, dead: 0, crying: 0 },
        { name: "Oqtepa Lavash (Чиланзар)", coords: [41.2858, 69.2131], category: "Еда",
          description: "Культовый ташкентский фастфуд. Самса, лаваш и шаурма — очередь показатель качества.",
          fire: 9, dead: 3, crying: 0 },
        { name: "Central Asian Plov Center", coords: [41.3225, 69.2878], category: "Еда",
          description: "Легендарное место, где готовят 1000 кг плова в день. Must visit для каждого гостя Ташкента.",
          fire: 20, dead: 0, crying: 0 },
        { name: "ТЦ Samarqand Darvoza", coords: [41.3272, 69.2339], category: "Шопинг",
          description: "Современный торговый центр рядом с Чорсу. Бренды, кинотеатр, фудкорт.",
          fire: 3, dead: 5, crying: 1 },
        { name: "Mega Planet", coords: [41.2978, 69.2176], category: "Шопинг",
          description: "Один из крупнейших ТРЦ Ташкента. IMAX кинотеатр, боулинг, рестораны.",
          fire: 4, dead: 2, crying: 0 },
        { name: "Японский сад", coords: [41.3420, 69.2040], category: "Парк",
          description: "Тихий уголок Японии в Ташкенте. Мостики, карпы кои, сакура и медитативная атмосфера.",
          fire: 5, dead: 0, crying: 0 },
        { name: "Humo Arena", coords: [41.3150, 69.2950], category: "Развлечения",
          description: "Современная ледовая арена на 12000 мест. Хоккей, концерты и шоу мирового уровня.",
          fire: 13, dead: 1, crying: 0 },
        { name: "Набережная Анхор", coords: [41.3280, 69.2750], category: "Парк",
          description: "Набережная канала Анхор — популярное место для вечерних прогулок и джоггинга.",
          fire: 7, dead: 0, crying: 0 },
        { name: "Музей Искусств", coords: [41.3065, 69.2755], category: "Культура",
          description: "Государственный музей искусств Узбекистана. Коллекция от древности до современности.",
          fire: 2, dead: 0, crying: 0 },
        { name: "Лаби Хауз Ресторан", coords: [41.3090, 69.2650], category: "Еда",
          description: "Уютный ресторан узбекской кухни с летней террасой. Шашлык, манты и лагман.",
          fire: 8, dead: 1, crying: 0 }
    ].map((p, i) => ({
        ...p,
        myVibe: null,
        lastUpdate: Date.now() - (i * 7 + 5) * 60 * 1000
    }));

    // ============================================================
    // Storage layer
    // ============================================================

    const Storage = {
        loadPlaces() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return [...DEFAULT_PLACES];
                const parsed = JSON.parse(raw);
                return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_PLACES];
            } catch {
                return [...DEFAULT_PLACES];
            }
        },
        savePlaces(places) {
            const clean = places.map(({ marker, ...rest }) => rest);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
        },
        loadEvents() {
            try {
                const raw = localStorage.getItem(EVENTS_KEY);
                return raw ? JSON.parse(raw) : [];
            } catch { return []; }
        },
        saveEvents(events) {
            const clean = events.map(({ marker, ...rest }) => rest);
            localStorage.setItem(EVENTS_KEY, JSON.stringify(clean));
        },
        loadFeed() {
            try {
                const raw = localStorage.getItem(FEED_KEY);
                const arr = raw ? JSON.parse(raw) : [];
                // Drop entries older than 24h
                const cutoff = Date.now() - 24 * 60 * 60 * 1000;
                return arr.filter(e => e.ts > cutoff);
            } catch { return []; }
        },
        saveFeed(feed) {
            localStorage.setItem(FEED_KEY, JSON.stringify(feed.slice(0, 50)));
        },
        loadTheme() {
            return localStorage.getItem(THEME_KEY) || 'dark';
        },
        saveTheme(theme) {
            localStorage.setItem(THEME_KEY, theme);
        }
    };

    // ============================================================
    // App state
    // ============================================================

    const state = {
        places: Storage.loadPlaces(),
        events: Storage.loadEvents(),
        feed: Storage.loadFeed(),
        theme: Storage.loadTheme(),
        activeFilter: 'all',
        currentPlace: null,
        markers: new Map() // place name -> marker
    };

    // ============================================================
    // Utilities
    // ============================================================

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    function placeKey(p) {
        return p.isEvent ? `event:${p.name}:${p.coords.join(',')}` : `place:${p.name}`;
    }

    function getStatus(place) {
        if (place.isEvent) return 'event';
        const total = place.fire + place.dead + place.crying;
        if (total === 0) return 'mid';
        const ratio = place.fire / total;
        if (ratio >= 0.6 && place.fire >= 5) return 'fire';
        if (place.dead > place.fire) return 'dead';
        return 'mid';
    }

    function getStatusLabel(status) {
        return ({ fire: '🔥 Fire', mid: '😐 Mid', dead: '💀 Dead', event: '✨ Event' })[status] || status;
    }

    function getCrowdedness(place) {
        const total = place.fire + place.dead + place.crying;
        const percent = Math.min(100, Math.round(total * 7));
        let estimate;
        if (total <= 2) estimate = '~50';
        else if (total <= 6) estimate = '~150';
        else if (total <= 12) estimate = '~400';
        else if (total <= 20) estimate = '~700';
        else estimate = '1000+';
        return { percent, estimate };
    }

    function getFreshness(lastUpdate) {
        const diff = Date.now() - (lastUpdate || 0);
        const min = Math.floor(diff / 60000);
        if (min < 1) return { text: 'Только что', cls: '' };
        if (min < 60) return { text: `${min} мин назад`, cls: '' };
        const hr = Math.floor(min / 60);
        if (hr < 3) return { text: `${hr} ч назад · актуально`, cls: 'is-stale' };
        return { text: `${hr} ч назад · устарело`, cls: 'is-old' };
    }

    function relativeTime(ts) {
        const diff = Date.now() - ts;
        const sec = Math.floor(diff / 1000);
        if (sec < 60) return 'только что';
        const min = Math.floor(sec / 60);
        if (min < 60) return `${min} мин назад`;
        const hr = Math.floor(min / 60);
        if (hr < 24) return `${hr} ч назад`;
        return `${Math.floor(hr / 24)} д назад`;
    }

    function fmtNumber(n) {
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return String(n);
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function debounce(fn, wait = 200) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), wait);
        };
    }

    function refreshIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    // ============================================================
    // Image system (with fallback chain)
    // ============================================================

    const Images = {
        // Stable placeholder via picsum.photos seeded by name
        primaryFor(place) {
            if (place.image && /^https?:\/\//.test(place.image)) return place.image;
            const seed = encodeURIComponent(place.name.replace(/\s+/g, '-').toLowerCase());
            return `https://picsum.photos/seed/${seed}/800/450`;
        },
        // Render hero with loading + fallback
        renderHero(place, container) {
            const cat = CATEGORY_META[place.category] || { emoji: '📍', color: 'var(--accent)' };
            const fallback = `
                <div class="place__hero-fallback" style="background: linear-gradient(135deg, ${cat.color}, ${cat.color}88);">
                    <span>${cat.emoji}</span>
                </div>`;

            container.innerHTML = `
                <div class="place__hero-img skeleton is-loading" id="hero-img"></div>
                ${fallback}
                <div class="place__hero-overlay"></div>
                <div class="place__hero-status" id="hero-status"></div>`;

            const url = this.primaryFor(place);
            const img = new Image();
            img.onload = () => {
                const el = container.querySelector('#hero-img');
                if (!el) return;
                el.style.backgroundImage = `url('${url}')`;
                el.classList.remove('skeleton', 'is-loading');
            };
            img.onerror = () => {
                const el = container.querySelector('#hero-img');
                if (el) el.remove();
            };
            img.src = url;
        },
        // Small thumb (for hot list)
        thumbFor(place) {
            const cat = CATEGORY_META[place.category] || { emoji: '📍', color: 'var(--accent)' };
            const url = this.primaryFor(place);
            return {
                url,
                fallback: `linear-gradient(135deg, ${cat.color}, ${cat.color}88)`,
                emoji: cat.emoji
            };
        }
    };

    // ============================================================
    // Map module
    // ============================================================

    const tileLayers = {
        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20, attribution: '&copy; CartoDB &copy; OpenStreetMap'
        }),
        light: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 20, attribution: '&copy; CartoDB &copy; OpenStreetMap'
        })
    };

    const map = L.map('map', {
        zoomControl: true,
        zoomSnap: 0.5,
        attributionControl: true
    }).setView(TASHKENT_CENTER, DEFAULT_ZOOM);

    map.zoomControl.setPosition('bottomright');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('light-mode', !isDark);
        if (isDark) {
            map.removeLayer(tileLayers.light);
            tileLayers.dark.addTo(map);
        } else {
            map.removeLayer(tileLayers.dark);
            tileLayers.light.addTo(map);
        }
        const themeIcon = $('#theme-toggle i');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            refreshIcons();
        }
    }

    // Init theme
    if (state.theme === 'dark') tileLayers.dark.addTo(map);
    else { document.body.classList.add('light-mode'); tileLayers.light.addTo(map); }

    // ============================================================
    // Markers
    // ============================================================

    function createMarkerIcon(status, isHot, justVoted) {
        const svg = status === 'event' ? ICONS.star
                  : status === 'dead'  ? ICONS.skull
                  : status === 'mid'   ? ICONS.meh
                  : ICONS.flame;
        const classes = [
            'marker__inner',
            `marker--${status}`,
            isHot ? 'marker--hot' : '',
            justVoted ? 'marker--just-voted' : ''
        ].filter(Boolean).join(' ');

        return L.divIcon({
            html: `<div class="${classes}"><div class="marker__bg"></div>${svg}<div class="marker__ripple"></div></div>`,
            className: 'marker',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });
    }

    function renderMarkers() {
        // Clear existing
        state.markers.forEach(m => map.removeLayer(m));
        state.markers.clear();

        const all = [...state.places, ...state.events];
        const filtered = state.activeFilter === 'all'
            ? all
            : all.filter(p => p.category === state.activeFilter);

        filtered.forEach(place => {
            const status = getStatus(place);
            const isHot = status === 'fire' && place.fire >= 10;
            const marker = L.marker(place.coords, { icon: createMarkerIcon(status, isHot, false) }).addTo(map);
            marker.on('click', e => {
                L.DomEvent.stopPropagation(e);
                showPlace(place);
            });
            state.markers.set(placeKey(place), marker);
        });
    }

    function flashMarker(place) {
        const marker = state.markers.get(placeKey(place));
        if (!marker) return;
        const status = getStatus(place);
        const isHot = status === 'fire' && place.fire >= 10;
        marker.setIcon(createMarkerIcon(status, isHot, true));
        setTimeout(() => {
            marker.setIcon(createMarkerIcon(status, isHot, false));
        }, 800);
    }

    // ============================================================
    // Right panel: views
    // ============================================================

    function showDefaultView() {
        $('#view-default').hidden = false;
        $('#view-detail').hidden = true;
        state.currentPlace = null;
    }

    function showPlace(place) {
        state.currentPlace = place;
        const status = getStatus(place);
        const crowd = getCrowdedness(place);
        const fresh = getFreshness(place.lastUpdate);
        const cat = CATEGORY_META[place.category] || { icon: 'map-pin' };

        const html = `
            <div class="place__hero" id="place-hero"></div>

            <div class="place__title-row">
                <div class="place__title">
                    <h2 class="place__name">${escapeHtml(place.name)}</h2>
                    <span class="place__cat">
                        <i data-lucide="${cat.icon}"></i>
                        ${escapeHtml(place.category || 'Место')}
                    </span>
                </div>
            </div>

            ${place.description ? `<p class="place__desc">${escapeHtml(place.description)}</p>` : ''}

            <div class="freshness ${fresh.cls}">
                <i data-lucide="clock"></i>
                <span>${fresh.text}</span>
            </div>

            <div>
                <div class="section-title">Как тут сейчас?</div>
                <div class="counters">
                    <div class="counter counter--fire">
                        <i data-lucide="flame"></i>
                        <div class="counter__value">${place.fire || 0}</div>
                        <div class="counter__label">Огонь</div>
                    </div>
                    <div class="counter counter--dead">
                        <i data-lucide="skull"></i>
                        <div class="counter__value">${place.dead || 0}</div>
                        <div class="counter__label">Глухо</div>
                    </div>
                    <div class="counter counter--cry">
                        <i data-lucide="frown"></i>
                        <div class="counter__value">${place.crying || 0}</div>
                        <div class="counter__label">Скучно</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="section-title">Загруженность</div>
                <div class="crowd-row">
                    <i data-lucide="users"></i>
                    <span>Сейчас здесь</span>
                    <span class="crowd-row__num">${crowd.estimate} чел.</span>
                </div>
                <div class="crowd-bar">
                    <div class="crowd-bar__fill" style="width: ${crowd.percent}%"></div>
                </div>
            </div>

            <div>
                <div class="section-title">Твой голос</div>
                <div class="votes">
                    <button class="vote vote--fire ${place.myVibe === '🔥' ? 'is-active' : ''}" data-vibe="🔥">
                        <i data-lucide="flame"></i>
                        <span>Кайф</span>
                    </button>
                    <button class="vote vote--dead ${place.myVibe === '💀' ? 'is-active' : ''}" data-vibe="💀">
                        <i data-lucide="skull"></i>
                        <span>Глухо</span>
                    </button>
                    <button class="vote vote--cry ${place.myVibe === '😭' ? 'is-active' : ''}" data-vibe="😭">
                        <i data-lucide="frown"></i>
                        <span>Скучно</span>
                    </button>
                </div>
            </div>
        `;

        $('#place-content').innerHTML = html;
        $('#view-default').hidden = true;
        $('#view-detail').hidden = false;

        // Render hero
        Images.renderHero(place, $('#place-hero'));
        // Status badge inside hero
        const heroStatus = $('#hero-status');
        if (heroStatus) {
            heroStatus.innerHTML = `<span class="status status--${status}">${getStatusLabel(status)}</span>`;
        }

        // Wire vote buttons
        $$('.vote', $('#place-content')).forEach(btn => {
            btn.addEventListener('click', () => handleVote(btn.dataset.vibe));
        });

        refreshIcons();

        // Mobile: open right panel in peek state (30%)
        if (window.innerWidth <= 768) {
            $('#panel-right').classList.add('is-mobile-open', 'is-peek');
            $('#panel-right').classList.remove('is-expanded');
            $('#panel-left').classList.remove('is-mobile-open', 'is-peek', 'is-expanded');
            updateMobileTabs('right');
        }
    }

    // ============================================================
    // Voting
    // ============================================================

    function handleVote(vibe) {
        if (!state.currentPlace) return;
        const place = state.currentPlace;
        const meta = VIBE_META[vibe];
        if (!meta) return;

        if (place.myVibe === vibe) {
            // Toggle off
            place[meta.field] = Math.max(0, (place[meta.field] || 0) - 1);
            place.myVibe = null;
        } else {
            // Remove previous if any
            if (place.myVibe && VIBE_META[place.myVibe]) {
                const prev = VIBE_META[place.myVibe];
                place[prev.field] = Math.max(0, (place[prev.field] || 0) - 1);
            }
            place[meta.field] = (place[meta.field] || 0) + 1;
            place.myVibe = vibe;

            // Add to feed
            addFeedItem({
                vibe, place: place.name, category: place.category, ts: Date.now()
            });
        }

        place.lastUpdate = Date.now();
        Storage.savePlaces(state.places);

        // Re-render everything affected
        renderMarkers();
        flashMarker(place);
        showPlace(place);
        renderHotList();
        renderTopList();
        renderPulse();

        Toast.show(place.myVibe ? `Голос засчитан · ${meta.label}` : 'Голос отменён', vibe);
    }

    // ============================================================
    // Activity feed
    // ============================================================

    const ANON_NAMES = [
        'Кто-то', 'Аноним', 'Странник', 'Гость', 'Местный',
        'Турист', 'Студент', 'Прохожий', 'Друг', 'Сосед'
    ];

    function addFeedItem(item) {
        state.feed.unshift({ ...item, anon: ANON_NAMES[Math.floor(Math.random() * ANON_NAMES.length)] });
        state.feed = state.feed.slice(0, 30);
        Storage.saveFeed(state.feed);
        renderFeed();
    }

    function seedFeedIfEmpty() {
        if (state.feed.length > 0) return;
        const samples = [];
        const vibes = ['🔥', '🔥', '🔥', '💀', '😭'];
        for (let i = 0; i < 8; i++) {
            const place = state.places[Math.floor(Math.random() * state.places.length)];
            samples.push({
                vibe: vibes[Math.floor(Math.random() * vibes.length)],
                place: place.name,
                category: place.category,
                ts: Date.now() - (i * 5 + Math.random() * 4) * 60 * 1000,
                anon: ANON_NAMES[Math.floor(Math.random() * ANON_NAMES.length)]
            });
        }
        state.feed = samples;
        Storage.saveFeed(state.feed);
    }

    function renderFeed() {
        const list = $('#feed');
        if (!list) return;
        if (state.feed.length === 0) {
            list.innerHTML = `<div class="empty"><i data-lucide="zap-off"></i><p>Пока тихо</p></div>`;
            refreshIcons();
            return;
        }
        list.innerHTML = state.feed.slice(0, 12).map(item => {
            const meta = VIBE_META[item.vibe] || VIBE_META['🔥'];
            return `
                <li class="feed-item" data-place="${escapeHtml(item.place)}">
                    <div class="feed-item__icon feed-item__icon--${meta.key}">${item.vibe}</div>
                    <div class="feed-item__text">
                        <strong>${escapeHtml(item.anon || 'Кто-то')}</strong> в <strong>${escapeHtml(item.place)}</strong>
                        <div class="feed-item__time">${relativeTime(item.ts)}</div>
                    </div>
                </li>`;
        }).join('');

        $$('.feed-item', list).forEach(el => {
            el.addEventListener('click', () => {
                const name = el.dataset.place;
                const place = state.places.find(p => p.name === name);
                if (place) {
                    map.flyTo(place.coords, 16, { duration: 0.9 });
                    showPlace(place);
                }
            });
        });
    }

    // ============================================================
    // City pulse
    // ============================================================

    function renderPulse() {
        const totalVotes = state.places.reduce((s, p) => s + (p.fire || 0) + (p.dead || 0) + (p.crying || 0), 0);
        const totalFire = state.places.reduce((s, p) => s + (p.fire || 0), 0);
        const vibePercent = totalVotes > 0 ? Math.round((totalFire / totalVotes) * 100) : 0;
        const onlineEstimate = Math.max(20, Math.round(totalVotes * 7.5 + Math.random() * 50));

        const onlineEl = $('#pulse-online');
        const votesEl = $('#pulse-votes');
        const vibeEl = $('#pulse-vibe');
        const barEl = $('#vibe-bar');

        if (onlineEl) onlineEl.textContent = fmtNumber(onlineEstimate);
        if (votesEl) votesEl.textContent = fmtNumber(totalVotes);
        if (vibeEl) vibeEl.textContent = vibePercent + '%';
        if (barEl) barEl.style.width = vibePercent + '%';

        const hotCount = $('#hot-count');
        if (hotCount) {
            const hot = state.places.filter(p => getStatus(p) === 'fire').length;
            hotCount.innerHTML = `<i data-lucide="flame" style="width:10px;height:10px;"></i> ${hot}`;
        }
    }

    // ============================================================
    // Top list (left panel) — top 5 by fire
    // ============================================================

    function renderTopList() {
        const list = $('#top-list');
        if (!list) return;
        const filtered = state.activeFilter === 'all'
            ? state.places
            : state.places.filter(p => p.category === state.activeFilter);
        const sorted = [...filtered].sort((a, b) => (b.fire || 0) - (a.fire || 0)).slice(0, 5);

        if (sorted.length === 0) {
            list.innerHTML = `<div class="empty"><i data-lucide="search-x"></i><p>Нет мест</p></div>`;
            refreshIcons();
            return;
        }

        list.innerHTML = sorted.map((p, i) => `
            <li class="top-item" data-place="${escapeHtml(p.name)}">
                <span class="top-item__rank">${i + 1}</span>
                <div class="top-item__info">
                    <div class="top-item__name">${escapeHtml(p.name)}</div>
                    <div class="top-item__meta">${escapeHtml(p.category || '')}</div>
                </div>
                <span class="top-item__fire">
                    <i data-lucide="flame"></i> ${p.fire || 0}
                </span>
            </li>
        `).join('');

        $$('.top-item', list).forEach(el => {
            el.addEventListener('click', () => {
                const place = state.places.find(p => p.name === el.dataset.place);
                if (place) {
                    map.flyTo(place.coords, 16, { duration: 0.9 });
                    showPlace(place);
                }
            });
        });
        refreshIcons();
    }

    // ============================================================
    // Hot list (right panel) — full list with thumb
    // ============================================================

    function renderHotList() {
        const list = $('#hot-list');
        if (!list) return;
        const filtered = state.activeFilter === 'all'
            ? state.places
            : state.places.filter(p => p.category === state.activeFilter);
        const sorted = [...filtered].sort((a, b) => (b.fire || 0) - (a.fire || 0)).slice(0, 8);

        if (sorted.length === 0) {
            list.innerHTML = `<div class="empty"><i data-lucide="search-x"></i><p>В этой категории пока пусто</p></div>`;
            refreshIcons();
            return;
        }

        list.innerHTML = sorted.map(p => {
            const cat = CATEGORY_META[p.category] || { icon: 'map-pin', color: 'var(--accent)', emoji: '📍' };
            const thumb = Images.thumbFor(p);
            return `
                <div class="hot-item" data-place="${escapeHtml(p.name)}">
                    <div class="hot-item__thumb"
                         style="background-image: url('${thumb.url}'), ${thumb.fallback};"></div>
                    <div class="hot-item__info">
                        <div class="hot-item__name">${escapeHtml(p.name)}</div>
                        <div class="hot-item__meta">
                            <span class="hot-item__cat">
                                <i data-lucide="${cat.icon}" style="color:${cat.color};"></i>
                                ${escapeHtml(p.category)}
                            </span>
                        </div>
                    </div>
                    <div class="hot-item__fire">
                        <i data-lucide="flame"></i> ${p.fire || 0}
                    </div>
                </div>`;
        }).join('');

        $$('.hot-item', list).forEach(el => {
            el.addEventListener('click', () => {
                const place = state.places.find(p => p.name === el.dataset.place);
                if (place) {
                    map.flyTo(place.coords, 16, { duration: 0.9 });
                    showPlace(place);
                }
            });
        });
        refreshIcons();
    }

    // ============================================================
    // Events list
    // ============================================================

    function renderEvents() {
        const list = $('#events-list');
        if (!list) return;
        if (state.events.length === 0) {
            list.innerHTML = `<div class="empty"><i data-lucide="calendar-x"></i><p>Скоро появится</p></div>`;
            refreshIcons();
            return;
        }
        list.innerHTML = state.events.map(e => `
            <div class="event-item" data-event="${escapeHtml(e.name)}">
                <div class="event-item__badge"><i data-lucide="sparkles"></i></div>
                <div>
                    <div class="event-item__name">${escapeHtml(e.name)}</div>
                    <div class="event-item__time">${relativeTime(e.lastUpdate || Date.now())}</div>
                </div>
            </div>`).join('');
        refreshIcons();

        $$('.event-item', list).forEach(el => {
            el.addEventListener('click', () => {
                const event = state.events.find(e => e.name === el.dataset.event);
                if (event) {
                    map.flyTo(event.coords, 16, { duration: 0.9 });
                    showPlace(event);
                }
            });
        });
    }

    // ============================================================
    // Search with autocomplete
    // ============================================================

    const Search = (() => {
        const input = $('#search');
        const results = $('#search-results');
        let active = -1;

        function render(matches) {
            if (matches.length === 0) {
                results.innerHTML = `<div class="search__empty">Ничего не нашлось</div>`;
                results.classList.add('is-open');
                return;
            }
            results.innerHTML = matches.map((p, i) => {
                const cat = CATEGORY_META[p.category] || { icon: 'map-pin', color: 'var(--accent)' };
                return `
                    <div class="search__result ${i === active ? 'is-active' : ''}" data-name="${escapeHtml(p.name)}" role="option">
                        <div class="search__result-icon" style="background:${cat.color}">
                            <i data-lucide="${cat.icon}" style="width:14px;height:14px"></i>
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div class="search__result-name">${escapeHtml(p.name)}</div>
                            <div class="search__result-cat">${escapeHtml(p.category)}</div>
                        </div>
                        <div class="search__result-fire">
                            <i data-lucide="flame" style="width:12px;height:12px"></i> ${p.fire || 0}
                        </div>
                    </div>`;
            }).join('');
            results.classList.add('is-open');
            refreshIcons();

            $$('.search__result', results).forEach(el => {
                el.addEventListener('click', () => {
                    pick(matches.find(p => p.name === el.dataset.name));
                });
            });
        }

        function pick(place) {
            if (!place) return;
            input.value = '';
            close();
            map.flyTo(place.coords, 16, { duration: 1 });
            showPlace(place);
        }

        function close() {
            results.classList.remove('is-open');
            active = -1;
        }

        function search(q) {
            const query = q.trim().toLowerCase();
            if (!query) { close(); return; }
            const matches = state.places
                .filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    (p.category && p.category.toLowerCase().includes(query)) ||
                    (p.description && p.description.toLowerCase().includes(query))
                )
                .slice(0, 8);
            active = -1;
            render(matches);
        }

        input.addEventListener('input', debounce(e => search(e.target.value), 120));
        input.addEventListener('focus', () => {
            if (input.value.trim()) search(input.value);
        });
        input.addEventListener('keydown', e => {
            const items = $$('.search__result', results);
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                active = Math.min(items.length - 1, active + 1);
                items.forEach((el, i) => el.classList.toggle('is-active', i === active));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                active = Math.max(0, active - 1);
                items.forEach((el, i) => el.classList.toggle('is-active', i === active));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const item = items[active] || items[0];
                if (item) {
                    const place = state.places.find(p => p.name === item.dataset.name);
                    pick(place);
                }
            } else if (e.key === 'Escape') {
                close();
                input.blur();
            }
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('.search')) close();
        });

        return { close };
    })();

    // ============================================================
    // Toast
    // ============================================================

    const Toast = (() => {
        const el = $('#toast');
        let hideT;
        return {
            show(msg, emoji = '✓') {
                el.innerHTML = `<span class="toast__icon">${emoji}</span><span>${escapeHtml(msg)}</span>`;
                el.classList.add('is-show');
                clearTimeout(hideT);
                hideT = setTimeout(() => el.classList.remove('is-show'), 2400);
            }
        };
    })();

    // ============================================================
    // Filters
    // ============================================================

    $$('.chip').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.chip').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            state.activeFilter = btn.dataset.cat;
            renderMarkers();
            renderHotList();
            renderTopList();
        });
    });

    // ============================================================
    // Theme toggle
    // ============================================================

    $('#theme-toggle').addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        Storage.saveTheme(state.theme);
        applyTheme(state.theme);
        Toast.show(state.theme === 'dark' ? 'Тёмная тема' : 'Светлая тема', state.theme === 'dark' ? '🌙' : '☀️');
    });

    // ============================================================
    // Profile
    // ============================================================

    $('#profile-btn').addEventListener('click', () => {
        Toast.show('Профиль скоро появится', '👤');
    });

    // ============================================================
    // Geolocation
    // ============================================================

    $('#locate-btn').addEventListener('click', () => {
        if (!navigator.geolocation) {
            Toast.show('Геолокация недоступна', '⚠️');
            return;
        }
        Toast.show('Определяю местоположение...', '📍');
        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                map.flyTo([latitude, longitude], 16, { duration: 1.4 });
                L.circleMarker([latitude, longitude], {
                    radius: 8, fillColor: '#3b82f6', fillOpacity: 1, color: 'white', weight: 3
                }).addTo(map).bindPopup('Вы здесь');
                Toast.show('Вы здесь!', '📍');
            },
            () => Toast.show('Не удалось определить местоположение', '⚠️')
        );
    });

    // ============================================================
    // Panel toggles
    // ============================================================

    $('#toggle-left').addEventListener('click', () => {
        const panel = $('#panel-left');
        const toggle = $('#toggle-left');
        panel.classList.toggle('is-collapsed');
        toggle.classList.toggle('is-flipped');
    });

    $('#toggle-right').addEventListener('click', () => {
        const panel = $('#panel-right');
        const toggle = $('#toggle-right');
        panel.classList.toggle('is-collapsed');
        toggle.classList.toggle('is-flipped');
    });

    // ============================================================
    // Back button (return to default view)
    // ============================================================

    $('#back-btn').addEventListener('click', showDefaultView);

    // Click on map closes panels/details
    map.on('click', () => {
        if (window.innerWidth > 768) {
            showDefaultView();
        } else {
            closeAllPanels();
        }
    });

    // ============================================================
    // Mobile tabs & Swipe-to-close
    // ============================================================

    function closeAllPanels() {
        $$('.panel').forEach(p => {
            p.classList.remove('is-mobile-open', 'is-peek', 'is-expanded');
            p.style.transform = '';
        });
        updateMobileTabs('map');
    }

    function updateMobileTabs(tab) {
        $$('.mobile-tab').forEach(b => b.classList.toggle('is-active', b.dataset.tab === tab));
    }

    $$('.mobile-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (tab === 'map') {
                closeAllPanels();
            } else {
                updateMobileTabs(tab);
                const target = tab === 'left' ? $('#panel-left') : $('#panel-right');
                const other = tab === 'left' ? $('#panel-right') : $('#panel-left');
                
                other.classList.remove('is-mobile-open', 'is-peek', 'is-expanded');
                target.classList.add('is-mobile-open', 'is-peek'); // Default to peek
            }
        });
    });

    // Swipe handling (Snapping Bottom Sheet)
    const MobileSwipe = (() => {
        let startY = 0;
        let currentY = 0;
        let activePanel = null;
        let initialTranslate = 0;
        let isDragging = false;

        function init() {
            $$('.panel').forEach(panel => {
                panel.addEventListener('touchstart', e => {
                    if (window.innerWidth > 768) return;
                    
                    // Only start dragging if at the top of content or touching the top area
                    const isAtTop = panel.scrollTop <= 0;
                    const touchY = e.touches[0].clientY;
                    const panelRect = panel.getBoundingClientRect();
                    // Increased drag zone to 80px for better grip
                    const isTouchInHeader = (touchY - panelRect.top) < 80;

                    if (isAtTop || isTouchInHeader) {
                        startY = touchY;
                        activePanel = panel;
                        
                        const style = window.getComputedStyle(panel);
                        const matrix = new WebKitCSSMatrix(style.transform);
                        initialTranslate = matrix.m42;
                        
                        panel.style.transition = 'none';
                        isDragging = isTouchInHeader; // Force dragging if started in header
                    }
                }, { passive: true });

                panel.addEventListener('touchmove', e => {
                    if (!activePanel) return;
                    
                    currentY = e.touches[0].clientY;
                    const delta = currentY - startY;
                    
                    // Only drag if moving downwards from any state, or upwards from peek
                    const isMovingDown = delta > 0;
                    const isMovingUp = delta < 0;

                    if (isMovingDown || (isMovingUp && activePanel.classList.contains('is-peek'))) {
                        const newTranslate = initialTranslate + delta;
                        const isLandscape = window.innerWidth > window.innerHeight && window.innerWidth <= 932;
                        const x = isLandscape ? '-50%' : '0';

                        // Resistance when pulling up beyond expanded
                        if (newTranslate < 0) {
                            activePanel.style.transform = `translate3d(${x}, ${newTranslate * 0.2}px, 0)`;
                        } else {
                            activePanel.style.transform = `translate3d(${x}, ${newTranslate}px, 0)`;
                            // Prevent scrolling while dragging panel
                            if (Math.abs(delta) > 10) isDragging = true;
                        }
                    }
                }, { passive: false });

                panel.addEventListener('touchend', e => {
                    if (!activePanel) return;
                    
                    const delta = currentY - startY;
                    const totalHeight = activePanel.offsetHeight;
                    const currentTranslate = initialTranslate + delta;
                    
                    activePanel.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
                    
                    // Snap points (relative to 0 which is 75vh height)
                    const snapPoints = [
                        { name: 'closed', y: totalHeight },
                        { name: 'peek', y: totalHeight - (window.innerHeight * 0.3) },
                        { name: 'expanded', y: 0 }
                    ];

                    // Find closest snap point
                    const closest = snapPoints.reduce((prev, curr) => {
                        return (Math.abs(curr.y - currentTranslate) < Math.abs(prev.y - currentTranslate)) ? curr : prev;
                    });

                    // Apply state
                    activePanel.classList.remove('is-peek', 'is-expanded', 'is-mobile-open');
                    
                    if (closest.name === 'closed') {
                        closeAllPanels();
                    } else if (closest.name === 'peek') {
                        activePanel.classList.add('is-mobile-open', 'is-peek');
                        updateMobileTabs(activePanel.id === 'panel-left' ? 'left' : 'right');
                    } else {
                        activePanel.classList.add('is-mobile-open', 'is-expanded');
                        updateMobileTabs(activePanel.id === 'panel-left' ? 'left' : 'right');
                    }
                    
                    activePanel.style.transform = '';
                    
                    // Reset
                    activePanel = null;
                    startY = 0; currentY = 0;
                });
            });
        }

        return { init };
    })();

    MobileSwipe.init();

    // ============================================================
    // External: parser hook (kept for compatibility)
    // ============================================================

    window.parseTelegramPost = function(text) {
        const found = state.places.find(p => text.toLowerCase().includes(p.name.toLowerCase()));
        if (!found) return;
        const event = {
            ...found,
            name: `Событие: ${found.name}`,
            description: text,
            isEvent: true,
            lastUpdate: Date.now()
        };
        delete event.marker;
        state.events.push(event);
        Storage.saveEvents(state.events);
        renderMarkers();
        renderEvents();
        Toast.show('Новое событие добавлено!', '✨');
    };

    // ============================================================
    // Live updates: simulate a heartbeat (refresh "online" + feed times)
    // ============================================================

    setInterval(() => {
        renderPulse();
        // Re-render feed times every minute (only if visible)
        const feed = $('#feed');
        if (feed && document.hasFocus()) {
            renderFeed();
        }
    }, 30000);

    // ============================================================
    // Listen for storage changes (admin panel sync)
    // ============================================================

    window.addEventListener('storage', e => {
        if (e.key === STORAGE_KEY) {
            state.places = Storage.loadPlaces();
            renderMarkers();
            renderHotList();
            renderTopList();
            renderPulse();
            Toast.show('Данные обновлены', '🔄');
        } else if (e.key === EVENTS_KEY) {
            state.events = Storage.loadEvents();
            renderMarkers();
            renderEvents();
        }
    });

    // ============================================================
    // Init
    // ============================================================

    function init() {
        seedFeedIfEmpty();
        renderMarkers();
        renderHotList();
        renderTopList();
        renderPulse();
        renderFeed();
        renderEvents();
        showDefaultView();
        refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
