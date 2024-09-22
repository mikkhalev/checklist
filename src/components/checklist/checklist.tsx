import React, {useEffect, useMemo, useState} from 'react';
import * as classes from "./checklist.module.scss"
import {Typography} from "@mui/material";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import List from "./list/List";

const Checklist = () => {

    interface TaskResponse {
        userId: number,
        id: number,
        title: string,
        completed: boolean
    }

    const [tasks, setTasks] = useState<TaskResponse[]>([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json() )
            .then((data: TaskResponse[]) => {
                data.sort((a, b) => Number(a.completed) - Number(b.completed))
                setTasks(data);
                console.log(data);
            })
    }, [])

    const completed: number = useMemo(() => {
        console.log('Повтор вычислений...')
        return tasks.filter(task => task.completed).length
    }, [tasks]);

    function checkTask(id: number) {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    return (
        <div className={`wrapper ${classes.wrapper}`}>
            <Header>
                <Typography variant="h5">
                    My checklist
                </Typography>
            </Header>
            <List items={tasks} checkItem={checkTask}/>
            <Footer
                completed={completed}
                all={tasks.length}
            />
        </div>
    );
};

export default Checklist;