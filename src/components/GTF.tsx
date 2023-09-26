import axios from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Title from "./Title";

interface CountryData {
  translations: {
    fra: {
      common: string;
    };
  };
  flags: {
    svg: string;
  };
  region: string;
}

const GTF: React.FC = () => {

  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [namesData, setNamesData] = useState<string[]>([]);
  const [flagsData, setFlagsData] = useState<string[]>([]);
  const [hintsData, setHintsData] = useState<string[]>([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [hints, setHints] = useState<boolean | null>(null);
  const [response, setResponse] = useState<boolean | null>(false);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

  const game = useRef<HTMLDivElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountriesData(res.data);
        const names = res.data.map((country: CountryData) => country.translations.fra.common);
        const flags = res.data.map((country: CountryData) => country.flags.svg);
        const hints = res.data.map((country: CountryData) => country.region);

        const { shuffledFlags, shuffledNames, shuffledHints } = shuffleArrays(flags, names, hints);

        setNamesData(shuffledNames);
        setFlagsData(shuffledFlags);
        setHintsData(shuffledHints);
      });
  }, []);

  useEffect(() => {
    if (correctAnswer === true) {
      nextFlag();
    }
  }, [correctAnswer]);

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    };
  }, []);

  const shuffleArrays = (flags: string[], names: string[], hints: string[]) => {
    const shuffledFlags = [...flags];
    const shuffledNames = [...names];
    const shuffledHints = [...hints];
    for (let i = shuffledFlags.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledFlags[i], shuffledFlags[j]] = [shuffledFlags[j], shuffledFlags[i]];
      [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
      [shuffledHints[i], shuffledHints[j]] = [shuffledHints[j], shuffledHints[i]];
    }
    return { shuffledFlags, shuffledNames, shuffledHints };
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }

  const checkAnswer = () => {
    const correctAnswer = namesData[currentFlagIndex].toLowerCase();
    const userAnswer = userInput.toLowerCase();
    if (userAnswer === correctAnswer) {
      if (game.current) {
        game.current.classList.add('correct');
        setTimeout(() => {
          setCorrectAnswer(userAnswer === correctAnswer);
          if (game.current) {
            game.current.classList.remove('correct');
          }
        }, 2000);
      }
    } else {
      if (game.current) {
        game.current.classList.add('false');
        setTimeout(() => {
          setCorrectAnswer(false);
          setUserInput("");
          if (game.current) {
            game.current.classList.remove('false');
          }
        }, 2000);
      }
    }
  }

  const nextFlag = () => {
    setCurrentFlagIndex(prevIndex => prevIndex + 1);
    setUserInput("");
    setCorrectAnswer(null);
    setHints(false);
    setResponse(false);
  }

  const keyPress = (e: { keyCode: number; preventDefault: () => void; }) => {
    if (e.keyCode === 13) {
      e.preventDefault(); 
      if (submitButton.current) {
        submitButton.current.click();
      }
    }
  }

  return (
    <div className="gtf" ref={game}>
      <Title>GUESS THE FLAG</Title>
      <div className="gtf-game">
        {
          response ?
            <p className="hint">{namesData[currentFlagIndex]}</p>
            :
            hints ?
              <p className="hint">Region : {hintsData[currentFlagIndex]}</p>
              :
              null
        }
        <div className="gtf-flag">
          {flagsData[currentFlagIndex] && (
            <img src={flagsData[currentFlagIndex]} alt="Flag" />
          )}
        </div>
        <div className="gtf-answer">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
          />
          <button ref={submitButton} type="submit" onClick={checkAnswer}>Submit</button>
        </div>
        <div className="gtf-response">
          {correctAnswer !== null ? (
            correctAnswer ? (
              <>
                {nextFlag()}
              </>
            ) : (
              null
            )
          ) : null}
        </div>
        <div className="gtf-response">
          <button onClick={() => setHints(true)}>Indice</button>
          <button onClick={() => setResponse(true)}>Réponse</button>
        </div>
      </div>
    </div>
  );
};

export default GTF;

