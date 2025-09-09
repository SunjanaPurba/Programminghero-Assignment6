#### Create a README file to answer the following question-

-
#### 1) What is the difference between var, let, and const?
- **var**--: The var keyword is used to declare a variable that can be updated and redeclared.variable declared with `var` are hoisted and initialized with undefined.
- **let**--: The let keyword is used to declare a block-scoped variable that can be updated but not redeclared. It is initialized with undefined.
- **const**--: The const keyword is used to declare a block-scoped variable that cannot be updated or redeclared. Objects declared with `const` are also immutable.
---

#### 2) What is the difference between map(), forEach(), and filter()? 
- **map()**: The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. It does not change the original array.
- **forEach()**: The forEach() method executes a provided function once for each array element. It does not return a new array.
- **filter()**: The filter() method creates a new array filled with elements that pass a test provided by a function. It does not change the original array.

**Example**:

```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => console.log(number * 2));
const squares = numbers.map(numbber => number * number);
const evenNumbers = numbers.filter(number => number % 2 === 0);
```
---

#### 3) What are arrow functions in ES6?
- Arrow functions are a shorter way to write functions in ES6. They are created using the => syntax. Arrow function are a more concise way of writing functions in javascript.

```js
function add(a,b) {
    return a + b;
}
// arrow function
const add = (a,b) => a + b;
```
---

#### 4) How does destructuring assignment work in ES6?

- Destructuring assignment is a feature of ES6 that allows you to extract values from arrays or objects and assign them to variables.
- It is a more concise way of assigning values to variables.
- It is a more readable way of assigning values to variables.
- It is a more flexible way of assigning values to variables.
- It is a more efficient way of assigning values to variables.

```js
const person = {
    name: "John",
    age: 30,
    city: "New York"
  };
  
  const { name, age, city } = person;
  
  console.log(name); // "John"
  console.log(age); // 30
  console.log(city); // "New York"
```
---

#### 5) Explain template literals in ES6. How are they different from string concatenation?

- Template literals are a new way of writing strings in ES6. They are a more concise way of writing strings.
- They are a more readable way of writing strings.
- They are a more flexible way of writing strings.
- They are a more efficient way of writing strings.
- They are a more secure way of writing strings.

They are easier to read, support multiline strings without special characters, and allow string interpolation with `${expression}`.

```js
const name = "John";
const age = 30;
const message = `My name is ${name} and I am ${age} years old.`;
console.log(message); // "My name is John and I am 30 years old."
```





 
