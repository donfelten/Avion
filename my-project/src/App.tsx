import { useState } from 'react'
import OpenAI from "openai";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getGPTResponse = async (prompt: string) => {
    setLoading(true);

    try {
      await delay(1000); 
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // Or gpt-4
          messages: [
            { role: 'user', content: prompt},
          ],
          max_tokens: 50,
          temperature: 0.7,
        }),
      });
      

      if (!res.ok) {
        throw new Error('Failed to fetch GPT response');
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      setResponse('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Function to handle the form submission or button click
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action (e.g., form submission)
      handleSubmit(); // Call handleSubmit function
    }
  };
  const handleSubmit = () => {
    // Do something with the input text
    setInputText("");
    getGPTResponse(inputText);
    console.log("Input text:", inputText);
    // Call any function here with the inputText
  };


  return (
    <>

      <section >
        <div className='h-[1340px] w-auto relative'>
          <section className='grid lg:grid-cols-12 lg:gap-[32px] mb-[45px] ml-[64px] mt-[32px] mr-[32px]'>

            <div className='col-span-4 bg-transparent h-[123px] rounded-[40] mr-[320px]'>
              <h1 className='text-transparent antialiased h-[130] bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700 
            text-[64px] font-sans font-[700]'>
                Avion
              </h1>
            </div>

            <div className='col-span-8 bg-transparent h-[116] w-[900] mr-[0] ml-[140px] rounded-[40]'>
              <h1 className='text-[60px] text-white drop-shadow-lg -mt-[29] font-sans font-semibold'>
                Watch me fly
              </h1>
            </div>

            <div className='col-span-4 h-[216px] bg-transparent mr-[48] ml-[32] rounded-[40] mt-[420px]'>
              <input
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type something..."
                disabled = {loading}
                className="h-[216px] w-[480px] border-black border-2 text-black rounded-[45px] p-2 resize-none pt-2" // Ensures padding from top
                style={{ overflowY: 'auto', textAlign: 'left', paddingTop: '12px' }} // Ensure the text aligns top to bottom
              />
            </div>
            <div className='col-span-3 h-[216px] bg-transparent mr-[48] ml-[32] rounded-[40] mt-[32px]'>

            </div>
            <div className='col-span-5 h-[604px] bg-transparent border-blue-500 border-[10px] rounded-[45px] mr-[48] ml-[32] mt-[32px]'>
              <p className='text-black ml-[20px] mt-[15px] mr-[20px]'>{response}</p>
            </div>
          </section>
        </div>
      </section>

    </>
  )
}

export default App
