import { useState } from "react";
import { feedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage({ feedbacks }) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch("/api/" + id)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbacks.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show more
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = feedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbacks: data,
    },
  };
}
