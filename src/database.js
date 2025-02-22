import database from './database/database.json';

export function populateData() {
    populateNews(database.news);
    populateArchives(database.archives);
    populateSellingPoints(database.sellingPoints);
}

/**
 * Populate the news section with the data from the database.
 */
function populateNews(news) {
    const newsElement = document.getElementById('news');
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
function populateArchives(archives) {
    const archivesElement = document.getElementById('archives');

    archives.forEach((archive) => {
        const archiveElement = document.createElement('div');
        archiveElement.classList.add('archiveFile');
        archiveElement.innerHTML = `
        <div class="qcol three smallDesk-three tablet-four phone-six smallPhone-twelve">
            <a href="${archive.filePath}" target="_blank">
                <img src="${archive.imagePath}" alt="To'Porren ${archive.title}">
                <div>${archive.title}</div>
                <span class="fileSize">(${archive.size})</span>
            </a>
        </div>
        `;
        archivesElement.appendChild(archiveElement);
    });
}

/**
 * Populate the selling points section with the data from the database.
 */
function populateSellingPoints(sellingPoints) {
    const sellingPointsElement = document.getElementById('sellingPoints');

    sellingPoints.forEach((sellingPoint) => {
        const sellingPointName = sellingPoint.name.toLowerCase().replace(/\s+/g, '-');
        const sellingPointElement = document.createElement('div');
        sellingPointElement.classList.add('qcol', 'twelve');
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
}
