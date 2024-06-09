document.addEventListener('DOMContentLoaded', function() {
    const category = localStorage.getItem('selectedCategory');
    fetchQuizData()
        .then(data => {
            quizData = data[category];
            currentQuestion = 0;
            score = 0;
            showQuestion();
            startTimer();
        })
        .catch(error => {
            console.error('Error fetching quiz data:', error);
        });
});

let quizData = [];
let currentQuestion = 0;
let score = 0;
let startTime;
let questionTimer;
let totalTimeSpent = 0;

function fetchQuizData() {
    return fetch('quiz_data.json')
        .then(response => response.json());
}

function showQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question-number').innerText = `Question ${currentQuestion + 1}/10`;
    document.getElementById('question-text').innerText = question.question;
    const options = document.querySelectorAll('.option');
    options.forEach((button, index) => {
        button.innerText = question.options[index];
        button.onclick = () => checkAnswer(index);
    });
    resetQuestionTimer();
}

function checkAnswer(index) {
    const question = quizData[currentQuestion];
    clearInterval(questionTimer);
    if (index === question.correctOption) {
        score++;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function resetQuestionTimer() {
    clearInterval(questionTimer);
    let timeLeft = 15;
    document.getElementById('timer').innerText = `Time: 0:${timeLeft}`;
    questionTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time: 0:${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(questionTimer);
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        }
    }, 1000);
}

function endQuiz() {
    const endTime = new Date().getTime();
    totalTimeSpent += Math.floor((endTime - startTime) / 1000);
    localStorage.setItem('totalTime', totalTimeSpent);
    localStorage.setItem('totalQuestions', quizData.length);
    localStorage.setItem('correctQuestions', score);
    window.location.href = 'result.html';
}

function startTimer() {
    startTime = new Date().getTime();
    let timer = 0;
    setInterval(function() {
        timer++;
        totalTimeSpent++;
        document.getElementById('total-time').innerText = `Total Time: ${Math.floor(timer / 60)}:${timer % 60}`;
    }, 1000);
}

// Handling the next button manually
document.getElementById('next-button').addEventListener('click', function() {
    clearInterval(questionTimer);
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});
