import { TextareaAutosize } from '@mui/base';

interface JobAdFeedbackProps {
    value: string
}

const JobAdFeedback = ({ value }: JobAdFeedbackProps) => {

    return (
        <div>
            <TextareaAutosize
                value={value} readOnly={true}
                minRows={10}
                maxRows={50}
                placeholder="Insert job ad here..."
            ></TextareaAutosize>
        </div>
    )
}

export default JobAdFeedback