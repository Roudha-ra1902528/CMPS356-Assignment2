import React, { useEffect, useState } from 'react'
import * as emojis from "emoji-api";

function genEmojis(num){
    let i = 0, arr = [];
    while(i<num+1){
    arr.push(emojis.random())
    i++
    }
   return arr;
  }

const Emoji = (props) => {
    const [emoji, setEmoji] = useState([])

  return (
    <div>{emoji.map(e => (<div key={e._data.name}>{e._data.emoji}</div>))}</div> 
  )
}

export default Emoji