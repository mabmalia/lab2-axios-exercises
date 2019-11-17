# Lab 2 - Callbacks/Async/Promises

## Task

### Task 1 - Who's a good boy?

### Task 2 - Aliens

### Task 3 - Enough is enough

After dealing with these slightly odd customers you feel you need a vacation so you decide to prepare a bit and make a small trip
planner. It is to be used to plan your budget and you want everything to be correct so you make the form for it automatically validated.
For that you're obviously going to need some web services and you already know who to call. Within no time, you have the following
web services:

- Rest Countries (once again)
- Exchange Rates API

*Task:*

Fill in the information and have each input validated. When submit is clicked, a post request with the information should be sent to
[JSON placeholder's](https://jsonplaceholder.typicode.com/posts) "posts" endpoint. (So far we've only used get requests)

*Requirements:*

- Trip names must be at least 3 characters.
- Destination country must be populated by countries received from Rest Countries' "all" endpoint
- Expenses must be a positive number
- Currency must be a valid currency (eg. USD SEK etc.)
- Budget (SEK) must be higher than expenses * exchange rate (chosen currency -> SEK)
- If any of the above are not met, an invalid indicator must appear. Most convenient is to use the `<small>` element below each input
to write some text saying why it's invalid.
- Validation of an input should happen when focus has been lost of the input. For example, you write something in an input and then you go to the next. At the moment you leave the first input, validation should happen on the first input.
- Submit button should only be enabled if all input fields are valid. Otherwise it is disabled.
- The data of the post request should be a JSON object made from the input from the form and its inputs. To do this you can serialize the form, i.e create an object from the form by using its input values. You can use the function defined in `serialize-form.js` for this.
- Either fetch or axios is used to make the requests.
- The response received from the `post` request should be a JSON object containing the same data that you sent plus an extra id
property. This can be checked by printing the response to the console.
