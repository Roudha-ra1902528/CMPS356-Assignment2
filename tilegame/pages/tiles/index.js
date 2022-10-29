import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Link from "next/link";
import { genEmojis, randomRotations } from "../../utils/utils";
import Grid from "@mui/material/Grid";

const styleBlock = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: "60px",
  },
  main: {
    margin: "10px",
    height: "80px",
    width: "80px",
    borderColor: "#ADC8E6",
  },
  emoji: {
    fontSize: "40px",
    pointerEvents: "none",
  },
};

const Index = (props) => {
  const [emojiList, setEmojiList] = useState([]);
  const [firstSelection, setFirstSelection] = useState("");
  const [matched, setMatched] = useState([]);
  const [progress, setProgress] = useState({
    level: 1,
    matched: [],
    tiles: [],
    rotations: [],
  });
  const router = useRouter();
  const { level } = router.query;
  const levelInt = parseInt(level);

  useEffect(() => {
    if (router.asPath == "/tiles") router.push("/tiles?level=1");
  }, []);

  useEffect(() => {
    if (!level) return; 

    setEmojiList(genEmojis(levelInt));

    setFirstSelection("");
    setMatched([]);
    setProgress({
      ...progress,
      matched: [],
      level: levelInt,
      rotations: randomRotations(levelInt),
    });
  }, [level]);

  useEffect(() => {
    const emojis = emojiList.map((e) => e.emoji);
    setProgress({ ...progress, tiles: emojis }); //if emojis finish generating, set emojis in progress
  }, [emojiList]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress)); //sync progress with localStorage
  }, [progress]);

  const handleClick = (data, i) => {
    if (firstSelection.length == 0) {
      setFirstSelection(data);
    } else {
      if (firstSelection.emoji == data.emoji && firstSelection.key != data.key) {
        setMatched([...matched, firstSelection.emoji]);
        setProgress({ ...progress, matched: [...matched, firstSelection.emoji] });
      }
      setFirstSelection("");
    }
  };

  return (
    <>
      <header style={styleBlock.header}>
        <h2
          className="margins"
          style={{ display: matched.length != levelInt ? "initial" : "none" }}
        >
          Level {levelInt}
        </h2>
        <h2
          style={{
            display: matched.length == levelInt ? "initial" : "none",
            marginLeft: "auto",
            textDecoration: "underline",
          }}
        >
          <div style={{ display: "flex", width: "200px" }}>
            <Link href={`/tiles?level=${levelInt + 1}`}>
              <div className="arrow-3"></div>
            </Link>
            <Link href={`/tiles?level=${levelInt + 1}`}>
              <p style={{ marginLeft: "10px" }}>Level {levelInt + 1}</p>
            </Link>
          </div>
        </h2>
      </header>

      <main className="margins">
        <Grid container spacing={2}>
          {emojiList.map((data, i) => (
            <Grid key={Math.random()}>
              <Button
                style={{
                  ...styleBlock.main,
                  backgroundColor: firstSelection.key == data.key ? "#ADC8E6" : "",
                }}
                className="button"
                variant={matched.includes(data.emoji) ? "disabled" : "outlined"}
                value={data.key}
                onClick={() => handleClick(data, i)}
              >
                <Box
                  value={data.key}
                  sx={{
                    transform: `rotate(${progress.rotations[i]}turn)`,
                    ...styleBlock.emoji,
                  }}
                >
                  {data.emoji}
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
};

export default Index;
