import styles from '../../src/assets/styles/page.module.scss';
import {useQuery} from "@apollo/client";
import {useNavigate, useParams} from "react-router-dom";
import {CHECK_RESET_LINK} from "../../lib/query/user/checkResetLink.graphql";


export default function ResetPasswordProtector({ children } : { children: JSX.Element }){
    const { forgotID } = useParams()
    const {data, loading} = useQuery(CHECK_RESET_LINK, {
        variables: {
            id: forgotID
        }
    });
    const navigate = useNavigate()

    if(loading){
        return (
            <div className={styles.page} />
        )
    }


    return (
        <>
            {
                data && data.checkResetLink ?
                children :
                navigate('/login')

            }
        </>
    )
}
