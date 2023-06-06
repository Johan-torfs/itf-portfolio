export function setAnimationDelay() {
    var list = document.querySelectorAll('[animation-delay]');
    list = Array.prototype.slice.call(list);

    list.forEach(element => {
        var delay = element.getAttribute('animation-delay');
        element.querySelectorAll('*').forEach(span => {
            span.style.animationDelay = delay + "s";
            span.style.animationPlayState = "running";
        });
    });
}