document.getElementById('enter-button').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const category = document.querySelector('.category.selected');

    if (name && category) {
        localStorage.setItem('participantName', name);
        localStorage.setItem('selectedCategory', category.getAttribute('data-category'));
        window.location.href = 'quiz.html'; // Navigate to quiz page
    } else {
        alert('Please enter your name and select a category.');
    }
});

document.querySelectorAll('.category').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.category').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});
