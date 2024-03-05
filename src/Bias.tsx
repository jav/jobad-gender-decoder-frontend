import { Container, Typography } from '@mui/material';

interface BiasProps {
    masculineWordCount: number
    femenineWordCount: number
}

const Bias = (props: BiasProps) => {
    const { masculineWordCount, femenineWordCount } = props

    return (
        <Container>
            <Typography variant="h6">Femenine word count: {femenineWordCount}</Typography>
            <Typography variant="h6">Masculine word count: {masculineWordCount}</Typography>
            <Typography variant="body1">Recommendation: Keep the masculine word count low.</Typography>
            <Typography variant="body1">
                A high masculine bias will discourage female applicants. <br />
                A high femenine count has a negligable impact on male applicants.
            </Typography>
        </Container>
    )
}

export default Bias