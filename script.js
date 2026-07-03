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
            metro_map: "Карта метро",
            metro_station: "Станция метро",
            or_divider: "или",
            logout: "Выйти",
            logout_confirm: "Вы уверены, что хотите выйти?",
            logged_out: "Вы вышли из системы",
            people_suffix: "чел.",
            theme_dark_on: "Тёмная тема",
            theme_light_on: "Светлая тема",
            hello: "Привет",
            welcome_short: "Добро пожаловать",
            google_error: "Ошибка входа через Google",
            feat_map: "Живая карта мест и событий",
            feat_vote: "Голосуй за вайб: кайф, глухо или скучно",
            feat_pulse: "Следи за пульсом города в реальном времени",
            pulse_events: "Событий",
            events_by: "по данным",
            events_updated: "обновлено",
            event_read: "Читать на Afisha.uz",
            taxi_btn: "Такси сюда",
            member_since: "с нами с",
            rank_1: "новичок",
            rank_2: "исследователь",
            rank_3: "знаток города",
            rank_4: "легенда города",
            level_hint: "до следующего уровня",
            level_max: "максимальный уровень",
            feed_new_event: "Новое событие",
            feed_you: "Ты",
            reg_name_error: "Имя — минимум 2 символа",
            afisha_concert: "Концерт",
            afisha_theatre: "Театр",
            afisha_exhibition: "Выставка",
            afisha_city: "Город",
            upload_avatar: "Своё фото",
            avatar_error: "Не удалось загрузить фото",
            chat_title: "Чат места",
            chat_placeholder: "Что тут происходит?",
            chat_empty: "Тут пока тихо — напиши первым!",
            chat_slow: "Не так быстро 🙂",
            chat_note: "Демо-чат: до подключения сервера сообщения видны только на этом устройстве"
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
            metro_map: "Metro Map",
            metro_station: "Metro station",
            or_divider: "or",
            logout: "Log out",
            logout_confirm: "Are you sure you want to log out?",
            logged_out: "Logged out",
            people_suffix: "ppl",
            theme_dark_on: "Dark theme",
            theme_light_on: "Light theme",
            hello: "Hello",
            welcome_short: "Welcome",
            google_error: "Google sign-in failed",
            feat_map: "Live map of places and events",
            feat_vote: "Vote the vibe: fire, dead or boring",
            feat_pulse: "Watch the city pulse in real time",
            pulse_events: "Events",
            events_by: "powered by",
            events_updated: "updated",
            event_read: "Read on Afisha.uz",
            taxi_btn: "Taxi here",
            member_since: "member since",
            rank_1: "newbie",
            rank_2: "explorer",
            rank_3: "city expert",
            rank_4: "city legend",
            level_hint: "to the next level",
            level_max: "max level",
            feed_new_event: "New event",
            feed_you: "You",
            reg_name_error: "Name must be at least 2 characters",
            afisha_concert: "Concert",
            afisha_theatre: "Theatre",
            afisha_exhibition: "Exhibition",
            afisha_city: "City",
            upload_avatar: "Your photo",
            avatar_error: "Couldn't load the photo",
            chat_title: "Place chat",
            chat_placeholder: "What's happening here?",
            chat_empty: "Quiet here — be the first to write!",
            chat_slow: "Not so fast 🙂",
            chat_note: "Demo chat: messages stay on this device until a backend is connected"
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
            metro_map: "Metro xaritasi",
            metro_station: "Metro bekati",
            or_divider: "yoki",
            logout: "Chiqish",
            logout_confirm: "Chiqishga ishonchingiz komilmi?",
            logged_out: "Tizimdan chiqdingiz",
            people_suffix: "kishi",
            theme_dark_on: "Tungi mavzu",
            theme_light_on: "Kunduzgi mavzu",
            hello: "Salom",
            welcome_short: "Xush kelibsiz",
            google_error: "Google orqali kirishda xatolik",
            feat_map: "Joylar va tadbirlarning jonli xaritasi",
            feat_vote: "Vayb uchun ovoz bering: kayf, jimjit yoki zerikarli",
            feat_pulse: "Shahar pulsini real vaqtda kuzating",
            pulse_events: "Tadbirlar",
            events_by: "manba:",
            events_updated: "yangilandi",
            event_read: "Afisha.uz'da o'qish",
            taxi_btn: "Taksi chaqirish",
            member_since: "a'zo:",
            rank_1: "yangi",
            rank_2: "tadqiqotchi",
            rank_3: "shahar bilimdoni",
            rank_4: "shahar afsonasi",
            level_hint: "keyingi darajagacha",
            level_max: "eng yuqori daraja",
            feed_new_event: "Yangi tadbir",
            feed_you: "Siz",
            reg_name_error: "Ism kamida 2 ta belgidan iborat bo'lsin",
            afisha_concert: "Konsert",
            afisha_theatre: "Teatr",
            afisha_exhibition: "Ko'rgazma",
            afisha_city: "Shahar",
            upload_avatar: "O'z rasmingiz",
            avatar_error: "Rasm yuklanmadi",
            chat_title: "Joy chati",
            chat_placeholder: "Bu yerda nima bo'lyapti?",
            chat_empty: "Hozircha jim — birinchi bo'lib yozing!",
            chat_slow: "Shoshilmang 🙂",
            chat_note: "Demo-chat: server ulangunga qadar xabarlar faqat shu qurilmada ko'rinadi"
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
        '🔥': { label: 'Кайф', key: 'fire', field: 'fire', labelKey: 'vibe_fire', color: 'var(--fire)' },
        '💀': { label: 'Глухо', key: 'dead', field: 'dead', labelKey: 'vibe_dead', color: 'var(--dead)' },
        '😭': { label: 'Скучно', key: 'crying', field: 'crying', labelKey: 'vibe_cry', color: 'var(--cool)' }
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
            name: "Бродвей (Сайилгох)", coords: [41.3126, 69.2746], category: "Развлечения",
            description: "Главная пешеходная улица Ташкента. Артисты, стритфуд, живая музыка — тут всегда движ.",
            fire: 24, dead: 1, crying: 0
        },
        {
            name: "Magic City", coords: [41.3036, 69.2450], category: "Развлечения",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Magic_city_tungi_ko%27rinishi.jpg/960px-Magic_city_tungi_ko%27rinishi.jpg",
            description: "Тематический парк с замком, фонтанами и ночной подсветкой. Сказка для всех возрастов.",
            fire: 15, dead: 2, crying: 0
        },
        {
            name: "Ташкент Сити", coords: [41.3165, 69.2484], category: "Парк",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tashkent_city_8.jpg/960px-Tashkent_city_8.jpg",
            description: "Современный деловой комплекс с небоскрёбами, фонтанами и вечерней подсветкой.",
            fire: 8, dead: 0, crying: 0
        },
        {
            name: "Minor Mosque", coords: [41.3345, 69.2770], category: "Культура",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Minor_Mosque_Tashkent.jpg/960px-Minor_Mosque_Tashkent.jpg",
            description: "Белоснежная мечеть на берегу канала Анхор. Архитектурный шедевр нового Ташкента.",
            fire: 4, dead: 0, crying: 1
        },
        {
            name: "Chorsu Bazaar", coords: [41.3262, 69.2369], category: "Шопинг",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chorsu_Market_general_view.jpg/960px-Chorsu_Market_general_view.jpg",
            description: "Легендарный базар под голубыми куполами. Специи, сухофрукты, свежий хлеб — аутентичный Ташкент.",
            fire: 10, dead: 1, crying: 0
        },
        {
            name: "Amir Temur Square", coords: [41.3111, 69.2789], category: "Культура",
            description: "Центральная площадь столицы с конной статуей Амира Тимура и фонтанами.",
            fire: 5, dead: 2, crying: 0
        },
        {
            name: "Телебашня Ташкента", coords: [41.3456, 69.2847], category: "Культура",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tashkent_TV_Tower_179.jpg/960px-Tashkent_TV_Tower_179.jpg",
            description: "375-метровая телевизионная башня — самое высокое сооружение в Центральной Азии.",
            fire: 7, dead: 1, crying: 0
        },
        {
            name: "Театр Навои", coords: [41.3092, 69.2715], category: "Культура",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Navoi_Theater_-_Tashkent.jpg/960px-Navoi_Theater_-_Tashkent.jpg",
            description: "Государственный академический Большой театр имени Алишера Навои. Опера и балет мирового уровня.",
            fire: 3, dead: 0, crying: 0
        },
        {
            name: "Хазрати Имам", coords: [41.3373, 69.2401], category: "Культура",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Barakhan_Madrasah_Tashkent.jpg/960px-Barakhan_Madrasah_Tashkent.jpg",
            description: "Священный исламский комплекс с мечетями и медресе. Хранится старейший Коран в мире.",
            fire: 6, dead: 0, crying: 0
        },
        {
            name: "Парк Навруз", coords: [41.3260, 69.2661], category: "Парк",
            description: "Огромный этно-парк с озером, каруселями и колесом обозрения.",
            fire: 11, dead: 0, crying: 0
        },
        {
            name: "Oqtepa Lavash (Чиланзар)", coords: [41.3001, 69.2098], category: "Еда",
            description: "Культовый ташкентский фастфуд. Самса, лаваш и шаурма — очередь показатель качества.",
            fire: 9, dead: 3, crying: 0
        },
        {
            name: "Central Asian Plov Center", coords: [41.3407, 69.2836], category: "Еда",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Central_Asian_Plov_Centre_in_Tashkent.jpg/960px-Central_Asian_Plov_Centre_in_Tashkent.jpg",
            description: "Легендарное место, где готовят 1000 кг плова в день. Must visit для каждого гостя Ташкента.",
            fire: 20, dead: 0, crying: 0
        },
        {
            name: "ТЦ Samarqand Darvoza", coords: [41.3177, 69.2312], category: "Шопинг",
            description: "Современный торговый центр рядом с Чорсу. Бренды, кинотеатр, фудкорт.",
            fire: 3, dead: 5, crying: 1
        },
        {
            name: "Mega Planet", coords: [41.3673, 69.2911], category: "Шопинг",
            description: "Один из крупнейших ТРЦ Ташкента. IMAX кинотеатр, боулинг, рестораны.",
            fire: 4, dead: 2, crying: 0
        },
        {
            name: "Японский сад", coords: [41.3396, 69.2820], category: "Парк",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Japanese_garden_Tashkent_01.jpg/960px-Japanese_garden_Tashkent_01.jpg",
            description: "Тихий уголок Японии в Ташкенте. Мостики, карпы кои, сакура и медитативная атмосфера.",
            fire: 5, dead: 0, crying: 0
        },
        {
            name: "Humo Arena", coords: [41.3080, 69.2519], category: "Развлечения",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Humo_Arena_2019.jpg/960px-Humo_Arena_2019.jpg",
            description: "Современная ледовая арена на 12000 мест. Хоккей, концерты и шоу мирового уровня.",
            fire: 13, dead: 1, crying: 0
        },
        {
            name: "Набережная Анхор", coords: [41.3280, 69.2750], category: "Парк",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Anhor_kanali_va_O%CA%BBrda_ko%CA%BBprigi.jpg/960px-Anhor_kanali_va_O%CA%BBrda_ko%CA%BBprigi.jpg",
            description: "Набережная канала Анхор — популярное место для вечерних прогулок и джоггинга.",
            fire: 7, dead: 0, crying: 0
        },
        {
            name: "Музей Искусств", coords: [41.3026, 69.2787], category: "Культура",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Museum_of_Arts_of_Uzbekistan_1.jpg/960px-Museum_of_Arts_of_Uzbekistan_1.jpg",
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

                // DATA MIGRATION: подтягиваем актуальные фото и координаты из дефолтов
                return places.map(p => {
                    const fresh = DEFAULT_PLACES.find(d => d.name === p.name);
                    if (!fresh) return p;
                    const isStock = p.image && /unsplash|picsum|loremflickr|googleusercontent/.test(p.image);
                    return {
                        ...p,
                        coords: fresh.coords, // координаты выверены по OSM
                        image: (!p.image || isStock) ? fresh.image : p.image
                    };
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
                const arr = raw ? JSON.parse(raw) : [];
                // Истёкшие ивенты не показываем
                return arr.filter(e => !e.expiresAt || e.expiresAt > Date.now());
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
                // Drop entries older than 24h + оставляем один вайб-чек на место
                const cutoff = Date.now() - 24 * 60 * 60 * 1000;
                const seenPlaces = new Set();
                return arr.filter(e => {
                    if (e.ts <= cutoff) return false;
                    if (e.type) return true;
                    if (seenPlaces.has(e.place)) return false;
                    seenPlaces.add(e.place);
                    return true;
                });
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
        lang: localStorage.getItem(LANG_KEY) || 'ru',
        perf: 'medium', // Will be updated on init
        markerCluster: null // Cluster group
    };

    // ============================================================
    // Performance Module
    // ============================================================

    const Perf = {
        init() {
            // Get hardware info
            const cores = navigator.hardwareConcurrency || 4;
            const ram = navigator.deviceMemory || 4; // GB (not supported in all browsers)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (cores <= 4 || ram <= 2 || (isMobile && ram <= 4)) {
                state.perf = 'low';
            } else if (cores >= 8 && ram >= 8) {
                state.perf = 'high';
            } else {
                state.perf = 'medium';
            }

            document.body.classList.add(`perf-${state.perf}`);
            console.log(`[VibeCity] Device Performance: ${state.perf.toUpperCase()} (${cores} cores, ~${ram}GB RAM)`);
        },
        getMaxImageWidth() {
            if (state.perf === 'low') return 400;
            if (state.perf === 'medium') return 640;
            return 1080;
        }
    };

    // ============================================================
    // Weather Module (Open-Meteo API)
    // ============================================================

    const Weather = {
        async init() {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.3111&longitude=69.2797&current=temperature_2m,weather_code&timezone=auto');
                const data = await res.json();
                if (data && data.current) {
                    this.render(data.current);
                }
            } catch (e) {
                console.error("Weather Error:", e);
            }
        },
        render(current) {
            const el = $('#weather-stat');
            const tempEl = $('#weather-temp');
            const descEl = $('#weather-desc');
            if (!el || !tempEl) return;

            const temp = Math.round(current.temperature_2m);
            const code = current.weather_code;
            const info = this.getWeatherInfo(code);

            tempEl.innerHTML = `<span class="weather-icon">${info.emoji}</span>${temp}°`;
            descEl.textContent = state.lang === 'ru' ? info.ru : (state.lang === 'uz' ? info.uz : info.en);
            el.removeAttribute('hidden');
        },
        getWeatherInfo(code) {
            // WMO Weather interpretation codes (WW)
            if (code === 0) return { emoji: '☀️', ru: 'Ясно', en: 'Clear', uz: 'Musaffo' };
            if (code <= 3) return { emoji: '🌤️', ru: 'Облачно', en: 'Cloudy', uz: 'Bulutli' };
            if (code <= 48) return { emoji: '🌫️', ru: 'Туман', en: 'Fog', uz: 'Tuman' };
            if (code <= 67) return { emoji: '🌧️', ru: 'Дождь', en: 'Rain', uz: 'Yomgʻir' };
            if (code <= 77) return { emoji: '❄️', ru: 'Снег', en: 'Snow', uz: 'Qor' };
            if (code <= 82) return { emoji: '🌦️', ru: 'Ливень', en: 'Showers', uz: 'Jala' };
            return { emoji: '⛈️', ru: 'Гроза', en: 'Storm', uz: 'Boʻron' };
        }
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
            if (!$('#profile-overlay').hidden) showProfile(); // обновить динамические тексты профиля

            // Re-render Google button if on registration screen
            if (typeof Auth !== 'undefined' && document.getElementById("google-signin-btn")) {
                Auth.initGoogleAuth();
            }
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
    // Image system (curated images + gradient fallback)
    // ============================================================

    const Images = {
        primaryFor(place) {
            if (place.image && /^https?:\/\//.test(place.image)) return place.image;
            return null;
        },
        renderHero(place, container) {
            const cat = CATEGORY_META[place.category] || { emoji: '📍', color: 'var(--accent)' };
            const url = this.primaryFor(place);

            container.innerHTML = `
                <div class="place__hero-img ${url ? 'skeleton is-loading' : ''}" id="hero-img"></div>
                <div class="place__hero-fallback" id="hero-fallback" style="background: linear-gradient(135deg, ${cat.color}, ${cat.color}88); display: ${url ? 'none' : 'grid'};">
                    <span>${cat.emoji}</span>
                </div>
                <div class="place__hero-overlay"></div>
                <div class="place__hero-status" id="hero-status"></div>`;

            if (!url) return;

            const img = new Image();
            img.onload = () => {
                const el = container.querySelector('#hero-img');
                if (!el) return;
                el.style.backgroundImage = `url('${url}')`;
                el.classList.remove('skeleton', 'is-loading');
                el.style.opacity = '1';
            };
            img.onerror = () => {
                const el = container.querySelector('#hero-img');
                const fb = container.querySelector('#hero-fallback');
                if (el) el.classList.remove('skeleton', 'is-loading');
                if (fb) fb.style.display = 'grid';
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
        $$('.js-theme-toggle [data-lucide]').forEach(icon => {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        });
        refreshIcons();
        // Update profile toggle
        const profToggle = $('#theme-toggle-profile');
        if (profToggle) profToggle.classList.toggle('is-active', isDark);
    }

    // Init theme (tiles, body class and toggle icons in one place)
    applyTheme(state.theme);

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
        // Init cluster if not exists
        if (!state.markerCluster) {
            state.markerCluster = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 50,
                spiderfyOnMaxZoom: true,
                disableClusteringAtZoom: 16
            });
            map.addLayer(state.markerCluster);
        }

        // Clear existing
        state.markerCluster.clearLayers();
        state.markers.clear();

        const all = [...state.places, ...state.events];
        const filtered = state.activeFilter === 'all'
            ? all
            : all.filter(p => p.category === state.activeFilter);

        filtered.forEach(place => {
            const status = getStatus(place);
            const isHot = status === 'fire' && place.fire >= 10;
            const marker = L.marker(place.coords, { icon: createMarkerIcon(status, isHot, false) });
            
            marker.on('click', e => {
                L.DomEvent.stopPropagation(e);
                showPlace(place);
            });
            
            state.markerCluster.addLayer(marker);
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

    // Уровни считаются из реальных действий пользователя
    const RANK_STEPS = [
        { min: 0, key: 'rank_1' },
        { min: 5, key: 'rank_2' },
        { min: 15, key: 'rank_3' },
        { min: 30, key: 'rank_4' }
    ];

    function getLevelInfo(votes) {
        let idx = 0;
        for (let i = 0; i < RANK_STEPS.length; i++) {
            if (votes >= RANK_STEPS[i].min) idx = i;
        }
        const next = RANK_STEPS[idx + 1] || null;
        return {
            level: idx + 1,
            rankKey: RANK_STEPS[idx].key,
            next,
            toNext: next ? next.min - votes : 0,
            progress: next ? (votes - RANK_STEPS[idx].min) / (next.min - RANK_STEPS[idx].min) : 1
        };
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

        // Уровень, ранг и прогресс — из реальной истории голосов
        const level = getLevelInfo(myVotes.length);
        const levelEl = $('#stat-level');
        if (levelEl) levelEl.textContent = level.level;
        const rankEl = $('#user-rank');
        if (rankEl) rankEl.textContent = i18n.t(level.rankKey);
        const fillEl = $('#level-fill');
        if (fillEl) fillEl.style.width = Math.round(level.progress * 100) + '%';
        const hintEl = $('#level-hint');
        if (hintEl) {
            hintEl.textContent = level.next
                ? `${myVotes.length}/${level.next.min} · ${i18n.t('level_hint')}`
                : i18n.t('level_max');
        }

        // Дата регистрации
        const sinceEl = $('#user-since');
        if (sinceEl) {
            if (state.user && state.user.regDate) {
                const locale = state.lang === 'en' ? 'en-US' : state.lang === 'uz' ? 'uz-UZ' : 'ru-RU';
                const date = new Date(state.user.regDate).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
                sinceEl.textContent = `${i18n.t('member_since')} ${date}`;
            } else {
                sinceEl.textContent = '';
            }
        }

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
                <span>${fresh.text}</span>
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
                    <span class="crowd-row__num">${crowd.estimate} ${i18n.t('people_suffix')}</span>
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

            <div class="chat">
                <div class="section-title" data-i18n="chat_title">${escapeHtml(i18n.t('chat_title'))}</div>
                <div class="chat__messages" id="chat-messages"></div>
                <form class="chat__form" id="chat-form">
                    <input type="text" class="chat__input" id="chat-input" maxlength="200"
                        placeholder="${escapeHtml(i18n.t('chat_placeholder'))}" autocomplete="off">
                    <button type="submit" class="chat__send" aria-label="Send">
                        <i data-lucide="send"></i>
                    </button>
                </form>
                <p class="chat__note">${escapeHtml(i18n.t('chat_note'))}</p>
            </div>

            <div style="margin-top: 8px; display: flex; gap: 10px;">
                <button class="btn btn--taxi" style="flex: 1.2;" id="taxi-btn">
                    <span class="btn--taxi__emoji">🚕</span> <span data-i18n="taxi_btn">Такси сюда</span>
                </button>
                <button class="btn btn--secondary" style="flex: 1;" id="share-btn">
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

        // Wire chat
        Chat.render(place);
        const chatForm = $('#chat-form');
        if (chatForm) {
            chatForm.addEventListener('submit', e => {
                e.preventDefault();
                const inp = $('#chat-input');
                if (inp && Chat.send(place, inp.value)) inp.value = '';
            });
        }

        // Wire taxi button: deeplink открывает приложение Yandex Go (или веб-версию)
        const taxiBtn = $('#taxi-btn');
        if (taxiBtn) {
            taxiBtn.addEventListener('click', () => {
                const [lat, lon] = place.coords;
                // Универсальный deeplink Yandex Go: открывает приложение на мобильном, веб — на десктопе
                const url = `https://3.redirect.appmetrica.yandex.com/route?end-lat=${lat}&end-lon=${lon}&appmetrica_tracking_id=1178268795219780156&ref=vibecity`;
                window.open(url, '_blank', 'noopener');
            });
        }

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

        // Track personal history: one entry per place, removed on unvote
        state.myVotes = state.myVotes.filter(v => v.placeId !== place.name);
        if (place.myVibe) {
            state.myVotes.push({ placeId: place.name, vibe, ts: Date.now() });
        }
        localStorage.setItem('vibecity_my_votes', JSON.stringify(state.myVotes));

        if (place.isEvent) Storage.saveEvents(state.events);
        else Storage.savePlaces(state.places);

        // Re-render everything affected
        renderMarkers();
        flashMarker(place);
        showPlace(place);
        renderHotList();
        renderTopList();
        renderPulse();

        Toast.show(place.myVibe ? `${i18n.t('toast_voted')} · ${i18n.t(meta.labelKey)}` : i18n.t('toast_unvoted'), vibe);
    }

    // ============================================================
    // Чат мест: локальное демо-хранилище + модерация (антимат, rate-limit)
    // Структура готова к замене на Firebase/Supabase: load/save/send/render
    // ============================================================

    const Chat = {
        RATE_MS: 3000,
        MAX_LEN: 200,
        lastSent: 0,

        key(place) {
            return 'vibecity_chat:' + place.name;
        },
        load(place) {
            try { return JSON.parse(localStorage.getItem(this.key(place)) || '[]'); }
            catch { return []; }
        },
        save(place, msgs) {
            localStorage.setItem(this.key(place), JSON.stringify(msgs.slice(-50)));
        },

        // Замена «маскировочных» символов на кириллицу для проверки
        LOOKALIKES: {
            '@': 'а', '0': 'о', '3': 'з', '1': 'и', '!': 'и', '$': 'с', '4': 'ч',
            'a': 'а', 'b': 'б', 'c': 'с', 'e': 'е', 'k': 'к', 'm': 'м', 's': 'с',
            'o': 'о', 'p': 'р', 't': 'т', 'x': 'х', 'y': 'у', 'u': 'у', 'n': 'п'
        },
        // Корни мата: слово = (приставка?) + корень
        BAD_RU: /^(за|на|вы|до|от|пере|при|под|об|раз|рас|с|у|по|из|не)?(х[уy][йиеёя]|п[иe]зд|[её]б(ан|ат|ал|л[оаи]|ур|к|ыв|уч|ись?|ешь|ут|[её]т)|бл[яё](т|д)?$|бл[яё](т|д)|с[уy]к[аи]|с[уy]ч(к|ар)|м[уy]д(ак|ил|о)|г[ао]ндон|пид[оа]р|шлюх|з[ао]луп|др[оа]ч|мраз|чмо)/,
        BAD_EN: /^(fuck|fck|fuk|shit|bitch|cunt|dick|asshole|whore|jalab|qanjiq|dalbayob|qotoq|haromi|pid[oa]r|pidr|suka|blya|mudak|xu[iy]|hu[iy]|pizd|zaeb|[ye]ban|gandon|dolbo)/,

        censor(text) {
            return text.split(/(\s+)/).map(tok => {
                if (!tok.trim()) return tok;
                const plain = tok.toLowerCase().replace(/[^a-zа-яё0-9@!$ʻ']/gi, '');
                const cyr = plain.replace(/[a-z0-9@!$]/g, ch => this.LOOKALIKES[ch] || ch);
                if (this.BAD_EN.test(plain) || this.BAD_RU.test(cyr)) return '✱✱✱';
                return tok;
            }).join('');
        },

        send(place, rawText) {
            const text = rawText.trim().slice(0, this.MAX_LEN);
            if (!text) return false;
            const now = Date.now();
            if (now - this.lastSent < this.RATE_MS) {
                Toast.show(i18n.t('chat_slow'), '⏳');
                return false;
            }
            this.lastSent = now;
            const msgs = this.load(place);
            msgs.push({
                user: state.user ? state.user.name : i18n.t('feed_you'),
                avatar: state.user ? state.user.avatar : null,
                text: this.censor(text),
                ts: now
            });
            this.save(place, msgs);
            this.render(place);
            return true;
        },

        render(place) {
            const box = $('#chat-messages');
            if (!box) return;
            const msgs = this.load(place);
            if (msgs.length === 0) {
                box.innerHTML = `<div class="chat__empty">${escapeHtml(i18n.t('chat_empty'))}</div>`;
                return;
            }
            box.innerHTML = msgs.map(m => `
                <div class="chat-msg">
                    ${m.avatar
                        ? `<img class="chat-msg__avatar" src="${escapeHtml(m.avatar)}" alt="">`
                        : '<div class="chat-msg__avatar chat-msg__avatar--empty">👤</div>'}
                    <div class="chat-msg__body">
                        <div class="chat-msg__head">
                            <span class="chat-msg__name">${escapeHtml(m.user || '')}</span>
                            <span class="chat-msg__time">${relativeTime(m.ts)}</span>
                        </div>
                        <div class="chat-msg__text">${escapeHtml(m.text)}</div>
                    </div>
                </div>`).join('');
            box.scrollTop = box.scrollHeight;
        }
    };

    // ============================================================
    // Activity feed
    // ============================================================

    // Лента показывает только реальные записи: твои вайб-чеки и свежие события афиши
    function addFeedItem(item) {
        // Один актуальный вайб-чек на место — без спама при переключении голоса
        if (!item.type) {
            state.feed = state.feed.filter(f => f.type || f.place !== item.place);
        }
        state.feed.unshift({ ...item, user: state.user ? state.user.name : null });
        state.feed = state.feed.slice(0, 30);
        Storage.saveFeed(state.feed);
        renderFeed();
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
            if (item.type === 'event') {
                return `
                <li class="feed-item feed-item--event" data-url="${escapeHtml(item.url || '')}">
                    <div class="feed-item__icon feed-item__icon--event">✨</div>
                    <div class="feed-item__text">
                        <strong>${i18n.t('feed_new_event')}</strong>: ${escapeHtml(item.title || '')}
                        <div class="feed-item__time">${relativeTime(item.ts)}</div>
                    </div>
                </li>`;
            }
            const meta = VIBE_META[item.vibe] || VIBE_META['🔥'];
            const who = escapeHtml(item.user || item.anon || i18n.t('feed_you'));
            return `
                <li class="feed-item" data-place="${escapeHtml(item.place)}">
                    <div class="feed-item__icon feed-item__icon--${meta.key}">${item.vibe}</div>
                    <div class="feed-item__text">
                        <strong>${who}</strong> ${i18n.t('feed_in')} <strong>${escapeHtml(item.place)}</strong>
                        <div class="feed-item__time">${relativeTime(item.ts)}</div>
                    </div>
                </li>`;
        }).join('');

        $$('.feed-item', list).forEach(el => {
            el.addEventListener('click', () => {
                if (el.dataset.url) {
                    window.open(el.dataset.url, '_blank', 'noopener');
                    return;
                }
                const place = state.places.find(p => p.name === el.dataset.place);
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

        const eventsEl = $('#pulse-events');
        const votesEl = $('#pulse-votes');
        const vibeEl = $('#pulse-vibe');
        const barEl = $('#vibe-bar');

        if (eventsEl) eventsEl.textContent = Afisha.loaded ? String(Afisha.events.length) : '—';
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
                     style="background-image: ${thumb.fallback};">
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

        // Lazy-swap gradient placeholder for the real photo once it loads
        $$('.hot-item', list).forEach(el => {
            const place = state.places.find(p => p.name === el.dataset.place);
            if (!place) return;
            const url = Images.primaryFor(place);
            if (!url) return;

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
    // Live events from Afisha.uz (data/afisha.json, обновляется GitHub Action'ом)
    // ============================================================

    const AFISHA_CACHE_KEY = 'vibecity_afisha_cache';
    const AFISHA_SEEN_KEY = 'vibecity_afisha_seen';

    const AFISHA_META = {
        concert: { icon: 'music', labelKey: 'afisha_concert', color: '#a855f7' },
        theatre: { icon: 'drama', labelKey: 'afisha_theatre', color: '#38bdf8' },
        exhibition: { icon: 'image', labelKey: 'afisha_exhibition', color: '#ec4899' },
        city: { icon: 'building-2', labelKey: 'afisha_city', color: '#10b981' }
    };

    const Afisha = {
        events: [],
        updatedAt: null,
        loaded: false,
        layer: null,

        async init() {
            renderEvents(); // показываем skeleton, пока грузится
            try {
                const res = await fetch('data/afisha.json', { cache: 'no-cache' });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                this.apply(data);
                localStorage.setItem(AFISHA_CACHE_KEY, JSON.stringify(data));
            } catch (err) {
                // оффлайн или файл ещё не сгенерирован — используем последний кэш
                try { this.apply(JSON.parse(localStorage.getItem(AFISHA_CACHE_KEY))); } catch { /* ignore */ }
            }
            this.loaded = true;
            this.pushNewToFeed();
            renderEvents();
            this.renderMapMarkers();
            renderPulse();
        },

        apply(data) {
            if (!data || !Array.isArray(data.events)) return;
            this.events = data.events;
            this.updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
        },

        // Свежие события попадают в ленту активности как реальные записи
        pushNewToFeed() {
            let seen;
            try { seen = new Set(JSON.parse(localStorage.getItem(AFISHA_SEEN_KEY) || '[]')); }
            catch { seen = new Set(); }
            const isFirstRun = seen.size === 0;

            const fresh = this.events.filter(e =>
                !seen.has(e.id) && Date.now() - e.published < 48 * 60 * 60 * 1000);

            // На первом запуске не заваливаем ленту — только 3 самых свежих
            fresh.slice(0, isFirstRun ? 3 : fresh.length).forEach(e => {
                state.feed.push({ type: 'event', title: e.title, url: e.url, category: e.category, ts: e.published });
            });
            state.feed.sort((a, b) => b.ts - a.ts);
            state.feed = state.feed.slice(0, 30);
            Storage.saveFeed(state.feed);
            renderFeed();

            this.events.forEach(e => seen.add(e.id));
            localStorage.setItem(AFISHA_SEEN_KEY, JSON.stringify([...seen].slice(-300)));
        },

        // События с распознанной площадкой — маркерами на карту
        renderMapMarkers() {
            if (!this.layer) this.layer = L.layerGroup().addTo(map);
            this.layer.clearLayers();
            this.events.filter(e => e.venue).forEach(e => {
                const marker = L.marker(e.venue.coords, { icon: createMarkerIcon('event', false, false) });
                marker.bindPopup(`
                    <div class="popup-vibe">
                        <strong>${escapeHtml(e.title)}</strong><br>
                        📍 ${escapeHtml(e.venue.name)}<br>
                        <a href="${escapeHtml(e.url)}" target="_blank" rel="noopener">${escapeHtml(i18n.t('event_read'))}</a>
                    </div>`);
                this.layer.addLayer(marker);
            });
        }
    };

    // ============================================================
    // Events list: локальные события + живая афиша
    // ============================================================

    function renderEvents() {
        const list = $('#events-list');
        if (!list) return;

        const updEl = $('#events-updated');
        if (updEl) {
            updEl.textContent = Afisha.updatedAt
                ? `${i18n.t('events_updated')} ${relativeTime(Afisha.updatedAt)}`
                : '';
        }

        // Локальные события (админка / телеграм-парсер)
        const localHtml = state.events.map(e => `
            <div class="event-item" data-event="${escapeHtml(e.name)}">
                <div class="event-item__badge"><i data-lucide="sparkles"></i></div>
                <div>
                    <div class="event-item__name">${escapeHtml(e.name)}</div>
                    <div class="event-item__time">${relativeTime(e.lastUpdate || Date.now())}</div>
                </div>
            </div>`).join('');

        // Живая афиша
        let afishaHtml;
        if (!Afisha.loaded) {
            afishaHtml = Array.from({ length: 3 },
                () => '<div class="event-card event-card--skeleton" aria-hidden="true"></div>').join('');
        } else {
            afishaHtml = Afisha.events.slice(0, 12).map(e => {
                const meta = AFISHA_META[e.category] || AFISHA_META.city;
                const thumbStyle = e.image
                    ? `background-image:url('${escapeHtml(e.image)}')`
                    : `background:linear-gradient(135deg, ${meta.color}, ${meta.color}88)`;
                return `
                <a class="event-card" href="${escapeHtml(e.url)}" target="_blank" rel="noopener">
                    <div class="event-card__thumb" style="${thumbStyle}"></div>
                    <div class="event-card__body">
                        <div class="event-card__meta">
                            <span class="event-card__cat" style="color:${meta.color}">
                                <i data-lucide="${meta.icon}"></i>${i18n.t(meta.labelKey)}
                            </span>
                            <span class="event-card__time">${relativeTime(e.published)}</span>
                        </div>
                        <div class="event-card__title">${escapeHtml(e.title)}</div>
                        ${e.venue ? `<div class="event-card__venue"><i data-lucide="map-pin"></i>${escapeHtml(e.venue.name)}</div>` : ''}
                    </div>
                </a>`;
            }).join('');
        }

        if (!localHtml && !afishaHtml) {
            list.innerHTML = `<div class="empty"><i data-lucide="calendar-x"></i><p data-i18n="empty_events">${i18n.t('empty_events')}</p></div>`;
            refreshIcons();
            return;
        }

        list.innerHTML = localHtml + afishaHtml;
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
            const matches = [...state.places, ...state.events]
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
                    const place = [...state.places, ...state.events].find(p => p.name === item.dataset.name);
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
        Toast.show(i18n.t(state.theme === 'dark' ? 'theme_dark_on' : 'theme_light_on'), state.theme === 'dark' ? '🌙' : '☀️');
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

    $$('.js-profile-btn').forEach(btn => btn.addEventListener('click', showProfile));

    // Варианты аватаров: текущий + стабильный набор DiceBear
    function getAvatarOptions(current) {
        const seeds = ['Felix', 'Aneka', 'Milo', 'Max', 'Luna', 'Jack', 'Zoe', 'Leo'];
        const urls = seeds.map(s => `https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`);
        if (current && !urls.includes(current)) urls.unshift(current);
        return urls.slice(0, 9);
    }

    // Своя аватарка: уменьшаем до 128×128 (кроп по центру) и храним как data URL
    function pickAvatarFile(onPicked) {
        const input = $('#avatar-file');
        if (!input) return;
        input.value = '';
        input.onchange = () => {
            const file = input.files && input.files[0];
            if (!file || !file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onerror = () => Toast.show(i18n.t('avatar_error'), '⚠️');
            reader.onload = () => {
                const img = new Image();
                img.onerror = () => Toast.show(i18n.t('avatar_error'), '⚠️');
                img.onload = () => {
                    const size = 128;
                    const canvas = document.createElement('canvas');
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    const min = Math.min(img.width, img.height);
                    const sx = (img.width - min) / 2;
                    const sy = (img.height - min) / 2;
                    ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
                    onPicked(canvas.toDataURL('image/jpeg', 0.85));
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    // Плитка «Своё фото» для сеток выбора аватара
    function makeUploadTile(onPicked) {
        const tile = document.createElement('div');
        tile.className = 'avatar-option avatar-option--upload';
        tile.title = i18n.t('upload_avatar');
        tile.innerHTML = '<i data-lucide="camera"></i>';
        tile.addEventListener('click', () => pickAvatarFile(onPicked));
        return tile;
    }

    $('#edit-profile-btn').addEventListener('click', () => {
        if (!state.user) return;
        $('#profile-view-mode').hidden = true;
        $('#profile-edit-mode').hidden = false;
        $('#edit-name').value = state.user.name;

        // Render avatar options in edit mode
        const grid = $('#edit-avatar-grid');
        grid.innerHTML = '';

        const select = (opt, url) => {
            $$('.avatar-option', grid).forEach(el => el.classList.remove('is-selected'));
            opt.classList.add('is-selected');
            state.tempEditAvatar = url;
        };

        // Плитка загрузки своего фото
        const uploadTile = makeUploadTile(dataUrl => {
            let custom = grid.querySelector('.avatar-option--custom');
            if (!custom) {
                custom = document.createElement('div');
                custom.className = 'avatar-option avatar-option--custom';
                uploadTile.after(custom);
            }
            custom.innerHTML = `<img src="${dataUrl}" alt="Avatar">`;
            custom.onclick = () => select(custom, dataUrl);
            select(custom, dataUrl);
        });
        grid.appendChild(uploadTile);

        getAvatarOptions(state.user.avatar).forEach(url => {
            const opt = document.createElement('div');
            opt.className = `avatar-option ${url === state.user.avatar ? 'is-selected' : ''}`;
            opt.innerHTML = `<img src="${url}" alt="Avatar">`;
            opt.addEventListener('click', () => select(opt, url));
            grid.appendChild(opt);
        });
        state.tempEditAvatar = state.user.avatar;
        refreshIcons();
    });

    $('#cancel-edit-btn').addEventListener('click', () => {
        $('#profile-view-mode').hidden = false;
        $('#profile-edit-mode').hidden = true;
    });

    $('#save-profile-btn').addEventListener('click', () => {
        const newName = $('#edit-name').value.trim().replace(/\s+/g, ' ');
        if (newName.length < 2) {
            $('#edit-name').classList.add('is-invalid');
            Toast.show(i18n.t('reg_name_error'), '🤔');
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
                    }).addTo(map).bindPopup(escapeHtml(i18n.t('toast_loc_success')));
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

    // Escape closes topmost overlay, then the detail view
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (!$('#metro-overlay').hidden) { $('#metro-overlay').hidden = true; return; }
        if (!$('#profile-overlay').hidden) { closeProfile(); return; }
        if (!$('#view-detail').hidden) showDefaultView();
    });

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
        function render() {
            const container = $('#metro-map-svg-container');
            if (!container) return;

            // На мобильных убираем центрирование через стили
            if (window.innerWidth <= 768) {
                container.style.justifyContent = 'flex-start';
                container.style.alignItems = 'flex-start';
            }

            const isMobile = window.innerWidth <= 768;
            const nodeRadius = isMobile ? 6 : 5;
            const transferRadius = isMobile ? 8 : 7;
            const fontSize = isMobile ? 13 : 11;

            const svg = `
                <svg viewBox="0 0 850 700" width="100%" height="auto" class="metro-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    
                    <!-- Lines -->
                    ${METRO_LINES.map(line => `
                        <path d="M ${line.stations.map(s => `${s.x},${s.y}`).join(' L ')}" 
                              fill="none" 
                              stroke="${line.color}" 
                              stroke-width="${isMobile ? 8 : 6}" 
                              stroke-linecap="round" 
                              stroke-linejoin="round"
                              opacity="1" />
                    `).join('')}

                    <!-- Stations -->
                    ${METRO_LINES.flatMap(line => line.stations.map(s => {
                let dx = 12, dy = 4, anchor = 'start';
                if (s.labelPos === 'top') { dx = 0; dy = -16; anchor = 'middle'; }
                if (s.labelPos === 'bottom') { dx = 0; dy = 24; anchor = 'middle'; }
                if (s.labelPos === 'left') { dx = -12; dy = 4; anchor = 'end'; }
                if (s.labelPos === 'right') { dx = 12; dy = 4; anchor = 'start'; }

                return `
                            <g class="metro-node" data-name="${s.name}" data-coords="${s.coords.join(',')}" style="cursor: pointer;">
                                <circle cx="${s.x}" cy="${s.y}" r="${s.transfer ? transferRadius : nodeRadius}"
                                        fill="${s.transfer ? 'white' : line.color}"
                                        stroke="${line.color}"
                                        stroke-width="2.5" />
                                ${s.hideLabel ? '' : `<text x="${s.x + dx}" y="${s.y + dy}"
                                      fill="currentColor"
                                      font-size="${fontSize}"
                                      font-weight="${s.transfer ? 'bold' : '600'}"
                                      text-anchor="${anchor}"
                                      class="metro-text">${s.name}</text>`}
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
                        .setContent(`<div class="popup-vibe"><strong>${escapeHtml(name)}</strong><br>${escapeHtml(i18n.t('metro_station'))}</div>`)
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
        } else if (e.key && e.key.startsWith('vibecity_chat:')) {
            // Синхронизация чата между вкладками
            if (state.currentPlace && e.key === 'vibecity_chat:' + state.currentPlace.name) {
                Chat.render(state.currentPlace);
            }
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
            $('#reg-name').addEventListener('keydown', e => {
                if (e.key === 'Enter') this.handleRegister();
            });

            // Clear validation error as soon as the user types
            ['#reg-name', '#edit-name'].forEach(sel => {
                const input = $(sel);
                if (input) input.addEventListener('input', () => input.classList.remove('is-invalid'));
            });

            // Allow selecting avatar (плитка загрузки обрабатывается отдельно)
            $('#avatar-grid').addEventListener('click', (e) => {
                const option = e.target.closest('.avatar-option');
                if (option && option.dataset.url) {
                    $$('.avatar-option').forEach(el => el.classList.remove('is-selected'));
                    option.classList.add('is-selected');
                    this.selectedAvatar = option.dataset.url;
                }
            });

            // Google Sign-In Initialization
            this.initGoogleAuth();

            // Logout button
            $('#logout-btn').addEventListener('click', () => this.logout());
        },

        logout() {
            if (!confirm(i18n.t('logout_confirm'))) return;

            // Clear Google session if active
            if (state.user && state.user.authMethod === 'google' && typeof google !== 'undefined') {
                google.accounts.id.disableAutoSelect();
            }

            // Clear state and storage
            state.user = null;
            Storage.saveUser(null);
            
            // Show registration again
            closeProfile();
            this.showRegistration();
            
            Toast.show(i18n.t('logged_out'), '👋');
        },

        initGoogleAuth() {
            if (typeof google === 'undefined') {
                setTimeout(() => this.initGoogleAuth(), 500);
                return;
            }

            // Clear previous button if any
            const btnContainer = document.getElementById("google-signin-btn");
            if (btnContainer) btnContainer.innerHTML = '';

            google.accounts.id.initialize({
                client_id: "967135382385-eghfamejucht6odhrlrv53h8dc0gddgm.apps.googleusercontent.com",
                callback: (res) => this.handleGoogleResponse(res)
            });

            google.accounts.id.renderButton(
                btnContainer,
                { 
                    theme: state.theme === 'dark' ? "filled_black" : "outline", 
                    size: "large", 
                    width: 280, 
                    text: "continue_with",
                    locale: state.lang // Устанавливаем язык кнопки Google
                }
            );
        },

        handleGoogleResponse(response) {
            try {
                // Декодируем JWT токен от Google (на клиенте)
                const base64Url = response.credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const user = JSON.parse(jsonPayload);
                
                // Сохраняем данные из Google в наш профиль
                state.user = {
                    name: user.name,
                    avatar: user.picture,
                    email: user.email,
                    regDate: Date.now(),
                    authMethod: 'google'
                };

                Storage.saveUser(state.user);
                this.updateUI();
                $('#register-overlay').hidden = true;
                
                Toast.show(`${i18n.t('welcome_short')}, ${user.given_name}!`, '🚀');
            } catch (e) {
                console.error("Google Auth Error:", e);
                Toast.show(i18n.t('google_error'), "❌");
            }
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

            // Плитка «Своё фото» первой в сетке
            const uploadTile = makeUploadTile(dataUrl => {
                let custom = grid.querySelector('.avatar-option--custom');
                if (!custom) {
                    custom = document.createElement('div');
                    custom.className = 'avatar-option avatar-option--custom';
                    uploadTile.after(custom);
                }
                custom.dataset.url = dataUrl;
                custom.innerHTML = `<img src="${dataUrl}" alt="Avatar">`;
                $$('.avatar-option', grid).forEach(el => el.classList.remove('is-selected'));
                custom.classList.add('is-selected');
                this.selectedAvatar = dataUrl;
            });
            grid.prepend(uploadTile);

            this.selectedAvatar = this.avatars[0];
            refreshIcons();
        },

        handleRegister() {
            const nameInput = $('#reg-name');
            const name = nameInput.value.trim().replace(/\s+/g, ' ');

            if (name.length < 2) {
                nameInput.classList.add('is-invalid');
                Toast.show(i18n.t('reg_name_error'), '🤔');
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
            Toast.show(`${i18n.t('hello')}, ${name}!`, '👋');
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
    // Metro Map Data & Markers
    // ============================================================

    const METRO_LINES = [
        {
            id: 'chilanzar',
            color: '#ef4444',
            label: 'Chilonzor',
            stations: [
                { name: 'Chinor', x: 50, y: 550, coords: [41.2222, 69.1950], transfer: 'halqa', labelPos: 'left' },
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
                { name: 'Doʻstlik', x: 750, y: 550, coords: [41.2950, 69.3180], transfer: 'halqa', labelPos: 'right' }
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
        },
        {
            id: 'halqa',
            color: '#f59e0b',
            label: 'Halqa (Circle)',
            stations: [
                { name: 'Doʻstlik-2', x: 760, y: 585, coords: [41.2930, 69.3205], transfer: 'uzbekistan', labelPos: 'right' },
                { name: 'Tuzel', x: 700, y: 620, coords: [41.2820, 69.3370], labelPos: 'top' },
                { name: 'Yashnobod', x: 640, y: 645, coords: [41.2725, 69.3425], labelPos: 'bottom' },
                { name: 'Rohat', x: 580, y: 655, coords: [41.2630, 69.3390], labelPos: 'top' },
                { name: 'Oʻzgarish', x: 520, y: 660, coords: [41.2545, 69.3325], labelPos: 'bottom' },
                { name: 'Qoʻyliq', x: 460, y: 660, coords: [41.2460, 69.3245], labelPos: 'top' },
                { name: 'Matonat', x: 400, y: 660, coords: [41.2410, 69.3115], labelPos: 'bottom' },
                { name: 'Qiyot', x: 340, y: 655, coords: [41.2365, 69.2985], labelPos: 'top' },
                { name: 'Tolariq', x: 280, y: 648, coords: [41.2325, 69.2855], labelPos: 'bottom' },
                { name: 'Xonobod', x: 220, y: 638, coords: [41.2285, 69.2725], labelPos: 'top' },
                { name: 'Quruvchilar', x: 160, y: 622, coords: [41.2250, 69.2595], labelPos: 'bottom' },
                { name: 'Turon', x: 105, y: 600, coords: [41.2220, 69.2465], labelPos: 'left' },
                { name: 'Qipchoq', x: 65, y: 575, coords: [41.2200, 69.2335], labelPos: 'right' },
                { name: 'Chinor', x: 50, y: 550, coords: [41.2222, 69.1950], transfer: 'chilanzar', hideLabel: true }
            ]
        }
    ];

    let metroLayer = L.layerGroup();

    function renderMetroMarkers() {
        if (!map.getPane('metroPane')) {
            map.createPane('metroPane');
            map.getPane('metroPane').style.zIndex = 250;
        }

        metroLayer.clearLayers();

        METRO_LINES.forEach(line => {
            line.stations.forEach(s => {
                if (s.hideLabel) return; // станция уже отмечена другой линией
                const icon = L.divIcon({
                    className: 'metro-label-marker',
                    html: `
                        <div style="display: flex; align-items: center; gap: 4px; pointer-events: none;">
                            <div style="width: 6px; height: 6px; background: ${line.color}; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 2px rgba(0,0,0,0.3);"></div>
                            <span style="
                                font-family: 'Inter', sans-serif; 
                                font-size: 12px; 
                                font-weight: 600; 
                                color: var(--text-secondary); 
                                text-shadow: 0 0 4px var(--bg-panel);
                                white-space: nowrap;
                                opacity: 0.7;
                                pointer-events: none;
                            ">${s.name}</span>
                        </div>
                    `,
                    iconSize: [0, 0],
                    iconAnchor: [0, 0]
                });

                L.marker(s.coords, { 
                    icon: icon,
                    pane: 'metroPane',
                    interactive: false 
                }).addTo(metroLayer);
            });
        });

        // Первоначальная проверка зума
        updateMetroVisibility();
    }

    function updateMetroVisibility() {
        if (map.getZoom() >= 13) {
            if (!map.hasLayer(metroLayer)) metroLayer.addTo(map);
        } else {
            if (map.hasLayer(metroLayer)) map.removeLayer(metroLayer);
        }
    }

    // Слушатель изменения зума
    map.on('zoomend', updateMetroVisibility);

    // ============================================================
    // Init
    // ============================================================

    function init() {
        Perf.init(); // Detect device power first
        Weather.init(); // Load weather
        Auth.init();
        Afisha.init(); // Живые события с Afisha.uz
        // Сохраняем базу мест (первый запуск + результаты миграции координат/фото)
        Storage.savePlaces(state.places);
        renderMarkers();
        renderMetroMarkers();
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
