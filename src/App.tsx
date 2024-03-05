import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import './App.css';
import JobAdInput from './JobAdInput';
import JobAdFeedback from './JobAdFeedback';
import Bias from './Bias';
import { countFemenineWords, countMasculineWords } from './wordlist/wordlist';
import { Button, Paper, TextField } from '@mui/material';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function App() {

  const [jobAdInputText, setJobAdInputText] = useState("")
  const [feedbackSubmissionSuccess, setFeedbackSubmissionSuccess] = useState("No info")
  const [jobAdFeedback, setJobAdFeedback] = useState("No feedback yet...")
  const [femenineWordCount, setFemenineWordCount] = useState(0)
  const [masculineWordCount, setMasculineWordCount] = useState(0)
  const [debug, setDebug] = useState(false)
  const [feedbackPromptOverride, setFeedbackPromptOverride] = useState("")

  const jobAdInputChanged = (s: string) => {
    setJobAdInputText(() => s)
    updateBias(s)
  }

  const updateBias = (s: string) => {
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
          jobAd: jobAdInputText,
          promptOverride: feedbackPromptOverride
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

  const toggleDebug = async () => {
    setDebug(() => !debug)
  }

  const resetPromptOverride = async () => {
    try {
      const res = await fetch(REACT_APP_BACKEND_URL + "/getPrompt", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        console.log("⚠️ Backend does not supporting debug-mode.")
        setFeedbackPromptOverride("⚠️ Backend does not supporting debug-mode.")
        return
      }
      const data = await res.json()
      console.log(data)
      setFeedbackPromptOverride(data.prompt)
    } catch (error) {
      console.log(error)
    }
  }

  const updatePromptOverride = (s: string) => {
    setFeedbackPromptOverride(s)
  }

  const loadTestJobAd = async () => {
    try {
      const textJobAdText = await fetch("/testJobAd.txt").then(r => r.text())
      setJobAdInputText(() => textJobAdText)
      updateBias(textJobAdText)

    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Paper sx={{ mx: 8, my: 4, padding: 2 }}>
        <Box sx={{ mx: 2, my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Job Ad Gender Decoder</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>This tool will help you to write job ads that are welcoming to any gender! </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Paste your job ad text into the box below and click "Get Feedback!" to get started! </Typography>
          <JobAdInput value={jobAdInputText} onChange={(s: string) => jobAdInputChanged(s)} />
          <Button sx={{ marginTop: 2, marginBottom: 4, marginRight: 4 }} variant="contained" onClick={getFeedbackOnJobAd}>Get feedback on Job Ad</Button>
          {debug ? <Button variant="outlined" onClick={() => loadTestJobAd()}>Load test Job Ad</Button> : null}
          <JobAdFeedback value={jobAdFeedback} />
          <Bias femenineWordCount={femenineWordCount} masculineWordCount={masculineWordCount} />
          {process.env.NODE_ENV === "development" ?
            <Button sx={{ marginTop: 2, marginBottom: 4, marginRight: 4 }}
              variant="outlined"
              onClick={() => toggleDebug()}>
              Toggle Debug
            </Button> : null
          }
          {debug ?
            <Container>
              <TextField
                value={feedbackPromptOverride}
                onChange={(e) => updatePromptOverride(e.target.value)}
                multiline={true}
              />
              <Button onClick={() => resetPromptOverride()}>Reset</Button>
            </Container>
            : null}

        </Box>
      </Paper>
    </Container>
  );
}

export default App;
