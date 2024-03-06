import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import './App.css';
import JobAdInput from './JobAdInput';
import JobAdFeedback from './JobAdFeedback';
import Bias from './Bias';
import { findFemenineWords, findMasculineWords, getSentenceOfFoundWord } from './wordlist/wordlist';
import conf from './config/config'
import FoundWord from './types/FoundWord';
import Box from '@mui/material/Box';


const API_BASE_URL = conf.API_BASE_URL

function App() {

  const [jobAdInputText, setJobAdInputText] = useState("")
  const [feedbackSubmissionSuccess, setFeedbackSubmissionSuccess] = useState("No info")
  const [jobAdFeedback, setJobAdFeedback] = useState("No feedback yet...")
  const [femenineWordsFound, setFemenineWordsFound] = useState<FoundWord[]>([])
  const [masculineWordsFound, setMasculineWordsFound] = useState<FoundWord[]>([])

  const jobAdInputChanged = (s: string) => {
    setJobAdInputText(() => s)
    updateBias(s)
  }

  const updateBias = (s: string) => {
    setFemenineWordsFound(() => findFemenineWords(s))
    setMasculineWordsFound(() => findMasculineWords(s))
  }

  const getFeedbackOnJobAd = async () => {
    try {
      const res = await fetch(API_BASE_URL + "/getFeedbackOnJobAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobAd: jobAdInputText,
          femenineWordsFound: femenineWordsFound.map(w => ({ sentence: getSentenceOfFoundWord(w, jobAdInputText), word: w.word })),
          masculineWordsFound: masculineWordsFound.map(w => ({ sentence: getSentenceOfFoundWord(w, jobAdInputText), word: w.word })),
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
    <Paper sx={{ mx: 8, my: 4, padding: 4, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      <Container>
        <Typography variant="h2" component="h1" sx={{ mb: 2, }}>📝 Job Ad Gender Decoder ♀️/♂️</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>Created by Javier Ubillos</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>This tool will help you to write job ads that are welcoming to any gender! </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>Paste your job ad text into the box below and click "Get Feedback!" to get started! </Typography>
      </Container>
      <Container sx={{ display: "flex", flexDirection: "row" }} >

        <Box sx={{ flexGrow: 3 }}>
          <JobAdInput value={jobAdInputText} onChange={(s: string) => jobAdInputChanged(s)} />
          <Button sx={{ marginTop: 2, marginBottom: 4, marginRight: 4 }} variant="contained" onClick={getFeedbackOnJobAd}>Get feedback on Job Ad</Button>
          <JobAdFeedback value={jobAdFeedback} />


        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Bias
            femenineWordsFound={femenineWordsFound} masculineWordsFound={masculineWordsFound}
          />
        </Box>
      </Container>
      <Box sx={{ my: 4 }}>
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
            Github: <Link href="https://github.com/jav" target="_blank">@jav</Link> <br />
            <br />
            You'll also welcome to <Link href="https://github.com/jav/jobad-gender-decoder">the source of this tool</Link>!
          </Typography>
        </Card>
      </Box>
    </Paper>
  );
}

export default App;
