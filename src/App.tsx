import React, { useState } from 'react';
import './App.css';

function App() {

  const backendUrl = "http://localhost:3300"

  const [jobAdInputText, setJobAdInputText] = useState("Insert job ad here...")
  const [feedbackSubmissionSuccess, setFeedbackSubmissionSuccess] = useState("No info")
  const [jobAdFeedback, setJobAdFeedback] = useState("No feedback yet...")

  const getFeedbackOnJobAd = async () => {
    try {
      const res = await fetch(backendUrl + "/getFeedbackOnJobAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobAd: jobAdInputText
        })
      })
      const data = await res.json()
      console.log(data)
      setFeedbackSubmissionSuccess("Success")
      setJobAdFeedback(data.data.feedback)
    } catch (error) {
      console.log(error)
      setFeedbackSubmissionSuccess("Error")
    }

  }

  return (
    <div className="App">
      <textarea className="JobAdInput" cols={100} rows={20} value={jobAdInputText} onChange={e => setJobAdInputText(e.target.value)}></textarea>
      <button className="GetFeedbackOnJobAd" onClick={getFeedbackOnJobAd}>Get feedback on ad</button><span>{feedbackSubmissionSuccess}</span>
      <textarea className="JobAdOutput" readOnly={true} cols={100} rows={20} value={jobAdFeedback}></textarea>
    </div>
  );
}

export default App;
