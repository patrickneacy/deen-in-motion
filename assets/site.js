// Mobile navigation
const button = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
if (button && nav) button.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => nav && nav.classList.remove('open')));

// Light / dark mode. Dark is the default; preference persists across EN/AR pages.
const root = document.documentElement;
const storedTheme = localStorage.getItem('dim-theme');
if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
function syncThemeIcons(){
  document.querySelectorAll('[data-theme-icon]').forEach(el => el.textContent = root.dataset.theme === 'light' ? '☀' : '☾');
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'));
}
syncThemeIcons();
document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('dim-theme', next);
  syncThemeIcons();
}));

// Interactive quiz
 document.querySelectorAll('[data-quiz]').forEach((quiz) => {
  const score = quiz.querySelector('[data-quiz-score]');
  const reset = quiz.querySelector('[data-quiz-reset]');
  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const questions = [...quiz.querySelectorAll('.quiz-question')];
    let correct = 0, answered = 0;
    questions.forEach((question) => {
      question.classList.remove('correct', 'incorrect');
      const selected = question.querySelector('input:checked');
      const feedback = question.querySelector('.quiz-feedback');
      const answer = question.dataset.answer;
      if (!selected) { feedback.textContent = document.documentElement.lang === 'ar' ? 'اختر إجابة أولًا.' : 'Choose an answer before checking.'; return; }
      answered += 1;
      if (selected.value === answer) { correct += 1; question.classList.add('correct'); feedback.textContent = document.documentElement.lang === 'ar' ? 'هذه الإجابة توافق نص الحديث الظاهر أعلاه.' : 'That matches the wording shown above.'; }
      else { question.classList.add('incorrect'); feedback.textContent = document.documentElement.lang === 'ar' ? 'راجع النص أعلاه ثم حاول مرة أخرى.' : 'Have another look at the wording above and try again.'; }
    });
    if (score) score.textContent = answered < questions.length ? (document.documentElement.lang === 'ar' ? `${answered}/${questions.length} تمت الإجابة` : `${answered}/${questions.length} answered`) : (document.documentElement.lang === 'ar' ? `${correct}/${questions.length} إجابات صحيحة` : `${correct}/${questions.length} correct`);
  });
  if (reset) reset.addEventListener('click', () => { quiz.reset(); quiz.querySelectorAll('.quiz-question').forEach(q => { q.classList.remove('correct','incorrect'); const f=q.querySelector('.quiz-feedback'); if(f) f.textContent=''; }); if(score) score.textContent=''; });
});

// Gentle reveal animations
const targets = document.querySelectorAll('main > section, .series-card, .membership-panel, .resource, .panel, .workbook-page');
targets.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.06});
targets.forEach(el => observer.observe(el));
