import styles from "@/assets/styles/login/login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { AUTHENTICATE_USER } from "@/lib/query/user/authenticateUser.graphql.ts";
import { FormEvent, useState } from "react";
import { debouncedError } from "@/utils/error-handler.ts";
import Footer from "@/components/misc/Footer.tsx";
import { toast } from "react-toastify";
import useAuth from "@/hooks/use-auth.ts";
import { GET_RANDOM_USERS } from "@/lib/query/user/getRandomUsers.graphql.ts";

export default function Login() {
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const { data } = useQuery(GET_RANDOM_USERS, {
    variables: {
      amount: 3,
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmitExample = async (email: string) => {
    const result = await authenticateUser({
      variables: {
        email: email,
        password: "password",
      },
    }).catch(debouncedError);

    if (!result) {
      return;
    }

    setToken!(result.data.authenticateUser);
    await getUser!();
    return navigate("/");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email.length == 0) {
      return toast.error("Error: Email cannot be empty");
    }
    if (password.length == 0) {
      return toast.error("Error: Password cannot be empty");
    }

    const result = await authenticateUser({
      variables: {
        email: email,
        password: password,
      },
    }).catch(debouncedError);

    if (!result) {
      return;
    }

    setToken!(result.data.authenticateUser);
    await getUser!();
    return navigate("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.users}>
        <h3> Example User: </h3>
        {data?.getRandomUsers.map((user: any) => (
          <div key={user.id}>
            <div>
              <p>{user.email}</p>
            </div>
            <button onClick={() => handleSubmitExample(user.email)}>
              <div>Log in</div>
            </button>
          </div>
        ))}
      </div>
      <h5>FaREbook</h5>
      <div className={styles.loginBox}>
        <p>Log in to Facebook</p>
        <form
          autoComplete="on"
          className={styles.inputBox}>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.email}
            placeholder={"Email address"}
            autoComplete={"on"}
          />
          <input
            name="password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.password}
            placeholder={"Password"}
            autoComplete={"on"}
          />
          <button onClick={(e) => handleSubmit(e)}>
            <h3>Log in</h3>
          </button>
          <p>
            <Link to={"/forgot"}>Forgot Account</Link>
          </p>
          <hr />
          <button className={styles.newAccount}>
            <Link to={"/register"}>Create new account</Link>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
