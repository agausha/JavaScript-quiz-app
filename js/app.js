const question = document.querySelector('.question');
const options = Array.from(document.querySelectorAll('.option__text')); 
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const counter = document.getElementById('timeCounter');
const loader = document.getElementById('loader');
const quiz = document.getElementById('quiz');


// VARIABLES
let currentQuestion = {}; 
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0; 
let availableQuestions = []; 

let questions = [];

// FETCHING QUESTIONS FROM API
fetch(
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple',
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerOptions = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerOptions.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer,
      );

      answerOptions.forEach((option, index) => {
        formattedQuestion['option' + (index + 1)] = option;
      });

      return formattedQuestion;
    });

    startQuiz();
  })
  .catch((err) => {
    console.error(err);
  });

//CONSTANTS
 // Marks per Correct Answer
const CORRECT_ANSWERS = 10;
 // Maximum questions 
const MAX_QUESTIONS = 10;

// Getting availableQuestions
startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];  
  getNewQuestion();
  quiz.classList.remove('hidden');
  loader.classList.add('hidden');
};

// SAVING SCORES IN LOCAL STORAGE
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the finish page
    return window.location.assign('/finish.html');
  }

  //GETTING A RANDOM QUESTION NUMBER 
  questionCounter++;
  questionCounterText.textContent = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

//GETTING A RANDOM OPTION 
  options.forEach((option) => {
    const number = option.dataset['number'];
    option.textContent = currentQuestion['option' + number];
  });

  // GETTING RID OF QUESTION THAT HAS ALREADY BEEN USED
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// MAKING SELECTION FROM OPTIONS
options.forEach((option) => {
  option.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset['number'];

    // CHOOSING CLASS TO APPLY
    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      //APPLYING THE CLASSES
    selectedOption.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    // INCREMENTING  SCORE
    incrementScore = (num) => {
      score += num;
      scoreText.textContent = `${score}%`;
    };

    if (classToApply === 'correct') {
      incrementScore(CORRECT_ANSWERS);
    }

  });
});

// ADDING TIME COUNTER
let time = 3.35;
let quizTimeCount = time * 60 * 60;
quizTime = quizTimeCount / 60;

startCounter = () => {
  const quizTimer = setInterval(function() {
    if(quizTime <= 0) {
      clearInterval(quizTimer);
      return window.location.assign('/finish.html');
    }else {
      quizTime--;
      const sec = Math.floor(quizTime % 60);
      const min = Math.floor(quizTime / 60) % 60;
      counter.textContent = `${min} : ${sec}`;
    }
  }, 1000)
}

startCounter();

