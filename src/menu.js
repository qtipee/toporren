// menu.js
export function handleMenu() {
    document.getElementById('menu').addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('open');
        
        // Prevent scrolling when the menu is open
        if (event.currentTarget.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.phoneNav .smoothScroll').forEach((element) => {
        element.addEventListener('click', () => {
            const menuElement = document.getElementById('menu');
            menuElement.click();
        });
    });
}
