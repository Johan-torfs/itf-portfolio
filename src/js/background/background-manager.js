
var list = [];
var offset = 100;

export function startBackgroundManager() {
    list = document.querySelectorAll("*[data-bg]");
    list = Array.from(list);

    var elem = document.createElement('canvas');
    var supported = true;

    if (!(elem.getContext && elem.getContext('2d')))
        supported = elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    else
        supported = false;

    for (var i = 0; i < list.length; i++) {
        var url = list[i].getAttribute('data-bg');
        if (!supported)
            url = url.replace(".webp", ".jpg");
        list[i].setAttribute('data-bg', url)
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
}

function onScroll() {
    if (list.length == 0) return;
    var bottom = window.scrollY + window.innerHeight + offset;

    for (var i = 0; i < list.length; i++) {
        var rect = list[i].getBoundingClientRect();
        if (rect.top <= bottom) {
            var url = list[i].getAttribute('data-bg');
            list[i].style.backgroundImage="url('" + url + "')";
            list.splice(i, 1);
            i--;
        }
    }
}