
document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons){
        button.addEventListener('click',function(){
            if(this.getAttribute("data-type") ==='submit'){
                checkAnswer();
            }else{
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown',function(event){
        if(event.key === "Enter"){
            checkAnswer();
        }
    })

    runGame('addition');
})

/**
 * Here comes the docstring describing what the function does
 */
function runGame(gameType){
    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition"){
        displyAdditionQuestion(num1,num2);
    }else if(gameType === "multiply"){
        displyMultiplyQuestion(num1,num2);
    }else if(gameType === "substract"){
        displySubstractQuestion(num1,num2);
    } else if(gameType === "division"){
        displyDivisionQuestion(num1,num2);
    }else{
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Check the user answer with the calculated answer
 */
function checkAnswer(){
    let calculatedAnswer = calculateCorrectAnswer();
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let isCorrect = calculatedAnswer[0] === userAnswer;

    if (isCorrect){
        alert("Hey, you got it right :)");
        incrementScore();
    }else{
        alert(`Ah..you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Get the operands and operator direct from the DOM and 
 * calculate the correct answer
 */
function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerHTML;
    
    if(operator === '+'){
        return [operand1 + operand2, "addition"]
    }else if(operator === '*'){
        return [operand1 * operand2, "multiply"]
    }else if(operator === '-'){
        return [operand1 - operand2, "substract"]
    }else if(operator === '/'){
        return [Math.floor(operand1 / operand2), "division"]
    }else{
        alert(`Unimplemented oparator: ${gameType}`);
        throw `Unimplemented oparator: ${gameType}. Aborting!`;
    }
}

/**
 * Get the current score for correct answer and increment by one
 */
function incrementScore(){
    let score = document.getElementById('score').innerText;
    document.getElementById('score').innerText = ++score;

}

/**
 * Get the current score for incorrect answer and increment by one
 */
function incrementWrongAnswer(){
    let score = document.getElementById('incorrect').innerText;
    document.getElementById('incorrect').innerText = ++score;
    
}

function displyAdditionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displyMultiplyQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '*';
}

function displySubstractQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displyDivisionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 * operand2;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}
