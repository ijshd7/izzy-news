const container = document.getElementById('container');
const backBtn = document.getElementById('back-btn');
const moarBtn = document.getElementById('moar-btn');
const pageNumberEl = document.getElementById('page-number');

let pageNumber = 1;
let pageSize = 10;

// courtesy of newsapi.org
function getThoseArticles() {
    API_KEY = 'dd8ded21f31a408886cba7f5ff143a16';
    fetch(`https://newsapi.org/v2/everything?sources=techcrunch&language=en&sortBy=popularity&pageSize=${pageSize}&page=${pageNumber}&apiKey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log('data:', data);
            let totalResults = data.totalResults;
            // Determining the number of pages and displaying it
            pages = Math.ceil(data.totalResults / pageSize);
            console.log(pageNumber,"of", pages);
            pageNumberEl.innerHTML = `Page ${pageNumber}`;
            // Checking if it is the first page and disabling the prev button if it is
            if (pageNumber === 1) {
                backBtn.disabled = true; 
            }
            // Checking if it is the last page and disabling the next button if it is
            if (pageNumber * pageSize > totalResults) {
                console.log('true');
                nextBtn.disabled = true; 
            }
            // Mapping the articles array into an article object, creating the HTML element for each
            container.innerHTML = data.articles
            .map(
                article => `
                <div class="item">
                    <img src="${article.urlToImage}" alt="Article Image">
                    <h2>${article.title}</h2>
                    <p>
                    ${article.description}
                    </p>
                    <a href="${article.url}">Read full article</a>
                </div>
                `
            ).join('');
        });
        // Scroll to top of page each time
        window.scrollTo(0,0);
    }
    
    // Go to previous page of results
    function prevPage() {
        pageNumber--;
        backBtn.disabled = false; 
        getThoseArticles(); 
    }
    
    // Go to next page of results
    function nextPage() {
        pageNumber++;
        backBtn.disabled = false;
        getThoseArticles(); 
    }
    
    // Event listeners
    moarBtn.addEventListener('click', nextPage);
    backBtn.addEventListener('click', prevPage);
    
    getThoseArticles();