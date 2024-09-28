import React, {FC} from 'react';
import {Checkbox, IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import * as classes from "./list-item.module.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragHandleIcon from "@mui/icons-material/DragHandle";

interface Task {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
    order: number
}
interface TaskProps {
    task: Task,
    index: number,
    checkItem: (task: Task) => void,
    moveTask: (taskId: number, direction: string, otherTaskId: number | null) => void,
    unCompletedTasksCount: number,
    prevTaskId: number | null,
    nextTaskId: number | null
}
const ListItem: FC<TaskProps>= ({task, index, checkItem, moveTask, unCompletedTasksCount, prevTaskId, nextTaskId}) => {
    return (
        <ListItemButton disableRipple>
            <Checkbox
                checked={task.completed}
                onChange={() => checkItem(task)}
            />
            <ListItemText
                primary={task.title}
                className={`${classes.title} ${task.completed ? classes.completed : ''}`}
            />
            {
                task.completed ? null : (
                    <ListItemIcon>
                        <IconButton
                            disabled={index == 0}
                            onClick={() => moveTask(task.id, 'up', prevTaskId)}
                        >
                            <ExpandLessIcon />
                        </IconButton>

                        <IconButton
                            disabled={index == unCompletedTasksCount - 1}
                            onClick={() => moveTask(task.id, 'down', nextTaskId)}
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
    );
};

export default ListItem;