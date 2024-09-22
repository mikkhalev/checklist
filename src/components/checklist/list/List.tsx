import React, {FC} from 'react';
import {Checkbox, IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
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
    checkItem: (id: number) => void
}

const List: FC<ListTasks> = ({items, checkItem}) => {

    return (
        <div className={classes.wrapper}>
            {
                items.map((task: Task) => (
                    <ListItemButton disableRipple key={task.id}>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => checkItem(task.id)}
                        />
                        <ListItemText primary={task.title + " " + task.id} className={`${classes.title} ${task.completed ? classes.completed : ''}`}/>

                        <ListItemIcon>
                            <IconButton>
                                <ExpandLessIcon />
                            </IconButton>
                            <IconButton>
                                <ExpandMoreIcon />
                            </IconButton>
                            <IconButton>
                                <DragHandleIcon />
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                ))
            }
        </div>
    );
};

export default List;