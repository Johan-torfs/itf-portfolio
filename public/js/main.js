import { setupLines, blinkLine } from './lines/lines.js'
import { lines_right } from './lines/lines.data.js'
import { setAnimationDelay } from './animation/animation-delay.js'

setupLines(
    document.querySelector('#lines-right'), 
    lines_right
)

setupLines(
    document.querySelector('#lines-left'), 
    lines_right
)

setAnimationDelay();
