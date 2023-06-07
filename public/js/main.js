import { setupLines, startBlinkingAnimation } from './lines/lines.js'
import { lines_right } from './lines/lines.data.js'
import { setAnimationDelay } from './animation/animation-delay.js'

setupLines(
    document.querySelector('#lines-right'), 
    lines_right
).then(() => {
    startBlinkingAnimation(document.querySelector('#lines-right'));
},
() => {
    console.log('error setting up lines right');
});

setupLines(
    document.querySelector('#lines-left'), 
    lines_right
).then(() => {
    startBlinkingAnimation(document.querySelector('#lines-left'));
},
() => {
    console.log('error setting up lines left');
});

setAnimationDelay();
