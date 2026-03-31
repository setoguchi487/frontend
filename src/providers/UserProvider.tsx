import { useState, createContext, Dispatch, SetStateAction } from "react";
import React from "react";

// 保持する情報の型
export type UserInfo = {
  id: number;
  token: string;
  name: string;
};

export const UserContext = createContext(
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  },
);

export const UserProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: "", name: "" });
  return (
    <>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>
    </>
  );
};