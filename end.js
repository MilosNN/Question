const { stringify } = require("nodemon/lib/utils")

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = document.querySelector('#modtRecentScore')

const highScore = JSON.parse(localStorage.getItem('highScore')) || []

const MAX_HIGHT_SCORES = 5

finalScore = e =>{
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScore.push(score)

    highScore.sort((a,b) => {
        return b.score - a.score
    })

    highScore.splice(5)

    localStorage.setItem(highScores, JSON, stringify(highScores))
    window.location.assign('/')
}