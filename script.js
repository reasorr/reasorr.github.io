// Game Data
const prizeLevels = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
let currentQuestionIndex = 0;
let prize = 0;
let usedQuestions = [];
let timer;
let timeLeft = 30;

// Hardcoded Questions (30 questions)
const questions = [
    {
        question: "What is the capital of France?",
        options: ["A. Paris", "B. London", "C. Berlin", "D. Madrid"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"],
        correctAnswer: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["A. Charles Dickens", "B. William Shakespeare", "C. Mark Twain", "D. Jane Austen"],
        correctAnswer: 1
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["A. H2O", "B. CO2", "C. NaCl", "D. O2"],
        correctAnswer: 0
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["A. China", "B. Japan", "C. South Korea", "D. Thailand"],
        correctAnswer: 1
    },
    {
        question: "What is the smallest prime number?",
        options: ["A. 1", "B. 2", "C. 3", "D. 5"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["A. Vincent van Gogh", "B. Leonardo da Vinci", "C. Pablo Picasso", "D. Claude Monet"],
        correctAnswer: 1
    },
    {
        question: "What is the capital of Australia?",
        options: ["A. Sydney", "B. Melbourne", "C. Canberra", "D. Brisbane"],
        correctAnswer: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["A. Oxygen", "B. Gold", "C. Silver", "D. Iron"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Great White Shark"],
        correctAnswer: 1
    },
    {
        question: "Who is known as the father of computers?",
        options: ["A. Charles Babbage", "B. Alan Turing", "C. Bill Gates", "D. Steve Jobs"],
        correctAnswer: 0
    },
    {
        question: "What is the square root of 64?",
        options: ["A. 6", "B. 7", "C. 8", "D. 9"],
        correctAnswer: 2
    },
    {
        question: "Which country is famous for inventing pizza?",
        options: ["A. France", "B. Italy", "C. Greece", "D. Spain"],
        correctAnswer: 1
    },
    {
        question: "What is the currency of Japan?",
        options: ["A. Yen", "B. Won", "C. Dollar", "D. Euro"],
        correctAnswer: 0
    },
    {
        question: "Who discovered gravity?",
        options: ["A. Albert Einstein", "B. Isaac Newton", "C. Galileo Galilei", "D. Nikola Tesla"],
        correctAnswer: 1
    },
    {
        question: "What is the largest desert in the world?",
        options: ["A. Sahara", "B. Arabian", "C. Gobi", "D. Antarctic"],
        correctAnswer: 3
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["A. Venus", "B. Earth", "C. Mercury", "D. Mars"],
        correctAnswer: 2
    },
    {
        question: "What is the capital of Canada?",
        options: ["A. Toronto", "B. Vancouver", "C. Ottawa", "D. Montreal"],
        correctAnswer: 2
    },
    {
        question: "Who wrote '1984'?",
        options: ["A. George Orwell", "B. Aldous Huxley", "C. J.K. Rowling", "D. Ernest Hemingway"],
        correctAnswer: 0
    },
    {
        question: "What is the boiling point of water in Celsius?",
        options: ["A. 90°C", "B. 100°C", "C. 110°C", "D. 120°C"],
        correctAnswer: 1
    },
    {
        question: "Which country is known as the Land of the Midnight Sun?",
        options: ["A. Norway", "B. Sweden", "C. Finland", "D. Iceland"],
        correctAnswer: 0
    },
    {
        question: "What is the largest bird in the world?",
        options: ["A. Eagle", "B. Ostrich", "C. Albatross", "D. Penguin"],
        correctAnswer: 1
    },
    {
        question: "Who is the author of 'Pride and Prejudice'?",
        options: ["A. Jane Austen", "B. Charlotte Brontë", "C. Emily Brontë", "D. Charles Dickens"],
        correctAnswer: 0
    },
    {
        question: "What is the capital of Brazil?",
        options: ["A. Rio de Janeiro", "B. São Paulo", "C. Brasília", "D. Buenos Aires"],
        correctAnswer: 2
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["A. Oxygen", "B. Nitrogen", "C. Carbon Dioxide", "D. Hydrogen"],
        correctAnswer: 1
    },
    {
        question: "What is the smallest country in the world?",
        options: ["A. Monaco", "B. San Marino", "C. Vatican City", "D. Liechtenstein"],
        correctAnswer: 2
    },
    {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: ["A. Jawaharlal Nehru", "B. Mahatma Gandhi", "C. Subhas Chandra Bose", "D. Bhagat Singh"],
        correctAnswer: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["A. Au", "B. Ag", "C. Fe", "D. Cu"],
        correctAnswer: 0
    },
    {
        question: "Which country is famous for the Great Wall?",
        options: ["A. Japan", "B. China", "C. India", "D. Russia"],
        correctAnswer: 1
    }
];

// DOM Elements
const questionElement = document.getElementById('question');
const optionElements = [
    document.getElementById('opt0'),
    document.getElementById('opt1'),
    document.getElementById('opt2'),
    document.getElementById('opt3')
];
const prizeElement = document.getElementById('prize');
const ladderDisplay = document.getElementById('ladder-display');
const speechBubble = document.getElementById('speech-bubble');
const timerElement = document.getElementById('timer');
const audienceChartContainer = document.getElementById('audience-chart-container');

// Sound Effects
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const lifelineSound = new Audio('lifeline.mp3');

// Herr Hesse Text Variants
const herrHesseTexts = [
    "I'm pretty sure it's {answer}... but don't blame me if I'm wrong!",
    "Hmm, I think it's {answer}. But I'm not entirely confident.",
    "My gut says {answer}. Good luck!",
    "I'd go with {answer}, but I'm not an expert.",
    "It's definitely {answer}. Or maybe not. Who knows?"
];

// Start Game
function startGame() {
    prize = 0;
    currentQuestionIndex = 0;
    usedQuestions = [];
    updatePrize();
    loadQuestion();
    startTimer();
}

// Load a Random Question
function loadQuestion() {
    if (usedQuestions.length === questions.length) {
        alert('Congratulations! You answered all questions!');
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    const question = questions[randomIndex];

    questionElement.innerText = question.question;
    optionElements.forEach((opt, index) => {
        opt.innerText = question.options[index];
        opt.disabled = false;
        opt.style.backgroundColor = 'black';
        opt.style.color = 'white';
        opt.style.opacity = 1;
    });

    highlightCurrentLevel();
    resetTimer(); // Reset the timer for the new question
}

// Check Answer
function checkAnswer(selectedIndex) {
    clearInterval(timer); // Stop the timer
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;

    if (selectedIndex === correctIndex) {
        correctSound.play();
        optionElements[selectedIndex].style.backgroundColor = 'green'; // Highlight correct answer
        prize = prizeLevels[currentQuestionIndex];
        currentQuestionIndex++;
        updatePrize();
        if (currentQuestionIndex === prizeLevels.length) {
            celebrateWin();
        } else {
            setTimeout(() => {
                loadQuestion();
            }, 1000); // Delay before loading the next question
        }
    } else {
        wrongSound.play();
        optionElements[selectedIndex].style.backgroundColor = 'red'; // Highlight incorrect answer
        optionElements[correctIndex].style.backgroundColor = 'green'; // Show correct answer
        setTimeout(() => {
            endGame();
        }, 1000); // Delay before ending the game
    }
}

// Update Prize
function updatePrize() {
    prizeElement.innerText = prize;
}

// Highlight Current Level on Ladder
function highlightCurrentLevel() {
    const ladderLines = ladderDisplay.innerText.split('\n');
    ladderLines.forEach((line, index) => {
        if (index === 14 - currentQuestionIndex) {
            // Highlight the current level
            ladderLines[index] = `<span class="highlight">${ladderLines[index]}</span>`;
        } else {
            ladderLines[index] = line.trim();
        }
    });
    ladderDisplay.innerHTML = ladderLines.join('<br>');
}

// 50:50 Lifeline
function useFiftyFifty() {
    lifelineSound.play();
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;
    let wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
    wrongIndices = shuffle(wrongIndices).slice(0, 2); // Remove 2 random incorrect options

    wrongIndices.forEach(i => {
        optionElements[i].disabled = true;
        optionElements[i].style.opacity = 0.5;
    });
}

// Phone a Friend Lifeline
function phoneAFriend() {
    lifelineSound.play();
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;
    const friendIsRight = Math.random() > 0.01; // 70% chance of being correct
    const friendAnswer = friendIsRight ? correctIndex : Math.floor(Math.random() * 4);

    const answerLetter = String.fromCharCode(65 + friendAnswer);
    const randomText = herrHesseTexts[Math.floor(Math.random() * herrHesseTexts.length)];
    const herrHesseMessage = randomText.replace('{answer}', answerLetter);

    speechBubble.innerText = `Herr Hesse says: "${herrHesseMessage}"`;
    speechBubble.style.display = 'block';
    setTimeout(() => speechBubble.style.display = 'none', 5000);
}

// Ask the Audience Lifeline
function askTheAudience() {
    lifelineSound.play();
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;
    const votes = [0, 0, 0, 0];
    votes[correctIndex] = Math.floor(Math.random() * 50 + 50); // Correct answer gets 50-100%
    for (let i = 0; i < 4; i++) {
        if (i !== correctIndex) votes[i] = Math.floor(Math.random() * (100 - votes[correctIndex]));
    }

    const ctx = document.getElementById('audience-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
                label: 'Audience Votes',
                data: votes,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        options: { scales: { y: { beginAtZero: true, max: 100 } } }
    });
    audienceChartContainer.style.display = 'block';
}

// Timer Functions
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer); // Clear the existing timer
    timeLeft = 30; // Reset time to 30 seconds
    timerElement.innerText = `Time left: ${timeLeft}s`; // Update the timer display
    startTimer(); // Start the timer again
}

// End Game
function endGame() {
    clearInterval(timer);
    alert(`Game over! You won €${prize}`);
    startGame();
}

// Celebrate Win
function celebrateWin() {
    clearInterval(timer);
    alert('Congratulations! You won €1,000,000!');

    // Get the position of the prize module
    const prizeModule = document.getElementById('prize');
    const rect = prizeModule.getBoundingClientRect();

    // Start confetti animation at the prize module
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth, // Horizontal center of the prize module
            y: (rect.top + rect.height / 2) / window.innerHeight // Vertical center of the prize module
        }
    });

    startGame();
}

// Shuffle Array (Helper Function)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the game when the page loads
startGame();
