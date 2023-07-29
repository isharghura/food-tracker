//search bar functionality

const input = document.getElementById("user-input")
const title = document.getElementById("title")

document.addEventListener('keydown', (event) => {
    var isEnterKey = event.key;
    if (isEnterKey === 'Enter' && input.value !== '') {
        title.innerHTML = input.value;
        input.value = ''
    }
})