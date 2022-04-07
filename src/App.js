import AppRoutes from "./routes"
import Header from "./components/Header"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { checkAuth } from "./store/auth/asyncThunks"
import { Alert, Collapse, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { getBasket } from "./store/shop/asyncThunks"

function App() {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const user = useSelector(state => state.auth.user);
    const [isAlertActive, setIsAlertActive] = useState(!!errorMessage);

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('token')) {
                await dispatch(checkAuth());
                const data = {
                    userId: user.id
                }
                await dispatch(getBasket(data))
            }
        })()

    }, [])

    useEffect(() => {
        if (errorMessage) {
            setIsAlertActive(true);
        }
        if (!errorMessage) {
            setIsAlertActive(false);
        }
    }, [errorMessage])

    return (
    <div className="App">
        <Header/>
        <AppRoutes
            user={user}
        />
        <Collapse in={isAlertActive}>
            <Alert
                severity="error"
                style={{position: "absolute", bottom: "30px", left: "30px", width: "300px"}}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setIsAlertActive(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {errorMessage}
            </Alert>
        </Collapse>
    </div>
    );
}

export default App;
