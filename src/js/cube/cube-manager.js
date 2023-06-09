import { delay, cubicbezier, determineGestureType } from '../common.js';

var cubeList = [];
var touchStartX = 0;
var touchStartY = 0;
var mouseDown = false;
var rotationAdded = false;
var gestureType = '';

const MIN_SWIPE_DISTANCE = 50;
const MAX_SWIPE_DISTANCE = 500;

var running = false;

export function startCubeManager(lockScrolling, unlockScrolling) {
    document.querySelectorAll('.stage-body').forEach(cube => {
        cubeList.push({
            id: cube.id,
            element: cube, 
            position: 0, 
            length: cube.querySelectorAll('.face').length,
            body: cube.querySelector('.stage-content'),
            elements: cube.querySelectorAll('.face'),
            indicators: cube.querySelectorAll('.stage-indicator'),
            transitionDuration: '500ms',
            hasRotations: false,
            canBeReset: false,
        });
    });

    if (cubeList.length == 0) {
        console.log('no cube found');
        return;
    }

    onResize();
    setupCubeListeners(lockScrolling, unlockScrolling);

    running = true;
    runCubeManager();
}

async function runCubeManager() {
    while (running) {
        await delay(1000);
        cubeList.forEach((cube, index) => {
            if (cube.canBeReset && cube.position == 0) {
                cube.canBeReset = false;
                cube.hasRotations = false;
                transitionCubeInstantly(cube, '');
            } else if (cube.canBeReset) {
                cube.canBeReset = false;
            }

            if (cube.hasRotations && cube.position == 0) {
                cube.canBeReset = true;
            }
        });
    }
}

export function onResize() {
    cubeList.forEach((cube, index) => {
        cube.body.style.setProperty('--width', cube.element.getBoundingClientRect().width / 2 + 'px');
    });
}

function setupCubeListeners(lockScrolling, unlockScrolling) {
    cubeList.forEach((cube, index) => {
        cube.body.addEventListener('touchstart', (e) => onTouchStart(e, cube, lockScrolling));
        cube.body.addEventListener('touchmove', (e) => onTouchMove(e, cube));
        cube.body.addEventListener('touchend', (e) => onTouchEnd(e, cube, unlockScrolling));

        cube.body.addEventListener('mousedown', (e) => onMouseDown(e, cube));
        cube.body.addEventListener('mousemove', (e) => onMouseMove(e, cube));
        cube.body.addEventListener('mouseup', (e) => onMouseUp(e, cube));

        cube.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                let currentPosition = cube.position;

                if (index == currentPosition) return;

                let transform = cube.body.style.transform;
                while (index > currentPosition) {
                    transform += ' ' + cube.elements[currentPosition].getAttribute(cube.elements[currentPosition].getAttribute('forward'));
                    currentPosition++;
                }

                while (index < currentPosition) {
                    transform = transform.substring(0, transform.lastIndexOf(' '));
                    currentPosition--;
                }

                cube.position = index;
                setIndicator(cube, cube.position);
                transitionCubeInstantly(cube, transform);
            });
        });
    });
}

async function transitionCubeInstantly(cube, transform) {
    cube.body.style.transitionDuration = '0s';
    await delay(10);
    cube.body.style.transform = transform;
    await delay(10);
    cube.body.style.transitionDuration = cube.transitionDuration;
}

function onTouchStart(e, cube, lockScrolling) {
    lockScrolling();
    onDragStart(e.touches[0].clientX, e.touches[0].clientY);
}

function onMouseDown(e, cube) {
    if (mouseDown) return;
    mouseDown = true;
    cube.body.style.cursor = 'grabbing';

    onDragStart(e.clientX, e.clientY);
}

function onDragStart(dragStartX, dragStartY) {
    touchStartX = dragStartX;
    touchStartY = dragStartY;
    rotationAdded = false;

    gestureType = '';
}

function onTouchMove(e, cube) {
    onDragMove(e.touches[0].clientX, e.touches[0].clientY, cube);
}

function onMouseMove(e, cube) {
    if (!mouseDown) return;

    onDragMove(e.clientX, e.clientY, cube);
}

function onDragMove(dragStartX, dragStartY, cube) {
    let deltaX = dragStartX - touchStartX;
    let deltaY = dragStartY - touchStartY;
    let gestureTypeNew = determineGestureType(deltaX, deltaY);

    if (gestureTypeNew != gestureType) {
        if (rotationAdded) {
            let activeFace = cube.elements[cube.position];
            let nextRotation = activeFace.getAttribute(gestureType);
        
            if (nextRotation == "back") {
                let lastIndex = cube.body.style.transform.lastIndexOf(' ');
                nextRotation = cube.body.style.transform.substring(lastIndex + 1);
                cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex) + ' ' + resetMoveRotation(nextRotation);
            } else {
                let lastIndex = cube.body.style.transform.lastIndexOf(' ');
                cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex);
            }
            rotationAdded = false;
        }
        gestureType = gestureTypeNew;
    }

    let activeFace = cube.elements[cube.position];
    let nextRotation = activeFace.getAttribute(gestureType);
    let boolBack = false;

    if (!nextRotation) return;

    cube.body.style.transitionDuration = '0s';
    if (nextRotation == "back") {
        let lastIndex = cube.body.style.transform.lastIndexOf(' ');
        nextRotation = cube.body.style.transform.substring(lastIndex + 1);
        rotationAdded = true;
        boolBack = true;
    }

    if (rotationAdded) {
        let lastIndex = cube.body.style.transform.lastIndexOf(' ');
        cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex) + ' ' + getMoveRotation(gestureType, deltaX, deltaY, nextRotation, boolBack);
    } else {
        cube.body.style.transform += ' ' + getMoveRotation(gestureType, deltaX, deltaY, nextRotation, false);
        rotationAdded = true;
    }
}

function resetMoveRotation(nextRotation) {
    return getMoveRotation(0, 0, 0, nextRotation, 0, true);
}

function getMoveRotation(gestureType, deltaX, deltaY, nextRotation, boolBack, boolReset = false) {
    let rotationAmountStartIndex = nextRotation.lastIndexOf('(');
    let rotationAmountEndIndex = nextRotation.lastIndexOf('deg');
    let isRotationNegative = nextRotation.indexOf('-') > -1;
    let rotation;
    let percentage;
    
    if (boolReset)
        return nextRotation.substring(0, rotationAmountStartIndex + 1) + 90 * (isRotationNegative ? -1 : 1) + nextRotation.substring(rotationAmountEndIndex);

    if (gestureType == 'swipe-left' || gestureType == 'swipe-right') {
        percentage = Math.abs(deltaX) / MAX_SWIPE_DISTANCE;        
    } else if (gestureType == 'swipe-up' || gestureType == 'swipe-down') {
        percentage = Math.abs(deltaY) / MAX_SWIPE_DISTANCE;         
    }

    if (percentage > 1) percentage = 1;
    let rotationAbs = cubicbezier(percentage, 0, 0.67, 0.67, 1) * 20;
    rotation = (boolBack ? 90 - rotationAbs : rotationAbs) * (isRotationNegative ? -1 : 1);

    return nextRotation.substring(0, rotationAmountStartIndex + 1) + rotation + nextRotation.substring(rotationAmountEndIndex);
}

function onTouchEnd(e, cube, unlockScrolling) {
    unlockScrolling();
    onDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY, cube);
}

function onMouseUp(e, cube) {
    if (!mouseDown) return;

    onDragEnd(e.clientX, e.clientY, cube);

    mouseDown = false;
    cube.body.style.cursor = 'grab';
}

function onDragEnd(dragStartX, dragStartY, cube) {
    let deltaX = dragStartX - touchStartX;
    let deltaY = dragStartY - touchStartY;
    let gestureType = determineGestureType(deltaX, deltaY);

    let activeFace = cube.elements[cube.position];
    let nextRotation = activeFace.getAttribute(gestureType);

    if (!nextRotation) return;

    cube.body.style.transitionDuration = cube.transitionDuration;
    if (Math.abs(deltaX) < MIN_SWIPE_DISTANCE && Math.abs(deltaY) < MIN_SWIPE_DISTANCE) {
        let lastIndex = cube.body.style.transform.lastIndexOf(' ');
        if (nextRotation == "back") {
            nextRotation = cube.body.style.transform.substring(lastIndex + 1);
            cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex) + ' ' + resetMoveRotation(nextRotation);
        } else {
            cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex)
        }
        return;
    }

    if (nextRotation == "back") {
        let lastIndex = cube.body.style.transform.lastIndexOf(' ');
        cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex);
        cube.position--;
    } else {
        if (rotationAdded) {
            let lastIndex = cube.body.style.transform.lastIndexOf(' ');
            cube.body.style.transform = cube.body.style.transform.substring(0, lastIndex) + ' ' + nextRotation;
            cube.position++;
        } else {
            cube.body.style.transform += ' ' + nextRotation;
            cube.position++;
        }
    }

    if (cube.position > cube.length - 1) cube.position = 0;
    if (cube.body.style.transform != '') cube.hasRotations = true;
    setIndicator(cube, cube.position);
}

function setIndicator(cube, position) {
    cube.indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    cube.indicators[position].classList.add('active');
}