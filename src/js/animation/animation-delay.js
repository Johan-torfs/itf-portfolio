import { isCurrentSection } from "../scroll-behaviour/scroll-manager.js";

export function setAnimationDelay() {
    var sections = document.querySelectorAll('.scroll-section');
    var nav = document.querySelector('#navigation');

    var list = [];
    if (nav) {
        list = nav.querySelectorAll('[animation-delay]');

        list = Array.prototype.slice.call(list);
    
        list.forEach(element => {
            var delay = element.getAttribute('animation-delay');
            element.querySelectorAll('*').forEach(span => {
                span.style.animationDelay = delay + "s";
                span.style.animationPlayState = "running";
            });
        });
    }
    
    sections.forEach(section => {
        if (!isCurrentSection(section)) return;

        list = section.querySelectorAll('[animation-delay]');
        list = Array.prototype.slice.call(list);
    
        list.forEach(element => {
            var delay = element.getAttribute('animation-delay');
            element.querySelectorAll('*').forEach(span => {
                span.style.animationDelay = delay + "s";
                span.style.animationPlayState = "running";
            });
        });
    });
}