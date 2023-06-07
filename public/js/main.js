import { startLinesManager } from './lines/line-manager.js';
import { setAnimationDelay } from './animation/animation-delay.js'
import { startNavManager } from './navigation/nav-manager.js';
import { startScrollManager } from './scroll-behaviour/scroll-manager.js';

startLinesManager(['lines-left', 'lines-right']);
startNavManager();
startScrollManager();

setAnimationDelay();