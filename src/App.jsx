import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [Number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [Password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const paswordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Number) str += "0123456789";
    if (character) str += "!@#$%^&*(&{}[]~";

    // Correct loop and password concatenation
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length); // fixed index range
      password += str.charAt(char); // append character to password
    }

    setPassword(password); // set the final password
  }, [length, Number, character, setPassword]);

  const copyPassordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    paswordGenerator();
  }, [length, Number, character, setPassword, setCharacter, paswordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 h-36 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center text-2xl my-5 mt-14 pt-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="curcer-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={Number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
