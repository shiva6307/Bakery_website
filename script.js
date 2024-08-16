// script.js

// script.js

// const APP_ID = '22c4c3b0'; // Replace with your Edamam App ID
// const APP_KEY = ''; // Replace with your Edamam App Key

// script.js

const APP_ID = '22c4c3b0'; // Replace with your Edamam App ID
const APP_KEY = 'f71ad8995a228afc22e74930f18b8331'; // Replace with your Edamam App Key

let timeoutId;

document.getElementById('search-input').addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const query = document.getElementById('search-input').value;

        if (query.trim() === '') {
            document.getElementById('search-results').innerHTML = '';
            return;
        }

        fetchResults(query);
    }, 300); // Debounce for 300ms
});

function fetchResults(query) {
    document.getElementById('search-results').innerHTML = '<p>Loading...</p>'; // Show loading indicator

    fetch(`https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.hits.length === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>';
                return;
            }

            const resultsList = document.createElement('ul');
            data.hits.forEach(item => {
                const listItem = document.createElement('li');
                const recipe = item.recipe;
                listItem.innerHTML = `
                    <div>
                        <strong>${recipe.label}</strong>
                        <br>
                        <a href="${recipe.url}" target="_blank">View Recipe</a>
                        <br>
                        <img src="${recipe.image}" alt="${recipe.label}" style="width: 100px; height: 100px; object-fit: cover;">
                        <br>
                        <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
                        <p><strong>Ingredients:</strong> ${recipe.ingredientLines.join(', ')}</p>
                    </div>
                `;
                resultsList.appendChild(listItem);
            });

            resultsContainer.appendChild(resultsList);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('search-results').innerHTML = '<p>Failed to fetch results. Please try again later.</p>';
        });
}

