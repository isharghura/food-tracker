//get

import fetch from "node-fetch";
import config from "./config.json" assert {type: "json"}

const params = {
    api_key: config.apikey,
    query: "sugar",
    dataType: ["Survey (FNDDS)"],
    pagesize: 1,
}

const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

function getData() {
    return fetch(api_url).then(response => response.json())
}

getData().then(data => console.log(data.foods[0].foodNutrients))