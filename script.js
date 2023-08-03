import config from "./config.json" assert {type: "json"}

const title = document.getElementById("title");

//fetch nutritional data of input
function getData() {
    const inputValue = input.value;
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(config.apikey)}&query=${encodeURIComponent(inputValue)}&dataType=${encodeURIComponent("Survey (FNDDS)")}&pageSize=${encodeURIComponent(1)}`;
    return fetch(api_url).then(response => response.json());
}

//when a key is pressed
document.addEventListener('keydown', (event) => {
    var isEnterKey = event.key;
    if (isEnterKey === 'Enter' && input.value !== '') {
        const input = document.getElementById("user-input");

        //display nutrient facts
        getData().then(data => {
            const nutrients = data.foods[0].foodNutrients;
            nutrients.forEach(nutrient => {
                const { nutrientName, value, unitName } = nutrient;
                console.log(`${nutrientName}: ${value} ${unitName}`);
            });
        });

        title.innerHTML = input.value;
        input.value = '';
    }
});
