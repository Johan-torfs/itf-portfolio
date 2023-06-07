import { slideInNavigation } from '../navigation/nav-animation.js';

export function startNavManager() {
    document.getElementById('navigation-button').addEventListener('click', () => {
        slideInNavigation();
    });
    
    document.getElementById('nav-container').querySelectorAll('a').forEach(element => {
        element.addEventListener('click', () => {
            slideInNavigation();
        });
    });
}