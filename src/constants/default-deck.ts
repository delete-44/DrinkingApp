import { CardPermittedFields } from "../repositories/CardRepository";
import { TDeckData } from "../types";

export const DEFAULT_CARDS = [
  // Basics
  { content: "You drink" },
  { content: "You drink" },
  { content: "You drink" },
  { content: "You drink" },
  { content: "You drink" },
  { content: "Everybody drink once" },
  { content: "Everybody drink twice" },
  { content: "Everybody drink three times" },
  { content: "Finish your drink" },

  // Nice ones
  { content: "Take a selfie with the group!" },
  { content: "Say something nice about each other player" },
  { content: "Decide who is best-dressed. That person drinks" },
  { content: "Decide which player has the nicest smile. They drink" },
  { content: "Decide which player has the nicest eyes. They drink" },

  // Ring of fire rules }:
  {
    content:
      "Ace: Waterfall;\n\nEverybody start drinking at the same time. Going clockwise around the room, you cannot stop drinking until the player before you stops",
  },
  { content: "2: You;\n\nYou pick somebody to drink" },
  { content: "3: Me;\n\nYou drink" },
  { content: "4: Female & nonbinary players drink" },
  {
    content:
      "5: Thumbmaster;\n\nYou are now the Thumbmaster. At any point, you can put your thumb on the table. The last player to also put their thumb on the table drinks",
  },
  { content: "6: Male & nonbinary players drink" },
  {
    content:
      "7: Heaven;\n\nYou are now the Heavenmaster. At any point you can raise your hand. The last player to also raise their hand drinks",
  },
  {
    content:
      "8: Mate;\n\nChoose another player. Whenever either of you drinks, the other must as well",
  },
  {
    content:
      "9: Rhyme;\n\nChoose a word. Going clockwise around the room, everybody says a word that rhymes with the starting word. Hesitate or fail to think of a rhyme, you drink",
  },
  {
    content:
      "10: Categories;\n\nChoose a category. Going clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink",
  },
  { content: "Jack:\n\nMake a rule" },
  {
    content:
      "Queen: Questionmaster;\n\nYou are now the Questionmaster. At any point, if any other player answers a question you ask, they drink",
  },
  {
    content:
      "King: Dirty drink;\n\nAll players pour some of their drink into a glass. You drink it",
  },

  // Preset categories
  {
    content:
      "Category: Cars;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: Planets;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: Airplanes;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: US States;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: Countries in Europe;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: Animals;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: Liquors;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },
  {
    content:
      "Category: Colours;\n\nGoing clockwise around the room, everybody says a word that fits within this category. Hesitate or fail to think of a word, drink. You start",
  },

  // Challenges
  { content: "Give out a drink for every pressup you can do in 15 seconds" },
  { content: "Reveal your last web search or drink" },
  { content: "Say the alphabet backwards. Fail & drink" },
  { content: "Arm wrestle another player. Loser drinks" },
  {
    content:
      "Take a drink from the player on your left and from the player on your right",
  },
  { content: "Choose another player; take one sip from each others drinks" },
  {
    content:
      "Tell everyone who you think is the most attractive in the room or take a drink",
  },
  { content: "Flip a coin. Heads; you drink. Tails; everybody else drinks" },
  {
    content:
      "Make eye contact with another player and drink. If you break eye contact, finish it",
  },
  {
    content:
      "Act out a scene from a movie. The first person to guess it correctly picks someone to drink",
  },
  { content: "Race another player of your choice to finish a drink" },
  { content: "Rock-paper-scissors with another player; loser drinks" },
  { content: "Choose which two players look the most alike. They both drink" },

  // Generics
  { content: "Drink for every letter in your name" },
  { content: "Drink for every coffee you've had today" },
  { content: "Drink if you are wearing a belt" },
  { content: "Drink for every tattoo you have" },
  { content: "Everybody who is taller than you drinks" },
  { content: "Everybody with smaller hands than you drinks" },
  { content: "Drink for every other player you are attracted to" },
  {
    content:
      "Double or nothing; if you drank in the last round, you can give out double the drinks you had",
  },
  { content: "Take a shot with the player you've known for the longest" },
  { content: "First person to finish their drink can invent a rule" },
  { content: "The player opposite you drinks" },
  { content: "The person nearest to you drinks" },
] as CardPermittedFields[];

const DEFAULT_DECK = {
  name: "Default",
} as TDeckData;

export default DEFAULT_DECK;
