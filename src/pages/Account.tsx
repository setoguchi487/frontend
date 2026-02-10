import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";

type AccountData = {
  id: number;
  name: string;
  email: string;
  birthday?: string | null;
  profile?: string | null;
  created_at?: string;
  updated_at?: string;
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return date.toLocaleDateString("ja-JP");
};

export default function Account() {
  const { userInfo } = useContext(UserContext);
  const loggedIn = userInfo.token !== "";
  const [account, setAccount] = useState<AccountData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      if (!userInfo.id || !userInfo.token) {
        return;
      }
      try {
        const data = await getUser(userInfo.id, userInfo.token);
        setAccount(data);
      } catch (err) {
        console.error("Failed to load account:", err);
        setError("ユーザ情報の取得に失敗しました");
      }
    };
    loadAccount();
  }, [userInfo.id, userInfo.token]);

  if (!loggedIn) {
    return <Navigate replace to="/" />;
  }

  return (
    <SPage>
      <SHeader>
        <Header />
      </SHeader>
      <SBody>
        <SCard>
          <STitle>マイアカウント</STitle>
          {error ? <SError>{error}</SError> : null}
          <SRow>
            <SLabel>ユーザ名</SLabel>
            <SValue>{account?.name ?? userInfo.name}</SValue>
          </SRow>
          <SRow>
            <SLabel>メールアドレス</SLabel>
            <SValue>{account?.email ?? "-"}</SValue>
          </SRow>
          <SRow>
            <SLabel>誕生日</SLabel>
            <SValue>{formatDate(account?.birthday ?? null)}</SValue>
          </SRow>
          <SRow>
            <SLabel>プロフィール</SLabel>
            <SValue>{account?.profile ?? "-"}</SValue>
          </SRow>
          <SRow>
            <SLabel>作成日</SLabel>
            <SValue>{formatDate(account?.created_at ?? null)}</SValue>
          </SRow>
        </SCard>
      </SBody>
    </SPage>
  );
}

const SPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f6f6f4;
`;

const SHeader = styled.div`
  width: 100%;
  height: 32px;
  box-shadow: 0px 4px 4px #aaaaaa;
`;

const SBody = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`;

const SCard = styled.div`
  width: min(720px, 90vw);
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
`;

const STitle = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 700;
`;

const SRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  padding: 8px 0;
  border-bottom: 1px solid #e6e6e6;
`;

const SLabel = styled.div`
  color: #444444;
  font-weight: 600;
`;

const SValue = styled.div`
  color: #222222;
  white-space: pre-wrap;
`;

const SError = styled.div`
  color: #a30000;
  margin-bottom: 12px;
`;
