const input = document.getElementById("user-input");
const title = document.getElementById("title");
const factsList = document.getElementById("nutrition-facts");

document.addEventListener('DOMContentLoaded', async (event) => {
    const test = await fetch('/test');
    const testData = await test.json();
    console.log(testData);
})

document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && input.value !== '') {
        console.log("recieving data!");
        const response = await fetch(`/getData/${encodeURIComponent(input.value)}`);
        const data = await response.json();
        console.log("recieved data!");
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