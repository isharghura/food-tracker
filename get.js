//get

const fetch = require("node-fetch");
const config = require("./config.json")

const params = {
    api_key: config.api_key,
    query: "apple",
    dataType: ["Survey (FNDDS)"],
    pagesize: 1,
}

const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

function get_data() {
    return fetch(api_url).then(response => response.json())
}

get_data().then(data => console.log(data.foods[0].foodNutrients))