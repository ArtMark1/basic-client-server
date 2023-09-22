const logOutBtn = document.querySelector('.log-out');

logOutBtn.onclick = () => {
  document.cookie = 'token=; Max-Age:0';
  location.href = '/';
};