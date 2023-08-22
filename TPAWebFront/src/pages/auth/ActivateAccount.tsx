import styles from "../../assets/styles/activateAccount/activateAccount.module.scss";
import { useMutation } from "@apollo/client";
import { ACTIVATE_USER } from "../../../lib/query/user/activateUser.graphql.ts";
import { useNavigate, useParams } from "react-router-dom";
import { debouncedError } from "../../../controller/errorHandler.ts";
import Footer from "../../components/misc/Footer.tsx";
import { toast } from "react-toastify";

export default function ActivateAccount() {
    const [activateAccount] = useMutation(ACTIVATE_USER);
    const { activationID } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        activateAccount({
            variables: {
                id: activationID,
            },
        })
            .then(() => {
                toast.success("Success: account activated successfully");
                navigate("/login");
            })
            .catch(debouncedError);
    };

    return (
        <div className={styles.page}>
            <div className={styles.box}>
                <h3>Activate Your Account</h3>
                <button onClick={() => handleSubmit()}>Activate</button>
            </div>
            <Footer />
        </div>
    );
}
