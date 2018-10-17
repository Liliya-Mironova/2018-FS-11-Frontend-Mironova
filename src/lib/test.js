const say = function (name) {
  //return `Hello ${name}`;
  var div = document.createElement('div');
  div.className = "alert alert-success";
  div.innerHTML = `Hello ${name}`;
  document.body.style.backgroundColor = 'green';
  document.body.appendChild(div);
};

export default say;
