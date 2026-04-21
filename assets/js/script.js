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

// ===== SCORPION SVG MAP =====
(function () {
    var mapData = {
        sa: { name: 'المملكة العربية السعودية', flag: '🇸🇦', cases: 35000, desc: 'أعلى معدل في دول الخليج — الحالات تتركز في المناطق الريفية والصحراوية' },
        ye: { name: 'اليمن', flag: '🇾🇪', cases: 30000, desc: 'معدلات مرتفعة جداً وصعوبة الوصول للعلاج الطبي في المناطق النائية' },
        om: { name: 'سلطنة عُمان', flag: '🇴🇲', cases: 1500, desc: 'حالات موثقة سنوياً — المحافظات الداخلية أكثر تأثراً' },
        kw: { name: 'الكويت', flag: '🇰🇼', cases: 500, desc: 'معدلات منخفضة نسبياً — غالبية الحالات في المناطق الصحراوية' },
        ae: { name: 'الإمارات', flag: '🇦🇪', cases: 400, desc: 'بنية صحية متطورة تسهم في تقليص معدل الوفيات' },
        qa: { name: 'قطر', flag: '🇶🇦', cases: 200, desc: 'أقل الدول تأثراً بفضل الرقعة الجغرافية المحدودة والرعاية الصحية المتقدمة' },
        bh: { name: 'البحرين', flag: '🇧🇭', cases: 200, desc: 'تقديرات سنوية منخفضة — رقعة جغرافية محدودة' }
    };

    var tooltip = document.getElementById('mapTooltip');
    var activeEl = null;

    function showInfo(id) {
        var d = mapData[id];
        if (!d || !tooltip) return;
        tooltip.innerHTML =
            '<div class="map-country-name">' + d.flag + ' ' + d.name + '</div>' +
            '<div class="map-country-cases">~' + d.cases.toLocaleString('ar-SA') + ' حالة / سنة</div>' +
            '<div class="map-country-desc">' + d.desc + '</div>';
    }

    function resetInfo() {
        if (!tooltip) return;
        tooltip.innerHTML = '<p class="map-hint-text"><i class="fa-solid fa-hand-pointer"></i> اضغط على دولة</p>';
    }

    document.querySelectorAll('.map-country').forEach(function (el) {
        el.addEventListener('mouseenter', function () { showInfo(el.dataset.id); });
        el.addEventListener('mouseleave', function () { if (activeEl !== el) resetInfo(); });
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            if (activeEl) activeEl.classList.remove('map-active');
            activeEl = el;
            el.classList.add('map-active');
            showInfo(el.dataset.id);
        });
        el.addEventListener('touchstart', function (e) {
            e.stopPropagation();
            if (activeEl) activeEl.classList.remove('map-active');
            activeEl = el;
            el.classList.add('map-active');
            showInfo(el.dataset.id);
        }, { passive: true });
    });

    var svg = document.getElementById('scorpion-map-svg');
    if (svg) {
        svg.addEventListener('click', function () {
            if (activeEl) { activeEl.classList.remove('map-active'); activeEl = null; }
            resetInfo();
        });
    }
})();

// ===== 3D PRODUCT MODELS =====
(function () {
    if (typeof THREE === 'undefined') return;

    function buildScene(canvasId, lidColor, bodyColor, scale) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;

        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        var scene = new THREE.Scene();

        var W = canvas.clientWidth  || 400;
        var H = canvas.clientHeight || 400;
        renderer.setSize(W, H, false);

        var camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.set(0, 1.5, 5);
        camera.lookAt(0, 0, 0);

        // ── Lights ──────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));

        var keyLight = new THREE.DirectionalLight(0xfff5e0, 2.0);
        keyLight.position.set(3, 6, 4);
        scene.add(keyLight);

        var fillLight = new THREE.DirectionalLight(0xa8d8a0, 0.7);
        fillLight.position.set(-4, 2, -2);
        scene.add(fillLight);

        var rimLight = new THREE.DirectionalLight(0x88ccff, 0.5);
        rimLight.position.set(0, -3, -4);
        scene.add(rimLight);

        // ── Jar geometry ────────────────────────────────────────────
        var jarGroup = new THREE.Group();
        scene.add(jarGroup);

        var jarH = 2.0 * scale;
        var jarR = 1.3 * scale;

        // Body cylinder — MeshStandardMaterial (no transmission, works everywhere)
        var bodyMat = new THREE.MeshStandardMaterial({
            color: bodyColor,
            roughness: 0.35,
            metalness: 0.08
        });
        jarGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(jarR, jarR * 0.92, jarH, 64, 1, false), bodyMat));

        // Bottom disc
        var botMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(jarR * 0.92, jarR * 0.92, 0.08 * scale, 64),
            new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4 })
        );
        botMesh.position.y = -jarH / 2;
        jarGroup.add(botMesh);

        // Label ring (canvas texture)
        var labelCanvas = document.createElement('canvas');
        labelCanvas.width = 1024; labelCanvas.height = 512;
        var lctx = labelCanvas.getContext('2d');

        var grad = lctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0,    '#2d6010');
        grad.addColorStop(0.25, '#4a9020');
        grad.addColorStop(0.5,  '#5aa825');
        grad.addColorStop(0.75, '#3d7518');
        grad.addColorStop(1,    '#1e4008');
        lctx.fillStyle = grad;
        lctx.fillRect(0, 0, 1024, 512);

        var goldGrad = lctx.createLinearGradient(0, 140, 0, 240);
        goldGrad.addColorStop(0,   '#c9a84c');
        goldGrad.addColorStop(0.5, '#e8d08a');
        goldGrad.addColorStop(1,   '#c9a84c');
        lctx.fillStyle = goldGrad;
        lctx.fillRect(0, 145, 1024, 105);

        lctx.textAlign = 'center';
        lctx.fillStyle = '#fff';
        lctx.font = 'bold 54px serif';
        lctx.fillText('ScorLeaf', 512, 110);

        lctx.fillStyle = '#d4f0b0';
        lctx.font = '24px sans-serif';
        lctx.fillText('Natural Against Venom', 512, 143);

        lctx.fillStyle = '#1a1a1a';
        lctx.font = 'bold 40px serif';
        lctx.fillText('Natural Scorpion Sting Relief', 512, 195);

        lctx.fillStyle = '#2d5016';
        lctx.font = 'bold 30px sans-serif';
        lctx.fillText('Fast Acting Herbal Formula', 512, 232);

        lctx.fillStyle = '#ffffff';
        lctx.font = 'bold 48px serif';
        lctx.fillText(scale > 0.8 ? '30g' : '10g', 512, 310);

        lctx.fillStyle = '#c9a84c';
        lctx.font = '26px sans-serif';
        lctx.fillText('Made in Oman', 512, 370);

        lctx.font = '80px serif';
        lctx.globalAlpha = 0.12;
        lctx.fillStyle = '#fff';
        lctx.fillText('\uD83E\uDD82', 870, 460);
        lctx.globalAlpha = 1;

        var labelTex = new THREE.CanvasTexture(labelCanvas);
        var labelMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(jarR + 0.01, jarR + 0.01, jarH * 0.75, 64, 1, true),
            new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.4, transparent: true, opacity: 0.97 })
        );
        labelMesh.position.y = -jarH * 0.05;
        jarGroup.add(labelMesh);

        // ── Lid ─────────────────────────────────────────────────────
        var lidGroup = new THREE.Group();
        var lidH = 0.45 * scale;
        var lidR = jarR + 0.06;

        var lidMat = new THREE.MeshStandardMaterial({ color: lidColor, roughness: 0.15, metalness: 0.65 });
        lidGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(lidR, lidR, lidH, 64), lidMat));

        // Knurl grooves
        for (var i = 0; i < 18; i++) {
            var a = (i / 18) * Math.PI * 2;
            var knurlMesh = new THREE.Mesh(new THREE.BoxGeometry(0.04, lidH * 0.9, 0.04), lidMat);
            knurlMesh.position.set(Math.cos(a) * (lidR - 0.02), 0, Math.sin(a) * (lidR - 0.02));
            knurlMesh.rotation.y = -a;
            lidGroup.add(knurlMesh);
        }

        // Lid skirt
        var skirtMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(lidR, jarR, 0.15 * scale, 64, 1, true),
            lidMat
        );
        skirtMesh.position.y = -(lidH / 2 + 0.07);
        lidGroup.add(skirtMesh);

        lidGroup.position.y = jarH / 2 + lidH / 2;
        jarGroup.add(lidGroup);

        // Shadow plane
        var shadowMesh = new THREE.Mesh(
            new THREE.CircleGeometry(jarR * 1.5, 48),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25, depthWrite: false })
        );
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.y = -(jarH / 2 + 0.01);
        jarGroup.add(shadowMesh);

        jarGroup.position.y = -0.3;

        // ── Responsive resize ────────────────────────────────────────
        var started = false;
        function resize() {
            var wrap = canvas.parentElement;
            var w = wrap ? wrap.clientWidth : canvas.clientWidth;
            var h = wrap ? wrap.clientHeight : canvas.clientHeight;
            if (!w || !h) { w = 400; h = 400; }
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            if (!started) { started = true; }
        }
        // Defer first resize to ensure layout is complete
        requestAnimationFrame(function () { resize(); });
        window.addEventListener('resize', resize);

        // ── Manual orbit controls ────────────────────────────────────
        var isDragging = false, prevX = 0, prevY = 0;
        var rotY = 0.3, rotX = 0.15;
        var zoom = 5;
        var autoRotate = true;

        canvas.addEventListener('mousedown', function (e) {
            isDragging = true; autoRotate = false;
            prevX = e.clientX; prevY = e.clientY;
        });
        window.addEventListener('mouseup', function () { isDragging = false; });
        canvas.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            rotY += (e.clientX - prevX) * 0.012;
            rotX += (e.clientY - prevY) * 0.008;
            rotX = Math.max(-0.7, Math.min(0.9, rotX));
            prevX = e.clientX; prevY = e.clientY;
        });
        canvas.addEventListener('wheel', function (e) {
            zoom = Math.max(2.5, Math.min(9, zoom + e.deltaY * 0.008));
            e.preventDefault();
        }, { passive: false });

        var lastTouch = null;
        canvas.addEventListener('touchstart', function (e) {
            lastTouch = e.touches[0]; isDragging = true; autoRotate = false;
        }, { passive: true });
        canvas.addEventListener('touchend',  function () { isDragging = false; }, { passive: true });
        canvas.addEventListener('touchmove', function (e) {
            if (!isDragging || !lastTouch) return;
            rotY += (e.touches[0].clientX - lastTouch.clientX) * 0.015;
            rotX += (e.touches[0].clientY - lastTouch.clientY) * 0.010;
            rotX = Math.max(-0.7, Math.min(0.9, rotX));
            lastTouch = e.touches[0];
        }, { passive: true });

        // ── Animation loop ───────────────────────────────────────────
        (function loop() {
            requestAnimationFrame(loop);
            if (autoRotate) rotY += 0.008;
            jarGroup.rotation.y = rotY;
            jarGroup.rotation.x = rotX;
            camera.position.z = zoom;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        })();
    }

    window.addEventListener('load', function () {
        // 30g: gold lid, deep-green body
        buildScene('product-canvas-30', 0xc9a84c, 0x3a7a1a, 1.0);
        // 10g: teal lid, teal-green body, smaller scale
        buildScene('product-canvas-10', 0x5aacb8, 0x3a9060, 0.68);
    });
})();

// ===== SCROLL REVEAL =====
(function () {
    const revealSelectors = [
        '.hero-content',
        '.features-container',
        '.products-grid',
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