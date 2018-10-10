const say = function sayOnTheScreen(name) {
  const div = document.createElement('div');
  div.className = 'alert alert-success';
  div.innerHTML = `Hello ${name}`;
  document.body.style.backgroundColor = 'green';
  document.body.appendChild(div);
};

export default say;
