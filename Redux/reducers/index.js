import {LOAD_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS:
      {
        return {
          ...state,
          ...action.decks
        }
        break;
      }

    case ADD_DECK:
      {
        const o = {
          ...state,
          [action.deckTitle]: {
            title: action.deckTitle,
            questions: []
          }
        }
        return o
        break;
      }

    case ADD_CARD:
      {
        const out = {
          ...state
        }
        if (out[action.deckTitle]) {
          const {question, answer} = action.card
          out[action.deckTitle].questions.push({question, answer})
        }
        return out
        break;
      }

    default:
      return state
  }
}

export default decks
