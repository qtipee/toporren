function main() {
    /**
    * Adapt the navbar style based on the vertical position of the page.
    */
    document.addEventListener('scroll', debounce(() => {
        const navbarWrapperElement = document.getElementById('navbarWrapper');
        const scrollTop = document.documentElement.scrollTop;
        navbarWrapperElement.classList.toggle('lessPadding', scrollTop > 0);
    }, 10));
    
    /**
    * All elements with the 'smoothScroll' class will cause a scroll
    * to their target smoothly.
    */
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

    /**
    * Manage the mobile menu.
    */
    document.getElementById('menu').addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('open');
        
        // Prevent scrolling when the menu is open
        if (event.currentTarget.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    /**
    * Close the navigation menu (mobile) when one of its elements is clicked.
    */
    document.querySelectorAll('.phoneNav .smoothScroll').forEach((element) => {
        element.addEventListener('click', () => {
            const menuElement = document.getElementById('menu');
            menuElement.click();
        });
    });

    /**
     * Display more news when the 'Display more news button' is clicked.
     */
    document.getElementById('moreNewsBtn').addEventListener('click', (event) => {
        const newsItems = document.querySelectorAll('#newsWrapper .news');
        let count = 0;

        for (const newsItem of newsItems) {
            if (newsItem.classList.contains('hiddenNews')) {
                newsItem.classList.remove('hiddenNews');
                ++count;
        
                if (count == 2) {
                    // Break the loop when 2 more news are displayed
                    break;
                }
            }
        }

        // Disable the button if all news are displayed
        const hiddenNewsNumber = document.querySelectorAll('#newsWrapper .news.hiddenNews').length;
        if (hiddenNewsNumber == 0) {
            event.target.classList.add('disabled');
            event.target.disabled = true;
        }
    });

    initDropdowns();
    fetchDatabase();
    setYear();
}

/**
 * Optimise the number of times the scroll handler runs.
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Initialise the dropdowns. Set lazy to true for data
 * that is loaded asynchronously.
 */
function initDropdowns(lazy = false) {
    const dropdowns = lazy ? document.querySelectorAll('.dropdown.lazy') : document.querySelectorAll('.dropdown');
    
    dropdowns.forEach((dropdown) => {
        let targetSelector = dropdown.getAttribute('target');
        let target = document.querySelector(targetSelector);
        let rect = target.getBoundingClientRect();

        if (target) {
            target.setAttribute('dropdown-height', rect.height + 'px');
            target.classList.add('collapsed');
            target.style.height = '0px';
        }
    });

    // Add the event listeners to the dropdowns once they are initialised
    setDropdownsEvent(lazy);
}

/**
 * Manage the dropdowns. Set lazy to true for data
 * that is loaded asynchronously.
 */
function setDropdownsEvent(lazy = false) {
    const dropdowns = lazy ? document.querySelectorAll('.dropdown.lazy') : document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('dropdown-open');

            let targetSelector = dropdown.getAttribute('target');
            let target = document.querySelector(targetSelector);

            if (target) {
                let nextHeight = '0px';
                if (target.classList.contains('collapsed')) {
                    nextHeight = target.getAttribute('dropdown-height');
                    target.style.overflow = 'visible'; // Allow content to be visible when expanded
                } else {
                    target.style.overflow = 'hidden'; // Hide overflow when collapsed
                }

                target.style.height = nextHeight;
                target.classList.toggle('collapsed')
            }
        });
    });
}

/**
* Set the current year in the copyright section.
*/
function setYear() {
    const yearElement = document.getElementById('year');
    const yearText = document.createTextNode(new Date().getFullYear());
    yearElement.appendChild(yearText);
}

/**
 * Fetch the database from the JSON file.
 */
function fetchDatabase() {
    fetch('database/database.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('An error occurred while fetching the database...');
        }
        return response.json();
    })
    .then(data => {
        database = data;
        populateNews();
        populateArchives();
        populateSellingPoints();
    })
    .catch(error => {
        console.error(error);
    });
}

/**
 * Populate the news section with the data from the database.
 */
function populateNews() {
    const newsElement = document.getElementById('news');
    const news = database.news;
    let numberVisible = 0;

    news.forEach((newsItem) => {
        const newsItemElement = document.createElement('div');
        
        newsItemElement.classList.add('qcol', 'twelve', 'news');
        if (numberVisible >= 2) {
            // Only display the first 2 news
            newsItemElement.classList.add('hiddenNews');
        }

        newsItemElement.innerHTML = `
        <div class="qrow">
            <div class="qcol five tablet-twelve">
                <img class="newsImg" src="${newsItem.imagePath}" alt="${newsItem.imagePath}">
            </div>
            <div class="qcol seven tablet-twelve">
                <h3 class="newsTitle">${newsItem.title}</h3>
                <p class="newsText">${newsItem.description}<span class="date">(${newsItem.date})</span></p>
            </div>
        </div>
        `;
        newsElement.appendChild(newsItemElement);

        ++numberVisible;
    });
}

/**
 * Populate the archives section with the data from the database.
 */
function populateArchives() {
    const archivesElement = document.getElementById('archives');
    const archives = database.archives;

    archives.forEach((archive) => {
        const archiveElement = document.createElement('div');
        archiveElement.classList.add('archiveFile');
        archiveElement.innerHTML = `
        <div class="qcol two smallDesk-three tablet-four phone-six smallPhone-twelve">
            <a href="${archive.filePath}" target="_blank">
                <img src="${archive.imagePath}" alt="To'Porren ${archive.title}">
                <div>${archive.title}</div>
            </a>
        </div>
        `;
        archivesElement.appendChild(archiveElement);
    });
}

/**
 * Populate the selling points section with the data from the database.
 */
function populateSellingPoints() {
    const sellingPointsElement = document.getElementById('sellingPoints');
    const sellingPoints = database.sellingPoints;

    sellingPoints.forEach((sellingPoint) => {
        const sellingPointName = sellingPoint.name.toLowerCase().replace(/\s+/g, '-');
        const sellingPointElement = document.createElement('div');
        sellingPointElement.classList.add('qcol', 'four', 'tablet-twelve');
        sellingPointElement.innerHTML = `
        <div class="dropdown lazy" target="#${sellingPointName}">
            <div class="town" role="button">
                ${sellingPoint.name}
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
            <ul class="places" id="${sellingPointName}">
                ${sellingPoint.places.map((place, index) => {
                    // Apply 'even' class based on the index
                    const className = index % 2 === 1 ? 'even' : '';
                    return `<li class="${className}">${place}</li>`;
                }).join('')}
            </ul>
        </div>
        `;
        sellingPointsElement.appendChild(sellingPointElement);
    });

    initDropdowns(true);
}

/**
 * Database in JSON format
 */
let database = {};

/**
 * Script main entry point
 */
main();
