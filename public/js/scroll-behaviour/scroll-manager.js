import { delay } from '../common.js';

var sections = [];

var currentSection = 0;
var running = true;

var scrolling = false;
var scrollUpdateRequired = true;

export function startScrollManager() {
    sections = document.querySelectorAll('.scroll-section');
    updateScrollPosition();

    if (sections.lengt == 0) {
        console.log('no scroll-sections found');
        return;
    }

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (scrollUpdateRequired) return;

        if (e.deltaY > 0) {
            if (currentSection >= sections.length - 1) return;

            window.scroll({
                top: sections[currentSection + 1].getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        } else {
            if (currentSection <= 0) return;
            
            window.scroll({
                top: sections[currentSection - 1].getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        }
    }, { passive: false });

    document.addEventListener('scroll', (e) => {
        scrolling = true;
        scrollUpdateRequired = true;
    });

    runScrollManager();
}

async function runScrollManager() {
    while (running) {
        scrolling = false;

        await delay(100);
        if (!scrolling && scrollUpdateRequired)
            updateScrollPosition();
    }
}

function updateScrollPosition() {
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top < window.innerHeight && section.getBoundingClientRect().top >= 0) {
            currentSection = index;
        }
    });
    scrollUpdateRequired = false;
}