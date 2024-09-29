import React, {FC, useState} from 'react';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
interface User {
    id: number,
    username: string
}
interface AddTaskModal {
    isOpen: boolean,
    close: () => void,
    currentUser: User | undefined
    addTask: (titleTask: string) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
};

const AddTaskModal: FC<AddTaskModal> = ({close, isOpen, currentUser, addTask}) => {

    const [newTaskField, setNewTaskField] = useState<string>('')

    return (
        <Modal
            open={isOpen}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Новая таска для пользователя <strong>{currentUser ? currentUser.username : ''}</strong>
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Введите новую таску"
                    variant="outlined"
                    value={newTaskField}
                    onChange={(e) => setNewTaskField(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={() => {addTask(newTaskField); close()}}
                >
                    Добавить
                </Button>
            </Box>
        </Modal>
    );
};

export default AddTaskModal;