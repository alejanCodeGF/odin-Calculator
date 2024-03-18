let my_numbers = ["", ""]; // n1 and n2 (n1 += n2, n1 *= n2, n1 == final result at the end)
let operator = ""; // The current operator
let equal = true; // In case you press a number just after the "="...
// ...to restart the number, not edit the one is already on the screen

const screen = document.querySelector("#screen")

document.addEventListener("keydown", (event) => {
    const key_list ="0123456789."
    const keyName = event.key;
  
    if (key_list.includes(keyName)) {
        if (equal){
            equal = false;
            my_numbers[0] = ""
        }
        if (operator === ""){
            if (keyName == "." && my_numbers[0].includes(".") || 
                my_numbers[0].length > 20) {return} // Limit 20 length
            my_numbers[0] += keyName;
            screen.textContent = my_numbers[0];
        }
        else {
            if (keyName == "." && my_numbers[1].includes(".") || 
                my_numbers[1].length > 20) {return}
            my_numbers[1] += keyName;
            screen.textContent = my_numbers[1];
        }
    }}
);

const number_buttons = document.querySelectorAll(".number_button")
number_buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (equal){
            equal = false;
            my_numbers[0] = ""
        }
        if (operator === ""){
            if (button.name == "." && my_numbers[0].includes(".") || 
            my_numbers[0].length > 20) {return}
            my_numbers[0] += button.name;
            screen.textContent = my_numbers[0];
        }
        else {
            if (button.name == "." && my_numbers[1].includes(".") || 
            my_numbers[1].length > 20) {return}
            my_numbers[1] += button.name;
            screen.textContent = my_numbers[1];
        }
    })
});

const operator_buttons = document.querySelectorAll(".operation_button")
operator_buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!operator){
            operator = button.name;
        }
        else {
            my_numbers[0] = operate();
            my_numbers[1] = "";
            screen.textContent = my_numbers[0];
            operator = button.name;
        }
        if (my_numbers[0] == Infinity) screen.textContent = "A lot";
        equal = false;

    })
});

const other_buttons = document.querySelectorAll(".other_button")
other_buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.name === "="){
            if(operator !== ""){
                my_numbers[0] = operate();
                my_numbers[1] = "";
                screen.textContent = my_numbers[0];
                operator = "";
                equal = true;
            }
        }
        else if (button.name === "AC") {
            my_numbers[0] = "";
            my_numbers[1] = "";
            operator = "";
            screen.textContent = "-";
        }
        if (my_numbers[0] == Infinity) screen.textContent = "A lot";
    })
});

const operate = function(){
    const n_decimal = 9;
    
    let n1 = parseFloat(my_numbers[0]);
    let n2 = parseFloat(my_numbers[1]);
    
    switch(operator){
        case "+":
            return Math.floor(add(n1, n2)*(10**n_decimal))/(10**n_decimal); // Limit of decimals
        case "-":
            return Math.floor(subtract(n1, n2)*(10**n_decimal))/(10**n_decimal);
        case "x":
            return Math.floor(multiply(n1, n2)*(10**n_decimal))/(10**n_decimal);
        case "/":
            return Math.floor(divide(n1, n2)*(10**n_decimal))/(10**n_decimal);
        case "=":
            return {}; 
    }
}

const add = function(n1, n2){
    return n1 + n2;
}

const subtract = function(n1, n2){
    return n1 - n2;
}

const multiply = function(n1, n2){
    return n1 * n2;
}

const divide = function(n1, n2){
    return n1 / n2;
}
