const say = function sayOnTheScreen(name) {
  const div = document.createElement('div');
  div.innerHTML = `Hello ${name}`;
  document.body.appendChild(div);
};

export default say;
