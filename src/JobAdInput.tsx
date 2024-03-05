import TextField from '@mui/material/TextField';

interface JobAdInputProps {
    value: string
    onChange: (s: string) => void
}

const JobAdInput = ({ value, onChange }: JobAdInputProps) => {

    return (
        <TextField 
            fullWidth={true}
            value={value} onChange={e => onChange(e.target.value)}
            label="Job ad to review"
            minRows={6}
            maxRows={30}
            multiline={true}
            placeholder="Insert job ad here..."
        ></TextField>
    )
}

export default JobAdInput   