import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import './App.css';
import JobAdInput from './JobAdInput';
import JobAdFeedback from './JobAdFeedback';
import Bias from './Bias';
import { countFemenineWords, countMasculineWords } from './wordlist/wordlist';


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
      <Paper sx={{ mx: 8, my: 4, padding: 4, alignContent: "center" }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2, }}>📝 Job Ad Gender Decoder ♀️/♂️</Typography>

        <Container>

          <Typography variant="body1" sx={{ mb: 2 }}>This tool will help you to write job ads that are welcoming to any gender! </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Paste your job ad text into the box below and click "Get Feedback!" to get started! </Typography>
        </Container>


        <JobAdInput value={jobAdInputText} onChange={(s: string) => jobAdInputChanged(s)} />
        <Button sx={{ marginTop: 2, marginBottom: 4, marginRight: 4 }} variant="contained" onClick={getFeedbackOnJobAd}>Get feedback on Job Ad</Button>
        {debug ? <Button variant="outlined" onClick={() => loadTestJobAd()}>Load test Job Ad</Button> : null}
        <JobAdFeedback value={jobAdFeedback} />
        <Bias femenineWordCount={femenineWordCount} masculineWordCount={masculineWordCount} />
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6" component="h1">Credit</Typography>
          <Typography variant="body1">The tool is based on the research of Danielle Gaucher, Justin Friesen, and Aaron C. Kay. <br />
            The software implementation is based
            on <Link href="https://gender-decoder.katmatfield.com/" target="_blank">Gender Decoder</Link> created
            by <Link href="https://github.com/lovedaybrooke" target="_blank">Kat Matfield</Link> <br />
            Thank you! 🙏
          </Typography>
        </Card>
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6" component="h1">Feedback about this tool</Typography>
          <Typography variant="body1">Please reach out to me for any feedback about this tool! <br />

            <Link href="https://www.linkedin.com/in/javierubillos" target="_blank">Linked In</Link> <br />
            Email: <Link href="mailto:javier@ubillos.com" target="_blank">javier@ubillos.org</Link> <br />
            Github:             <Link href="https://github.com/jav" target="_blank">@jav</Link> <br />
            <br />
            You'll also welcome to <Link href="https://github.com/jav/jobad-gender-decoder">the source of this tool</Link>!
          </Typography>
        </Card>
        {
          process.env.NODE_ENV === "development" ?
            <Button sx={{ marginTop: 2, marginBottom: 4, marginRight: 4 }}
              variant="outlined"
              onClick={() => toggleDebug()}>
              Toggle Debug
            </Button> : null
        }
        {
          debug ?
            <Container>
              <TextField
                value={feedbackPromptOverride}
                onChange={(e) => updatePromptOverride(e.target.value)}
                multiline={true}
              />
              <Button onClick={() => resetPromptOverride()}>Reset</Button>
            </Container>
            : null
        }
      </Paper >
    </Container >
  );
}

export default App;
