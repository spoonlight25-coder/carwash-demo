/*
  НАСТРОЙКИ САЙТА — всё, что видно на сайте, меняется здесь.
  1. Меняй текст внутри кавычек '...'.
  2. Сохрани файл (Ctrl+S) и обнови страницу в браузере (F5).
  Фото: положи файл в папку images и впиши путь, например 'images/moyka.jpg'.
*/
window.SITE = {
  name: 'ААА',
  tagline: 'автомойка и детейлинг',
  phone: '+7(905)223-15-55',
  address: 'Санкт-Петербург, Московский проспект, 191а',
  mapUrl: '', // ссылка на карту; если пусто — адрес откроется в Яндекс Картах
  hours: { label: 'Ежедневно', open: '09:00', close: '21:00' },
  accentColor: '#4cc9f0', // главный цвет кнопок и акцентов
  socials: {
    // ссылки на соцсети; пустые не показываются
    telegram: 'https://t.me/matrica2019',
    whatsapp: '',
    vk: 'https://vk.com/avtotexcentraaa',
  },

  hero: {
    eyebrow: 'Автомойка и детейлинг в Санкт-Петербурге',
    title: 'Чистая машина',
    titleAccent: 'без очереди',
    text: 'Запишитесь онлайн за минуту: выберите услугу, день и время. К вашему приезду бокс уже будет свободен.',
    image: 'images/hero.svg',
    stats: [
      { value: '5.0 ★', label: 'рейтинг на картах' },
      { value: '12 000+', label: 'чистых машин' },
      { value: 'от 30 мин', label: 'экспресс-мойка' },
    ],
  },

  // Услуги: price — как показывать цену, duration — сколько минут занимает (от этого зависят свободные слоты),
  // category — вкладка, в которой показывается услуга (вкладки идут в порядке появления)
  services: [
    {
      id: 'tech-rinse',
      name: 'Технический облив',
      description: 'Быстро смыть грязь водой, без пены и сушки.',
      price: 'от 300 ₽',
      duration: 15,
      category: 'Мойка',
    },
    {
      id: 'express',
      name: 'Экспресс мойка',
      description: 'Быстрая мойка кузова, когда нужно просто освежить машину.',
      price: 'от 400 ₽',
      duration: 30,
      category: 'Мойка',
    },
    {
      id: 'standard',
      name: 'Стандарт',
      description: 'Классическая мойка кузова и сушка.',
      price: 'от 800 ₽',
      duration: 45,
      category: 'Мойка',
    },
    {
      id: 'standard-plus',
      name: 'Стандарт+',
      description: 'Стандартная мойка с расширенным набором работ.',
      price: 'от 1 500 ₽',
      duration: 60,
      category: 'Мойка',
    },
    {
      id: 'smart',
      name: 'Умная мойка',
      description: 'Программа подбирается под степень загрязнения кузова.',
      price: 'от 2 000 ₽',
      duration: 60,
      category: 'Мойка',
    },
    {
      id: 'lux',
      name: 'Мойка Люкс',
      description: 'Тщательная мойка с повышенным вниманием к деталям.',
      price: 'от 1 800 ₽',
      duration: 60,
      category: 'Мойка',
    },
    {
      id: 'premium',
      name: 'Премиум',
      description: 'Максимальная программа мойки: чистота и блеск кузова.',
      price: 'от 2 500 ₽',
      duration: 90,
      category: 'Мойка',
    },
    {
      id: 'premium-quartz',
      name: 'Премиум кварц',
      description: 'Премиум-мойка с защитным кварцевым покрытием.',
      price: 'от 3 000 ₽',
      duration: 120,
      category: 'Мойка',
    },
    {
      id: 'interior-clean',
      name: 'Уборка салона',
      description: 'Комплексная уборка салона внутри.',
      price: 'от 800 ₽',
      duration: 60,
      category: 'Салон',
    },
    {
      id: 'vacuum',
      name: 'Пылесос салона',
      description: 'Удаляем пыль, песок и мусор с сидений и ковриков.',
      price: 'от 500 ₽',
      duration: 20,
      category: 'Салон',
    },
    {
      id: 'plastic',
      name: 'Уборка пластика',
      description: 'Чистим торпедо, двери и пластиковые панели.',
      price: 'от 300 ₽',
      duration: 20,
      category: 'Салон',
    },
    {
      id: 'trunk',
      name: 'Уборка багажника',
      description: 'Пылесос и протирка багажного отделения.',
      price: 'от 400 ₽',
      duration: 20,
      category: 'Салон',
    },
    {
      id: 'glass',
      name: 'Мойка стёкол',
      description: 'Моем стёкла без разводов.',
      price: 'от 300 ₽',
      duration: 20,
      category: 'Дополнительно',
    },
    {
      id: 'mats',
      name: 'Мойка ковров за 4 шт',
      description: 'Моем комплект из четырёх ковриков.',
      price: 'от 200 ₽',
      duration: 30,
      category: 'Салон',
    },
    {
      id: 'tyre-shine',
      name: 'Чернение резины',
      description: 'Возвращаем шинам глубокий чёрный цвет.',
      price: 'от 200 ₽',
      duration: 15,
      category: 'Дополнительно',
    },
  ],

  // Иконки: shield, clock, star, drop, sparkle, gem, car, calendar
  advantages: [
    { icon: 'drop', title: 'Безопасная химия', text: 'Мягкие составы, которые не вредят лаку и пластику.' },
    { icon: 'clock', title: 'Точно ко времени', text: 'Записались на 14:00 — в 14:00 машина уже в боксе.' },
    { icon: 'shield', title: 'Гарантия результата', text: 'Что-то не понравилось — перемоем бесплатно.' },
    { icon: 'gem', title: 'Опытные мастера', text: 'Каждый мойщик проходит обучение и стажировку.' },
  ],

  steps: [
    { title: 'Выберите услугу', text: 'В форме записи или в списке услуг выше.' },
    { title: 'Выберите время', text: 'Видны только свободные окна — без звонков.' },
    { title: 'Оставьте телефон', text: 'Администратор подтвердит запись за пару минут.' },
    { title: 'Приезжайте', text: 'Бокс свободен, мастер ждёт. Кофе — за наш счёт.' },
  ],

  // Отзывы: две кнопки на карты. rating и count — необязательные (пусто — не показываются).
  // Если url у Яндекс Карт пустой, откроется поиск по названию и адресу — лучше вставить прямую ссылку на отзывы.
  reviewLinks: [
    {
      name: 'Яндекс Карты',
      badge: 'Я',
      color: '#fc3f1d',
      url: 'https://yandex.ru/maps/org/1239922708/reviews/',
      rating: '5.0',
      count: '1518 отзывов',
    },
    {
      name: '2ГИС',
      badge: '2',
      color: '#19aa1e',
      url: 'https://2gis.ru/spb/firm/5348552838600180/tab/reviews',
      rating: '4.9',
      count: '825 отзывов',
    },
  ],

  // Примеры работ — фото в ленте внизу страницы
  works: [
    // services — коды услуг из списка выше (поле id); подпись под фото соберётся из их названий
    { image: 'images/work-1.svg', title: 'Mercedes E-класс', services: ['premium-quartz'] },
    { image: 'images/work-2.svg', title: 'Volkswagen Tiguan', services: ['interior-clean'] },
    { image: 'images/work-3.svg', title: 'BMW 5 серии', services: ['lux'] },
    { image: 'images/work-4.svg', title: 'Toyota Camry', services: ['premium', 'glass'] },
    { image: 'images/work-5.svg', title: 'Hyundai Creta', services: ['vacuum', 'plastic'] },
    { image: 'images/work-6.svg', title: 'Audi Q7', services: ['standard', 'tyre-shine'] },
    { image: 'images/work-7.svg', title: 'Kia Sportage', services: ['express'] },
    { image: 'images/work-8.svg', title: 'Lexus RX', services: ['standard-plus', 'mats'] },
  ],
  worksSpeed: 7, // сколько секунд на одно фото в ленте: больше — медленнее
  worksHoverSpeed: 0.4, // скорость ленты при наведении мыши: 1 — как обычно, 0.4 — в 2.5 раза медленнее, 0 — стоп

  booking: {
    daysAhead: 14, // на сколько дней вперёд можно записаться
    slotStep: 30, // шаг времени в минутах: 09:00, 09:30, 10:00...
    leadMinutes: 30, // за сколько минут до начала можно записаться на сегодня
    closedWeekdays: [], // выходные дни: 0 — вс, 1 — пн, ... 6 — сб. Например [0] — не работаем в воскресенье
    sendTo: '', // куда отправлять заявки. Работает, когда сайт запущен через carwash-bot/server.py. Пусто — демо-режим
    busyUrl: '', // откуда брать занятое время (количество боксов задаётся в carwash-bot/.env, BOXES). Пусто — показываем всё время
    successText: 'Администратор позвонит в течение 10 минут, чтобы подтвердить запись.',
  },

  texts: {
    bookingTitle: 'Онлайн-запись',
    bookingSubtitle: 'Без звонков и ожидания — займёт минуту',
    bookingButton: 'Записаться',
    servicesEyebrow: 'Услуги и цены',
    servicesTitle: 'Чем можем помочь',
    servicesLead: 'Цены для легковых авто. Для кроссоверов и минивэнов стоимость уточнит администратор.',
    whyEyebrow: 'Почему мы',
    whyTitle: 'Моем так, как мыли бы свою',
    stepsEyebrow: 'Как это работает',
    stepsTitle: 'Четыре шага до чистой машины',
    worksEyebrow: 'Портфолио',
    worksTitle: 'Примеры наших работ',
    worksLead: 'Машины наших клиентов после визита к нам.',
    reviewsEyebrow: 'Отзывы',
    reviewsTitle: 'Наши отзывы на картах',
    reviewsLead: 'Нам доверяют сотни клиентов. Почитайте, что пишут о нас на Яндекс Картах и в 2ГИС.',
    reviewsButton: 'Читать отзывы',
    contactsEyebrow: 'Контакты',
    contactsTitle: 'Ждём вас',
    ctaTitle: 'Запишитесь на удобное время',
    ctaText: 'Выберите услугу и свободное окно — запись займёт меньше минуты.',
  },
};
