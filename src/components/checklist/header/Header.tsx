import React, {FC, ReactNode} from 'react';
import * as classes from './header.module.scss'
import {CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";


interface User {
    id: number,
    username: string
}
interface HeaderProps {
    users: User[],
    setCurrentUser: (id: number) => void,
    isLoading: boolean
}

const Header: FC<HeaderProps> = ({users, setCurrentUser, isLoading}) => {
    return (
        <div className={classes.header}>
            <Typography variant="h5">
                Checklist
            </Typography>
            <FormControl className={classes.users}>
                <FormLabel id="demo-row-radio-buttons-group-label">User</FormLabel>
                <RadioGroup
                    row
                >
                    {
                        isLoading ? (
                            <CircularProgress className={classes.loader}/>
                            ) : (
                            users.map((user) => (
                                <FormControlLabel
                                    value={user.username}
                                    control={<Radio />}
                                    label={user.username}
                                    onClick={() => setCurrentUser(user.id)}
                                    key={user.id}
                                />
                            ))
                        )

                    }
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default Header;