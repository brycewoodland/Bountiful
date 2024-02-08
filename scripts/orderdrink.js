document.addEventListener("DOMContentLoaded", function() {
    
    async function fetchFruits() {
        try {
            const response = await fetch('./data/fruit.json');
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching fruits data:', error);
            return [];
        }
    }

    function populateSelect(selectElement, fruits) {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption .textContent = "Select a fruit";
        defaultOption.disabled = true;
        defaultOption.selected = true;

        selectElement.appendChild(defaultOption);

        fruits.forEach((fruit) => {
            const option = document.createElement("option");
            option.value = fruit.id;
            option.textContent = fruit.name;
            selectElement.appendChild(option);
        });
    }

    const fruitSelect1 = document.querySelector("#fruit1");
    const fruitSelect2 = document.querySelector("#fruit2");
    const fruitSelect3 = document.querySelector("#fruit3");

    fetchFruits().then((fruitsData) => {
        populateSelect(fruitSelect1, fruitsData);
        populateSelect(fruitSelect2, fruitsData);
        populateSelect(fruitSelect3, fruitsData);
    })
})

function submitOrderForm() {

    let totalDrinksCount = localStorage.getItem('totalDrinksCount') || 0;
    totalDrinksCount = parseInt(totalDrinksCount, 10) + 1;
    localStorage.setItem('totalDrinksCount', totalDrinksCount);

    updateTotalDrinksCount();
}