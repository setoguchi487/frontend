import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { sign_up } from '../api/Auth';
import { UserContext } from '../providers/UserProvider';

export default function SignUp() {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleError = (error: any) => {
    console.error('Signup error:', error);
    
    // ステータスコードが409（Conflict）の場合は重複エラー
    if (error?.response?.status === 409) {
      const message = error?.response?.data?.message || '既に登録済みのユーザー名またはメールアドレスです';
      alert(`登録エラー: ${message}`);
      return;
    }
    
    if (error?.response?.data?.message) {
      const message = Array.isArray(error.response.data.message)
        ? error.response.data.message.join('\n')
        : error.response.data.message;
      alert(`登録エラー: ${message}`);
      return;
    }
    if (error?.message) {
      alert(`登録エラー: ${error.message}`);
      return;
    }
    alert('登録に失敗しました。サーバーの状態を確認してください。');
  };

  const onSignUpClick = async () => {
    if (!name || !email || !password || !passwordConfirm) {
      alert('全ての項目を入力してください');
      return;
    }
    if (password !== passwordConfirm) {
      alert('パスワードが一致しません');
      return;
    }

    try {
      setSubmitting(true);
      const ret = await sign_up(name, email, password);
      if (ret && ret.token) {
        setUserInfo({ id: ret.user_id, token: ret.token, name: ret.name });
        navigate('/main');
      } else {
        alert('登録に失敗しました: トークンが取得できませんでした');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SSignUpFrame>
      <SSignUpRow>
        <SSignUpLabel>
          <label htmlFor="name">名前 / ユーザ名</label>
        </SSignUpLabel>
        <SSignUpInput>
          <input
            id="name"
            value={name}
            type="text"
            onChange={(evt) => setName(evt.target.value)}
          />
        </SSignUpInput>
      </SSignUpRow>
      <SSignUpRow>
        <SSignUpLabel>
          <label htmlFor="email">メール</label>
        </SSignUpLabel>
        <SSignUpInput>
          <input
            id="email"
            value={email}
            type="email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </SSignUpInput>
      </SSignUpRow>
      <SSignUpRow>
        <SSignUpLabel>
          <label htmlFor="password">パスワード</label>
        </SSignUpLabel>
        <SSignUpInput>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </SSignUpInput>
      </SSignUpRow>
      <SSignUpRow>
        <SSignUpLabel>
          <label htmlFor="passwordConfirm">パスワード（確認）</label>
        </SSignUpLabel>
        <SSignUpInput>
          <input
            id="passwordConfirm"
            value={passwordConfirm}
            type="password"
            onChange={(evt) => setPasswordConfirm(evt.target.value)}
          />
        </SSignUpInput>
      </SSignUpRow>
      <SSignUpRow>
        <SPrimaryButton type="button" disabled={submitting} onClick={onSignUpClick}>
          {submitting ? '登録中...' : '登録する'}
        </SPrimaryButton>
      </SSignUpRow>
      <SSignUpRow>
        <SInlineText>
          すでにアカウントをお持ちですか？ <Link to="/">ログインはこちら</Link>
        </SInlineText>
      </SSignUpRow>
    </SSignUpFrame>
  );
}

const SSignUpFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignUpRow = styled.div`
  display: inline-block;
  margin-top: 6px;
  margin-bottom: 6px;
  width: 100%;
`;

const SSignUpLabel = styled.span`
  display: inline-block;
  width: 30%;
  vertical-align: top;
  text-align: right;
  margin-right: 8px;
`;

const SSignUpInput = styled.span`
  display: inline-block;
  width: 60%;
  vertical-align: top;
  margin-left: 4px;
`;

const SPrimaryButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 6px 16px;
  border-radius: 8px;
  border: none;
`;

const SInlineText = styled.span`
  display: inline-block;
  margin-top: 8px;
`;
