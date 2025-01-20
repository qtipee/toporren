// navbar.js
export function handleNavbar() {
    document.addEventListener('scroll', debounce(() => {
        const navbarWrapperElement = document.getElementById('navbarWrapper');
        const scrollTop = document.documentElement.scrollTop;
        navbarWrapperElement.classList.toggle('lessPadding', scrollTop > 0);
    }, 10));
}

/**
 * Debounce function to optimize scroll handler execution.
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
