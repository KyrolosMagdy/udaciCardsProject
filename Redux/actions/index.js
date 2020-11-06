export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const loadDecks = decks => ({type: LOAD_DECKS, decks})
export const addDeck = deckTitle => ({type: ADD_DECK, deckTitle})
export const addCard = (deckTitle, card) => ({type: ADD_CARD, deckTitle, card})
