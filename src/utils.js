import { adjectives, nouns } from "./words";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

/**
 * words에서 단어들을 가져와서, 0~1랜덤에다 단어길이 곱하면 랜덤 인덱스가 나옴. ->`` 을 통해 문자열을 꾸며준다.
 */
