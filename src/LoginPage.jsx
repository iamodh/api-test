import { Link } from "react-router-dom";
import supabase from "../libs/getSupabase";
import { useState, useEffect } from "react";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [userName, setUserName] = useState("");

  async function userLogin() {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) console.log(error);
  }

  async function userSignUp() {
    let { data, error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      user_metadata: {
        user_name: userName,
        avatar_url:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
    });
    if (error) console.log(error);
    console.log(data);
  }

  async function googleLogin() {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/login",
      },
    });
    if (error) console.log(error);
  }
  async function kakaoLogin() {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:5173/login",
      },
    });
    if (error) console.log(error);
  }

  async function checkLogin() {
    const authInfo = await supabase.auth.getSession();
    const session = authInfo.data.session;
    if (session) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setLoggedUser(user);
    }
    if (authInfo.error) console.log(authInfo.error);
    console.log(loggedUser);
    setIsLoggedIn(!!session);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    checkLogin();
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <>
      <div className="login-box">
        {!isLoggedIn && (
          <>
            <form className="userLoginBox" onSubmit={(e) => e.preventDefault()}>
              <input
                className="loginEmail"
                type="text"
                placeholder="email"
                name="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              ></input>
              <input
                className="loginPassword"
                type="password"
                placeholder="password"
                name="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              ></input>
              <button className="loginBtn" onClick={userLogin}>
                로그인
              </button>
            </form>
            <form className="signUpBox" onSubmit={(e) => e.preventDefault()}>
              <input
                className="signUpEmail"
                type="text"
                placeholder="email"
                name="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              ></input>
              <input
                className="signUpPassword"
                type="password"
                placeholder="password"
                name="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              ></input>
              <input
                className="userName"
                type="text"
                placeholder="이름"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
              <button className="signUpBtn" onClick={userSignUp}>
                회원가입
              </button>
            </form>
            <button className="google" onClick={googleLogin}>
              구글 로그인
            </button>
            <button className="kakao" onClick={kakaoLogin}>
              카카오 로그인
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button className="logOut" onClick={signOut}>
              로그아웃
            </button>
            <p>{loggedUser.email}</p>
            <p>{loggedUser.user_metadata.user_name}</p>
            <img src={loggedUser.user_metadata.avatar_url} alt="" />
          </>
        )}
      </div>
    </>
  );
}
