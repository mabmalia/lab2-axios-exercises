
/**
 * Constant that holds all data submitted by the user.  
 */
const formInputData = {
    name: null,
    countryName: null,
    expenses: null,
    currencyName: null,
    budget: null,
};

/**
 * Get the exchange rate from XXX to SEK.
 */
function getExchangeRate(from){
    return axios
            .get(`https://api.exchangeratesapi.io/latest?base=${from}`)
            .then(response => response.data.rates["SEK"])
            .catch(error => console.log(error));
};

/**
 * Get details from a currency,
 * to check if it exists.
 */
function getCurrency(currencyCode){
    return axios
        .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        .then(response => response.status)
        .catch(error => error.response.status);
}

/**
 * Gets a list of all countries.
 */
function getAllCountries(){
    return axios
        .get("https://restcountries.eu/rest/v2/all?fields=name")
        .then(response => response.data)
        .catch(error => console.log(error));
}

/**
 * Populate country select box.
 */
function populateCountrySelect(){
    let select = document.getElementById("country");
    getAllCountries().then(countries => {
        for(country in countries){
            let option = document.createElement("option");
            option.innerHTML = countries[country].name;
            select.appendChild(option);
        }
    });
}

/**
 * Validate trip name.
 */
function validateName() {
    let nameInput = document.getElementById("name").value;
    let nameHelp = document.getElementById("nameHelp");

    if(nameInput.length < 3){
         nameHelp.innerHTML = "Name must have at least 3 characters.";
         formInputData.name = null;
    }
    else{
        nameHelp.innerHTML = "";
        formInputData.name = nameInput;

        //Print the nameInput in the console
        console.log("Trip name:", nameInput);
    }

    //check if submit button can be enabled
    chekcSubmitButton();
}

/**
 * Validate country name.
 */
function validateCountry() {
    let countryInput = document.getElementById("country").value;
    let countryHelp = document.getElementById("countryHelp");

    if(countryInput === "no-country"){
        countryHelp.innerHTML = "A valid country must be selected.";
        formInputData.countryName = null;
    }
    else{
        countryHelp.innerHTML = "";
        formInputData.countryName = countryInput;

        //Print the nameInput in the console
        console.log("Country:", countryInput);
    }

    //check if submit button can be enabled
    chekcSubmitButton();
}

/**
 * Validate expenses.
 */
function validateExpenses() {
    let expensesInput = document.getElementById("expenses").value;
    let expensesHelp = document.getElementById("expensesHelp");

    if(expensesInput < 1){
        expensesHelp.innerHTML = "Expenses must be positive.";
        formInputData.expenses = null;
    }
    else{
        expensesHelp.innerHTML = "";
        formInputData.expenses = expensesInput;

        //Print the expensesInput in the console
        console.log("Expenses:", expensesInput);
    }

    //reset budget
    resetBudget();

    //check if submit button can be enabled
    chekcSubmitButton();
}

/**
 * Validate currency.
 */
async function validateCurrency() {
    let currencyInput = document.getElementById("currency").value;
    let currencyHelp = document.getElementById("currencyHelp");

    if(currencyInput.length != 3){
        currencyHelp.innerHTML = "Currency must have 3 characters.";
        formInputData.currencyHelp = null;
    }
    else if(await getCurrency(currencyInput)
                        .then(response => {return response}) == 404){
        currencyHelp.innerHTML = "Currency not found.";
        formInputData.currencyHelp = null;
    }
    else{
        currencyHelp.innerHTML = "";
        formInputData.currencyName = currencyInput;

        //Print the nameInput in the console
        console.log("Currency:", currencyInput);
    }

    //reset budget
    resetBudget();

    //check if submit button can be enabled
    chekcSubmitButton();
}

/**
 * Reset budget.
 */
function resetBudget(){
    formInputData.budget = 0;
    document.getElementById("budget").value = "";
}

/**
 * Validate budget.
 */
async function validateBudget() {
    const { currencyName, expenses } = formInputData;
    let budgetInput = document.getElementById("budget").value;
    let budgetHelp = document.getElementById("budgetHelp");

    //If there is a valid expense and currency
    if(currencyName !== null && expenses > 0){
        let exchangeRate = await getExchangeRate(currencyName).then(rate => {return rate});
        console.log(expenses * exchangeRate);

        //Budget (SEK) must be higher than expenses * exchange rate
        if(budgetInput <= (expenses * exchangeRate)){
            budgetHelp.innerHTML = "Budget must be higher.";
            formInputData.budget = null;
        }
        else{
            budgetHelp.innerHTML = "";
            formInputData.budget = budgetInput;
    
            //Print the expensesInput in the console
            console.log("Budget:", budgetInput);
        }
    }

    //check if submit button can be enabled
    chekcSubmitButton();
}

/**
 * Enable submit button.
 */
function chekcSubmitButton() {
    let checkSubmit = false;
    //creates an array that contains the values of every object property.
    const submitForm = Object.values(formInputData);

    //loop through form Input Data to check if all fields are valid
    for(value in submitForm) {
        if (submitForm[value] === null) {
            checkSubmit = true;
            break;
        }
      }

    document.getElementById("id-submit").disabled = checkSubmit;
}

/**
 * Sends the form data to the JSON placeholder
 * and print response to the console.
 */
function submitForm(event) {
    //to prevent webpage from loading
    event.preventDefault();

    //post all data input by the user
    axios
        .post("https://jsonplaceholder.typicode.com/posts", formInputData)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
}

/**
 * Sets the submit event.
 */
function setSubmitButton(){
    let form = document.getElementById("budget-form");
    form.addEventListener("submit", submitForm);
}

/**
 * Sets the name input on blur event.
 */
function setNameInput(){
    let inputName = document.getElementById("name");
    inputName.addEventListener("blur", validateName);
}

/**
 * Sets the countries select on change event.
 */
function setCountriesSelect(){
    let inputCountries = document.getElementById("country");
    inputCountries.addEventListener("change", validateCountry);
}

/**
 * Sets the expenses input on blur event.
 */
function setExpensesInput(){
    let inputExpenses = document.getElementById("expenses");
    inputExpenses.addEventListener("blur", validateExpenses);
}

/**
 * Sets the currency input on blur event.
 */
function setCurrencyInput(){
    let inputCurrency = document.getElementById("currency");
    inputCurrency.addEventListener("blur", validateCurrency);
}

/**
 * Sets the budget input on blur event.
 */
function setBudgetInput(){
    let inputBudget = document.getElementById("budget");
    inputBudget.addEventListener("blur", validateBudget);
}

/**
 * This is the main function.
 */
function main(){
    populateCountrySelect();
    setNameInput();
    setCountriesSelect();
    setExpensesInput();
    setCurrencyInput();
    setBudgetInput();
    setSubmitButton();
}

document.addEventListener("DOMContentLoaded", main, false);