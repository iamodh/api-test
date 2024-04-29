import { Link } from "react-router-dom";
import supabase from "../libs/getSupabase";
import { useState, useEffect } from "react";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

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
    ``;
    const session = authInfo.data.session;
    if (session) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLoggedUser(user);
    }
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
            <div>
              <img src={loggedUser.user_metadata.avatar_url} alt="avatar" />
              <p>user name : {loggedUser.user_metadata.full_name}</p>
              <p>user email : {loggedUser.user_metadata.email}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
