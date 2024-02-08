let url = new URL(window.location);
let params = url.searchParams;

for (const p of params) {
    console.log(p);
}

async function updateOrderCard() {
    const currentDate = new Date().toLocaleDateString();

    document.querySelector('#orderDate').textContent = currentDate;
    document.querySelector('#yourname').textContent = params.get("firstName");
    document.querySelector('#email').textContent = params.get("email");
    document.querySelector('#phone').textContent = params.get("phoneNumber");

    try {
        const fruit1Name = await getFruitNameById(params.get("fruit1"));
        const fruit2Name = await getFruitNameById(params.get("fruit2"));
        const fruit3Name = await getFruitNameById(params.get("fruit3"));

        document.querySelector('#fruit1').textContent = fruit1Name;
        document.querySelector('#fruit2').textContent = fruit2Name;
        document.querySelector('#fruit3').textContent = fruit3Name;

        document.querySelector('#specialinstructions').textContent = params.get("specialInstructions");
    } catch (error) {
        console.error('Error updating order card:', error);
    }
}

updateOrderCard();

async function fetchNutritionalInfo(fruitId) {
    const response = await fetch("./data/fruit.json");
    const fruitData = await response.json();
    
    const fruit = fruitData.find(f => f.id === parseInt(fruitId));
    return fruit ? fruit.nutritions : null;
}

async function updatehealthInfo() {
    const fruit1Info = await fetchNutritionalInfo(params.get("fruit1"));
    const fruit2Info = await fetchNutritionalInfo(params.get("fruit2"));
    const fruit3Info = await fetchNutritionalInfo(params.get("fruit3"));

    if (fruit1Info && fruit2Info && fruit3Info) {
        const round = (value) => parseFloat(value).toFixed(2);

        const totalNutrition = {
            carbs: round(fruit1Info.carbohydrates + fruit2Info.carbohydrates + fruit3Info.carbohydrates),
            protein: round(fruit1Info.protein + fruit2Info.protein + fruit3Info.protein),
            fat: round(fruit1Info.fat + fruit2Info.fat + fruit3Info.fat),
            sugar: round(fruit1Info.sugar + fruit2Info.sugar + fruit3Info.sugar),
            calories: fruit1Info.calories + fruit2Info.calories + fruit3Info.calories
        };

    document.querySelector('#carbs').textContent = totalNutrition.carbs;
    document.querySelector('#protein').textContent = totalNutrition.protein;
    document.querySelector('#fat').textContent = totalNutrition.fat;
    document.querySelector('#sugar').textContent = totalNutrition.sugar;
    document.querySelector('#calories').textContent = totalNutrition.calories;
    } else {
        console.error("failed to fetch nutrional information for one or more fruits.");
    }
}

updatehealthInfo();