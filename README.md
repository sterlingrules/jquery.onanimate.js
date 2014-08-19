onAnimate
=========

jQuery Plugin for managing CSS3 animations and transition states

Easily trigger a CSS3 animation or transition and fire a callback. Initialize the plugin on the element you wish to animate, then add your callback.

**Example:** `$('#example').onAnimate(options, callback)`

    options = {
        addClass:    '',
        removeClass: '',
        transition: false,
        animation: true,
        ms: 0 // The amount of time in milliseconds before firing the callback
    }


**Example 2:** `$('#example').onAnimate(function() { alert('Callback'); });`
