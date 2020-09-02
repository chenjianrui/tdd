export const getLetterMatchCount = (guessedWord, secretWord) => {
  const guessedLetterSet = new Set(guessedWord.split(''))
  const secretLetterSet = new Set(secretWord.split(''))
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length
}