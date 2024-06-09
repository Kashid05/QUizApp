document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('participantName');
    const totalTime = parseInt(localStorage.getItem('totalTime'), 10);
    const totalQuestions = parseInt(localStorage.getItem('totalQuestions'), 10);
    const correctQuestions = parseInt(localStorage.getItem('correctQuestions'), 10);

    document.getElementById('participant-name').innerText = name;
    document.getElementById('total-time').innerText = formatTime(totalTime);
    document.getElementById('total-questions').innerText = totalQuestions;
    document.getElementById('correct-answers').innerText = correctQuestions;
    document.getElementById('wrong-answers').innerText = totalQuestions - correctQuestions;
    document.getElementById('score').innerText = ((correctQuestions / totalQuestions) * 100).toFixed(2) + '%';
});

function formatTime(totalTime) {
    const minutes = Math.floor(totalTime / 60);
    const remainingSeconds = totalTime % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

document.getElementById('start-again-button').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = 'home.html';
});

document.getElementById('go-home-button').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = 'home.html';
});
