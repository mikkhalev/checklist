import React, {FC, ReactNode} from 'react';
import * as classes from './footer.module.scss'
import {Button, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FooterProps {
    completed: number,
    all: number
}
const Footer: FC<FooterProps> = ({completed, all}) => {
    return (
        <div className={classes.footer}>
            <Typography variant="body2">
                Completed {completed} of {all}
            </Typography>
            <Button
                startIcon={<AddIcon />}
                sx={{
                    color: 'black',
                    textTransform: 'none'
                }}
            >
                <Typography variant="body2">
                    Add Task
                </Typography>
            </Button>
        </div>
    );
};

export default Footer;