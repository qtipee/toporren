// dropdown.js
export function initDropdowns(lazy = false) {
    const dropdowns = lazy ? document.querySelectorAll('.dropdown.lazy') : document.querySelectorAll('.dropdown');
    
    dropdowns.forEach((dropdown) => {
        let targetSelector = dropdown.getAttribute('target');
        let target = document.querySelector(targetSelector);

        if (target) {
            const rect = target.getBoundingClientRect();
            target.setAttribute('dropdown-height', rect.height + 'px');
            target.classList.add('collapsed');
            target.style.height = '0px';
            target.style.transition = 'height 0.3s ease, overflow 0.3s ease'; // Add smooth animation
        }
    });

    // Add the event listeners to the dropdowns once they are initialised
    setDropdownsEvent(lazy);

    // Add a resize event listener to recalculate dropdown heights
    window.addEventListener('resize', debounce(recalculateDropdownHeights, 1000));
}

function setDropdownsEvent(lazy = false) {
    const dropdowns = lazy ? document.querySelectorAll('.dropdown.lazy') : document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('dropdown-open');

            let targetSelector = dropdown.getAttribute('target');
            let target = document.querySelector(targetSelector);

            if (target) {
                if (target.classList.contains('collapsed')) {
                    const dropdownHeight = target.getAttribute('dropdown-height');
                    target.style.height = dropdownHeight;
                    target.style.overflow = 'visible'; // Allow content to be visible
                } else {
                    target.style.height = '0px';
                    target.style.overflow = 'hidden'; // Hide overflow when collapsed
                }

                target.classList.toggle('collapsed')
            }
        });
    });
}

/**
 * Recalculate the heights of all dropdowns when the page is resized.
 */
function recalculateDropdownHeights() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const targetSelector = dropdown.getAttribute('target');
        const target = document.querySelector(targetSelector);

        if (target) {
            // Temporarily expand the dropdown if it is collapsed
            const wasCollapsed = target.classList.contains('collapsed');
            if (wasCollapsed) {
                target.style.height = 'auto';
                target.style.overflow = 'visible';
                target.classList.remove('collapsed');
            }

            // Recalculate the height
            const rect = target.getBoundingClientRect();
            target.setAttribute('dropdown-height', rect.height + 'px');

            // Restore the collapsed state if it was originally collapsed
            if (wasCollapsed) {
                target.style.height = '0px';
                target.style.overflow = 'hidden';
                target.classList.add('collapsed');
            }
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
