import { Container, Paper, Typography } from '@mui/material';

interface BiasProps {
    masculineWordCount: number
    femenineWordCount: number
}

const Bias = (props: BiasProps) => {
    const { masculineWordCount, femenineWordCount } = props

    return (
        <Paper sx={{ display: "flex", flexDirection: "row", my: 4, padding:4 }}>
            <Container>
                <Typography variant="h6">Femenine word count: {femenineWordCount}</Typography>
                <Typography variant="h6">Masculine word count: {masculineWordCount}</Typography>
            </Container>
            <Container>
                <Typography variant="body1">Recommendation: Keep the masculine word count low.</Typography>
                <Typography variant="body1">
                    A high masculine bias will discourage female applicants. <br />
                    A high femenine count has a negligable impact on male applicants.
                </Typography>
            </Container>
        </Paper>
    )
}

export default Bias