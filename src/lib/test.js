const say = function sayOnTheScreen(name) {
    let div = document.createElement('div');
    div.innerHTML = `Hello ${name}`;
    document.body.appendChild(div);
};

export default say;
