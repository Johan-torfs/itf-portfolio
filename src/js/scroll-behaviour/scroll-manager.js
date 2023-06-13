import { delay, determineGestureType } from '../common.js';

var sections = [];
var onScrollCalbacks = [];

var currentSection = 0;
var running = true;

var scrolling = false;
var scrollUpdateRequired = true;

var touchStartX = 0;
var touchStartY = 0;
var touching = false;

var lockTouch = false;

export function startScrollManager() {
    sections = document.querySelectorAll('.scroll-section');
    updateScrollPosition();

    if (sections.lengt == 0) {
        console.log('no scroll-sections found');
        return;
    }

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        onScrollGesture(e.deltaY); 
    }, { passive: false });

    window.addEventListener('touchstart', (e) => {
        touching = true;

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
        if (!touching) return;

        if (lockTouch) {
            touching = false;
            return;
        }

        let deltaX = touchStartX - e.changedTouches[0].clientX;
        let deltaY = touchStartY - e.changedTouches[0].clientY;

        let gestureType = determineGestureType(deltaX, deltaY);
        if (gestureType == 'swipe-left' || gestureType == 'swipe-right') return;

        window.scrollBy(0, touchStartY - e.touches[0].clientY);

        if (Math.abs(deltaY) > 50) {
            scrollUpdateRequired = false;
            onScrollGesture(deltaY);
            touching = false;
        }

    });

    window.addEventListener('touchend', (e) => {
        if (!touching) return;

        if (lockTouch) {
            touching = false;
            return;
        }

        let deltaX = touchStartX - e.changedTouches[0].clientX;
        let deltaY = touchStartY - e.changedTouches[0].clientY;

        let gestureType = determineGestureType(deltaX, deltaY);
        if (gestureType == 'swipe-left' || gestureType == 'swipe-right') return;

        scrollUpdateRequired = false;
        if (Math.abs(deltaY) > 50)
            onScrollGesture(deltaY);
        else 
            onScrollGesture(0);
            
        touching = false;
    });

    document.addEventListener('scroll', (e) => {
        scrolling = true;
        scrollUpdateRequired = true;
    });

    runScrollManager();
}

export function lockTouchScrolling() {
    lockTouch = true;
}

export function unlockTouchScrolling() {
    lockTouch = false;
}

export function registerOnScrollCallback(callback) {
    onScrollCalbacks.push(callback);
}

function onScrollGesture(deltaY) {
    if (scrollUpdateRequired) return;

    if (deltaY > 0) {
        if (currentSection >= sections.length - 1) return;

        window.scrollTo({
            top: sections[currentSection + 1].getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
        });
    } else if (deltaY < 0) {
        if (currentSection <= 0) return;
        
        window.scrollTo({
            top: sections[currentSection - 1].getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: sections[currentSection].getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
        });
    }
}

async function runScrollManager() {
    while (running) {
        scrolling = false;

        await delay(100);
        if (!scrolling && !touching && scrollUpdateRequired)
            updateScrollPosition();

        // HACK: this is a hack to fix a bug where the scroll gesture opertaion is not completed when going form section 0 to section 1
        if (!scrolling && !touching && sections[currentSection].getBoundingClientRect().top != 0) {
            window.scrollTo({
                top: sections[currentSection].getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        }
    }
}

function updateScrollPosition() {
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top < window.innerHeight/2 && section.getBoundingClientRect().top >= 0) {
            currentSection = index;
        }
    });
    scrollUpdateRequired = false;

    onScrollCalbacks.forEach(callback => {
        callback();
    });
}

export function isCurrentSection(section) {
    return sections[currentSection] == section;
}