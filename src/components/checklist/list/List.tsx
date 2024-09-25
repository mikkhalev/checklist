import React, {FC} from 'react';
import {Checkbox, IconButton, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import * as classes from './list.module.scss'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragHandleIcon from '@mui/icons-material/DragHandle';

interface Task {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

interface ListTasks {
    items: Task[],
    checkItem: (id: number) => void,
    currentUser: number | null
    moveTask: (id: number, direction: string) => void
}

const List: FC<ListTasks> = ({items, checkItem, currentUser, moveTask}) => {
    let lastIndexActive = 0;
    if (items.length !== 0) {
        lastIndexActive = items.length - 1 - items.slice().reverse().findIndex(task => !task.completed)
    }
    return (
        <div className={classes.wrapper}>
            {
                items.length === 0 ? (
                    <Typography variant="body1" className={classes.notice}>
                        {
                            currentUser !== null ? 'У пользователя задач нет' : 'Выберете пользователя'
                        }
                    </Typography>
                ) : (
                    items.map((task: Task, index) => (
                        <ListItemButton disableRipple key={task.id}>
                            <Checkbox
                                checked={task.completed}
                                onChange={() => checkItem(task.id)}
                            />
                            <ListItemText primary={task.title + " " + task.id} className={`${classes.title} ${task.completed ? classes.completed : ''}`}/>
                            {
                                task.completed ? null : (
                                    <ListItemIcon>
                                        <IconButton
                                            disabled={index == 0}
                                            onClick={() => moveTask(task.id, 'up')}
                                        >
                                            <ExpandLessIcon />
                                        </IconButton>

                                        <IconButton
                                            disabled={index == lastIndexActive}
                                            onClick={() => moveTask(task.id, 'down')}
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>

                                        <IconButton>
                                            <DragHandleIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                )
                            }

                        </ListItemButton>
                    ))
                )

            }
        </div>
    );
};

export default List;