import React from 'react'
import Start_Modules from '../routes/Start_Modules';
import UserContext from './UserContext';


const IndexContext = () => {

    

    

    return (
        <>  
            <UserContext>
                <Start_Modules/>           
            </UserContext>
        </>
    )

}

export default IndexContext;