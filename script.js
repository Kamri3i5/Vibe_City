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
    const USER_KEY = 'vibecity_user';
    const LANG_KEY = 'vibecity_lang';

    const TRANSLATIONS = {
        ru: {
            brand_status: "Ташкент · Live",
            search_placeholder: "Найти место...",
            all: "Все",
            cat_fun: "Развлечения",
            cat_food: "Еда",
            cat_park: "Парки",
            cat_culture: "Культура",
            cat_shop: "Шопинг",
            pulse_title: "Пульс города",
            pulse_online: "Онлайн",
            pulse_votes: "Голосов",
            pulse_vibe: "Вайб",
            top_today: "Топ сегодня",
            activity_feed: "Лента активности",
            now_burning: "Сейчас горит",
            events: "События",
            profile_title: "Твой профиль",
            rank_explorer: "исследователь",
            votes_label: "Голосов",
            places_label: "Мест",
            lvl_label: "LVL",
            settings: "Настройки",
            theme_dark: "Тёмная тема",
            notifications: "Уведомления",
            language: "Язык",
            edit_btn: "Редактировать",
            back: "Назад",
            welcome_title: "Добро пожаловать в VibeCity",
            welcome_subtitle: "Узнай, чем дышит Ташкент прямо сейчас",
            reg_name_label: "Как тебя зовут?",
            reg_name_placeholder: "Твоё имя или никнейм",
            reg_avatar_label: "Выбери аватар",
            reg_start: "Начать исследовать",
            vibe_fire: "Кайф",
            vibe_dead: "Глухо",
            vibe_cry: "Скучно",
            how_is_it: "Как тут сейчас?",
            crowdedness: "Загруженность",
            current_occupancy: "Сейчас здесь",
            your_vote: "Твой голос",
            toast_voted: "Голос засчитан",
            toast_unvoted: "Голос отменён",
            toast_name_saved: "Имя сохранено!",
            toast_notif_on: "Уведомления включены",
            toast_notif_off: "Уведомления выключены",
            toast_lang_changed: "Язык изменён",
            toast_loc_error: "Геолокация недоступна",
            toast_loc_finding: "Определяю местоположение...",
            toast_loc_success: "Вы здесь!",
            toast_update: "Данные обновлены",
            share: "Поделиться",
            toast_shared: "Ссылка скопирована!",
            feed_in: "в",
            save_btn: "Сохранить",
            edit_avatar: "Изменить аватар",
            empty_feed: "Пока тихо",
            empty_events: "Скоро появится",
            empty_search: "Ничего не нашлось",
            anon_user: "Кто-то",
            time_now: "только что",
            time_min: "мин назад",
            time_hour: "ч назад",
            time_day: "д назад",
            time_actual: "актуально",
            time_old: "устарело",
            metro_map: "Карта метро"
        },
        en: {
            brand_status: "Tashkent · Live",
            search_placeholder: "Search places...",
            all: "All",
            cat_fun: "Entertainment",
            cat_food: "Food",
            cat_park: "Parks",
            cat_culture: "Culture",
            cat_shop: "Shopping",
            pulse_title: "City Pulse",
            pulse_online: "Online",
            pulse_votes: "Votes",
            pulse_vibe: "Vibe",
            top_today: "Top Today",
            activity_feed: "Activity Feed",
            now_burning: "Now Burning",
            events: "Events",
            profile_title: "Your Profile",
            rank_explorer: "explorer",
            votes_label: "Votes",
            places_label: "Places",
            lvl_label: "LVL",
            settings: "Settings",
            theme_dark: "Dark Theme",
            notifications: "Notifications",
            language: "Language",
            edit_btn: "Edit Profile",
            back: "Back",
            welcome_title: "Welcome to VibeCity",
            welcome_subtitle: "See what Tashkent is breathing right now",
            reg_name_label: "What's your name?",
            reg_name_placeholder: "Your name or nickname",
            reg_avatar_label: "Choose avatar",
            reg_start: "Start Exploring",
            vibe_fire: "Fire",
            vibe_dead: "Dead",
            vibe_cry: "Boring",
            how_is_it: "How's it now?",
            crowdedness: "Crowdedness",
            current_occupancy: "Currently here",
            your_vote: "Your Vote",
            toast_voted: "Vote counted",
            toast_unvoted: "Vote canceled",
            toast_name_saved: "Name saved!",
            toast_notif_on: "Notifications enabled",
            toast_notif_off: "Notifications disabled",
            toast_lang_changed: "Language changed",
            toast_loc_error: "Geolocation unavailable",
            toast_loc_finding: "Locating...",
            toast_loc_success: "You are here!",
            toast_update: "Data updated",
            share: "Share",
            toast_shared: "Link copied!",
            feed_in: "at",
            save_btn: "Save",
            edit_avatar: "Change Avatar",
            empty_feed: "Quiet for now",
            empty_events: "Coming soon",
            empty_search: "No results",
            anon_user: "Someone",
            time_now: "just now",
            time_min: "min ago",
            time_hour: "h ago",
            time_day: "d ago",
            time_actual: "active",
            time_old: "stale",
            metro_map: "Metro Map"
        },
        uz: {
            brand_status: "Toshkent · Live",
            search_placeholder: "Joyni izlash...",
            all: "Hammasi",
            cat_fun: "Ko'ngilochar",
            cat_food: "Taomlar",
            cat_park: "Bog'lar",
            cat_culture: "Madaniyat",
            cat_shop: "Xaridlar",
            pulse_title: "Shahar pulsi",
            pulse_online: "Onlayn",
            pulse_votes: "Ovozlar",
            pulse_vibe: "Vayb",
            top_today: "Bugun topda",
            activity_feed: "Faollik tasmasi",
            now_burning: "Hozir qizg'in",
            events: "Tadbirlar",
            profile_title: "Sizning profilingiz",
            rank_explorer: "tadqiqotchi",
            votes_label: "Ovozlar",
            places_label: "Joylar",
            lvl_label: "LVL",
            settings: "Sozlamalar",
            theme_dark: "Tungi mavzu",
            notifications: "Bildirishnomalar",
            language: "Til",
            edit_btn: "Tahrirlash",
            back: "Orqaga",
            welcome_title: "VibeCity-ga xush kelibsiz",
            welcome_subtitle: "Toshkent hozir nima bilan nafas olayotganini biling",
            reg_name_label: "Ismingiz nima?",
            reg_name_placeholder: "Ismingiz yoki taxallusingiz",
            reg_avatar_label: "Avatar tanlang",
            reg_start: "Tadqiqotni boshlash",
            vibe_fire: "Kayf",
            vibe_dead: "Jimjit",
            vibe_cry: "Zerikarli",
            how_is_it: "Hozir bu yerda qanday?",
            crowdedness: "Bandlik",
            current_occupancy: "Hozir bu yerda",
            your_vote: "Sizning ovozingiz",
            toast_voted: "Ovoz qabul qilindi",
            toast_unvoted: "Ovoz bekor qilindi",
            toast_name_saved: "Ism saqlandi!",
            toast_notif_on: "Bildirishnomalar yoqildi",
            toast_notif_off: "Bildirishnomalar o'chirildi",
            toast_lang_changed: "Til o'zgartirildi",
            toast_loc_error: "Geolokatsiya mavjud emas",
            toast_loc_finding: "Joylashuv aniqlanmoqda...",
            toast_loc_success: "Siz shu yerdasiz!",
            toast_update: "Ma'lumotlar yangilandi",
            share: "Ulashish",
            toast_shared: "Havola nusxalandi!",
            feed_in: "joyida",
            save_btn: "Saqlash",
            edit_avatar: "Avatarni o'zgartirish",
            empty_feed: "Hozircha tinch",
            empty_events: "Tez orada",
            empty_search: "Hech narsa topilmadi",
            anon_user: "Kimdir",
            time_now: "hozirgina",
            time_min: "daq oldin",
            time_hour: "soat oldin",
            time_day: "kun oldin",
            time_actual: "faol",
            time_old: "eskirgan",
            metro_map: "Metro xaritasi"
        }
    };

    const TASHKENT_CENTER = [41.3111, 69.2797];
    const DEFAULT_ZOOM = 13;

    const CATEGORY_META = {
        'Развлечения': { icon: 'ferris-wheel', emoji: '🎡', color: '#a855f7' },
        'Еда': { icon: 'utensils', emoji: '🍜', color: '#f97316' },
        'Парк': { icon: 'trees', emoji: '🌳', color: '#10b981' },
        'Культура': { icon: 'landmark', emoji: '🏛️', color: '#38bdf8' },
        'Шопинг': { icon: 'shopping-bag', emoji: '🛍️', color: '#ec4899' }
    };

    const VIBE_META = {
        '🔥': { label: 'Кайф', key: 'fire', field: 'fire', color: 'var(--fire)' },
        '💀': { label: 'Глухо', key: 'dead', field: 'dead', color: 'var(--dead)' },
        '😭': { label: 'Скучно', key: 'crying', field: 'crying', color: 'var(--cool)' }
    };

    // SVG icons (inline so markers don't depend on lucide)
    const ICONS = {
        flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
        skull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
        meh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
        star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    };

    // ============================================================
    // Default seed data
    // ============================================================

    const DEFAULT_PLACES = [
        {
            name: "Бродвей (Сайилгох)", coords: [41.3117, 69.2797], category: "Развлечения",
            image: "https://images.unsplash.com/photo-1589417852331-97b7b134907a?auto=format&fit=crop&w=800&q=80",
            description: "Главная пешеходная улица Ташкента. Артисты, стритфуд, живая музыка — тут всегда движ.",
            fire: 24, dead: 1, crying: 0
        },
        {
            name: "Magic City", coords: [41.3015, 69.2455], category: "Развлечения",
            image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80",
            description: "Тематический парк с замком, фонтанами и ночной подсветкой. Сказка для всех возрастов.",
            fire: 15, dead: 2, crying: 0
        },
        {
            name: "Ташкент Сити", coords: [41.3031, 69.2662], category: "Парк",
            image: "https://images.unsplash.com/photo-1589417852331-97b7b134907a?auto=format&fit=crop&w=800&q=80",
            description: "Современный деловой комплекс с небоскрёбами, фонтанами и вечерней подсветкой.",
            fire: 8, dead: 0, crying: 0
        },
        {
            name: "Minor Mosque", coords: [41.3330, 69.2815], category: "Культура",
            image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=800&q=80",
            description: "Белоснежная мечеть на берегу канала Анхор. Архитектурный шедевр нового Ташкента.",
            fire: 4, dead: 0, crying: 1
        },
        {
            name: "Chorsu Bazaar", coords: [41.3264, 69.2292], category: "Шопинг",
            image: "https://images.unsplash.com/photo-1623582490530-072836262923?auto=format&fit=crop&w=800&q=80",
            description: "Легендарный базар под голубыми куполами. Специи, сухофрукты, свежий хлеб — аутентичный Ташкент.",
            fire: 10, dead: 1, crying: 0
        },
        {
            name: "Amir Temur Square", coords: [41.3111, 69.2789], category: "Культура",
            image: "https://images.unsplash.com/photo-1601053159740-4f51e3919e91?auto=format&fit=crop&w=800&q=80",
            description: "Центральная площадь столицы с конной статуей Амира Тимура и фонтанами.",
            fire: 5, dead: 2, crying: 0
        },
        {
            name: "Телебашня Ташкента", coords: [41.3425, 69.2858], category: "Культура",
            image: "https://images.unsplash.com/photo-1628795175520-fe164f981062?auto=format&fit=crop&w=800&q=80",
            description: "375-метровая телевизионная башня — самое высокое сооружение в Центральной Азии.",
            fire: 7, dead: 1, crying: 0
        },
        {
            name: "Театр Навои", coords: [41.3131, 69.2768], category: "Культура",
            description: "Государственный академический Большой театр имени Алишера Навои. Опера и балет мирового уровня.",
            fire: 3, dead: 0, crying: 0
        },
        {
            name: "Хазрати Имам", coords: [41.3382, 69.2327], category: "Культура",
            description: "Священный исламский комплекс с мечетями и медресе. Хранится старейший Коран в мире.",
            fire: 6, dead: 0, crying: 0
        },
        {
            name: "Парк Навруз", coords: [41.3245, 69.3124], category: "Парк",
            image: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=800&q=80",
            description: "Огромный этно-парк с озером, каруселями и колесом обозрения.",
            fire: 11, dead: 0, crying: 0
        },
        {
            name: "Oqtepa Lavash (Чиланзар)", coords: [41.2858, 69.2131], category: "Еда",
            description: "Культовый ташкентский фастфуд. Самса, лаваш и шаурма — очередь показатель качества.",
            fire: 9, dead: 3, crying: 0
        },
        {
            name: "Central Asian Plov Center", coords: [41.3225, 69.2878], category: "Еда",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
            description: "Легендарное место, где готовят 1000 кг плова в день. Must visit для каждого гостя Ташкента.",
            fire: 20, dead: 0, crying: 0
        },
        {
            name: "ТЦ Samarqand Darvoza", coords: [41.3272, 69.2339], category: "Шопинг",
            description: "Современный торговый центр рядом с Чорсу. Бренды, кинотеатр, фудкорт.",
            fire: 3, dead: 5, crying: 1
        },
        {
            name: "Mega Planet", coords: [41.2978, 69.2176], category: "Шопинг",
            description: "Один из крупнейших ТРЦ Ташкента. IMAX кинотеатр, боулинг, рестораны.",
            fire: 4, dead: 2, crying: 0
        },
        {
            name: "Японский сад", coords: [41.3420, 69.2040], category: "Парк",
            image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80",
            description: "Тихий уголок Японии в Ташкенте. Мостики, карпы кои, сакура и медитативная атмосфера.",
            fire: 5, dead: 0, crying: 0
        },
        {
            name: "Humo Arena", coords: [41.3150, 69.2950], category: "Развлечения",
            image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=800&q=80",
            description: "Современная ледовая арена на 12000 мест. Хоккей, концерты и шоу мирового уровня.",
            fire: 13, dead: 1, crying: 0
        },
        {
            name: "Набережная Анхор", coords: [41.3280, 69.2750], category: "Парк",
            description: "Набережная канала Анхор — популярное место для вечерних прогулок и джоггинга.",
            fire: 7, dead: 0, crying: 0
        },
        {
            name: "Музей Искусств", coords: [41.3065, 69.2755], category: "Культура",
            description: "Государственный музей искусств Узбекистана. Коллекция от древности до современности.",
            fire: 2, dead: 0, crying: 0
        },
        {
            name: "Лаби Хауз Ресторан", coords: [41.3090, 69.2650], category: "Еда",
            description: "Уютный ресторан узбекской кухни с летней террасой. Шашлык, манты и лагман.",
            fire: 8, dead: 1, crying: 0
        }
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
                let places = raw ? JSON.parse(raw) : [...DEFAULT_PLACES];
                
                // DATA MIGRATION: Ensure new images are applied to existing saved places
                return places.map(p => {
                    const fresh = DEFAULT_PLACES.find(d => d.name === p.name);
                    if (fresh && (!p.image || p.image.includes('source.unsplash') || p.image.includes('picsum'))) {
                        return { ...p, image: fresh.image };
                    }
                    return p;
                });
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
        },
        loadUser() {
            try {
                const raw = localStorage.getItem(USER_KEY);
                return raw ? JSON.parse(raw) : null;
            } catch { return null; }
        },
        saveUser(user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
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
        myVotes: JSON.parse(localStorage.getItem('vibecity_my_votes') || '[]'),
        activeFilter: 'all',
        currentPlace: null,
        markers: new Map(), // place name -> marker
        user: Storage.loadUser(),
        lang: localStorage.getItem(LANG_KEY) || 'ru'
    };

    // ============================================================
    // i18n
    // ============================================================

    const i18n = {
        t(key) {
            return TRANSLATIONS[state.lang]?.[key] || TRANSLATIONS.ru[key] || key;
        },
        setLang(lang) {
            if (!TRANSLATIONS[lang]) return;
            state.lang = lang;
            localStorage.setItem(LANG_KEY, lang);
            this.updateDOM();
            // Re-render components that have dynamic text
            renderMarkers();
            renderHotList();
            renderTopList();
            renderPulse();
            renderFeed();
            renderEvents();
            if (state.currentPlace) showPlace(state.currentPlace);
        },
        updateDOM() {
            $$('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = this.t(key);
                } else {
                    // Preserve icons if they exist
                    const icon = el.querySelector('i[data-lucide]');
                    el.textContent = this.t(key);
                    if (icon) el.prepend(icon);
                }
            });
            // Update lucide icons as they might have been overwritten by textContent
            refreshIcons();
        }
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
        if (min < 1) return { text: i18n.t('time_now'), cls: '' };
        if (min < 60) return { text: `${min} ${i18n.t('time_min')}`, cls: '' };
        const hr = Math.floor(min / 60);
        if (hr < 3) return { text: `${hr} ${i18n.t('time_hour')} · ${i18n.t('time_actual')}`, cls: 'is-stale' };
        return { text: `${hr} ${i18n.t('time_hour')} · ${i18n.t('time_old')}`, cls: 'is-old' };
    }

    function relativeTime(ts) {
        const diff = Date.now() - ts;
        const sec = Math.floor(diff / 1000);
        if (sec < 60) return i18n.t('time_now');
        const min = Math.floor(sec / 60);
        if (min < 60) return `${min} ${i18n.t('time_min')}`;
        const hr = Math.floor(min / 60);
        if (hr < 24) return `${hr} ${i18n.t('time_hour')}`;
        return `${Math.floor(hr / 24)} ${i18n.t('time_day')}`;
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
    // CONFIGURATION
    // ============================================================
    const GOOGLE_API_KEY = "AIzaSyCNa5mvKKVyfhsftHfBvk7xS_s694Ms27E"; 

    // ============================================================
    // Image system (Official Google SDK + Fallbacks)
    // ============================================================
    
    // ============================================================
    // Image system (Modern Google Places API New + Fallbacks)
    // ============================================================
    
    const loadGoogleSDK = () => {
        if (window.google && window.google.maps) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            // Using the modern bootstrap loader
            script.innerHTML = `(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src='https://maps.'+c+'apis.com/maps/api/js?'+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?(console.warn(p+" only loads once. Ignoring:",g),u()):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
                key: "${GOOGLE_API_KEY}",
                v: "weekly"
            });`;
            document.head.appendChild(script);
            
            // Wait for google.maps to be defined
            const check = setInterval(() => {
                if (window.google && window.google.maps && window.google.maps.importLibrary) {
                    clearInterval(check);
                    resolve();
                }
            }, 100);
            setTimeout(() => { clearInterval(check); reject(); }, 5000);
        });
    };

    const GooglePlaces = {
        async getPhotoUrl(placeName) {
            if (!GOOGLE_API_KEY) return null;
            try {
                await loadGoogleSDK();
                const { Place } = await google.maps.importLibrary("places");

                const request = {
                    textQuery: placeName,
                    fields: ['photos', 'displayName', 'id'],
                    language: 'ru'
                };

                const { places } = await Place.searchByText(request);

                if (places && places.length > 0 && places[0].photos && places[0].photos.length > 0) {
                    // Use the new getURI method for the first photo
                    return places[0].photos[0].getURI({ maxWidth: 800 });
                }
                return null;
            } catch (e) {
                console.error("Google Places (New) Error:", e);
                return null;
            }
        }
    };

    const Images = {
        primaryFor(place) {
            if (place.image && /^https?:\/\//.test(place.image)) return place.image;
            const seed = encodeURIComponent(place.name.replace(/\s+/g, '-').toLowerCase());
            return `https://loremflickr.com/800/450/${place.category || 'city'},modern?lock=${seed}`;
        },
        async renderHero(place, container) {
            const cat = CATEGORY_META[place.category] || { emoji: '📍', color: 'var(--accent)' };
            const fallback = `
                <div class="place__hero-fallback" id="hero-fallback" style="background: linear-gradient(135deg, ${cat.color}, ${cat.color}88);">
                    <span>${cat.emoji}</span>
                </div>`;

            container.innerHTML = `
                <div class="place__hero-img skeleton is-loading" id="hero-img"></div>
                ${fallback}
                <div class="place__hero-overlay"></div>
                <div class="place__hero-status" id="hero-status"></div>`;

            let url = await GooglePlaces.getPhotoUrl(place.name);
            if (!url) url = this.primaryFor(place);

            const img = new Image();
            img.onload = () => {
                const el = container.querySelector('#hero-img');
                const fb = container.querySelector('#hero-fallback');
                if (el) {
                    el.style.backgroundImage = `url('${url}')`;
                    el.classList.remove('skeleton', 'is-loading');
                }
                if (fb) fb.style.display = 'none';
            };
            img.onerror = () => {
                const el = container.querySelector('#hero-img');
                const fb = container.querySelector('#hero-fallback');
                if (el) el.remove();
                if (fb) fb.style.display = 'flex';
            };
            img.src = url;
        },
        thumbFor(place) {
            const cat = CATEGORY_META[place.category] || { emoji: '📍', color: 'var(--accent)' };
            return {
                url: this.primaryFor(place),
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
        // Update profile toggle
        const profToggle = $('#theme-toggle-profile');
        if (profToggle) profToggle.classList.toggle('is-active', isDark);
    }

    // Init theme
    if (state.theme === 'dark') tileLayers.dark.addTo(map);
    else { document.body.classList.add('light-mode'); tileLayers.light.addTo(map); }

    // ============================================================
    // Markers
    // ============================================================

    function createMarkerIcon(status, isHot, justVoted) {
        const svg = status === 'event' ? ICONS.star
            : status === 'dead' ? ICONS.skull
                : status === 'mid' ? ICONS.meh
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

    function showProfile() {
        const overlay = $('#profile-overlay');
        overlay.hidden = false;

        // Update user info in profile
        if (state.user) {
            $('#user-name').textContent = state.user.name;
            $('#user-avatar-big').src = state.user.avatar;
            $$('.profile-btn__img').forEach(img => img.src = state.user.avatar);
        }

        // Update stats
        const myVotes = state.myVotes || [];
        $('#stat-votes').textContent = myVotes.length;
        $('#stat-places').textContent = [...new Set(myVotes.map(v => v.placeId))].length;

        // Update active language button
        $$('.js-lang-btn').forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
        });

        const notifToggle = $('#notif-toggle-profile');
        if (notifToggle && state.user) {
            notifToggle.classList.toggle('is-active', !!state.user.notificationsEnabled);
        }

        refreshIcons();
    }

    function closeProfile() {
        $('#profile-overlay').hidden = true;
        $('#profile-view-mode').hidden = false;
        $('#profile-edit-mode').hidden = true;
    }

    // Close profile by clicking outside the content box
    $('#profile-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'profile-overlay') closeProfile();
    });

    $('#profile-close-btn').addEventListener('click', closeProfile);

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
                        <span data-i18n="cat_${place.category === 'Развлечения' ? 'fun' : place.category === 'Еда' ? 'food' : place.category === 'Парк' ? 'park' : place.category === 'Культура' ? 'culture' : 'shop'}">${escapeHtml(place.category || 'Место')}</span>
                    </span>
                </div>
            </div>

            ${place.description ? `<p class="place__desc">${escapeHtml(place.description)}</p>` : ''}

            <div class="freshness ${fresh.cls}">
                <i data-lucide="clock"></i>
                <span data-i18n="freshness_${fresh.cls || 'recent'}">${fresh.text}</span>
            </div>

            <div>
                <div class="section-title" data-i18n="how_is_it">Как тут сейчас?</div>
                <div class="counters">
                    <div class="counter counter--fire">
                        <i data-lucide="flame"></i>
                        <div class="counter__value">${place.fire || 0}</div>
                        <div class="counter__label" data-i18n="vibe_fire">Огонь</div>
                    </div>
                    <div class="counter counter--dead">
                        <i data-lucide="skull"></i>
                        <div class="counter__value">${place.dead || 0}</div>
                        <div class="counter__label" data-i18n="vibe_dead">Глухо</div>
                    </div>
                    <div class="counter counter--cry">
                        <i data-lucide="frown"></i>
                        <div class="counter__value">${place.crying || 0}</div>
                        <div class="counter__label" data-i18n="vibe_cry">Скучно</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="section-title" data-i18n="crowdedness">Загруженность</div>
                <div class="crowd-row">
                    <i data-lucide="users"></i>
                    <span data-i18n="current_occupancy">Сейчас здесь</span>
                    <span class="crowd-row__num">${crowd.estimate} чел.</span>
                </div>
                <div class="crowd-bar">
                    <div class="crowd-bar__fill" style="width: ${crowd.percent}%"></div>
                </div>
            </div>

            <div>
                <div class="section-title" data-i18n="your_vote">Твой голос</div>
                <div class="votes">
                    <button class="vote vote--fire ${place.myVibe === '🔥' ? 'is-active' : ''}" data-vibe="🔥">
                        <i data-lucide="flame"></i>
                        <span data-i18n="vibe_fire">Кайф</span>
                    </button>
                    <button class="vote vote--dead ${place.myVibe === '💀' ? 'is-active' : ''}" data-vibe="💀">
                        <i data-lucide="skull"></i>
                        <span data-i18n="vibe_dead">Глухо</span>
                    </button>
                    <button class="vote vote--cry ${place.myVibe === '😭' ? 'is-active' : ''}" data-vibe="😭">
                        <i data-lucide="frown"></i>
                        <span data-i18n="vibe_cry">Скучно</span>
                    </button>
                </div>
            </div>

            <div style="margin-top: 8px;">
                <button class="btn btn--secondary" style="width: 100%;" id="share-btn">
                    <i data-lucide="share-2"></i> <span data-i18n="share">Поделиться</span>
                </button>
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

        // Wire share button
        const shareBtn = $('#share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                const url = window.location.href.split('?')[0] + `?place=${encodeURIComponent(place.name)}`;
                navigator.clipboard.writeText(url).then(() => {
                    Toast.show(i18n.t('toast_shared'), '🔗');
                });
            });
        }

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

        // Track personal history
        if (place.myVibe) {
            state.myVotes.push({ placeId: place.name, vibe, ts: Date.now() });
            localStorage.setItem('vibecity_my_votes', JSON.stringify(state.myVotes));
        }

        Storage.savePlaces(state.places);

        // Re-render everything affected
        renderMarkers();
        flashMarker(place);
        showPlace(place);
        renderHotList();
        renderTopList();
        renderPulse();

        Toast.show(place.myVibe ? `${i18n.t('toast_voted')} · ${i18n.t('vibe_' + meta.field)}` : i18n.t('toast_unvoted'), vibe);
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
            list.innerHTML = `<div class="empty"><i data-lucide="zap-off"></i><p data-i18n="empty_feed">${i18n.t('empty_feed')}</p></div>`;
            refreshIcons();
            return;
        }
        list.innerHTML = state.feed.slice(0, 12).map(item => {
            const meta = VIBE_META[item.vibe] || VIBE_META['🔥'];
            return `
                <li class="feed-item" data-place="${escapeHtml(item.place)}">
                    <div class="feed-item__icon feed-item__icon--${meta.key}">${item.vibe}</div>
                    <div class="feed-item__text">
                        <strong>${escapeHtml(item.anon || i18n.t('anon_user'))}</strong> ${i18n.t('feed_in')} <strong>${escapeHtml(item.place)}</strong>
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
            list.innerHTML = `<div class="empty"><i data-lucide="search-x"></i><p data-i18n="empty_search">${i18n.t('empty_search')}</p></div>`;
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
            list.innerHTML = `<div class="empty"><i data-lucide="search-x"></i><p data-i18n="empty_search">${i18n.t('empty_search')}</p></div>`;
            refreshIcons();
            return;
        }

        list.innerHTML = sorted.map(p => {
            const cat = CATEGORY_META[p.category] || { icon: 'map-pin', color: 'var(--accent)', emoji: '📍' };
            const thumb = Images.thumbFor(p);
            return `
                <div class="hot-item" 
                     data-place="${escapeHtml(p.name)}"
                     style="background-image: url('${thumb.url}');">
                    <div class="hot-item__gradient"></div>
                    <div class="hot-item__content">
                        <div class="hot-item__info">
                            <div class="hot-item__name">${escapeHtml(p.name)}</div>
                            <div class="hot-item__meta">
                                <span class="hot-item__cat">
                                    <i data-lucide="${cat.icon}" style="color:${cat.color};"></i>
                                    ${i18n.t('cat_' + (p.category === 'Развлечения' ? 'fun' : p.category === 'Еда' ? 'food' : p.category === 'Парк' ? 'park' : p.category === 'Культура' ? 'culture' : 'shop'))}
                                </span>
                            </div>
                        </div>
                        <div class="hot-item__fire">
                            <i data-lucide="flame"></i> ${p.fire || 0}
                        </div>
                    </div>
                </div>`;
        }).join('');

        // Async load photos from Google to background
        $$('.hot-item', list).forEach(async (el) => {
            const name = el.dataset.place;
            const place = state.places.find(p => p.name === name);
            if (!place) return;

            let url = place.googleThumb;
            if (!url) {
                url = await GooglePlaces.getPhotoUrl(name);
                if (url) place.googleThumb = url;
            }
            
            if (!url) url = Images.primaryFor(place);

            const img = new Image();
            img.onload = () => {
                el.style.backgroundImage = `url('${url}')`;
                el.classList.add('is-loaded');
            };
            img.src = url;
        });

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
            list.innerHTML = `<div class="empty"><i data-lucide="calendar-x"></i><p data-i18n="empty_events">${i18n.t('empty_events')}</p></div>`;
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
                results.innerHTML = `<div class="search__empty" data-i18n="empty_search">${i18n.t('empty_search')}</div>`;
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
                            <div class="search__result-cat">${i18n.t('cat_' + (p.category === 'Развлечения' ? 'fun' : p.category === 'Еда' ? 'food' : p.category === 'Парк' ? 'park' : p.category === 'Культура' ? 'culture' : 'shop'))}</div>
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
            input.value = place.name; // Fill search with the name
            close();
            map.flyTo(place.coords, 16, { duration: 1.2 });
            showPlace(place);
        }

        function close() {
            results.classList.remove('is-open');
            results.innerHTML = ''; // Clear items to trigger CSS :empty state
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

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        Storage.saveTheme(state.theme);
        applyTheme(state.theme);
        Toast.show(state.theme === 'dark' ? 'Тёмная тема' : 'Светлая тема', state.theme === 'dark' ? '🌙' : '☀️');
    }

    $$('.js-theme-toggle').forEach(btn => btn.addEventListener('click', toggleTheme));
    $('#theme-toggle-profile').addEventListener('click', toggleTheme);

    $$('.js-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            i18n.setLang(btn.dataset.lang);
            Toast.show(i18n.t('toast_lang_changed'), '🌐');
        });
    });

    $('#notif-toggle-profile').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const isActive = btn.classList.toggle('is-active');
        if (state.user) {
            state.user.notificationsEnabled = isActive;
            Storage.saveUser(state.user);
        }
        Toast.show(isActive ? i18n.t('toast_notif_on') : i18n.t('toast_notif_off'), isActive ? '🔔' : '🔕');
    });

    // ============================================================
    // Profile

    // ============================================================
    // Profile
    // ============================================================

    $$('.js-profile-btn').forEach(btn => btn.addEventListener('click', showProfile));

    $('#edit-profile-btn').addEventListener('click', () => {
        if (!state.user) return;
        $('#profile-view-mode').hidden = true;
        $('#profile-edit-mode').hidden = false;
        $('#edit-name').value = state.user.name;
        
        // Render avatar options in edit mode
        const grid = $('#edit-avatar-grid');
        grid.innerHTML = '';
        state.avatarOptions.forEach(url => {
            const opt = document.createElement('div');
            opt.className = `avatar-option ${url === state.user.avatar ? 'is-selected' : ''}`;
            opt.innerHTML = `<img src="${url}" alt="Avatar">`;
            opt.addEventListener('click', () => {
                $$('.avatar-option', grid).forEach(el => el.classList.remove('is-selected'));
                opt.classList.add('is-selected');
                state.tempEditAvatar = url;
            });
            grid.appendChild(opt);
        });
        state.tempEditAvatar = state.user.avatar;
    });

    $('#cancel-edit-btn').addEventListener('click', () => {
        $('#profile-view-mode').hidden = false;
        $('#profile-edit-mode').hidden = true;
    });

    $('#save-profile-btn').addEventListener('click', () => {
        const newName = $('#edit-name').value.trim();
        if (!newName) {
            $('#edit-name').classList.add('is-invalid');
            return;
        }
        
        if (state.user) {
            state.user.name = newName.slice(0, 20);
            state.user.avatar = state.tempEditAvatar;
            Storage.saveUser(state.user);
            
            // Sync UI
            $('#user-name').textContent = state.user.name;
            $('#user-avatar-big').src = state.user.avatar;
            $$('.profile-btn__img').forEach(img => img.src = state.user.avatar);
            
            Toast.show(i18n.t('toast_name_saved'), '👤');
            $('#profile-view-mode').hidden = false;
            $('#profile-edit-mode').hidden = true;
        }
    });

    // Load saved name
    const savedName = localStorage.getItem('vibe_user_name');
    if (savedName) $('#user-name').textContent = savedName;

    // ============================================================
    // Geolocation
    // ============================================================

    $$('.js-locate-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!navigator.geolocation) {
                Toast.show(i18n.t('toast_loc_error'), '⚠️');
                return;
            }
            Toast.show(i18n.t('toast_loc_finding'), '📍');
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude } = pos.coords;
                    map.flyTo([latitude, longitude], 16, { duration: 1.4 });
                    L.circleMarker([latitude, longitude], {
                        radius: 8, fillColor: '#3b82f6', fillOpacity: 1, color: 'white', weight: 3
                    }).addTo(map).bindPopup('Вы здесь');
                    Toast.show(i18n.t('toast_loc_success'), '📍');
                },
                () => Toast.show(i18n.t('toast_loc_error'), '⚠️')
            );
        });
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

    // Extra safety for mobile: click on map container directly
    $('#map').addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && e.target.id === 'map') {
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
        updateMobileTabs(null);
    }

    function updateMobileTabs(tab) {
        $$('.nav-btn').forEach(b => b.classList.toggle('is-active', b.dataset.tab === tab));
        refreshIcons();
    }

    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (!tab) return;

            updateMobileTabs(tab);
            const target = tab === 'left' ? $('#panel-left') : $('#panel-right');
            const other = tab === 'left' ? $('#panel-right') : $('#panel-left');

            // Harmonious switch: close other first, then open target
            if (other.classList.contains('is-mobile-open')) {
                other.classList.remove('is-mobile-open', 'is-peek', 'is-expanded');
                setTimeout(() => {
                    target.classList.add('is-mobile-open', 'is-expanded');
                    if (tab === 'right') showDefaultView();
                }, 150);
            } else {
                target.classList.add('is-mobile-open', 'is-expanded');
                if (tab === 'right') showDefaultView();
            }
        });
    });

    $('#checkin-btn').addEventListener('click', () => {
        Toast.show(i18n.t('welcome_subtitle'), '✨');
        $('#panel-left').classList.add('is-mobile-open', 'is-expanded');
        updateMobileTabs('left');
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

                    const isExpanded = panel.classList.contains('is-expanded');
                    const isAtTop = panel.scrollTop <= 0;
                    const touchY = e.touches[0].clientY;
                    const panelRect = panel.getBoundingClientRect();
                    const isTouchInHeader = (touchY - panelRect.top) < 80;

                    // IMPORTANT: If not expanded, ALWAYS drag the panel, don't scroll content
                    if (!isExpanded || isAtTop || isTouchInHeader) {
                        startY = touchY;
                        activePanel = panel;

                        const style = window.getComputedStyle(panel);
                        const matrix = new WebKitCSSMatrix(style.transform);
                        initialTranslate = matrix.m42;

                        panel.style.transition = 'none';
                        // Force dragging if not fully expanded
                        isDragging = !isExpanded || isTouchInHeader;
                    }
                }, { passive: true });

                let ticking = false;

                panel.addEventListener('touchmove', e => {
                    if (!activePanel) return;
                    currentY = e.touches[0].clientY;

                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            const delta = currentY - startY;
                            const isMovingDown = delta > 0;
                            const isMovingUp = delta < 0;

                            if (isMovingDown || (isMovingUp && activePanel.classList.contains('is-peek'))) {
                                const newTranslate = initialTranslate + delta;
                                const isLandscape = window.innerWidth > window.innerHeight && window.innerWidth <= 932;
                                const x = isLandscape ? '-50%' : '0';

                                if (newTranslate < 0) {
                                    activePanel.style.transform = `translate3d(${x}, ${newTranslate * 0.2}px, 0)`;
                                } else {
                                    activePanel.style.transform = `translate3d(${x}, ${newTranslate}px, 0)`;
                                    if (Math.abs(delta) > 10) isDragging = true;
                                }
                            }
                            ticking = false;
                        });
                        ticking = true;
                    }

                    if (isDragging && e.cancelable) {
                        e.preventDefault();
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
    // Interactive Metro Map
    // ============================================================

    const MetroMap = (() => {
        const lines = [
            {
                id: 'chilanzar',
                color: '#ef4444',
                label: 'Chilonzor',
                stations: [
                    { name: 'Chinor', x: 50, y: 550, coords: [41.2222, 69.1950], labelPos: 'left' },
                    { name: 'Yangihayot', x: 100, y: 500, coords: [41.2350, 69.2050], labelPos: 'left' },
                    { name: 'Chilonzor', x: 150, y: 450, coords: [41.2730, 69.2085], labelPos: 'left' },
                    { name: 'Novza', x: 200, y: 400, coords: [41.2858, 69.2131], labelPos: 'left' },
                    { name: 'Bunyodkor', x: 250, y: 350, coords: [41.3031, 69.2405], labelPos: 'left' },
                    { name: 'Paxtakor', x: 350, y: 250, coords: [41.3125, 69.2625], transfer: 'uzbekistan', labelPos: 'top' },
                    { name: 'Mustaqillik', x: 450, y: 250, coords: [41.3150, 69.2700], labelPos: 'top' },
                    { name: 'Amir Temur', x: 550, y: 250, coords: [41.3111, 69.2789], transfer: 'yunusabad', labelPos: 'top' },
                    { name: 'Hamid Olimjon', x: 650, y: 200, coords: [41.3210, 69.2890], labelPos: 'top' },
                    { name: 'B.I.Yuli', x: 750, y: 150, coords: [41.3260, 69.3270], labelPos: 'right' }
                ]
            },
            {
                id: 'uzbekistan',
                color: '#3b82f6',
                label: 'Oʻzbekiston',
                stations: [
                    { name: 'Beruniy', x: 100, y: 100, coords: [41.3450, 69.2050], labelPos: 'left' },
                    { name: 'Tinchlik', x: 150, y: 150, coords: [41.3380, 69.2180], labelPos: 'left' },
                    { name: 'Chorsu', x: 200, y: 200, coords: [41.3264, 69.2292], labelPos: 'left' },
                    { name: 'A.Navoiy', x: 350, y: 250, coords: [41.3140, 69.2580], transfer: 'chilanzar', labelPos: 'bottom' },
                    { name: 'Kosmonavtlar', x: 450, y: 350, coords: [41.3065, 69.2650], labelPos: 'right' },
                    { name: 'Oybek', x: 550, y: 450, coords: [41.2980, 69.2750], transfer: 'yunusabad', labelPos: 'bottom' },
                    { name: 'Toshkent', x: 650, y: 500, coords: [41.3010, 69.2880], labelPos: 'right' },
                    { name: 'Doʻstlik', x: 750, y: 550, coords: [41.2950, 69.3180], labelPos: 'right' }
                ]
            },
            {
                id: 'yunusabad',
                color: '#10b981',
                label: 'Yunusobod',
                stations: [
                    { name: 'Turkiston', x: 550, y: 50, coords: [41.3650, 69.2900], labelPos: 'right' },
                    { name: 'Yunusobod', x: 550, y: 100, coords: [41.3550, 69.2880], labelPos: 'right' },
                    { name: 'Bodomzor', x: 550, y: 150, coords: [41.3420, 69.2850], labelPos: 'right' },
                    { name: 'Minor', x: 550, y: 200, coords: [41.3280, 69.2820], labelPos: 'right' },
                    { name: 'Y.Rajabiy', x: 550, y: 250, coords: [41.3115, 69.2795], transfer: 'chilanzar', labelPos: 'right' },
                    { name: 'Ming Oʻrik', x: 550, y: 450, coords: [41.3000, 69.2755], transfer: 'uzbekistan', labelPos: 'left' }
                ]
            }
        ];

        function render() {
            const container = $('#metro-map-svg-container');
            if (!container) return;

            // На мобильных убираем центрирование через стили
            if (window.innerWidth <= 768) {
                container.style.justifyContent = 'flex-start';
                container.style.alignItems = 'flex-start';
            }

            const isMobile = window.innerWidth <= 768;
            const nodeRadius = isMobile ? 8 : 6;
            const transferRadius = isMobile ? 10 : 8;
            const fontSize = isMobile ? 16 : 12;

            const svg = `
                <svg viewBox="0 0 850 650" class="metro-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    
                    <!-- Lines -->
                    ${lines.map(line => `
                        <path d="M ${line.stations.map(s => `${s.x},${s.y}`).join(' L ')}" 
                              fill="none" 
                              stroke="${line.color}" 
                              stroke-width="${isMobile ? 10 : 8}" 
                              stroke-linecap="round" 
                              stroke-linejoin="round"
                              opacity="0.9" />
                    `).join('')}

                    <!-- Stations -->
                    ${lines.flatMap(line => line.stations.map(s => {
                        let dx = 14, dy = 5, anchor = 'start';
                        if (s.labelPos === 'top') { dx = 0; dy = -20; anchor = 'middle'; }
                        if (s.labelPos === 'bottom') { dx = 0; dy = 28; anchor = 'middle'; }
                        if (s.labelPos === 'left') { dx = -14; dy = 5; anchor = 'end'; }
                        if (s.labelPos === 'right') { dx = 14; dy = 5; anchor = 'start'; }

                        return `
                            <g class="metro-node" data-name="${s.name}" data-coords="${s.coords.join(',')}" style="cursor: pointer;">
                                <circle cx="${s.x}" cy="${s.y}" r="${s.transfer ? transferRadius : nodeRadius}" 
                                        fill="${s.transfer ? 'white' : line.color}" 
                                        stroke="${line.color}" 
                                        stroke-width="3" />
                                <text x="${s.x + dx}" y="${s.y + dy}" 
                                      fill="currentColor" 
                                      font-size="${fontSize}" 
                                      font-weight="${s.transfer ? 'bold' : 'normal'}"
                                      text-anchor="${anchor}"
                                      class="metro-text">${s.name}</text>
                            </g>
                        `;
                    })).join('')}
                </svg>
            `;

            container.innerHTML = svg;

            // Events
            $$('.metro-node', container).forEach(node => {
                node.addEventListener('click', () => {
                    const coords = node.dataset.coords.split(',').map(Number);
                    const name = node.dataset.name;
                    
                    $('#metro-overlay').hidden = true;
                    map.flyTo(coords, 16, { duration: 1.5 });
                    
                    L.popup()
                        .setLatLng(coords)
                        .setContent(`<div class="popup-vibe"><strong>${name}</strong><br>Metro Station</div>`)
                        .openOn(map);
                });
            });
        }

        return { render };
    })();

    // Initialize metro map when overlay opens
    $$('.js-metro-btn').forEach(btn => btn.addEventListener('click', () => {
        $('#metro-overlay').hidden = false;
        MetroMap.render();
    }));

    $('#metro-close-btn').addEventListener('click', () => {
        $('#metro-overlay').hidden = true;
    });

    $('#metro-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'metro-overlay') $('#metro-overlay').hidden = true;
    });

    // ============================================================
    // External: parser hook (kept for compatibility)
    // ============================================================

    window.parseTelegramPost = function (text) {
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
        Toast.show(i18n.t('toast_update'), '✨');
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
            Toast.show(i18n.t('toast_update'), '🔄');
        } else if (e.key === EVENTS_KEY) {
            state.events = Storage.loadEvents();
            renderMarkers();
            renderEvents();
        }
    });

    // ============================================================
    // Auth module
    // ============================================================

    const Auth = {
        selectedAvatar: null,
        avatars: [],

        init() {
            if (!state.user) {
                this.showRegistration();
            } else {
                this.updateUI();
            }

            $('#register-submit-btn').addEventListener('click', () => this.handleRegister());
            
            // Allow selecting avatar
            $('#avatar-grid').addEventListener('click', (e) => {
                const option = e.target.closest('.avatar-option');
                if (option) {
                    $$('.avatar-option').forEach(el => el.classList.remove('is-selected'));
                    option.classList.add('is-selected');
                    this.selectedAvatar = option.dataset.url;
                }
            });
        },

        showRegistration() {
            const overlay = $('#register-overlay');
            overlay.hidden = false;

            // Generate random avatars
            const grid = $('#avatar-grid');
            const seeds = ['Felix', 'Aneka', 'Milo', 'Max', 'Luna', 'Jack', 'Zoe', 'Leo'];
            this.avatars = seeds.map(s => `https://api.dicebear.com/7.x/avataaars/svg?seed=${s + Math.random()}`);
            
            grid.innerHTML = this.avatars.map((url, i) => `
                <div class="avatar-option ${i === 0 ? 'is-selected' : ''}" data-url="${url}">
                    <img src="${url}" alt="Avatar ${i}">
                </div>
            `).join('');
            
            this.selectedAvatar = this.avatars[0];
            refreshIcons();
        },

        handleRegister() {
            const nameInput = $('#reg-name');
            const name = nameInput.value.trim();

            if (!name) {
                nameInput.classList.add('is-invalid');
                Toast.show(i18n.t('reg_name_label'), '🤔');
                return;
            }

            state.user = {
                name: name,
                avatar: this.selectedAvatar,
                regDate: Date.now()
            };

            Storage.saveUser(state.user);
            this.updateUI();
            
            $('#register-overlay').hidden = true;
            Toast.show(`${state.lang === 'ru' ? 'Привет' : state.lang === 'en' ? 'Hello' : 'Salom'}, ${name}!`, '👋');
            
            // Update seed feed names with actual user name for some items
            seedFeedIfEmpty();
        },

        updateUI() {
            if (!state.user) return;
            const nameEls = $$('#user-name');
            const avatarEls = $$('.profile-btn__img, #user-avatar-big');
            
            nameEls.forEach(el => el.textContent = state.user.name);
            avatarEls.forEach(el => el.src = state.user.avatar);
        }
    };

    // ============================================================
    // Init
    // ============================================================

    function init() {
        Auth.init();
        seedFeedIfEmpty();
        renderMarkers();
        renderHotList();
        renderTopList();
        renderPulse();
        renderFeed();
        renderEvents();
        showDefaultView();
        i18n.updateDOM();
        refreshIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
