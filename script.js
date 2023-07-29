const searchBar = document.getElementById("search-bar")
const input = document.getElementById("user-input")
const title = document.getElementById("title")

document.addEventListener('keydown', (event) => {
    var isEnterKey = event.key;
    if (isEnterKey === 'Enter' && input.value !== '') {
        title.innerHTML = input.value;
        input.value = ''
    }
})

function getNutritionFacts() {
    fetch('/get_nutrition', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `food_item=${encodeURIComponent(input)}`
    })
        .then(response => response.json())
        .then(data => {
            const nutritionFacts = document.getElementById("nutrition-facts")
            nutritionFacts.innerHTML = ''
            for (const key in data) {
                const fact = document.createElement("p");
                fact.innerText = `${key}: ${data[key]}`;
                nutritionFacts.appendChild(fact);
            }
        })
        .catch(error => console.error("Error: ", error));
}