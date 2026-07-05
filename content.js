(function() {
    if (typeof window.zannBypassSafe === 'undefined') {
        window.zannBypassSafe = {
            active: false,
            styleEl: null,
            handler: function(e) { e.stopPropagation(); },
            events: ['copy', 'cut', 'paste', 'contextmenu', 'selectstart', 'mousedown']
        };
    }

    window.zannBypassSafe.active = !window.zannBypassSafe.active;

    if (window.zannBypassSafe.active) {
        window.zannBypassSafe.styleEl = document.createElement('style');
        window.zannBypassSafe.styleEl.id = 'zann-bypass-css';
        window.zannBypassSafe.styleEl.innerHTML = `*{user-select:text!important;-webkit-user-select:text!important;}`;
        document.head.appendChild(window.zannBypassSafe.styleEl);
        
        window.zannBypassSafe.events.forEach(evt => document.addEventListener(evt, window.zannBypassSafe.handler, true));
    } else {
        if (window.zannBypassSafe.styleEl) {
            window.zannBypassSafe.styleEl.remove();
            window.zannBypassSafe.styleEl = null;
        }
        window.zannBypassSafe.events.forEach(evt => document.removeEventListener(evt, window.zannBypassSafe.handler, true));
    }

    return window.zannBypassSafe.active; 
})();