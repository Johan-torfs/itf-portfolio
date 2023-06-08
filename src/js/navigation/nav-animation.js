export function slideInNavigation() {
    let navContainer = document.getElementById('navigation').getElementsByClassName('nav-container')[0];
    let navButton = document.getElementById('navigation-button');

    if (!navContainer) return;

    if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        navButton.classList.remove('active');
    } else {
        navContainer.classList.add('active');
        navButton.classList.add('active');
    }
}