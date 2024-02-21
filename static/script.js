const input = document.getElementById("user-input");
const title = document.getElementById("title");
const factsList = document.getElementById("nutrition-facts");

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && input.value !== '') {
        const response = await fetch(`/api/getData/${encodeURIComponent(input.value)}`);
        const data = await response.json();
        factsList.innerHTML = "";
        const nutrients = data.foods[0].foodNutrients;
        let output = "";
        nutrients.forEach(nutrient => {
            const { nutrientName, value, unitName } = nutrient;
            output += `${nutrientName}: ${value} ${unitName}<br>`;
        });
        factsList.innerHTML = output;
        title.innerHTML = input.value + " (100g)";
        input.value = '';
    }
});