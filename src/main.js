// main.js
import { populateData } from './database.js';
import { handleNavbar } from './navbar.js';
import { handleMenu } from './menu.js';
import { handleNews } from './news.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initDropdowns } from './dropdown.js';

function main() {
    populateData();
    handleNavbar();
    handleMenu();
    handleNews();
    initSmoothScroll();
    initDropdowns();
}

main();
