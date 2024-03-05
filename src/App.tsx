import React, { useState } from 'react';
import './App.css';
import JobAdInput from './JobAdInput';
import JobAdFeedback from './JobAdFeedback';
import Bias from './Bias';
import { countFemenineWords, countMasculineWords } from './wordlist/wordlist';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL


function App() {


  const [jobAdInputText, setJobAdInputText] = useState("Insert job ad here...")
  const [feedbackSubmissionSuccess, setFeedbackSubmissionSuccess] = useState("No info")
  const [jobAdFeedback, setJobAdFeedback] = useState("No feedback yet...")
  const [femenineWordCount, setFemenineWordCount] = useState(0)
  const [masculineWordCount, setMasculineWordCount] = useState(0)

  const jobAdInputChanged = (s: string) => {
    setJobAdInputText(() => s)
    setFemenineWordCount(() => countFemenineWords(s))
    setMasculineWordCount(() => countMasculineWords(s))
  }

  const getFeedbackOnJobAd = async () => {
    try {
      const res = await fetch(REACT_APP_BACKEND_URL + "/getFeedbackOnJobAd", {
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
      <JobAdInput value={jobAdInputText} onChange={(s: string) => jobAdInputChanged(s)} />
      <button className="GetFeedbackOnJobAd" onClick={getFeedbackOnJobAd}>Get feedback on ad</button><span>{feedbackSubmissionSuccess}</span>
      <JobAdFeedback value={jobAdFeedback} />
      <Bias femenineWordCount={femenineWordCount} masculineWordCount={masculineWordCount} />
    </div>
  );
}

export default App;
