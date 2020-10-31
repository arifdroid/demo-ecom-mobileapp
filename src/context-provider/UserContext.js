import React, {createContext, useState,} from 'react'

export const UserData_Context = createContext();

const UserContext = (props) =>{

    const [refToken_context, setRefToken_context ] =useState("")
    const [currentUser, setCurrentUser ] =useState(null);

    
    return(

        <UserData_Context.Provider value={[refToken_context,setRefToken_context,currentUser,]}>
            {props.children}
        </UserData_Context.Provider>
    )


}

export default UserContext;