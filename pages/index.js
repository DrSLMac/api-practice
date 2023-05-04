import Link from 'next/link';
import { useRef, useState } from 'react'

const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback}

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody), // This represents the data that should be appended to the request
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((data) => console.log("data: ", data)); // { email: 'test@test.com', text: 'Some feedback text' }
  }

  function loadFeedbackhandler() {
    fetch('/api/feedback') // a GET request does not need any method, body or headers (options object)
    .then(response => response.json())
    .then((data) => setFeedbackItems(data.feedback));
  }

  return (
    <div className='flex flex-col m-auto'>
      <div className='m-auto w-[50%]'>
        <h1 className='py-2'>The Home Page</h1>
      
        <form className='flex flex-col justify-between p-4' onSubmit={submitFormHandler}>
          <div className='flex justify-between py-2'>
            <label htmlFor='email'>Your Email Address</label>
            <input required className='border-2 rounded-md w-[16rem]' type='email' id='email' ref={emailInputRef}/>
          </div>
          <div className='flex justify-between py-2'>
            <label htmlFor='feedback'>Your Feedback</label>
            <textarea required className='border-2 rounded-md w-[16rem]' id='feedback' rows='5' ref={feedbackInputRef}></textarea>
          </div>
          <button className='border-4 p-2 rounded-xl bg-slate-400'>Send Feedback</button>
        </form>
        <hr className='w-full'/>
        <div className='flex p-4 justify-center'>
          <Link href='/feedback'>
            <button className='border-4 p-2 rounded-xl bg-slate-400' onClick={loadFeedbackhandler}>Load Feedback</button>
          </Link>

          <ul className='list-disc'>
            {feedbackItems.map(item => <li key={item.id
            }>{item.email} ➡️ {item.text}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage