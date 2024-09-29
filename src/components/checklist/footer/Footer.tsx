import React, {FC, ReactNode, useState} from 'react';
import * as classes from './footer.module.scss'
import {Box, Button, Modal, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTaskModal from "../modal/addTaskModal";
interface User {
    id: number,
    username: string
}
interface FooterProps {
    completedTasksCount: number,
    allTasksCount: number,
    currentUser: User | undefined,
    addTask: (titleTask: string) => void
}
const Footer: FC<FooterProps> = ({completedTasksCount, allTasksCount, currentUser, addTask}) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }

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
                onClick={openModal}
            >
                <Typography variant="body2">
                    Add Task
                </Typography>
            </Button>
            <AddTaskModal
                close={closeModal}
                isOpen={isModalOpen}
                currentUser={currentUser}
                addTask={addTask}
            />
        </div>
    );
};

export default Footer;