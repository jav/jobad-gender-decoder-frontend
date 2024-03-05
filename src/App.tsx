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
import { Button, Paper } from '@mui/material';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function App() {

  const [jobAdInputText, setJobAdInputText] = useState("")
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
    <Container>
      <Paper sx={{ mx: 8, my: 4, padding: 2 }}>
        <Box sx={{ mx: 2, my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Job Ad Gender Decoder</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>This tool will help you to write job ads that are welcoming to any gender! </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Paste your job ad text into the box below and click "Get Feedback!" to get started! </Typography>
          <JobAdInput value={jobAdInputText} onChange={(s: string) => jobAdInputChanged(s)} />
          <Button sx={{ marginTop: 2, marginBottom: 4 }} variant="contained" onClick={getFeedbackOnJobAd}>Get feedback on ad</Button>
          <JobAdFeedback value={jobAdFeedback} />
          <Bias femenineWordCount={femenineWordCount} masculineWordCount={masculineWordCount} />
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
