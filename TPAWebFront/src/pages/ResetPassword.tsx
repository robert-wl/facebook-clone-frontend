import styles from "../assets/styles/resetPassword/resetPassword.module.scss";
import {useMutation} from "@apollo/client";
import {RESET_PASSWORD} from "../../lib/query/user/resetPassword.graphql.ts";
import {useNavigate, useParams} from "react-router-dom";
import errorHandler from "../../controller/errorHandler.ts";
import createToast from "../../controller/toast/handler.ts";
import {useState} from "react";


export default function ResetPassword(){
    const { forgotID } = useParams()
    const [resetPassword] = useMutation(RESET_PASSWORD);
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handlesubmit = () => {
        if(password != confirmPassword){
            return createToast("Error: Passwords do not match", "red")
        }
        else if(password.length == 0){
            return createToast("Error: Password cannot be empty", "red")
        }
        else if(confirmPassword.length == 0){
            return createToast("Error: Confirm password cannot be empty", "red")
        }

        resetPassword({
            variables: {
                id: forgotID,
                password: password
            }
        }).
        then(() => {
            createToast("Success: password reset successfully", "green")
            return navigate("/login")
        }).
        catch(errorHandler)
    }


    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <h3>
                    Reset Password
                </h3>
                <hr />
                <p>
                    Please enter your new password
                </p>
                <input
                    placeholder="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div>
                    <button
                        onClick={() => handlesubmit()}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    )
}
