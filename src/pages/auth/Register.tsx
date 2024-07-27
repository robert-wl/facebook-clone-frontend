import styles from "@/assets/styles/register/register.module.scss";
import {useState} from "react";
import {NewUser} from "@/../gql/graphql.ts";
import {useMutation} from "@apollo/client";
import {REGISTER_USER} from "@/lib/query/user/createUser.graphql.ts";
import {Link, useNavigate} from "react-router-dom";
import {debouncedError} from "@/controller/errorHandler.ts";
import Footer from "@/components/misc/Footer.tsx";
import {toast} from "react-toastify";

export default function Register() {
  const [user, setUser] = useState<NewUser>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

  const handleSubmit = () => {
    let error = "Unknown error";
    if (user.firstName.length == 0) {
      error = "Error: First name cannot be empty";
    } else if (user.username.length < 5) {
      error = "Error: Username must be at least 5 characters long";
    } else if (user.email.length == 0) {
      error = "Error: Email cannot be empty";
    } else if (!user.email.includes("@")) {
      error = "Error: Email must contain @";
    } else if (user.password != confirmPassword) {
      error = "Error: Passwords do not match";
    } else if (user.dob.length == 0) {
      error = "Error: Date of birth cannot be empty";
    } else if (user.gender.length == 0) {
      error = "Error: Gender cannot be empty";
    } else if (user.dob > new Date().toISOString()) {
      error = "Error: invalid date";
    } else {
      return registerUser({
        variables: {
          user: user,
        },
      })
        .then(() => {
          toast.success("Success: account created successfully");
          return navigate("/login");
        })
        .catch(debouncedError);
    }

    toast.error(error);
  };

  return (
    <div className={styles.page}>
      <h5>FaREbook</h5>
      <div className={styles.registerBox}>
        <h2>Create a new account</h2>
        <div className={styles.inputBox}>
          <div className={styles.inputName}>
            <input
              placeholder={"First Name"}
              value={user.firstName}
              onChange={(e) => setUser({...user, firstName: e.target.value})}
            />
            <input
              placeholder={"Last Name"}
              value={user.lastName}
              onChange={(e) => setUser({...user, lastName: e.target.value})}
            />
          </div>
          <input
            value={user.username}
            placeholder={"Username"}
            onChange={(e) => setUser({...user, username: e.target.value})}
          />
          <input
            value={user.email}
            placeholder={"Email address"}
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
          <input
            type="password"
            value={user.password}
            placeholder={"Password"}
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder={"Confirm password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Date of birth</label>
          <input
            type="date"
            onChange={(e) => setUser({...user, dob: new Date(e.target.value).toISOString()})}
          />
          <label>Gender</label>
          <div className={styles.genderBox}>
            <label>
              <p>Female</p>
              <input
                type="radio"
                checked={user.gender == "female"}
                onChange={() => setUser({...user, gender: "female"})}
              />
            </label>
            <label>
              <p>Male</p>
              <input
                type="radio"
                checked={user.gender == "male"}
                onChange={() => setUser({...user, gender: "male"})}
              />
            </label>
            <label>
              <p>Other</p>
              <input
                type="radio"
                checked={user.gender == "other"}
                onChange={() => setUser({...user, gender: "other"})}
              />
            </label>
          </div>
          <hr/>
          <button onClick={() => handleSubmit()}>Register</button>
          <p>
            <Link to={"/login"}>Already have an account?</Link>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
