const question = document.querySelector('.question');
const options = Array.from(document.getElementsByClassName('option__text')); // Converting into an Array & using an Array function
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById('score');
// const loader = document.querySelector('.loader');
// const quiz = document.querySelector('.quiz');


// VARIABLES
let currentQuestion = {}; // Creating a delay to wait for some seconds before loading the next question again
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0; // Showing the question number you are currently on
let availableQuestions = []; // Finding a unique question from the availableQuestions Array to give the user

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
const CORRECT_ANSWERS = 10; // Marks per Correct Answer
const MAX_QUESTIONS = 10; // Maximum questions to answer before finishing the quiz

// Using spread operator to go into new Array which is (availableQuestions)
startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];  
  getNewQuestion();
//   quiz.classList.remove('hidden');
//   loader.classList.add('hidden');
};

// // SAVING SCORES IN LOCAL STORAGE
// getNewQuestion = () => {
//   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//     localStorage.setItem('mostRecentScore', score);
//     //go to the finish page
//     return window.location.assign('/finish.html');
//   }

//   //GETTING A RANDOM QUESTION NUMBER 
//   questionCounter++;
//   questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
//   const questionIndex = Math.floor(Math.random() * availableQuestions.length);
//   currentQuestion = availableQuestions[questionIndex];
//   question.innerHTML = currentQuestion.question;

// //GETTING A RANDOM OPTION 
//   options.forEach((option) => {
//     const number = option.dataset['number'];
//     option.innerHTML = currentQuestion['option' + number];
//   });

//   // GETTING RID OF QUESTION THAT HAS ALREADY BEEN USED (USING SPLICE)
//   availableQuestions.splice(questionIndex, 1);
//   acceptingAnswers = true;
// };

// // MAKING SELECTION FROM OPTIONS
// options.forEach((option) => {
//   option.addEventListener('click', (e) => {
//     if (!acceptingAnswers) return;

//     acceptingAnswers = false;
//     const selectedOption = e.target;
//     const selectedAnswer = selectedOption.dataset['number'];

//     // CHOOSING CLASS TO APPLY USING TENARY OPERATOR SYNTAX FOR CORRECT / INCORRECT ANSWERS
//     const classToApply =
//       selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

//       //APPLYING THE CLASSES
//     selectedOption.parentElement.classList.add(classToApply);

//     setTimeout(() => {
//       selectedOption.parentElement.classList.remove(classToApply);
//       getNewQuestion();
//     }, 1000);

//     // INCREMENTING  SCORE
//     incrementScore = (num) => {
//       score += num;
//       scoreText.innerText = `${score}%`;
//     };

//     if (classToApply === 'correct') {
//       incrementScore(CORRECT_ANSWERS);
//     }

//   });
// });

// // ADDING TIME COUNTER
// let time = 3.35;
// let quizTimeCount = time * 60 * 60;
// quizTime = quizTimeCount / 60;

// let counter = document.getElementById('timeCounter');
// startCounter = () => {
//   const quizTimer = setInterval(function() {
//     if(quizTime <= 0) {
//       clearInterval(quizTimer);
//       return window.location.assign('/finish.html');
//     }else {
//       quizTime--;
//       const sec = Math.floor(quizTime % 60);
//       const min = Math.floor(quizTime / 60) % 60;
//       counter.innerHTML = `${min} : ${sec}`;
//     }
//   }, 1000)
// }

// startCounter();

