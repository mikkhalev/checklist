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
    interface UserResponse {
        id: number,
        username: string
    }

    const [tasks, setTasks] = useState<TaskResponse[]>([])
    const [users, setUsers] = useState<UserResponse[]>([])
    const [currentUser, setCurrentUser] = useState<number | null>(null)

    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json() )
            .then((data: TaskResponse[]) => {
                data.sort((a, b) => Number(a.completed) - Number(b.completed))
                setTasks(data);
                console.log(data);
            })

        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json() )
            .then((data: UserResponse[]) => {
                const users = data.map((user) => ({
                    id: user.id,
                    username: user.username
                }))
                setUsers(users)
                console.log(users);
            })
            .finally(() => setLoadingUsers(false))
    }, [])

    const filteredTasks = useMemo(() => {
        console.log('Повтор фильтрации...')
        return currentUser === null
            ? []
            : tasks.filter(task => task.userId === currentUser).sort((a, b) => Number(a.completed) - Number(b.completed))
    }, [tasks, currentUser]);

    const completed: number = useMemo(() => {
        console.log('Повтор вычислений...')
        return filteredTasks.filter(task => task.completed).length
    }, [filteredTasks]);

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
            <Header
                users={users}
                setCurrentUser={setCurrentUser}
                isLoading={loadingUsers}
            />
            <List
                items={filteredTasks}
                checkItem={checkTask}
                currentUser={currentUser}
            />
            <Footer
                completed={completed}
                all={filteredTasks.length}
            />
        </div>
    );
};

export default Checklist;