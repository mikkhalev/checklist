import React, {FC, ReactNode} from 'react';
import * as classes from './footer.module.scss'
import {Button, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FooterProps {
    completedTasksCount: number,
    allTasksCount: number
}
const Footer: FC<FooterProps> = ({completedTasksCount, allTasksCount}) => {
    return (
        <div className={classes.footer}>
            <Typography variant="body2">
                Completed {completedTasksCount} of {allTasksCount}
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