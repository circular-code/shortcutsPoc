var ext = {
    flags: {
        active: false
    },
    fn: {},
    dom: {}
};

(function() {
    var container = ext.dom.container = document.createElement('div');
    container.id = 'test';
    container.textContent = 'dies ist ein test';
    container.style.display = 'none';
    document.body.appendChild(container);
})();

ext.fn.showInput = function() {
    ext.dom.container.style.display = 'block';
};

ext.fn.hideInput = function() {
    ext.dom.container.style.display = 'none';
};