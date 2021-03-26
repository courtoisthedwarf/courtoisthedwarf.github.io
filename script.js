// Variables

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questionsSection = document.querySelector("#questionsSection");
var quizContainer = document.querySelector("#quizContainer");
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

// Quiz time remaining

var secondsLeft = 60;

// Interval time

var holdInterval = 0;

// Penalty 10 seconds

var penalty = 10;

// Quiz questions array

var questions = [
    {
        title: "What is the atomic number of gold?",
        options: ["70", "21", "79", "32"],
        answer: "79"
    },
    {
        title: "If the melting point of aluminium is 660.3 °C, will a fire melt aluminium?",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        title: "Which of these is a compound?",
        options: ["Water", "Helium", "Silver"],
        answer: "Water"
    },
    {
        title: "Which of these is a compound?",
        options: ["Iron", "Sodium Chloride", "Neon"],
        answer: "Sodium Chloride"
    },
    {
        title: "What is the sun mostly composed of?",
        options: ["Carbon monoxide", "Hydrogen", "Argon", "Sodium"],
        answer: "Hydrogen"
    },
    {       
	title: "Who discovered Lithium?",
        options: ["Johan August Arfwedson", "Marie Curie", "John August Arfwedson", "Robert Hooke"],
        answer: "Johan August Arfwedson"
    },
    {       
	title: "Every element can exist in all states of matter.",
        options: ["True", "False"],
        answer: "True"
    },
    {       
	title: "What is the elemental symbol of tin?",
        options: ["Ti", "Tn", "Sn", "Tin"],
        answer: "Sn"
    },
    {       
	title: "If the average tempurature in the coldest part of Antarctica is −55 °C will bromine freeze?",
        options: ["Yes", "No"],
        answer: "Yes"
    },

];

// Check questions array in console log

console.log(questions);

// Create ul for quiz questions

var ulEl = document.createElement("ul");
console.log(ulEl);
console.log(timer);
if (timer !== null) {
    timer.addEventListener("click", function () {
        if (holdInterval === 0) {
            holdInterval = setInterval(function () {
                secondsLeft--;
                currentTime.textContent = secondsLeft + " seconds";

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    quizComplete();
                    currentTime.textContent = "OUT OF TIME!";
                }
            }, 1000);
        }
        render(questionIndex);
    });
}
console.log(questionIndex);

// Renders questions

function render(questionIndex) {

    // Clears existing data 

    questionsSection.innerHTML = "";
    ulEl.innerHTML = "";

    // Loop through questions array

    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].options;
        questionsSection.textContent = userQuestion;
    }
    // New for each for question

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsSection.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare options with answer

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");

        // Correct condition 

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            answerDiv.textContent = "Correct! The answer was:  " + questions[questionIndex].answer;
        }
        else {

            // Will deduct 10 seconds off secondsLeft for wrong answers

            secondsLeft = secondsLeft - penalty;
            answerDiv.textContent = "Wrong! The correct answer was:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on 
    // Append page with user information

    questionIndex++;

    if (questionIndex >= questions.length) {
        quizComplete();
        answerDiv.textContent = "Finished!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    }
    else {
        render(questionIndex);
    }
    questionsSection.appendChild(answerDiv);

}
// Quiz complete clear questionsSection

function quizComplete() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";

    // Create h1, p elements

    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "Quiz Complete!"

    questionsSection.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.setAttribute("id", "pEl");

    questionsSection.appendChild(pEl);

    // Calculates time remaining and creates score

    if (score == 9) {
        var timeRemaining = secondsLeft;
        var pEl2 = document.createElement("p");
        clearInterval(holdInterval);
	pEl.textContent = "Congratulations you are a MILLIONAIRE!";
	questionsSection.appendChild(pEl2);
    }else {
	var timeRemaining = secondsLeft;
        var pEl2 = document.createElement("p");
        clearInterval(holdInterval);
	pEl.textContent = "Better luck next time!";
	questionsSection.appendChild(pEl2);
    }
    // User prompted to enter intials



    // Enter initials

    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials");
    userInput.textContent = "";

    // Submit user information

    initialsSubmit.setAttribute("class", "btn btn-light");
    initialsSubmit.setAttribute("type", "submit");
    initialsSubmit.setAttribute("id", "submit");
    initialsSubmit.textContent = "Submit";

    questionsSection.appendChild(initialsSubmit);

    // Event listener to capture initials and score in local storage 

    initialsSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = userInput.value;
        console.log(initials);
        if (!initials) {
            document.querySelector("#submit").textContent = "Enter a valid value!";
            console.log(initialsSubmit);
        }
        else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }

            // Clearing HTML at #questionSection 

            document.querySelector("#questionsSection").innerHTML = "";

            // Create High Scores page heading


            // Append element to page

            questionsSection.appendChild(h2El);

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // Adds score to final page

            for (let i = 0; i < allScores.length; i++) {
                const el = allScores[i].initials + " " + allScores[i].score;
                var li2 = document.createElement("li");
                li2.textContent = el;
                var ul = document.querySelector("#highScoresUl");
                ul.appendChild(li2);

            }

        }

    });
}
