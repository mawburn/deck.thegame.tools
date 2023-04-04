export enum CardSuit {
  Hearts = 'hearts',
  Diamonds = 'diamonds',
  Clubs = 'clubs',
  Spades = 'spades',
  BlackJoker = 'blackJoker',
  RedJoker = 'redJoker',
}

export enum CardValue {
  Joker = 'joker',
  Ace = 'ace',
  Two = 'two',
  Three = 'three',
  Four = 'four',
  Five = 'five',
  Six = 'six',
  Seven = 'seven',
  Eight = 'eight',
  Nine = 'nine',
  Ten = 'ten',
  Jack = 'jack',
  Queen = 'queen',
  King = 'king',
}

export interface Card {
  suit: CardSuit
  value: CardValue
}

export interface CardDeck {
  cards: Card[]
}

export const createCardDeck = (hasJoker?: boolean) => {
  const cards: Card[] = []

  for (const suit of Object.values(CardSuit)) {
    if (suit === CardSuit.BlackJoker || suit === CardSuit.RedJoker) {
      if (hasJoker) {
        cards.push({ suit, value: CardValue.Joker })
      }
      continue
    }

    for (const value of Object.values(CardValue)) {
      if (value !== CardValue.Joker) {
        cards.push({ suit, value })
      }
    }
  }

  return { cards: shuffle(cards) }
}

const shuffle = (cardArr: Card[]) => {
  let currIdx = cardArr.length
  let tmpCard: Card
  let randIdx: number

  while (0 !== currIdx) {
    randIdx = Math.floor(Math.random() * currIdx)
    currIdx -= 1

    tmpCard = cardArr[currIdx]
    cardArr[currIdx] = cardArr[randIdx]
    cardArr[randIdx] = tmpCard
  }

  return cardArr
}
