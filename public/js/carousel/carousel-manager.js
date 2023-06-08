import { delay, cubicbezier, getCurrentBreakpoint } from '../common.js';

var carouselList = [];
var touchStartX = 0;
var mouseDown = false;

const MIN_SWIPE_DISTANCE = 100;
const MARGIN = {
    "small": 32,
    "large": 128,
}

export function startCarouselManager() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        carouselList.push({
            element: carousel, 
            position: 0, 
            length: carousel.querySelectorAll('.carousel-element').length,
            body: carousel.querySelector('.carousel-body'),
            itemWidth: carousel.querySelector('.carousel-element').getBoundingClientRect().width + MARGIN[getCurrentBreakpoint()],
            elements: carousel.querySelectorAll('.carousel-element'),
            indicators: carousel.querySelectorAll('.carousel-indicator')
        });
    });

    if (carouselList.length == 0) {
        console.log('no carousel found');
        return;
    }

    setupCarouselListeners();
}

export function onResize() {
    carouselList.forEach((carousel, index) => {
        carousel.itemWidth = carousel.element.querySelector('.carousel-element').getBoundingClientRect().width + MARGIN[getCurrentBreakpoint()];
        carousel.body.style.transform = 'translateX(' + (-carousel.position * carousel.itemWidth) + 'px)';
    });
}

function setupCarouselListeners() {
    carouselList.forEach((carousel, index) => {
        carousel.body.addEventListener('touchstart', (e) => onTouchStart(e));
        carousel.body.addEventListener('touchmove', (e) => onTouchMove(e, carousel));
        carousel.body.addEventListener('touchend', (e) => onTouchEnd(e, carousel));

        carousel.body.addEventListener('mousedown', (e) => onMouseDown(e));
        carousel.body.addEventListener('mousemove', (e) => onMouseMove(e, carousel));
        carousel.body.addEventListener('mouseup', (e) => onMouseUp(e, carousel));

        carousel.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                var startX = -1 * carousel.position * carousel.itemWidth;
                carousel.position = index;

                lerpCarouselPosition(carousel.body, startX, -1 * carousel.position * carousel.itemWidth, 200, 10).then(() => {
                    carousel.body.style.transform = 'translateX(' + (-1 * carousel.position * carousel.itemWidth) + 'px)';
                    setIndicator(carousel, carousel.position);
                    setElements(carousel, carousel.position);
                });
            });
        });
    });
}

function onTouchStart(e) {
    e.preventDefault();
    onDragStart(e.touches[0].clientX);
}

function onMouseDown(e) {
    mouseDown = true;
    e.preventDefault();
    onDragStart(e.clientX);
}

function onDragStart(dragStartX) {
    touchStartX = dragStartX;
}

function onTouchMove(e, carousel) {
    e.preventDefault();
    onDragMove(e.touches[0].clientX, carousel);
}

function onMouseMove(e, carousel) {
    if (!mouseDown) return;

    e.preventDefault();
    onDragMove(e.clientX, carousel);
}

function onDragMove(dragStartX, carousel) {
    var touchX = dragStartX;
    var touchDeltaX = touchX - touchStartX;

    carousel.body.style.transform = 'translateX(' + (touchDeltaX - carousel.position * carousel.itemWidth) + 'px)';
}

function onTouchEnd(e, carousel) {
    e.preventDefault();
    onDragEnd(e.changedTouches[0].clientX, carousel);
}

function onMouseUp(e, carousel) {
    if (!mouseDown) return;

    e.preventDefault();
    onDragEnd(e.clientX, carousel);
    mouseDown = false;
}

function onDragEnd(dragStartX, carousel) {
    var touchX = dragStartX;
    var touchDeltaX = touchX - touchStartX;
    var startX = touchDeltaX - carousel.position * carousel.itemWidth;

    if (touchDeltaX < -MIN_SWIPE_DISTANCE && carousel.position < carousel.length - 1) {
        carousel.position++;
    } else if (touchDeltaX > MIN_SWIPE_DISTANCE && carousel.position > 0) {
        carousel.position--;
    } 

    lerpCarouselPosition(carousel.body, startX, -1 * carousel.position * carousel.itemWidth, 200, 10).then(() => {
        carousel.body.style.transform = 'translateX(' + (-1 * carousel.position * carousel.itemWidth) + 'px)';
        setIndicator(carousel, carousel.position);
        setElements(carousel, carousel.position);
    });
}

function setIndicator(carousel, position) {
    carousel.indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    carousel.indicators[position].classList.add('active');
}

function setElements(carousel, position) {
    carousel.elements.forEach(indicator => {
        indicator.classList.remove('active');
    });

    carousel.elements[position].classList.add('active');
}

function lerpCarouselPosition(carousel, startX, endX, time, intervals) {
    var promise = new Promise(async (resolve, reject) => {
        for (let index = 0; index < intervals; index++) {
            await delay(time/intervals);
            
            carousel.style.transform = "translateX(" + (startX + (cubicbezier((index + 1) / intervals, 0, 0.67, 0.67, 1) * (endX - startX))) + "px)";
        }
        resolve();
    });

    return promise;
}