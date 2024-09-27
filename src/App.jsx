import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  let [buttonText, setButtonText] = useState("Copy")

  const [length, setlength] = useState(8)
  const [numberAllow, setnumberAllow] = useState(false)
  const [charAllow, setcharAllow] = useState(false)

  const [Password, setPassword] = useState("")

  const generatePass = useCallback( ()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    
    if(numberAllow)     str += "0123456789";
    if(charAllow)       str += "!@#$%^&*_-+=";
    
    for (let i = 0; i <= length; i++) {
      
      let char = Math.floor(Math.random() *str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length, numberAllow, charAllow, setPassword])
   
  const copyToClipBoard = useCallback(()=>{
    PassRef.current?.select();
    window.navigator.clipboard.writeText(Password) 
    setButtonText("Copied")
  }, [Password])

  useEffect(()=> {
    generatePass()
  }
  ,[length, numberAllow, charAllow, generatePass])

  function handleChange(){
    setButtonText("Copy")
  }

  const PassRef = useRef(null)

  return(
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 
      text-blue-100 bg-blue-500 '>

        <h1 className='text-white text-center my-3 text-4xl'>
          Password Genertor
        </h1>
        <div  className='flex shadow rounded-lg overflow-hidden mb-4'
        >
          <input type="text"
          value={Password}
          placeholder='Password'
          className='w-full outline-none px-3 py-1 text-gray-700'
          readOnly
          ref={PassRef}
          onChange={handleChange}
          />
          <button
            onClick={copyToClipBoard}
            className='outline-none bg-blue-950 text-white px-3 py-0.5 shrink-0 transition-transform transform hover:bg-blue-700 hover:scale-105 hover:shadow-lg'

          >{buttonText}</button>
        </div>
        
        <div
          className='flex items-center gap-x-1'
        >
          <input type="range"
          min={6}
          max={40}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)
            handleChange()
          }}
          />
          <label>Length: {length}</label>


          <div
            className='flex items-center gap-x-1'
          >
          <input type="checkbox" 
          defaultChecked = {numberAllow}
          id='numberinput'
          onChange={() => {
            handleChange()
            setnumberAllow((prev)=> !prev);
            }
          }
          />
          <label htmlFor='numberinput' >Numbers</label>

          </div>

          <div
            className='flex items-center gap-x-1'
          >
          <input type="checkbox" 
          defaultChecked = {charAllow}
          id='charinput'
          onChange={() => {
            handleChange()
            setcharAllow((prev) => !prev);
            }
          }
          />
          <label htmlFor='charinput' >Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
