(function () {
  'use strict';

  const S = window.SITE;
  if (!S) {
    document.body.textContent = 'Не найден config.js — он должен лежать рядом с index.html.';
    return;
  }

  const svg = (body) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';

  const ICONS = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
    star: svg('<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'),
    drop: svg('<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.3 0z"/>'),
    sparkle: svg('<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/><path d="M19 3v4M17 5h4"/>'),
    gem: svg('<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8 9l4-6 4 6z"/>'),
    calendar: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    check: svg('<path d="M20 6L9 17l-5-5"/>'),
    car: svg('<path d="M5 17H3v-4.5l2-4.5a2 2 0 0 1 1.8-1h10.4a2 2 0 0 1 1.8 1l2 4.5V17h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M9.5 17h5M4 12h16"/>'),
    telegram: svg('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>'),
    whatsapp: svg('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z"/>'),
    vk: '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="16" text-anchor="middle" font-size="10" ' +
      'font-weight="800" fill="currentColor" font-family="Manrope, sans-serif">VK</text></svg>',
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const get = (path) => path.split('.').reduce((obj, key) => (obj == null ? undefined : obj[key]), S);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function icon(name, className) {
    const node = el('span', className || 'icon');
    node.innerHTML = ICONS[name] || ICONS.sparkle;
    return node;
  }

  const pad = (n) => String(n).padStart(2, '0');
  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };
  const fromMinutes = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  const dayKey = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const shortDate = (d) => d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
  const longDate = (d) => d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });

  function formatDuration(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (!h) return m + ' мин';
    return m ? `${h} ч ${m} мин` : `${h} ч`;
  }

  const categoryOf = (s) => s.category || 'Услуги';
  const categories = [...new Set(S.services.map(categoryOf))];

  // Ряд кнопок-вкладок; возвращает функцию, которая переключает вкладку
  function makeTabs(container, onSelect) {
    if (categories.length < 2) container.hidden = true;
    const buttons = categories.map((cat) => {
      const btn = el('button', 'tab');
      btn.type = 'button';
      btn.append(cat, el('span', 'tab__count', String(S.services.filter((s) => categoryOf(s) === cat).length)));
      btn.addEventListener('click', () => select(cat));
      container.append(btn);
      return btn;
    });
    function select(cat) {
      buttons.forEach((btn, i) => {
        const active = categories[i] === cat;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      onSelect(cat);
    }
    select(categories[0]);
    return select;
  }

  const phoneHref = 'tel:+' + S.phone.replace(/\D/g, '').replace(/^8/, '7');
  const mapUrl = S.mapUrl || 'https://yandex.ru/maps/?text=' + encodeURIComponent(S.address);

  function hideSection(id) {
    $('#' + id).hidden = true;
    $$(`a[href="#${id}"]`).forEach((a) => { a.hidden = true; });
  }

  function setupBasics() {
    document.title = `${S.name} — ${S.tagline}`;
    $('meta[name="description"]').content = S.hero.text;
    if (S.accentColor) document.documentElement.style.setProperty('--accent', S.accentColor);

    $$('[data-text]').forEach((node) => {
      const value = get(node.dataset.text);
      if (value == null || value === '') node.hidden = true;
      else node.textContent = value;
    });
    $$('[data-icon]').forEach((node) => {
      node.innerHTML = ICONS[node.dataset.icon] || '';
      node.classList.add('icon');
    });
    $$('[data-phone]').forEach((node) => { node.href = phoneHref; });
    $('#hero-bg').style.backgroundImage = `url(${JSON.stringify(S.hero.image)})`;
    $('#copyright').textContent = `© ${new Date().getFullYear()} ${S.name} — ${S.tagline}`;

    const stats = $('#hero-stats');
    (S.hero.stats || []).forEach((s) => {
      const item = el('li', 'stat');
      item.append(el('div', 'stat__value', s.value), el('div', 'stat__label', s.label));
      stats.append(item);
    });
  }

  function setupBooking() {
    const B = Object.assign(
      { daysAhead: 14, slotStep: 30, leadMinutes: 30, closedWeekdays: [], sendTo: '', busyUrl: '' },
      S.booking
    );
    const open = toMinutes(S.hours.open);
    const close = toMinutes(S.hours.close);
    const minDuration = Math.min(...S.services.map((s) => s.duration));
    const state = { serviceId: null, day: null, time: null };

    const form = $('#booking-form');
    const done = $('#booking-done');
    const card = $('#booking');
    const serviceBox = $('#service-options');
    const dayBox = $('#day-options');
    const slotBox = $('#slot-options');
    const summary = $('#booking-summary');
    const errorBox = $('#booking-error');
    const submit = $('#booking-submit');
    const submitHtml = submit.innerHTML;
    const phoneInput = form.elements.phone;
    let phoneDigits = '';

    const currentService = () => S.services.find((s) => s.id === state.serviceId);

    function option(name, value, className, children, onPick) {
      const label = el('label', 'opt ' + className);
      const input = el('input');
      input.type = 'radio';
      input.name = name;
      input.value = value;
      input.addEventListener('change', onPick);
      const box = el('span', 'opt__box');
      box.append(...children);
      label.append(input, box);
      return label;
    }

    function slotsFor(day, duration) {
      const now = new Date();
      const earliest = dayKey(day) === dayKey(now) ? now.getHours() * 60 + now.getMinutes() + B.leadMinutes : 0;
      const list = [];
      for (let t = open; t + duration <= close; t += B.slotStep) {
        if (t >= earliest) list.push(t);
      }
      return list;
    }

    S.services.forEach((s) => {
      const node = option('service', s.id, 'opt--service',
        [el('span', 'opt__title', s.name), el('span', 'opt__meta', s.price)],
        () => { state.serviceId = s.id; renderSlots(); update(); });
      node.dataset.category = categoryOf(s);
      serviceBox.append(node);
    });
    const showFormCategory = makeTabs($('#service-tabs'), (cat) => {
      serviceBox.querySelectorAll('.opt').forEach((node) => { node.hidden = node.dataset.category !== cat; });
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = 0; i < B.daysAhead; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (B.closedWeekdays.includes(d.getDay())) continue;
      if (i === 0 && !slotsFor(d, minDuration).length) continue;
      days.push(d);
    }

    const weekdayLabel = (d) => {
      const diff = Math.round((d - today) / 864e5);
      if (diff === 0) return 'сегодня';
      if (diff === 1) return 'завтра';
      return d.toLocaleDateString('ru-RU', { weekday: 'short' });
    };

    days.forEach((d) => {
      dayBox.append(option('day', dayKey(d), 'opt--day', [
        el('span', 'day__week', weekdayLabel(d)),
        el('span', 'day__num', String(d.getDate())),
        el('span', 'day__month', d.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '')),
      ], () => { state.day = d; renderSlots(); update(); }));
    });

    function selectFirstDay() {
      const first = dayBox.querySelector('input');
      if (!first) return;
      first.checked = true;
      state.day = days[0];
    }

    // Занятость боксов по дням: { boxes, busy: [[начало, конец], ...] } в минутах от полуночи
    const busyCache = {};
    let renderToken = 0;

    async function loadBusy(day, force) {
      if (!B.busyUrl) return null;
      const key = dayKey(day);
      const cached = busyCache[key];
      if (!force && cached && Date.now() - cached.at < 30000) return cached;
      try {
        const res = await fetch(`${B.busyUrl}?date=${key}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        busyCache[key] = { boxes: data.boxes, busy: data.busy, at: Date.now() };
      } catch (err) {
        delete busyCache[key];
        return null;
      }
      return busyCache[key];
    }

    function isFree(info, start, end) {
      if (!info) return true;
      const moments = [start, ...info.busy.map(([s]) => s).filter((s) => s > start && s < end)];
      return moments.every((m) => info.busy.filter(([s, e]) => s <= m && m < e).length < info.boxes);
    }

    async function renderSlots(force) {
      const token = ++renderToken;
      if (!state.day) {
        slotBox.replaceChildren(el('p', 'slots__empty', 'Свободных дней для записи нет — позвоните нам.'));
        return;
      }
      const day = state.day;
      if (B.busyUrl && (force || !busyCache[dayKey(day)])) {
        slotBox.replaceChildren(el('p', 'slots__empty', 'Смотрим свободное время…'));
      }
      const info = await loadBusy(day, force);
      if (token !== renderToken) return;

      const service = currentService();
      const duration = service ? service.duration : minDuration;
      const list = slotsFor(day, duration).filter((t) => isFree(info, t, t + duration));
      if (!list.includes(state.time)) state.time = null;
      slotBox.replaceChildren();
      if (!list.length) {
        slotBox.append(el('p', 'slots__empty', 'На этот день свободного времени нет — выберите другой.'));
      }
      list.forEach((t) => {
        const node = option('time', String(t), 'opt--slot', [document.createTextNode(fromMinutes(t))],
          () => { state.time = t; update(); });
        node.querySelector('input').checked = t === state.time;
        slotBox.append(node);
      });
      update();
    }

    function formatPhone(d) {
      if (!d) return '';
      let out = '+7';
      if (d.length > 1) out += ' (' + d.slice(1, 4);
      if (d.length > 4) out += ') ' + d.slice(4, 7);
      if (d.length > 7) out += '-' + d.slice(7, 9);
      if (d.length > 9) out += '-' + d.slice(9, 11);
      return out;
    }

    phoneInput.addEventListener('input', (e) => {
      let digits = phoneInput.value.replace(/\D/g, '');
      const deleting = (e.inputType || '').startsWith('delete');
      // удалили скобку или дефис — убираем и цифру перед ним, иначе маска вернёт символ обратно
      if (deleting && digits === phoneDigits) digits = digits.slice(0, -1);
      if (digits[0] === '8') digits = '7' + digits.slice(1);
      if (digits && digits[0] !== '7') digits = '7' + digits;
      digits = digits.slice(0, 11);
      if (deleting && digits.length <= 1) digits = '';
      phoneDigits = digits;
      phoneInput.value = formatPhone(digits);
      update();
    });

    function update() {
      const service = currentService();
      const ready = Boolean(service && state.day && state.time != null && phoneDigits.length === 11);
      submit.disabled = !ready;
      summary.replaceChildren();
      if (!service) {
        summary.textContent = 'Выберите услугу — и сразу увидите свободное время.';
        return;
      }
      if (state.time == null) {
        summary.textContent = 'Выберите удобное время.';
        return;
      }
      summary.append(el('b', null, service.name),
        ` · ${shortDate(state.day)}, ${fromMinutes(state.time)} · ${service.price}`);
      if (phoneDigits.length !== 11) summary.append(el('span', 'booking__hint', 'Осталось оставить телефон'));
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submit.disabled) return;
      const service = currentService();
      const payload = {
        service: service.name,
        price: service.price,
        duration: service.duration,
        date: dayKey(state.day),
        time: fromMinutes(state.time),
        name: form.elements.name.value.trim(),
        phone: phoneInput.value,
        createdAt: new Date().toISOString(),
      };

      submit.disabled = true;
      submit.textContent = 'Отправляем…';
      errorBox.hidden = true;
      try {
        if (B.sendTo) {
          const res = await fetch(B.sendTo, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.status === 409) {
            errorBox.textContent = 'Это время только что заняли — выберите, пожалуйста, другое.';
            errorBox.hidden = false;
            state.time = null;
            renderSlots(true);
            return;
          }
          if (res.status === 429) {
            errorBox.textContent = 'Слишком частые заявки — подождите несколько секунд и попробуйте снова.';
            errorBox.hidden = false;
            return;
          }
          if (!res.ok) throw new Error('HTTP ' + res.status);
          delete busyCache[payload.date];
        } else {
          console.info('Демо-режим: заявка никуда не отправлена (заполни booking.sendTo в config.js)', payload);
        }
        showDone(payload, service);
      } catch (err) {
        errorBox.textContent = 'Не получилось отправить заявку. Позвоните нам: ' + S.phone;
        errorBox.hidden = false;
      } finally {
        submit.innerHTML = submitHtml;
        update();
      }
    });

    function showDone(payload, service) {
      const details = $('#done-details');
      details.replaceChildren();
      [
        ['Услуга', service.name],
        ['Когда', `${longDate(state.day)}, ${payload.time}`],
        ['Стоимость', service.price],
        ['Телефон', payload.phone],
      ].forEach(([label, value]) => {
        const row = el('div', 'done__row');
        row.append(el('dt', null, label), el('dd', null, value));
        details.append(row);
      });
      form.hidden = true;
      done.hidden = false;
    }

    $('#booking-again').addEventListener('click', () => {
      form.reset();
      phoneDigits = '';
      state.serviceId = null;
      state.time = null;
      selectFirstDay();
      renderSlots();
      update();
      done.hidden = true;
      form.hidden = false;
    });

    selectFirstDay();
    renderSlots();
    update();

    return function pickService(id) {
      const input = serviceBox.querySelector(`input[value="${CSS.escape(id)}"]`);
      if (input && !form.hidden) {
        showFormCategory(categoryOf(S.services.find((s) => s.id === id)));
        input.checked = true;
        input.dispatchEvent(new Event('change'));
      }
      card.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      card.classList.remove('is-flash');
      void card.offsetWidth;
      card.classList.add('is-flash');
    };
  }

  function renderServices(pickService) {
    const list = $('#services-list');
    const row = (s) => {
      const item = el('div', 'price-row');
      const info = el('div', 'price-row__info');
      info.append(el('h3', 'price-row__name', s.name));
      if (s.description) info.append(el('p', 'price-row__desc', s.description));
      const side = el('div', 'price-row__side');
      const time = el('span', 'price-row__time');
      time.append(icon('clock'), formatDuration(s.duration));
      side.append(el('span', 'price-row__price', s.price), time);
      const btn = el('button', 'price-row__btn');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Записаться: ' + s.name);
      btn.append(icon('arrow'));
      item.append(info, side, btn);
      item.addEventListener('click', () => pickService(s.id));
      return item;
    };
    makeTabs($('#services-tabs'), (cat) => {
      list.replaceChildren(...S.services.filter((s) => categoryOf(s) === cat).map(row));
    });
  }

  function renderWhy() {
    const list = $('#why-list');
    (S.advantages || []).forEach((a) => {
      const item = el('div', 'why__item');
      item.append(icon(a.icon, 'why__icon'), el('h3', 'why__title', a.title), el('p', 'why__text', a.text));
      list.append(item);
    });
  }

  function renderSteps() {
    const list = $('#steps-list');
    (S.steps || []).forEach((s, i) => {
      const item = el('li', 'step');
      item.append(el('span', 'step__num', pad(i + 1)), el('h3', 'step__title', s.title), el('p', 'step__text', s.text));
      list.append(item);
    });
  }

  function renderReviews() {
    if (!S.reviewLinks || !S.reviewLinks.length) return hideSection('reviews');
    const list = $('#reviews-list');
    const searchUrl = 'https://yandex.ru/maps/?text=' + encodeURIComponent(`${S.name} ${S.address}`);
    S.reviewLinks.forEach((r) => {
      const item = el('a', 'review-link');
      item.href = r.url || searchUrl;
      item.target = '_blank';
      item.rel = 'noopener';
      item.style.setProperty('--brand', r.color || 'var(--accent)');

      const badge = el('span', 'review-link__badge', r.badge || r.name.charAt(0));
      const info = el('span', 'review-link__info');
      info.append(el('span', 'review-link__name', r.name));
      if (r.rating || r.count) {
        const meta = el('span', 'review-link__meta');
        if (r.rating) meta.append(el('b', null, '★ ' + r.rating), r.count ? ' · ' : '');
        if (r.count) meta.append(r.count);
        info.append(meta);
      }
      const action = el('span', 'review-link__action');
      action.append(S.texts.reviewsButton || 'Читать отзывы', icon('arrow'));
      item.append(badge, info, action);
      list.append(item);
    });
  }

  function renderWorks() {
    if (!S.works || !S.works.length) return hideSection('works');
    const track = $('#works-track');
    const caption = (w) => {
      if (!w.services) return w.text || '';
      return w.services.map((id) => {
        const service = S.services.find((s) => s.id === id);
        if (!service) console.warn(`Примеры работ: услуги с кодом «${id}» нет в списке услуг`);
        return service && service.name;
      }).filter(Boolean).join(' · ');
    };
    const makeItem = (w, duplicate) => {
      const fig = el('figure', 'work');
      if (duplicate) fig.setAttribute('aria-hidden', 'true');
      const img = el('img');
      img.src = w.image;
      img.alt = duplicate ? '' : w.title;
      const figcaption = el('figcaption');
      figcaption.append(el('span', 'work__title', w.title), el('span', 'work__text', caption(w)));
      fig.append(img, figcaption);
      return fig;
    };
    // лента из двух одинаковых половин: когда первая уезжает, вторая встаёт на её место — получается бесконечная прокрутка
    S.works.forEach((w) => track.append(makeItem(w, false)));
    S.works.forEach((w) => track.append(makeItem(w, true)));
    track.style.setProperty('--marquee-duration', (S.worksSpeed || 7) * S.works.length + 's');

    if (reducedMotion) return;
    let frame;
    const easeSpeedTo = (target) => {
      const animation = track.getAnimations()[0];
      if (!animation) return;
      cancelAnimationFrame(frame);
      const from = animation.playbackRate;
      const startedAt = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - startedAt) / 500);
        animation.playbackRate = from + (target - from) * k;
        if (k < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    track.parentElement.addEventListener('mouseenter', () => easeSpeedTo(S.worksHoverSpeed || 0.4));
    track.parentElement.addEventListener('mouseleave', () => easeSpeedTo(1));
  }

  function renderContacts() {
    const list = $('#contacts-list');
    [
      { icon: 'pin', label: 'Адрес', value: S.address, href: mapUrl, external: true },
      { icon: 'clock', label: 'Режим работы', value: `${S.hours.label || ''} ${S.hours.open}–${S.hours.close}`.trim() },
      { icon: 'phone', label: 'Телефон', value: S.phone, href: phoneHref },
    ].forEach((c) => {
      const row = el(c.href ? 'a' : 'div', 'contact');
      if (c.href) row.href = c.href;
      if (c.external) {
        row.target = '_blank';
        row.rel = 'noopener';
      }
      const text = el('div');
      text.append(el('div', 'contact__label', c.label), el('div', 'contact__value', c.value));
      row.append(icon(c.icon, 'contact__icon'), text);
      list.append(row);
    });

    const socials = $('#socials');
    Object.entries(S.socials || {}).filter(([, url]) => url).forEach(([key, url]) => {
      const a = el('a', 'social');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', key);
      a.innerHTML = ICONS[key] || ICONS.sparkle;
      socials.append(a);
    });
  }

  function setupHeader() {
    const header = $('#header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function setupReveal() {
    if (reducedMotion || !('IntersectionObserver' in window)) return;
    const targets = $$('.section__head, .pricelist, .why__item, .step, .review-link, .contacts > *');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        node.classList.add('is-visible');
        observer.unobserve(node);
        node.addEventListener('transitionend', () => {
          node.classList.remove('reveal', 'is-visible');
          node.style.transitionDelay = '';
        }, { once: true });
      });
    }, { threshold: 0.12 });
    targets.forEach((node) => {
      const index = Array.prototype.indexOf.call(node.parentNode.children, node);
      node.style.transitionDelay = (index % 4) * 80 + 'ms';
      node.classList.add('reveal');
      observer.observe(node);
    });
  }

  setupBasics();
  const pickService = setupBooking();
  renderServices(pickService);
  renderWhy();
  renderSteps();
  renderReviews();
  renderWorks();
  renderContacts();
  setupHeader();
  setupReveal();
})();
