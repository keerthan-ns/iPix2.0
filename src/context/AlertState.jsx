import { useState } from 'react'
import PropTypes from "prop-types"

import AlertContext from './alertContext'

const AlertState = (props) => {
    const [alert, setAlert] = useState(null)
    const showAlert = (success,message) =>{
        setAlert({
            success: success,
            message: message,
        })
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }
    return (
        <AlertContext.Provider value={{alert,showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState

AlertState.propTypes = {
    children: PropTypes.node.isRequired,
}