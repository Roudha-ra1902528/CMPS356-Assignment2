import * as emojis from "emoji-api";

function keys() {
  return Math.floor(Math.random() * 989999999 + 10000000);
}

export function genEmojis(num) {
  let i = 0,
    arr = [];

  while (i < num) {
    let e = emojis.random();

    while(arr.find((c) => e.emoji == c.emoji))  //unique emoji
        e = emojis.random();

    arr.push({ emoji: e.emoji }, { emoji: e.emoji });
    i++;
  }
  return arr
    .map((obj) => ({ ...obj, key: keys() }))
    .sort(() => Math.random() - 0.5);
}

export function randomRotations(num) {
  let i = 0,
    arr = [];

  while (i < num) {
    arr.push(Math.random().toPrecision(5));
    arr.push(Math.random().toPrecision(5));
    i++;
  }
  return arr;
}
