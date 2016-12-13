import React, { Component } from 'react'
import _ from 'lodash'
import LetterButton from './LetterButton'
import Snowman from './Snowman'
import Word from './Word'

// ALPHABET is an array of 26 letters, 'a' through 'z', i.e. ['a', 'b', 'c', ...'z']
const ALPHABET = _.range(26).map(i => String.fromCharCode(i + 97))

// WORDS is an array of 1024 different seven letter words
const WORDS = require('raw!../wordList.txt').trim().split('\n')

class App extends Component {

  constructor () {
    super()
    // TODO
    this.state = {
      word: _.sample(WORDS), // explaining the random word we use for the game.
      guesses: [] // our gestures throughout the game.
    }
  }

  choose (letter) {
    // setting the state of the guesses to put the current guess in the empty space on the page
    this.setState({
      guesses: [...this.state.guesses, letter]
      // takes guesses array and adds letter to the existing guesses
    })
    console.log('You clicked', letter)
  }

  get points () {
    // count the number of correct guesses
    return this.state.word.split('').filter((letter) => {
      return this.state.guesses.includes(letter)
    }).length
  }
// rendering the alphabet keyboard
  render () {
    const letters = ALPHABET.map((letter, i) => {
      return <LetterButton
        // this suns the choosing function to allow us to click and choose a letter
        value={letter}
        // disabling the truthyness of the guesses which includes the letter
        onChoose={() => this.choose(letter)}
        disabled={this.state.guesses.includes(letter)}
        key={i} />
    })
    return <div className='app'>
      <main>
        {/* step is adding the points onto the guesses being made from the function on line 31 */}
        <Snowman step={this.points} size={400} />
        <Word value={this.state.word} guesses={this.state.guesses} />
        <div className='keyboard'>
          {letters}
        </div>
      </main>
      <footer>It's like hangman, but, um... not.</footer>
    </div>
  }
}

export default App
