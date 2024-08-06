import styles from "@/assets/styles/forgotAccount/forgotAccount.module.scss";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "@/lib/query/user/forgotPassword.graphql.ts";
import { useState } from "react";
import { debouncedError } from "@/utils/error-handler.ts";
import Footer from "@/components/misc/Footer.tsx";
import { toast } from "react-toastify";

export default function ForgotAccount() {
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (email.length === 0) {
      return;
    }

    const result = await forgotPassword({
      variables: {
        email: email,
      },
    }).catch((e) => debouncedError(e));

    if (!result) {
      return;
    }

    toast.success("Success: email sent");
  };

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <h3>Find your Account</h3>
        <hr />
        <p>Please enter your email address to search for your account.</p>
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr />
        <div>
          <Link to="/login">
            <button>Cancel</button>
          </Link>
          <button onClick={() => handleSubmit()}>Search</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
