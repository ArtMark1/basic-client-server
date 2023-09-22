const loginBtn = document.querySelector('.login');
const logGlass = document.querySelector('.log-group .glass');
const regBtn = document.querySelector('.register');
const regGlass = document.querySelector('.reg-group .glass');
const loginForm = document.querySelector('.log-form');

loginBtn.onclick = () => logGlass.hidden = false;

logGlass.onclick = (e) => {
  if (e.target == logGlass || e.target.value == 'Cancel') logGlass.hidden = true;
};

regBtn.onclick = () => regGlass.hidden = false;

regGlass.onclick = (e) => {
  if (e.target == regGlass || e.target.value == 'Cancel') regGlass.hidden = true;
};

loginForm.onsubmit = async () => {
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const payload = { email, password };
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  const response = await fetch('/api/login', init);
  if (response.ok) location.href = '/profile.html';
}