import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeSpChars, setIncludeSpChars] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (includeNum) str += "01234567789";
    if (includeSpChars) str += "!@#$%^&*()_{}[]"
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, includeNum, includeSpChars, setPassword]);

  const copyPass = useCallback(() => {
      passRef.current?.select()
      window.navigator.clipboard.writeText(password)  
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, includeNum, includeSpChars, passwordGenerator])

  let passRef = useRef(null)

  return (
    <>
      
      <div className='bg-gray-700 shadow-md max-w-md px-4 py-3 my-8 rounded-lg w-full mx-auto text-yellow-500'>
        <h1 className="text-3xl text-center text-white my-4">Password Generator</h1>
        <div className='flex shadow-md rounded-lg mb-4 overflow-hidden'>
          <input type="text"
            value={password}
            className='outline-none px-3 py-1 w-full'
            placeholder='password'
            ref={passRef}
            readOnly
          />
          <button className='bg-yellow-500 text-white py-2 px-4 mx-2 rounded-md' onClick={copyPass}>copy</button>
        </div>
        <input type="range" 
          className='cursor-pointer'
          min={8}
          max={25}
          onChange={(e) => setLength(e.target.value)}
        />
        <label className='mx-2'>length: {length}</label>

        <input type="checkbox" 
          defaultChecked={includeNum}
          onChange={() => setIncludeNum((prev) => !prev)}
        />
        <label htmlFor="" className='mx-2'>numbers</label>

        <input type="checkbox" 
          defaultChecked={includeNum}
          onChange={() => setIncludeSpChars((prev) => !prev)}
        />
        <label htmlFor="" className='mx-2'>Sp chars</label>
      </div>

    </>
  )
}

export default App
