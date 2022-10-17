// -----Déclaration des constantes et sélection des éléments du DOM pour les joueurs, les scores, le dé, et les boutons-----
"use strict";
const player0 = document.querySelector(".player-0-panel");
const player1 = document.querySelector(".player-1-panel");
const controls = document.querySelector(".players-controls");
const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const name0 = document.getElementById("name-0");
const name1 = document.getElementById("name-1");
const rollDice = document.querySelector(".cube");
const btnRules = document.querySelector(".btn-rules");
const ruleGame = document.querySelector(".rule-of-the-game");
const btnClose = document.querySelector(".btn-close");
const btnNew = document.querySelector(".btn-new");
const btnEdit = document.querySelector(".btn-edit");
const btnRoll = document.querySelector(".btn-roll");
const btnKeep = document.querySelector(".btn-keep");

// -----Assigner au bouton règle du jeu, la possibilité de lire la règle-----

btnRules.addEventListener("click", function () {
  ruleGame.classList.remove("hiderules");
  ruleGame.classList.add("showrules");
});

btnClose.addEventListener("click", function () {
  ruleGame.classList.remove("showrules");
  ruleGame.classList.add("hiderules");
});

// -----Déclaration variable des 2 joueurs pour le changement de nom-----

let name00 = "Joueur 1";
let name01 = "Joueur 2";

// -----Fonction pour changer le nom des joueurs via une alerte-----

btnEdit.addEventListener("click", function () {
  name00 = prompt("Changer le nom du Joueur 1");
  name01 = prompt("Changer le nom du Joueur 2");

  document.querySelector("h2#name-0.player-name").innerHTML = name00;
  document.querySelector("h2#name-1.player-name").innerHTML = name01;
});

// -----Conditions de départ du jeu-----
let scores, currentScore, activePlayer, playing, cubes, currentClass;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
  rollDice.classList.add("animation-1");
  rollDice.classList.remove("animation-2");
};
init();

// -----Changement de joueurs-----
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

// Assigner une fonction pour exécuter le lancé de dé lors du clic
btnRoll.addEventListener("click", function () {
  if (playing) {
    if (rollDice.classList.remove("animation-1")) {
    } else {
      const dice = Math.trunc(Math.random() * 6) + 1;

      rollDice.classList.add(`show-${dice}`);

      if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current-${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }

    // Jouer le son du lancer de dé
    const myAudioElement = new Audio("/assets/audio/lancer-de-de.mp3");

    // Quand le son est chargé, lancer le son
    myAudioElement.addEventListener("canplaythrough", (event) => {
      myAudioElement.play();
    });
    // Quand le son est joué,
    myAudioElement.addEventListener("ended", function () {
      // Lancer le dé virtuel et afficher le résultat

      rollDice.classList.add("animation-1");
    });
  }
});

// Assigner une fonction au bouton Conserver le score lors du clic
btnKeep.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      document.getElementById(`score-${activePlayer}`).textContent = "Gagné !";
      switchPlayer();
      document.getElementById(`score-${activePlayer}`).textContent = "Perdu !";
      document.querySelector(`.player-${active}`).classList.add("player-active");
      document.querySelector(`.player-${activePlayer}`).classList.add("player-winner");
    } else {
      switchPlayer();
    }
  }
});

// Initialiser la fonction "init" sur l'écoutuer d'évènements du bouton "Nouveau jeu" par le clic
btnNew.addEventListener("click", () => {
  init();
});
