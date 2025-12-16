import Layout from "../components/Layout";
import { PostListProvider } from "../providers/PostListProvider";
import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function Main() {
  const { userInfo } = useContext(UserContext);
  const loggedIn = (userInfo.token !== "");

  console.log(loggedIn);
  return (
    <PostListProvider>
    {
      loggedIn ? <Layout /> : <Navigate replace to="/" />
    }
    </PostListProvider>
  )

}