import { useRef, useState } from "react";



export default function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  function submitFormHandler(e) {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  function getFeedbackhandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea rows="5" ref={feedbackRef} />
        </div>
        <button>Submit feedback</button>
      </form>
      <hr />
      <hr />
      <button onClick={getFeedbackhandler}>Load feedback</button>
      <ul>
        {feedbackItems.map((i) => (
          <li key={i.id}>{i.text}</li>
        ))}
      </ul>
    </div>
  );
}
