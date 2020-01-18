var ext = {
    flags: {
        active: false,
        shiftPressed: false,
        spacePressed: false,
        inputVisible: false
    },
    fn: {},
    dom: {},
    data: {
        fontSize: 15,
        position: 'bottom',
        commandList: ["search", "strike", "severe"],
        activeCommand: ''
    },
    com: {}
};

(function() {
    var container = ext.dom.container = document.createElement('div');
    container.id = 'shortcutsInterface';
    container.style.display = 'none';
    container.style.fontSize = ext.data.fontSize + 'px';
    container.style[ext.data.position] = 0;

    var input = ext.dom.input = document.createElement('input');
    input.type = 'text';

    input.addEventListener('keydown', function(e) {

        var values = input.value.split(' ');

        ext.fn.showSuggestions(values[0]);

        if (event.keyCode === 9) {
            e.preventDefault();
            input.value = ext.data.activeCommand + ' ';
            ext.fn.showSuggestions(input.value);
        }

        if (event.keyCode === 13) {
            // execute command
            if (ext.com[values[0]] && typeof ext.com[values[0]] === 'function')
                ext.com[values[0]](values[1], values[2]);

            ext.fn.emptySuggestions();
            ext.fn.hideSuggestions();
            input.value = '';
            ext.fn.hideInterface();

            document.body.focus();
        }
    });

    var suggestions = ext.dom.suggestions = document.createElement('div');
    suggestions.id = 'shortcutsSuggestions';
    suggestions.style.display = 'none';

    if (ext.data.position === 'top') {
        container.appendChild(input);
        container.appendChild(suggestions);
    }
    else if (ext.data.position === 'bottom') {
        container.appendChild(suggestions);
        container.appendChild(input);
    }
    document.body.appendChild(container);
})();

ext.fn.showInterface = function() {
    ext.flags.inputVisible = true;
    ext.dom.container.style.display = 'block';
    ext.flags.shiftPressed = false;
    ext.flags.spacePressed = false;
    ext.dom.input.focus();
};

ext.fn.hideInterface = function() {
    ext.flags.inputVisible = false;
    ext.dom.container.style.display = 'none';
};

ext.com.search = function(value, execute) {
    var search = document.querySelector('input[type="search"]');
    search.focus();

    if (typeof value !== 'undefined'){
        search.value = value;
        $(search).focus();
    }

    if (execute) {
        search.click();
        search.dispatchEvent(new Event('input'));
    }
};

ext.fn.showSuggestions = function(searchStr) {
    var suggestions = ext.data.commandList.filter(function(command) {
        return ~command.indexOf(searchStr);
    });

    ext.fn.emptySuggestions();
    var container = document.getElementById('shortcutsSuggestions');

    suggestions.forEach(function(suggestion, index) {
        var elem = document.createElement('p');
        elem.textContent = suggestion;
        elem.style.fontSize = ext.data.fontSize - 3 + 'px';

        //handle activeCommand
        if (index === 0)
            ext.data.activeCommand = suggestion;

        //handle switching margins
        if (index === suggestions.length - 1 && ext.data.position === 'top') {
            elem.style.marginBottom = '0';
        }
        else if (index === 0 && ext.data.position === 'bottom') {
            elem.style.marginTop = '0';
        }
        container.appendChild(elem);
    });

    container.style.display = 'block';
};

ext.fn.hideSuggestions = function() {
    ext.dom.suggestions.style.display = 'none';
};

ext.fn.emptySuggestions = function() {
    ext.dom.suggestions.innerHTML = '';
};

document.body.addEventListener('keydown', function(e) {
    if (e.keyCode === 17) {
        ext.flags.shiftPressed = true;

        if (ext.flags.spacePressed === true)
            ext.fn.showInterface();
    }

    if (e.keyCode === 32) {
        ext.flags.spacePressed = true;

        if (ext.flags.shiftPressed === true)
            ext.fn.showInterface();
    }
});
