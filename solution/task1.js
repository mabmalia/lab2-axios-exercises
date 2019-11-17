/**
 * Get dog pictures from Dog CEO API.
 */
function getDogs(){
    axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then(response => showDogs(response))
    .catch(error => console.log(error));
}

/**
 * Shows dogs retrieved from Dog CEO API.
 */
function showDogs(response){
    let image = document.getElementById("id-dogImage");
    image.src = response.data.message;
    console.log("New url: ", response.data.message);
}

/**
 * Sets the generate dog button. Main function of the script.
 */
function setDogButton() {
    let dogButton = document.getElementById("id-getDog");
    dogButton.addEventListener("click", getDogs, false);
}

document.addEventListener("DOMContentLoaded", setDogButton, false);