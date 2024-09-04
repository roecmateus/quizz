//  DECLARAÇÃO DE VARIÁVEIS
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];

let points = 0;
let actualQuestion = 0;

// PERGUNTAS
const questions = [
  {
    question: "PERGUNTA ALEATÓRIA 1.",
    answers: [
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA CERTA.",
        correct: true,
      },
      {
        answer: "PERGUNTA ERRADA",
        correct: false,
      },
    ],
  },
  {
    question: "PERGUNTA ALEATÓRIA 2.",
    answers: [
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA CERTA.",
        correct: true,
      },
      {
        answer: "PERGUNTA ERRADA",
        correct: false,
      },
    ],
  },
  {
    question: "PERGUNTA ALEATÓRIA 3.",
    answers: [
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA CERTA.",
        correct: true,
      },
      {
        answer: "PERGUNTA ERRADA",
        correct: false,
      },
    ],
  },
  {
    question: "PERGUNTA ALEATÓRIA 4.",
    answers: [
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA CERTA.",
        correct: true,
      },
      {
        answer: "PERGUNTA ERRADA",
        correct: false,
      },
    ],
  },
  {
    question: "PERGUNTA ALEATÓRIA 5.",
    answers: [
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA ERRADA.",
        correct: false,
      },
      {
        answer: "RESPOSTA CERTA.",
        correct: true,
      },
      {
        answer: "PERGUNTA ERRADA",
        correct: false,
      },
    ],
  },
];

//  SUBSTITUIÇÃO DO QUIZZ PARA A PRIMEIRA PERGUNTA
function init() {
  // criar a primeira pergunta
  createQuestion(0);
}

// CRIA UMA PERGUNTA
function createQuestion(i) {
  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");
  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // INSERIR ALTERNATIVAS
  questions[i].answers.forEach(function (answer, i) {
    // cria o template do botão do quizz
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    //  inserir alternativa na tela
    answersBox.appendChild(answerTemplate);

    // adicionando evento de click no botão
    answerTemplate.addEventListener("click", function () {
      checkAnswer(this);
    });
  });

  // incrementar número da questão
  actualQuestion++;
}

// VERIFICANDO RESPOSTA DO USUÁRIO
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answersBox.querySelectorAll("button");

  // verifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");

      // checa se o usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  //   exibir próxima pergunta
  nextQuestion();
}

// EXIBIR PRÓXIMA PERGUNTA NO QUIZZ
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta a mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1500);
}

// EXIBIR A TELA FINAL
function showSuccessMessage() {
  hideOrShowQuizz();

  //  trocar dados da tela de sucesso

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// MOSTRA OU ESCONDE O SCORE
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// REINICIAR QUIZZ
const restarBtn = document.querySelector("#restart");

restarBtn.addEventListener("click", function () {
  // zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// INICIALIZAÇÃO DO QUIZZ
init();
