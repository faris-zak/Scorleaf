// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}


// Slide menu functionality
const slideMenu = document.querySelector('.slideMenu');
const dropdownContent = document.querySelector('.dropdownContent');

slideMenu.addEventListener('click', () => {

    if(dropdownContent.style.visibility == 'visible' && dropdownContent.style.opacity == 1){
      slideMenu.style
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.opacity = 0;
        dropdownContent.style.transform = 'translateX(100%)';
        dropdownContent.style.userSelect = 'none';
        slideMenu.style.transform = 'rotate(0deg)';
    } else{
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.opacity = 1;
        dropdownContent.style.transform = 'translateX(0)';
        dropdownContent.style.userSelect = 'auto';
        slideMenu.style.transform = 'rotate(180deg)';
    }
});

document.addEventListener('click', (event) => {
    if (!slideMenu.contains(event.target) && !dropdownContent.contains(event.target)) {
        slideMenu.classList.remove("active");
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.opacity = 0;
        dropdownContent.style.transform = 'translateX(100%)';
        dropdownContent.style.userSelect = 'none';
        slideMenu.style.transform = 'rotate(0deg)';
    }
});

// Scroll to top function
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Script functionality
console.log('Script loaded successfully, no errors found.');

// ===== GALLERY LIGHTBOX =====
const galleryImages = [
    { src: 'assets/img/gallery-award-third-place.webp',   caption: 'حفل تكريم المركز الثالث — معسكر المشاريع الواعدة' },
    { src: 'assets/img/gallery-lab-research.webp',        caption: 'استخلاص مركبات عرق السوس في المختبر' },
    { src: 'assets/img/gallery-lab-extract.webp',         caption: 'تقطير المستخلص بجهاز التبخير الدوار' },
    { src: 'assets/img/gallery-lab-samples.webp',         caption: 'عينات مستخلص عرق السوس بمراحل مختلفة' },
    { src: 'assets/img/gallery-lab-equipment.webp',       caption: 'معدات المختبر المتخصصة لعمليات الاستخلاص' },
    { src: 'assets/img/gallery-team-presentation.webp',   caption: 'عرض الفريق أمام لجنة التحكيم' },
];
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function shiftLightbox(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    updateLightbox();
}

function updateLightbox() {
    const item = galleryImages[currentLightboxIndex];
    const img = document.getElementById('lightboxImg');
    // Re-trigger fade animation on image swap
    img.style.animation = 'none';
    img.offsetHeight; // force reflow
    img.style.animation = '';
    img.src = item.src;
    img.alt = item.caption;
    document.getElementById('lightboxCaption').textContent = item.caption;
}

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') shiftLightbox(-1);
    if (e.key === 'ArrowLeft')  shiftLightbox(1);
});

// Touch swipe support for lightbox
let _touchStartX = 0;
document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    _touchStartX = e.changedTouches[0].clientX;
}, { passive: true });
document.getElementById('lightbox').addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - _touchStartX;
    if (Math.abs(delta) > 50) {
        // RTL: swipe right → previous, swipe left → next
        shiftLightbox(delta > 0 ? 1 : -1);
    }
}, { passive: true });

// ===== CONTACT FORM =====
function submitContactForm(e) {
    e.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const body = `الاسم: ${name}\nالبريد: ${email}\n\n${message}`;
    const mailto = `mailto:scorleaf@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const sent = document.getElementById('formSent');
    sent.style.display = 'block';
    setTimeout(() => { window.location.href = mailto; }, 300);
    setTimeout(() => { sent.style.display = 'none'; e.target.reset(); }, 3000);
}

// ===== AI CHATBOT =====
const chatKB = [
  {
    patterns: [/مرحبا|هلا|أهلا|السلام/i],
    answer: 'أهلاً وسهلاً! 🌿 أنا المساعد الذكي لـ Scorleaf. يمكنني الإجابة عن أي سؤال يتعلق بمشروعنا أو عرق السوس أو لدغات العقارب. ما الذي تودّ معرفته؟'
  },
  {
    patterns: [/ما هو|ما هي|عن|scorleaf|سكورليف|المشروع|يعني/i],
    answer: 'Scorleaf مبادرة عُمانية ناشئة تطوّر مستخلصًا طبيعيًا من عرق السوس للتخفيف من آثار لدغات العقارب. يُقدّم حلاً إسعافيًا آمنًا ومنخفض التكلفة مدعومًا بالبحث العلمي.'
  },
  {
    patterns: [/عرق السوس|licorice|المادة الفعالة|مكونات/i],
    answer: 'يعتمد Scorleaf على مستخلص عرق السوس (Glycyrrhiza glabra)، وهو نبات طبي ذو قيمة علاجية تراثية، ثبتت فاعليته في الدراسات العلمية الحديثة كمضاد للالتهاب والسموم.'
  },
  {
    patterns: [/فريق|team|أعضاء|من صنع|مؤسس/i],
    answer: 'يتكوّن فريق Scorleaf من: يحيى الحنظلي (الرئيس التنفيذي)، بيان المقبالية (نائب الرئيس)، مروان الشيذاني (مستشار مالي)، كوثر المجرفية (بحث وتطوير)، وتسنيم الشبيبية (تسويق وإنتاج)، بإشراف أ. معصومة اللواتية.'
  },
  {
    patterns: [/إنجاز|جائزة|مسابقة|ملكية فكرية|أرض|جامعة/i],
    answer: 'حقق Scorleaf جملة من الإنجازات: شهادة الملكية الفكرية من وزارة التجارة، المركز الثالث في معسكر المشاريع الواعدة، تخصيص أرض للتجارب من وزارة الثروة الزراعية، والمشاركة في مسابقة جامعة الشرقية.'
  },
  {
    patterns: [/تواصل|اتصال|بريد|ايميل|إيميل|هاتف|انستقرام|instagram/i],
    answer: 'يمكنك التواصل مع فريق Scorleaf عبر:\n📧 scorleaf@gmail.com\n📸 @scorleaf.om على الإنستقرام\n📞 +968 94673366'
  },
  {
    patterns: [/عقرب|لدغة|لسعة|سم|علاج|إسعاف/i],
    answer: 'يستهدف Scorleaf التخفيف من آثار لدغات العقارب فور وقوعها. التركيبة مصممة كحل إسعافي أولي آمن، خاصة في المناطق التي يصعب فيها الوصول السريع للرعاية الطبية.'
  },
  {
    patterns: [/رؤية|هدف|مستقبل|2040|عُمان|تراث/i],
    answer: 'يسعى Scorleaf نحو مستقبل يكون فيه العلاج الطبيعي المحلي في متناول الجميع، مع الحفاظ على الموروث الطبي العُماني وتطويره بما يتوافق مع رؤية عُمان 2040.'
  },
  {
    patterns: [/متى|إطلاق|متاح|شراء|سعر/i],
    answer: 'Scorleaf حاليًا في مرحلة البحث والتطوير. المشروع يستكمل التجارب العلمية استعدادًا للإطلاق. تابع حساباتنا للحصول على آخر المستجدات.'
  },
  {
    patterns: [/آمن|سلامة|مخاطر|أعراض جانبية/i],
    answer: 'التركيبة مستخلصة من عرق السوس، وهو نبات طبي طبيعي آمن بتاريخ استخدام طويل. المشروع يُجري تجارب علمية للتحقق من السلامة والفعالية وفق أعلى المعايير الدولية.'
  },
  {
    patterns: [/شكرا|شكراً|ممتاز|رائع|حلو|جميل/i],
    answer: 'شكراً لاهتمامك بـ Scorleaf! 🌿 هل لديك أسئلة أخرى؟'
  },
];

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const messages = document.getElementById('chatMessages');

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = msg;
  messages.appendChild(userBubble);
  input.value = '';

  let answer = 'عذراً، لم أفهم سؤالك تمامًا. يمكنك التواصل مع الفريق مباشرة عبر البريد الإلكتروني: scorleaf@gmail.com 📧';
  for (const entry of chatKB) {
    if (entry.patterns.some(p => p.test(msg))) {
      answer = entry.answer;
      break;
    }
  }

  const typing = document.createElement('div');
  typing.className = 'chat-bubble bot';
  typing.textContent = '...';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typing.textContent = answer;
    typing.style.whiteSpace = 'pre-line';
    messages.scrollTop = messages.scrollHeight;
  }, 700);
}

// ===== SYMPTOM CHECKER =====
document.querySelectorAll('.symptom-options').forEach(group => {
  group.querySelectorAll('.sym-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.sym-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
});

function checkSymptoms() {
  let score = 0;
  const warnings = [];

  const age = document.querySelector('#ageGroup .sym-btn.selected');
  if (!age) { alert('الرجاء تحديد الفئة العمرية'); return; }
  if (age.dataset.val === 'child')   { score += 3; warnings.push('الأطفال أكثر عرضة لخطورة السم'); }
  else if (age.dataset.val === 'elderly') { score += 2; }

  const pain = document.querySelector('#painLevel .sym-btn.selected');
  if (!pain) { alert('الرجاء تحديد مستوى الألم'); return; }
  if (pain.dataset.val === 'moderate') score += 2;
  else if (pain.dataset.val === 'severe') score += 5;

  document.querySelectorAll('#symptoms input:checked').forEach(c => {
    if (c.value === 'swelling')   score += 1;
    if (c.value === 'numbness')   score += 1;
    if (c.value === 'fever')      score += 2;
    if (c.value === 'cramps')     score += 3;
    if (c.value === 'breathing')  { score += 6; warnings.push('صعوبة التنفس تستدعي إسعافًا عاجلاً فوريًا'); }
    if (c.value === 'vision')     { score += 4; warnings.push('اضطراب الرؤية علامة خطرة'); }
  });

  const time = document.querySelector('#timeSince .sym-btn.selected');
  if (!time) { alert('الرجاء تحديد الوقت منذ اللدغة'); return; }
  if (time.dataset.val === 'recent') score += 1;
  else if (time.dataset.val === 'medium') score += 2;

  const result = document.getElementById('symResult');
  result.style.display = 'block';
  result.className = 'sym-result';

  let html = '';
  if (score <= 4) {
    result.classList.add('mild');
    html = `<div class="result-title">🟢 حالة خفيفة</div>
            <p>الأعراض تبدو في نطاق الخفيف. يُنصح بتنظيف موضع اللدغة وإبقاء المصاب هادئاً، ويمكن استخدام Scorleaf كإسعاف أولي. تابع الحالة بعناية.</p>`;
  } else if (score <= 9) {
    result.classList.add('moderate');
    html = `<div class="result-title">🟡 حالة متوسطة</div>
            <p>الأعراض تستدعي الانتباه. يُوصى بالتوجه إلى أقرب مركز صحي في أقرب وقت ممكن. استخدم Scorleaf كإجراء مؤقت ريثما تصل للرعاية الطبية.</p>`;
  } else {
    result.classList.add('severe');
    html = `<div class="result-title">🔴 حالة حرجة — اتصل بالإسعاف فوراً</div>
            <p>الأعراض تشير إلى إصابة شديدة. اتصل بالخدمات الطبية الطارئة على الفور ولا تنتظر. لا تترك المصاب وحيداً.</p>`;
  }

  if (warnings.length > 0) {
    html += `<p style="margin-top:10px; font-size:14px; opacity:0.85;">⚠️ ملاحظة: ${warnings.join(' — ')}</p>`;
  }

  result.innerHTML = html;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== STATISTICS ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const isPct = el.classList.contains('stat-pct');
  const duration = 1800;
  const steps = Math.ceil(duration / 16);
  const increment = target / steps;
  let current = 0;
  let frame = 0;

  const timer = setInterval(function () {
    frame++;
    current += increment;
    if (frame >= steps || current >= target) {
      current = target;
      clearInterval(timer);
    }
    if (isPct) {
      el.textContent = Math.round(current) + '%';
    } else if (target >= 1000000) {
      el.textContent = (current / 1000000).toFixed(1) + 'م';
    } else if (target >= 10000) {
      el.textContent = Math.round(current / 1000) + 'ألف+';
    } else {
      el.textContent = Math.round(current).toLocaleString('ar-SA');
    }
  }, 16);
}

function animateStatBars() {}

var statsAnimated = false;
var statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.15 });

var statsSection = document.getElementById('statistics');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== SCORPION MAP =====
window.addEventListener('load', function () {
    if (!document.getElementById('scorpion-map') || typeof L === 'undefined') return;

    var countryData = {
        sa: { name: 'المملكة العربية السعودية', flag: '🇸🇦', cases: 35000, desc: 'أعلى معدل في دول الخليج — الحالات تتركز في المناطق الريفية والصحراوية' },
        ye: { name: 'اليمن', flag: '🇾🇪', cases: 30000, desc: 'معدلات مرتفعة جداً وصعوبة الوصول للعلاج الطبي في المناطق النائية' },
        om: { name: 'سلطنة عُمان', flag: '🇴🇲', cases: 1500, desc: 'حالات موثقة سنوياً — المحافظات الداخلية أكثر تأثراً' },
        kw: { name: 'الكويت', flag: '🇰🇼', cases: 500, desc: 'معدلات منخفضة نسبياً — غالبية الحالات في المناطق الصحراوية' },
        ae: { name: 'الإمارات', flag: '🇦🇪', cases: 400, desc: 'بنية صحية متطورة تسهم في تقليص معدل الوفيات' },
        qa: { name: 'قطر', flag: '🇶🇦', cases: 200, desc: 'أقل الدول تأثراً بفضل الرقعة الجغرافية المحدودة والرعاية الصحية المتقدمة' },
        bh: { name: 'البحرين', flag: '🇧🇭', cases: 200, desc: 'تقديرات سنوية منخفضة — رقعة جغرافية محدودة' }
    };

    function getColor(cases) {
        return cases >= 25000 ? '#8B0000' :
               cases >= 10000 ? '#D32F2F' :
               cases >= 1000  ? '#FF7043' :
               cases >= 500   ? '#FFB300' : '#66BB6A';
    }

    var geoData = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature', properties: { id: 'sa' },
                geometry: { type: 'Polygon', coordinates: [[[36.71,29.18],[38.95,32.3],[44.2,29.6],[47.5,29.0],[48.45,28.5],[49.8,26.2],[51.5,24.2],[55.7,22.0],[52.0,17.8],[47.0,17.0],[42.5,16.9],[38.3,17.2],[38.8,19.5],[38.5,22.0],[38.0,24.0],[38.0,26.5],[36.71,29.18]]] }
            },
            {
                type: 'Feature', properties: { id: 'ye' },
                geometry: { type: 'Polygon', coordinates: [[[42.5,16.9],[52.0,17.8],[53.5,17.5],[54.2,16.5],[54.0,14.5],[52.5,12.5],[49.5,12.0],[45.0,12.5],[43.5,13.8],[43.0,15.0],[42.0,16.5],[42.5,16.9]]] }
            },
            {
                type: 'Feature', properties: { id: 'om' },
                geometry: { type: 'Polygon', coordinates: [[[55.7,22.0],[56.5,22.8],[57.5,23.2],[58.5,23.7],[59.8,22.0],[59.3,21.0],[58.7,20.0],[57.5,18.5],[56.0,17.0],[54.0,16.5],[52.5,17.0],[52.0,17.8],[55.7,22.0]]] }
            },
            {
                type: 'Feature', properties: { id: 'ae' },
                geometry: { type: 'Polygon', coordinates: [[[51.5,24.2],[55.7,22.0],[56.4,24.0],[56.5,25.2],[55.5,25.8],[54.5,24.5],[52.5,24.2],[51.5,24.2]]] }
            },
            {
                type: 'Feature', properties: { id: 'kw' },
                geometry: { type: 'Polygon', coordinates: [[[46.8,29.1],[47.5,29.0],[48.5,28.5],[48.5,29.5],[47.5,30.1],[46.8,29.5],[46.8,29.1]]] }
            },
            {
                type: 'Feature', properties: { id: 'qa' },
                geometry: { type: 'Polygon', coordinates: [[[50.7,24.6],[51.6,24.6],[51.7,25.0],[51.5,26.2],[51.0,26.15],[50.7,25.5],[50.7,24.6]]] }
            },
            {
                type: 'Feature', properties: { id: 'bh' },
                geometry: { type: 'Polygon', coordinates: [[[50.35,25.8],[50.75,25.8],[50.85,26.35],[50.4,26.4],[50.35,25.8]]] }
            }
        ]
    };

    var map = L.map('scorpion-map', {
        center: [22.5, 50],
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    var infoPanel = L.control({ position: 'topright' });
    infoPanel.onAdd = function () {
        this._div = L.DomUtil.create('div', 'map-info-panel');
        this.reset();
        return this._div;
    };
    infoPanel.reset = function () {
        this._div.innerHTML = '<p class="map-hint-text"><i class="fa-solid fa-hand-pointer"></i> مرّر المؤشر فوق دولة</p>';
    };
    infoPanel.update = function (d) {
        this._div.innerHTML =
            '<div class="map-country-name">' + d.flag + ' ' + d.name + '</div>' +
            '<div class="map-country-cases">~' + d.cases.toLocaleString('ar-SA') + ' حالة / سنة</div>' +
            '<div class="map-country-desc">' + d.desc + '</div>';
    };
    infoPanel.addTo(map);

    var geojsonLayer;
    var activeLayer = null;

    function onEachFeature(feature, layer) {
        var d = countryData[feature.properties.id];
        if (!d) return;
        layer.on({
            mouseover: function (e) {
                e.target.setStyle({ weight: 3, fillOpacity: 0.92 });
                infoPanel.update(d);
            },
            mouseout: function (e) {
                if (activeLayer !== e.target) geojsonLayer.resetStyle(e.target);
                if (activeLayer === null) infoPanel.reset();
            },
            click: function (e) {
                if (activeLayer) geojsonLayer.resetStyle(activeLayer);
                activeLayer = e.target;
                e.target.setStyle({ weight: 3, fillOpacity: 0.92 });
                infoPanel.update(d);
                map.fitBounds(e.target.getBounds(), { padding: [50, 50], maxZoom: 7 });
                L.DomEvent.stopPropagation(e);
            }
        });
    }

    geojsonLayer = L.geoJSON(geoData, {
        style: function (feature) {
            var d = countryData[feature.properties.id];
            return {
                fillColor: d ? getColor(d.cases) : '#cccccc',
                weight: 1.5,
                opacity: 1,
                color: '#ffffff',
                fillOpacity: 0.75
            };
        },
        onEachFeature: onEachFeature
    }).addTo(map);

    map.on('click', function () {
        if (activeLayer) {
            geojsonLayer.resetStyle(activeLayer);
            activeLayer = null;
            infoPanel.reset();
        }
    });

    // Force correct dimensions after layout settles
    setTimeout(function () { map.invalidateSize(); }, 200);

    // Re-fit on window resize
    window.addEventListener('resize', function () { map.invalidateSize(); });

    // Re-fit when map scrolls into view
    var mapVisible = false;
    var mapVisObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !mapVisible) {
                mapVisible = true;
                map.invalidateSize();
            }
        });
    }, { threshold: 0.1 });
    mapVisObserver.observe(document.getElementById('scorpion-map'));
});

// ===== SCROLL REVEAL =====
(function () {
    const revealSelectors = [
        '.hero-content',
        '.features-container',
        '.team-container',
        '.achievements-grid',
        '.media-grid',
        '.gallery-grid',
        '.stats-grid',
        '.contact-grid',
        '.contact-form-card',
    ];
    const revealEls = document.querySelectorAll(revealSelectors.join(', '));
    revealEls.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealEls.forEach(el => revealObserver.observe(el));
})();