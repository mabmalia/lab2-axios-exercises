
/**
 * Get all the user profile data.  
 */
const getAllProfileData = response =>
    getCountryName(response.data.results[0].nat)
        .then(country =>
            ({
                name: response.data.results[0].name,
                picture: response.data.results[0].picture.large,
                country: {
                    code: response.data.results[0].nat,
                    name: country,
                },
            })
        );

/**
 * Get user profile from Random User Generator API.  
 */
function getUserProfile(){
    return axios
        .get("https://randomuser.me/api/")
        .then(getAllProfileData)
        .then(showUserProfile)
        .catch(error => console.log(error));
}

/**
 * Get country name from REST Countries API.
 */
function getCountryName(code){
    return axios
        .get("https://restcountries.eu/rest/v2/alpha/" + code + "?fields=name")
        .then(response => response.data.name)
        .catch(error => console.log(error));
}

/**
 * Shows user and alien profiles.
 */
function showUserProfile(userProfile){
    //updates user profile picture
    let imageProfile = document.getElementById("id-profileImage");
    imageProfile.src = userProfile.picture;
    console.log("new profile url: ", imageProfile.src);

    //updates user name
    let name = document.getElementById("id-name");
    name.innerHTML = `${userProfile.name.title} ${userProfile.name.first} ${userProfile.name.last}`
    console.log("new name: ", name.innerHTML);

    //generate alien picture from RoboHash.org
    let imageAlien = document.getElementById("id-alienImage");
    imageAlien.src = "https://robohash.org/" + name.innerHTML;
    console.log("new alien url: ", imageAlien.src);

    //get country flag from countryFlags.io
    let imageCountry = document.getElementById("id-countryImage");
    imageCountry.src = "https://www.countryflags.io/" + userProfile.country.code + "/flat/64.png";
    console.log("new flag url: ", imageCountry.src);

    //update country name
    let nameCountry = document.getElementById("id-country");
    nameCountry.innerHTML = userProfile.country.name;
    console.log("new country name: ", nameCountry.innerHTML);
}

/**
 * Sets the generate profile button. Main function of the script.
 */
function setProfileButton() {
    let profileButton = document.getElementById("id-getProfile");
    profileButton.addEventListener("click", getUserProfile, false);
  } 

document.addEventListener("DOMContentLoaded", setProfileButton, false);