const remote = require('electron').remote
const main = remote.require('./main.js')


// Stats app 
document.getElementById("stats").addEventListener("click", () => {
    main.openWindow('stats')
}, false);


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

