const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const finalScores = JSON.parse(localStorage.getItem('finalScores')) || [];

const MAX_HIGH_SCORES = 7;

finalScore.textContent = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveFinalScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    finalScores.push(score);
    finalScores.sort((a, b) => b.score - a.score); // SORTING THE FINAL SCORE FROM HIGHEST TO LOWEST
    finalScores.splice(7);

// UPDATING THE FINAL SCORE IN LOCAL STORAGE
    localStorage.setItem('finalScores', JSON.stringify(finalScores));
    window.location.assign('/finalscores.html');
};
