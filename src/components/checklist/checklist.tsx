import React, {useEffect, useMemo, useState} from 'react';
import * as classes from "./checklist.module.scss"
import {Typography} from "@mui/material";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import List from "./list/List";

const Checklist = () => {

    interface Task {
        userId: number,
        id: number,
        title: string,
        completed: boolean,
        order: number
    }
    interface UserResponse {
        id: number,
        username: string
    }

    const [allTasks, setAllTasks] = useState<Task[]>([])

    const [users, setUsers] = useState<UserResponse[]>([])
    const [currentUser, setCurrentUser] = useState<number | null>(null)

    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data: Task[]) => {
                const tasksWithOrder = data.map((task, index) => ({
                    ...task,
                    order: index + 1,
                }));
                console.log(tasksWithOrder)
                setAllTasks(tasksWithOrder)
            })
            .catch((error) => console.error('Error fetching tasks:', error));

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

    let filteredTasks = useMemo(() => {
        console.log(allTasks)
        return currentUser == null
            ? []
            : allTasks.filter((task) => task.userId == currentUser)
    }, [currentUser, allTasks])

    let completedCount = useMemo(() => {
        return filteredTasks.filter((task) => task.completed).length
    }, [filteredTasks])

    function checkTask(currentTask: Task) {
        console.log('Изменяем таску...')
        const updatedTasks = allTasks.map((task) =>
            task.id === currentTask.id
                ? {...task, completed: !task.completed}
                : task
        )
        setAllTasks(updatedTasks)
    }

    function moveTask(taskId: number, direction: string, otherTaskId: number | null) {
        console.log("Перемещаем таску...");
        const currentTaskIndex = allTasks.findIndex(task => task.id === taskId);
        const otherTaskIndex = allTasks.findIndex(task => task.id === otherTaskId);

        if (currentTaskIndex === -1 || otherTaskIndex === -1) {
            console.error("One of the tasks is not found");
            return;
        }

        const updatedTasks = [...allTasks];

        const tempOrder = updatedTasks[currentTaskIndex].order;
        updatedTasks[currentTaskIndex].order = updatedTasks[otherTaskIndex].order;
        updatedTasks[otherTaskIndex].order = tempOrder;

        setAllTasks(updatedTasks);
    }

    return (
        <div className={`wrapper ${classes.wrapper}`}>
            <Header
                users={users}
                setCurrentUser={setCurrentUser}
                isLoading={loadingUsers}
            />
            <List
                tasks={filteredTasks}
                checkItem={checkTask}
                moveTask={moveTask}
                currentUser={currentUser}
                completedTasksCount={completedCount}
            />
            <Footer
                completedTasksCount={completedCount}
                allTasksCount={filteredTasks.length}
            />
        </div>
    );
};

export default Checklist;