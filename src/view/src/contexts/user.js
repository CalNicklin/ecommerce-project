import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {

    const [userState, setUserState] = useState({
        user: {},
        loggedIn: false,
        login: (user) => {
            setUserState((prevState) => {
                return {
                    ...prevState,
                    user: user,
                    loggedIn: true
                };
            });
        },
        logout: () => {
            setUserState((prevState) => {
                return {
                    ...prevState,
                    user: {},
                    loggedIn: false
                };
            });
        }
    });

    return (
        <UserContext.Provider value={userState}>{children}</UserContext.Provider>
    )
};

export default UserContext;

