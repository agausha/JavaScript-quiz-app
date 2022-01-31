const finalScoresList = document.querySelector(".finalScoresList");
const finalScores = JSON.parse(localStorage.getItem("finalScores")) || [];

finalScoresList.innerHTML = finalScores

// DISPLAYING FINAL SCORE USING MAP 
  .map(score => {
    return `<li class="final-score">${score.name} - ${score.score}%</li>`;
  })
  .join("");
