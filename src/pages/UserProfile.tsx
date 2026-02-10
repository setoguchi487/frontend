import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";

type ProfileData = {
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

export default function UserProfile() {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedIn = userInfo.token !== "";
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!id || !userInfo.token) {
        return;
      }
      try {
        const userId = Number(id);
        if (!Number.isFinite(userId)) {
          setError("ユーザIDが不正です");
          return;
        }
        const data = await getUser(userId, userInfo.token);
        setProfile(data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
        setError("ユーザ情報の取得に失敗しました");
      }
    };
    loadProfile();
  }, [id, userInfo.token]);

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
          <STitle>ユーザ情報</STitle>
          {error ? <SError>{error}</SError> : null}
          <SRow>
            <SLabel>ユーザ名</SLabel>
            <SValue>{profile?.name ?? "-"}</SValue>
          </SRow>
          <SRow>
            <SLabel>メールアドレス</SLabel>
            <SValue>{profile?.email ?? "-"}</SValue>
          </SRow>
          <SRow>
            <SLabel>誕生日</SLabel>
            <SValue>{formatDate(profile?.birthday ?? null)}</SValue>
          </SRow>
          <SRow>
            <SLabel>プロフィール</SLabel>
            <SValue>{profile?.profile ?? "-"}</SValue>
          </SRow>
          <SRow>
            <SLabel>作成日</SLabel>
            <SValue>{formatDate(profile?.created_at ?? null)}</SValue>
          </SRow>
          <SButtonRow>
            <SBackButton type="button" onClick={() => navigate("/main")}>
              メッセージ一覧に戻る
            </SBackButton>
          </SButtonRow>
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

const SButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const SBackButton = styled.button`
  background-color: #222222;
  color: #f8f8f8;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
`;
