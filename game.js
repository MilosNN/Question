const question = document.querySelector('#question');
const choices = Array.from(document.querySelector('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Pitanje broj 1',
        choices1: '1',
        choices2: '2',
        choices3: '3',
        choices4: '4',
        answer: 2
    },
    {
        question: 'Pitanje broj 2',
        choices1: '1',
        choices2: '2',
        choices3: '3',
        choices4: '4',
        answer: 2
    },
    {
        question: 'Pitanje broj 3',
        choices1: '1',
        choices2: '2',
        choices3: '3',
        choices4: '4',
        answer: 2
    },
    {
        question: 'Pitanje broj 4',
        choices1: '1',
        choices2: '2',
        choices3: '3',
        choices4: '4',
        answer: 2
    },
]

const SCORE_POINTS = 100
const MAX_QUESTION = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTION) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Pitanje ${questionCounter} od ${MAX_QUESTION}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION)*100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnsver = selectedChoice.dataset['number']

        let classToApplay = selectedAnsver == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApplay === 'correct'){
            inctementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApplay)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApplay)
            getNewQuestion()
        }, 1000)
    })
})

inctementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame();    