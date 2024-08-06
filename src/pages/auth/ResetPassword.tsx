import styles from "@/assets/styles/resetPassword/resetPassword.module.scss";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/lib/query/user/resetPassword.graphql.ts";
import { useNavigate, useParams } from "react-router-dom";
import { debouncedError } from "@/utils/error-handler.ts";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { forgotID } = useParams();
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlesubmit = () => {
    if (password != confirmPassword) {
      return toast.error("Error: Passwords do not match");
    }
    if (password.length == 0) {
      return toast.error("Error: Password cannot be empty");
    }
    if (confirmPassword.length == 0) {
      return toast.error("Error: Confirm password cannot be empty");
    }

    resetPassword({
      variables: {
        id: forgotID,
        password: password,
      },
    })
      .then(() => {
        toast.success("Success: password reset successfully");
        return navigate("/login");
      })
      .catch(debouncedError);
  };

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h3>Reset Password</h3>
        <hr />
        <p>Please enter your new password</p>
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
          <button onClick={() => handlesubmit()}>Reset Password</button>
        </div>
      </div>
    </div>
  );
}
