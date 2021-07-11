import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { api } from "../../api/config";

const InputContainer = styled("div")`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
  width: 100%;
`;

const IconWrapper = styled(FontAwesomeIcon)`
  position: absolute;
  margin-left: 0.5em;
`;

const Input = styled("input")`
  padding-left: 2.5em !important;
  width: 100%;
`;

const LoginScreen = () => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      history.push("/dashboard");
    }
  });
  const onSubmit = (data) => {
    setLoader(true);
    api
      .post("/login", { ...data })
      .then((res) => {
        sessionStorage.setItem("token", res?.data);
        setLoader(false);
        history.push("/dashboard");
      })
      .catch(({ response }) => {
        setMessage(response?.data);
        setLoader(false);
        setHasError(true);
      });
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1> Login </h1>
          <hr />
          <InputContainer>
            <IconWrapper
              icon={loader ? faSpinner : faEnvelope}
              spin={loader ? true : false}
            />
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              disabled={loader}
              {...register("email", { required: true, maxLength: 20 })}
            />
          </InputContainer>

          <InputContainer>
            <IconWrapper
              icon={loader ? faSpinner : faKey}
              spin={loader ? true : false}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              disabled={loader}
              {...register("password", { required: true, maxLength: 20 })}
            />
          </InputContainer>
          <button type="submit" disabled={loader}>
            {loader ? <FontAwesomeIcon icon={faSpinner} spin /> : "Log in"}
          </button>
        </form>
        {!loader && hasError && <span className="error"> {message} </span>}
      </div>
    </div>
  );
};

export default LoginScreen;
