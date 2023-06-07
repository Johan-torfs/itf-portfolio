import { startLinesManager } from './lines/line-manager.js';
import { setAnimationDelay } from './animation/animation-delay.js'
import { slideInNavigation } from './navigation/nav-animation.js';

startLinesManager(['lines-left', 'lines-right']);

setAnimationDelay();

document.getElementById('navigation-button').addEventListener('click', () => {
    slideInNavigation();
});

document.getElementById('nav-container').querySelectorAll('a').forEach(element => {
    element.addEventListener('click', () => {
        slideInNavigation();
    });
});