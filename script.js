//when a key is pressed
document.addEventListener('keydown', async (event) => {
    const input = document.getElementById("user-input");
    const title = document.getElementById("title");
    const factsList = document.getElementById("nutrition-facts");

    var isEnterKey = event.key;
    if (isEnterKey === 'Enter' && input.value !== '') {
        //display nutrient facts
        const data = await getData(input.value);
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

//fetch nutritional data of input
async function getData(inputData) {
    const config = await fetch("./config.json").then(response => response.json());
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(config.apikey)}&query=${encodeURIComponent(inputData)}&dataType=${encodeURIComponent("Foundation")}&pageSize=${encodeURIComponent(1)}`;
    const response = await fetch(api_url);
    return response.json();
}