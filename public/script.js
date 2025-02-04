document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const nextButton = document.getElementById('next');
    const submitButton = document.getElementById('submit');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion(currentQuestionIndex);
        });

    function displayQuestion(index) {
        const currentQuestion = questions[index];
        const options = currentQuestion.options.map(option => 
            `<label>
                <input type="radio" name="question${index}" value="${option}">
                ${option}
            </label>`
        ).join('');
        
        quizContainer.innerHTML = ` <div class="question">${currentQuestion.question}</div>
                                    <div class="options">${options}</div>`;

        nextButton.style.display = index < questions.length - 1 ? 'inline-block' : 'none';
        submitButton.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    }

    nextButton.addEventListener('click', () => {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
            score += 10;
        }
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    });

    submitButton.addEventListener('click', () => {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]`);
        if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
            score += 10;
        }
        resultsContainer.innerHTML = `You scored ${score} points out of ${questions.length * 10}`;
    });
});
