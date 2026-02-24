import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { getUser, updateUser } from "../api/User";

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
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountData | null>(null);
  const [error, setError] = useState("");
  const [profileInput, setProfileInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      if (!userInfo.id || !userInfo.token) {
        return;
      }
      try {
        const data = await getUser(userInfo.id, userInfo.token);
        setAccount(data);
        setProfileInput(data?.profile ?? "");
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.id || !userInfo.token) {
      return;
    }
    setError("");

    const trimmedProfile = profileInput.trim();
    const originalProfile = (account?.profile ?? "").trim();
    const hasProfileChange = trimmedProfile !== originalProfile;

    if (!hasProfileChange) {
      setError("更新内容がありません");
      return;
    }

    try {
      setSaving(true);
      const data = await updateUser(userInfo.id, userInfo.token, trimmedProfile);
      setAccount(data);
      setProfileInput(data?.profile ?? "");
    } catch (err: any) {
      console.error("Failed to update account:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("更新に失敗しました");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <SPage>
      <SHeader>
        <Header />
      </SHeader>
      <SBody>
        <SCard>
          <STitle>My Page</STitle>
          {error ? <SError>{error}</SError> : null}
          <SEditSection>
            <SEditTitle>編集</SEditTitle>
            <SForm onSubmit={handleSave}>
              <SInputRow>
                <SInputLabel htmlFor="profile">プロフィール</SInputLabel>
                <STextArea
                  id="profile"
                  value={profileInput}
                  rows={4}
                  onChange={(e) => setProfileInput(e.target.value)}
                />
              </SInputRow>
              <SActionRow>
                <SSaveButton type="submit" disabled={saving}>
                  {saving ? "保存中..." : "保存"}
                </SSaveButton>
              </SActionRow>
            </SForm>
          </SEditSection>
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

const SEditSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e6e6e6;
`;

const SEditTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SInputRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 12px;
`;

const SInputLabel = styled.label`
  color: #444444;
  font-weight: 600;
`;

const SInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
`;

const STextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  resize: vertical;
`;

const SActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SSaveButton = styled.button`
  background-color: #222222;
  color: #f8f8f8;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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
