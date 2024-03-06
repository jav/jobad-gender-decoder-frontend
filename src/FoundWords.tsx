import Container from '@mui/material/Container';
import { FoundWord } from './types/FoundWord';
import Typography from '@mui/material/Typography';

const uniqueWords = (words: FoundWord[]): string[] => {
    return [...new Set(words.map(w => w.word))]
}

interface FoundWordsProps {
    wordsFound: FoundWord[]
}

const FoundWords = ({ wordsFound }: FoundWordsProps) => {

    return (
        <Container>
            {uniqueWords(wordsFound).length <= 0 ?
                (<Typography variant="body1">No words found</Typography>) :
                (<Typography variant="body1">Words found (deduplicated list):</Typography>)}

            {uniqueWords(wordsFound).map((word, i) => (
                <Typography key={i} variant="body1">
                    {word}
                </Typography>
            ))}
        </Container>
    )
}

export default FoundWords