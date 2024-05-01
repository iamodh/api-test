import { Link } from "react-router-dom";
import supabase from "../libs/getSupabase";
import { useState, useEffect } from "react";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loggedUserProfile, setLoggedUserProfile] = useState(null);
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
    if (loggedUser) {
      let { data: user_profile, error } = await supabase
        .from("user_profile")
        .select("user_id");
      setLoggedUserProfile(user_profile[0]);
    }
    if (authInfo.error) console.log(authInfo.error);
    console.log(loggedUser, loggedUserProfile);
    setIsLoggedIn(!!session);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    checkLogin();
  }

  async function updateUserProfile() {
    const { data, error } = await supabase.from("user_profile").insert([
      {
        user_name: userName,
        avatar_url:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        user_id: loggedUser.id,
      },
    ]);
    console.log(loggedUser.id);
    if (error) console.log(userName, error);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loggedUser) {
      console.log("Logged user:", loggedUser);
      // 유저 프로파일 가져오는 로직을 여기에 넣기
      async function fetchUserProfile() {
        const { data: userProfile, error } = await supabase
          .from("user_profile")
          .select("*")
          .eq("user_id", loggedUser.id);
        if (error) {
          console.log("Error fetching user profile:", error);
        } else {
          setLoggedUserProfile(userProfile[0]);
          console.log("User profile:", userProfile[0]);
        }
        console.log(loggedUserProfile);
      }

      fetchUserProfile();
    }
  }, [loggedUser]);

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
            <form className="updateBox" onSubmit={(e) => e.preventDefault()}>
              <input
                className="userName"
                type="text"
                placeholder="이름"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
              <button className="updateBtn" onClick={updateUserProfile}>
                업데이트
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
