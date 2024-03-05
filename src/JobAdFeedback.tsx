import TextField from '@mui/material/TextField';

interface JobAdFeedbackProps {
    value: string
}

const JobAdFeedback = ({ value }: JobAdFeedbackProps) => {

    return (
        <TextField
            fullWidth={true}
            value={value}
            InputProps={{
                readOnly: true,
            }}
            label="Job ad gender bias feedback"
            minRows={6}
            maxRows={30}
            multiline={true}
            placeholder="No feedback yet!"
        ></TextField>
    )
}

export default JobAdFeedback