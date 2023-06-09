import { startLinesManager, onResize as onResizeLines } from './lines/line-manager.js';
import { setAnimationDelay } from './animation/animation-delay.js'
import { startNavManager } from './navigation/nav-manager.js';
import { startScrollManager, lockTouchScrolling, unlockTouchScrolling } from './scroll-behaviour/scroll-manager.js';
import { startBackgroundManager } from './background/background-manager.js';
import { startCarouselManager, onResize as onResizeCarousel } from './carousel/carousel-manager.js';
import { updateBreakpoint } from './common.js';
import { startCubeManager, onResize as onResizeCube } from './cube/cube-manager.js';

updateBreakpoint();

startLinesManager();
startNavManager();
startScrollManager();
startBackgroundManager();
startCarouselManager();
startCubeManager(lockTouchScrolling, unlockTouchScrolling);

setAnimationDelay();

window.addEventListener('resize', () => {
    updateBreakpoint();
    onResizeLines();
    onResizeCarousel();
    onResizeCube();
});