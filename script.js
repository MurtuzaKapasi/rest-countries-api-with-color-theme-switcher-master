const icon = document.querySelector('#toggle-icon');
const text = document.querySelector('#toggle-text');
const nav = document.querySelector('.nav-right');
nav.addEventListener('click', function () {
    document.body.classList.toggle('white-theme');
    if (document.body.classList.contains('white-theme')) {
        icon.setAttribute('name', 'moon');
        text.textContent = 'Dark Mode';
    }
    else {
        icon.setAttribute('name', 'sunny');
        text.textContent = 'Light Mode';
    }
})




// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from JSON file
    const btn = document.querySelector('.dropbtn');
    const content = document.querySelector('.dropdownContent');
    const filterBox = document.querySelector('.dropbtn span'); // Add a span inside the button

    btn.addEventListener('click', function () {
        if (content.style.display === 'flex') {
            content.style.display = 'none';
        } else {
            content.style.display = 'flex';
        }
    });

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            content.style.display = 'none';
        }
    };

    // Add click event listener to each filter option
    const filterOptions = document.querySelectorAll('#filter a');
    filterOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();
            let selectedContinent = option.id;
            // console.log(selectedContinent);
            filterCountriesByContinent(selectedContinent);

            content.style.display = 'none';
            filterBox.textContent = selectedContinent;
        });
    });


function filterCountriesByContinent(continent) {
    const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const regionElement = card.querySelector('.cardText p:nth-child(3)');
            let region = regionElement.textContent.trim();
            region = region.replace('Region:', '');
            region = region.trim();
            // console.log('Region:', region , 'Continent:', continent);
            if (region !== continent) {
                card.style.display = 'none';
            } 
            else {
                card.style.display = 'flex';
            }
        });
}

    function showCountryDetails(country) {
        // Hide all country cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // Create a modal or detailed view
        const modal = document.createElement('div');
        modal.className = 'modal';

        // Populate modal with country information
        modal.innerHTML = `
        <button class="close-modal" onclick="closeModal()">Back </button>
            <div class="modal-content">
                <img src="${country.flag}" alt="${country.name} Flag">
                <div class="modal-details">
                    <h2>${country.name}</h2>
                    <div class="modal-details-info">
                        <div class="modal-details-info-one">
                            <p><b>Native Name:</b> ${country.nativeName}</p>
                            <p><b>Population:</b> ${country.population}</p>
                            <p><b>Region: </b>${country.region}</p>
                            <p><b>Sub Region:</b> ${country.subregion}</p>
                            <p><b>Capital:</b> ${country.capital}</p>
                        </div>
                        <div class="modal-details-info-one">
                            <p><b>Top Level Domain:</b> ${country.topLevelDomain}</p>
                            <p><b>Currencies:</b> ${country.currencies.map(currency => currency.name).join(', ')}</p>
                            <p><b>Languages:</b> ${country.languages.map(language => language.name).join(', ')}</p>
                        </div>
                    </div>
                    <div class="modal-details-border">
                        <p><b>Border Countries:</b>
                        <div class="border-countries">
                            ${country.borders?.map(border => `<span class="border-country">${border}</span>`).join('')}
                        </div>
                        </p>
                    </div>
                    
                </div>
            </div>
        `;

        // Append the modal to the body
        document.body.appendChild(modal);
    }

    // Function to close the modal and show all country cards
    window.closeModal = function () {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
            selectedContinent = '';
        }
        // Show all country cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'flex'; // Adjust the display property as needed
        });
    };

    // Fetch data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.getElementById('cardsContainer');

            // Loop through each country in the data
            data.forEach(country => {
                // Create a card element
                const card = document.createElement('div');
                card.className = 'card';

                // Populate card with country information
                card.innerHTML = `
                    <img src="${country.flag}" alt="${country.name} Flag">
                `;

                const cardText = document.createElement('div');
                cardText.className = 'cardText';
                cardText.innerHTML = `
                    <h2>${country.name}</h2>
                    <p>Population: ${country.population}</p>
                    <p>Region: ${country.region}</p>
                `;

                card.appendChild(cardText);

                card.addEventListener('click', function () {
                    showCountryDetails(country);
                });

                // Append the card to the container
                cardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
