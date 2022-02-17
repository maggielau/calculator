//Operator functions
function add (a,b) {
    return a+b;
}

function subtract (a,b) {
    return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    if (b===0) {
        a = "";
        b = "";
        equation = "";
        aflag = false;
        bflag = false;
        alert("Cannot divide by zero");
        return;
    }
    return a/b;
}

function operate (operator, a, b) {
    return window [operator](Number(a),Number(b));
}

//convert text operator to symbol for upper display
function operateConv (operator) {
    if (operator == "add") {
        return "+";
    }
    else if (operator == "subtract") {
        return "-";
    }
    else if (operator == "multiply") {
        return "x";
    }
    else if (operator == "divide") {
        return "÷";
    }
}



let displayValue = document.querySelector(".displayLower");
let upperDisplayValue = document.querySelector(".displayUpper");
let equation = "";
let a = "";
let b = "";

//flags for operands, when true, operand is filled
let aflag = false;
let bflag = false;

let operator;
const operators = ["divide", "multiply", "subtract", "add"];

//convert keyboard press to button click
function logKey (e) {
    //1
    if (e.keyCode === 49 || e.keyCode === 97) {
        document.getElementById("1").click();
    }
    //2
    else if (e.keyCode === 50 || e.keyCode === 98) {
        document.getElementById("2").click();
    } 
    //3
    else if (e.keyCode === 51 || e.keyCode === 99) {
        document.getElementById("3").click();
    } 
    //4
    else if (e.keyCode === 52 || e.keyCode === 100) {
        document.getElementById("4").click();
    }
    //5
    else if (e.keyCode === 53 || e.keyCode === 101) {
        document.getElementById("5").click();
    }
    //6
    else if (e.keyCode === 54 || e.keyCode === 102) {
        document.getElementById("6").click();
    }
    //7
    else if (e.keyCode === 55 || e.keyCode === 103) {
        document.getElementById("7").click();
    }
    //8
    else if (e.keyCode === 56 || e.keyCode === 104) {
        document.getElementById("8").click();
    } 
    //9
    else if (e.keyCode === 57 || e.keyCode === 105) {
        document.getElementById("9").click();
    }
    //0
    else if (e.keyCode === 48 || e.keyCode === 96) {
        document.getElementById("0").click();
    }
    //.
    else if (e.keyCode === 190 || e.keyCode === 110) {
        document.getElementById(".").click();
    }
    //=
    else if (e.keyCode === 187 || e.keyCode === 13) {
        document.getElementById("equals").click();
    }
    //divide
    else if (e.keyCode === 191 || e.keyCode === 111) {
        document.getElementById("divide").click();
    }
    //multiply
    else if (e.keyCode === 106) {
        document.getElementById("multiply").click();
    }  
    //subtract
    else if (e.keyCode === 189 || e.keyCode === 109) {
        document.getElementById("subtract").click();
    }
    //add
    else if (e.keyCode === 107) {
        document.getElementById("add").click();
    }
    //clear
    else if (e.keyCode === 27) {
        document.getElementById("clear").click();
    }
    //delete
    else if (e.keyCode === 8 || e.keyCode === 46) {
        document.getElementById("delete").click();
    }               
}

//calculator logic
function input (e) {

    //clear screen
    if (this.id == "clear") {
        a = "";
        b = "";
        equation = "";
        aflag = false;
        bflag = false;
        displayValue.textContent = "";
    }
    //backspace
    else if (this.id == "delete") {
        //delete digit if user is on the first number
        if (aflag == false && bflag == false) {
            a = a.slice(0,-1);
            displayValue.textContent = a;
        }
        //delete digit if user is on the second number
        else if (b.length>0 && aflag == true) {
            b = b.slice(0,-1);
            displayValue.textContent = b;
        }
        //otherwise just clear all
        else {
            a = "";
            b = "";
            aflag = false;
            bflag = false;
            displayValue.textContent = "";
        }
    }
    //calculate when equals pressed
    else if (this.id == "equals") {

        //if equals pressed when only a is filled, do nothing
        if (b.length<1) {
            displayValue.textContent = a;
        }
        //calculate if both a and b are filled
        else {
            equation += b;
            a = operate(operator, a, b);
            operator = "";
            displayValue.textContent = a;
            b = "";
            bflag = false;
        }
    }
    //updating first number
    else if (aflag == false && operators.includes(this.id) == false) {

        //if decimal is pressed when current number already has decimal, do nothing
        if (this.id == "." && a.includes(".") == true){
            //do nothing
        }
        else {
            a += this.id;
            displayValue.textContent = a;
        }
    }
    //operator button press
    else if (operators.includes(this.id) == true) {

        //if there is a value in b, then calculate
        if (b.length>0) {
            equation += b;
            a = operate(operator, a, b);
            operator = "";
            displayValue.textContent = a;
            b = "";
            bflag = false;
            operator = this.id;
        }
        //otherwise the expression is not done yet, first number inputted
        else {
            equation = "";
            operator = this.id;
            aflag = true;
            equation += a + operateConv(operator);
        }
    }
    //updating second number
    else if (bflag == false && operators.includes(this.id) == false && this.id != "equals") {
        //if decimal is pressed when current number already has decimal, do nothing
        if (this.id == "." && b.includes(".") == true){
            //do nothing
        }
        else {
        b += this.id;
        displayValue.textContent = b;
        }
    }

    //upper display
    upperDisplayValue.textContent = equation;
    

    console.log(this.id);
    console.log(`a is ${a}, operator is ${operator}, b is ${b}`);

}

//take input from calcaultor buttons
function calculate () {

    const buttons = Array.from(document.querySelectorAll("button"));
    buttons.forEach(button => button.addEventListener('click', input));
    window.addEventListener('keydown', logKey);

}

calculate();
