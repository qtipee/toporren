// smoothScroll.js
export function initSmoothScroll() {
    document.querySelectorAll('.smoothScroll').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetId = element.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const targetPosition = targetElement.offsetTop - 30;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        });
    });
}
