import { TextareaAutosize } from '@mui/base';

interface JobAdInputProps {
    value: string
    onChange: (s: string) => void
}

const JobAdInput = ({ value, onChange }: JobAdInputProps) => {

    return (
        <div>
            <TextareaAutosize
                value={value} onChange={e => onChange(e.target.value)}
                minRows={10}
                maxRows={50}
                placeholder="Insert job ad here..."
            ></TextareaAutosize>
        </div>
    )
}

export default JobAdInput   