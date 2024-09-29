import React, {FC} from 'react';
import {Typography} from "@mui/material";
import * as classes from './list.module.scss'
import ListItem from "../list-item/List-item";
interface Task {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
    order: number
}

interface ListTasks {
    tasks: Task[],
    checkItem: (task: Task) => void,
    currentUser: number | null
    moveTask: (taskId: number, direction: string, otherTaskId: number | null) => void
    completedTasksCount: number
}

const List: FC<ListTasks> = ({tasks, checkItem, currentUser, moveTask, completedTasksCount}) => {
    return (
        <div className={classes.wrapper}>
            {
                tasks.length === 0 ? (
                    <Typography variant="body1" className={classes.notice}>
                        {
                            currentUser !== null
                                ? 'У пользователя задач нет'
                                : 'Выберете пользователя'
                        }
                    </Typography>
                ) : (
                    tasks
                        .sort((a, b) => a.order - b.order)
                        .sort((a,b) => Number(a.completed) - Number(b.completed))
                        .map((task: Task, index) => (
                            <ListItem
                                key={`${task.id}-${index}`}
                                task={task}
                                index={index}
                                checkItem={checkItem}
                                moveTask={moveTask}
                                unCompletedTasksCount={tasks.length - completedTasksCount}
                                prevTaskId={index > 0 ? tasks[index - 1].id : null}
                                nextTaskId={index < tasks.length - 1 ? tasks[index + 1].id : null}
                            />
                        ))
                )
            }
        </div>
    );
};

export default List;