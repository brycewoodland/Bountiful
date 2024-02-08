function updateTotalDrinksCount() {
    
    let totalDrinksCount = localStorage.getItem('totalDrinksCount') || 0;

    const totalDrinksDisplay = document.getElementById('totalDrinks');
    totalDrinksDisplay.textContent = totalDrinksCount;
}

updateTotalDrinksCount();