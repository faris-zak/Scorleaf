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