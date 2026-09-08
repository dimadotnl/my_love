// 1. ДАТА ВАШЕГО ЗНАКОМСТВА / НАЧАЛА ОТНОШЕНИЙ
// Формат: ГГГГ-ММ-ДДTHH:MM:SS
const startDate = new Date('2025-01-01T04:30:00');

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

// 2. СПИСОК ПРИЧИН / КОМПЛИМЕНТОВ
const compliments = [
  "Ты невероятно искренне улыбаешься, и от этого теплее становится на душе.",
  "Мне нравится, как ты увлеченно рассказываешь о том, что любишь.",
  "С тобой даже самая обычная прогулка превращается в праздник.",
  "Ты всегда знаешь, как поднять мне настроение, даже когда всё кувырком.",
  "Обожаю твой смех — он заряжает лучше любого кофе!",
  "Ты умеешь видеть красоту в самых простых мелочах.",
  "Я просто счастлив, что ты есть в моей жизни ❤️"
];

let lastIndex = -1;

function generateCompliment() {
  const textElem = document.getElementById('compliment-text');
  let randomIndex;
  
  do {
    randomIndex = Math.floor(Math.random() * compliments.length);
  } while (randomIndex === lastIndex && compliments.length > 1);

  lastIndex = randomIndex;
  textElem.style.opacity = 0;
  
  setTimeout(() => {
    textElem.innerText = compliments[randomIndex];
    textElem.style.opacity = 1;
  }, 200);
}

// 3. ПЛАВНЫЙ СКРОЛЛ
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 4. ВЫЛЕТАЮЩИЕ СЕРДЕЧКИ ПРИ КЛИКЕ
document.addEventListener('click', (e) => {
  // Игнорируем клики по кнопкам, чтобы не мешать основному действию
  if (e.target.tagName.toLowerCase() === 'button') return;

  const heart = document.createElement('div');
  heart.className = 'heart-sparkle';
  
  const hearts = ['❤️', '💖', '✨', '🌸', '💕'];
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
  
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 1200);
});

// 5. УПРАВЛЕНИЕ МУЗЫКОЙ
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicText = document.getElementById('music-text');
const musicIcon = document.getElementById('music-icon');

function toggleMusic() {
  if (audio.paused) {
    audio.play().then(() => {
      musicBtn.classList.add('playing');
      musicText.innerText = 'Пауза';
      musicIcon.innerText = '🎶';
    }).catch(err => {
      console.log('Автовоспроизведение заблокировано браузером:', err);
    });
  } else {
    audio.pause();
    musicBtn.classList.remove('playing');
    musicText.innerText = 'Включить музыку';
    musicIcon.innerText = '🎵';
  }
}

// 6. АКТИВАЦИЯ КУПОНОВ (Пункт 2)
const TELEGRAM_USERNAME = 'dimadotnl'; 

function activateCoupon(card, title) {
  if (card.classList.contains('activated')) return;

  card.classList.add('activated');
  const statusElem = card.querySelector('.coupon-status');
  statusElem.innerText = '✓ Активирован!';

  // Небольшой салют конфетти прямо над карточкой
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 }
  });

  // Открываем Telegram с готовым сообщением
  setTimeout(() => {
    const text = encodeURIComponent(`Привет! Я активировала купон: "${title}" ❤️`);
    if (TELEGRAM_USERNAME) {
      window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, '_blank');
    }
  }, 600);
}

// 7. МИНИ-КВИЗ (Пункт 3)
function checkAnswer(button, isCorrect, message, isLast = false) {
  const parent = button.closest('.quiz-card');
  const feedback = parent.querySelector('.quiz-feedback');
  
  feedback.innerText = message;
  
  if (isCorrect) {
    feedback.className = 'quiz-feedback success';
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
  } else {
    feedback.className = 'quiz-feedback error';
  }

  if (isLast && isCorrect) {
    setTimeout(launchGrandConfetti, 400);
  }
}

// 8. ГРАНДИОЗНЫЙ САЛЮТ КОНФЕТТИ (Пункт 5)
function launchGrandConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Салюты слева и справа
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// 9. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ (ДЕНЬ / НОЧЬ)
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeIcon = document.getElementById('theme-icon');
  
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.innerText = '☀️';
  } else {
    themeIcon.innerText = '🌙';
  }
}

// 10. ГЕНЕРАТОР ПЛАНОВ НА СВИДАНИЕ / ВЕЧЕР
const dateIdeas = [
  { text: "Идем на долгую вечернюю прогулку под фонарями ✨", icon: "🌃" },
  { text: "Заказываем много вкусной вредной еды и смотрим любимый фильм/сериал под одним одеялком 🍕🎬", icon: "🛋️" },
  { text: "Рубимся в карты ♦️", icon: "🕹️" },
  { text: "Ночная поездка на машине по городу 🚗", icon: "🎧" },
  { text: "Готовим вместе что-нибудь новое и вкусное (и едим прямо со сковородки!) 🍳👩‍🍳", icon: "🍝" },
  { text: "День абсолютного ничегонеделания в обнимку в кровати целый день 🛌❤️", icon: "😴" }
];

let lastDateIndex = -1;

function generateDateIdea() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * dateIdeas.length);
  } while (randomIndex === lastDateIndex && dateIdeas.length > 1);

  lastDateIndex = randomIndex;
  const item = dateIdeas[randomIndex];

  const textElem = document.getElementById('date-text');
  const iconElem = document.getElementById('date-icon');

  textElem.style.opacity = 0;
  iconElem.style.transform = 'scale(0.5) rotate(-20deg)';

  setTimeout(() => {
    textElem.innerText = item.text;
    iconElem.innerText = item.icon;
    textElem.style.opacity = 1;
    iconElem.style.transform = 'scale(1.2) rotate(0deg)';
  }, 200);

  confetti({
    particleCount: 25,
    spread: 45,
    origin: { y: 0.65 }
  });
}

// 11. ЛАЙТБОКС (УВЕЛИЧЕНИЕ ФОТО)
function openLightbox(polaroidElement) {
  const img = polaroidElement.querySelector('img');
  const caption = polaroidElement.querySelector('.caption');
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = img.src;
  lightboxCaption.innerText = caption ? caption.innerText : '';
  lightbox.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}
