import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { FoundWord } from './types/FoundWord';
import FoundWords from './FoundWords';
import Box from '@mui/material/Box';

interface BiasProps {
    femenineWordsFound: FoundWord[]
    masculineWordsFound: FoundWord[]
}
const Bias = ({ femenineWordsFound, masculineWordsFound }: BiasProps) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", my: 4, padding: 4 }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}                     >
                    <Typography variant="h6">Feminine word count: {femenineWordsFound.length}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FoundWords wordsFound={femenineWordsFound} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Masculine word count: {masculineWordsFound.length}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FoundWords wordsFound={masculineWordsFound} />
                </AccordionDetails>
            </Accordion>
            <Box sx={{ margin: 3 }}>
                <Typography variant="body1"><strong>Recommendation:</strong></Typography>
                <Typography variant="body1">Keep the masculine word count low.</Typography>
                <Typography variant="body1">
                    A high masculine bias will discourage female applicants. <br />
                    A high femenine count has a negligable impact on male applicants.
                </Typography>
            </Box>
        </Box >
    )
}

export default Bias