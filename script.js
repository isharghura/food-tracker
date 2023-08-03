import config from "./config.json" assert {type: "json"}

const input = document.getElementById("user-input");
const title = document.getElementById("title");

//fetch nutritional data of input
async function getData(inputData) {
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(config.apikey)}&query=${encodeURIComponent(inputData)}&dataType=${encodeURIComponent("Survey (FNDDS)")}&pageSize=${encodeURIComponent(1)}`;
    const response = await fetch(api_url);
    return response.json();
}

//when a key is pressed
document.addEventListener('keydown', async (event) => {
    var isEnterKey = event.key;
    if (isEnterKey === 'Enter' && input.value !== '') {
        //display nutrient facts
        const data = await getData(input.value);
        const nutrients = data.foods[0].foodNutrients;
        nutrients.forEach(nutrient => {
            const { nutrientName, value, unitName } = nutrient;
            console.log(`${nutrientName}: ${value} ${unitName}`);
        });

        title.innerHTML = input.value;
        input.value = '';
    }
});
