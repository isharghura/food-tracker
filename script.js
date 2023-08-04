const input = document.getElementById("user-input");
const title = document.getElementById("title");
const factsList = document.getElementById("nutrition-facts");

//fetch nutritional data of input
async function getData(inputData) {
    const config = await fetch("./config.json").then(response => response.json());
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

            let fact = document.createElement("p");
            fact.id = "fact";
            fact.innerHTML = `${nutrientName}: ${value} ${unitName}`

            factsList.appendChild(fact)
        });

        title.innerHTML = input.value;
        input.value = '';
    }
});
