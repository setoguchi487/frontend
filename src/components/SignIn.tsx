import {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {UserContext} from '../providers/UserProvider';
import {sign_in} from '../api/Auth';
import {setAuthToken} from '../api/axiosInstance';
import styled from 'styled-components';

export default function SignIn() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [pass, setPass] = useState('');
  const {setUserInfo} = useContext(UserContext);

  const onSignInClick = async () => {
    try {
      const ret = await sign_in(userId, pass);
      
      if (ret && ret.token) {
        setAuthToken(ret.token);
        setUserInfo({
          id: ret.user_id,
          token: ret.token,
          name: ret.name,
        });
        navigate('/main');
      } else {
        alert('ログインに失敗しました');
      }
    } catch (error: any) {
      if (error.message) {
        alert(`ログインエラー: ${error.message}`);
      } else if (error.response) {
        alert(`サーバーエラー: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        alert('ネットワークエラー: サーバーに接続できません。バックエンドのURLを確認してください。');
      } else {
        alert(`エラー: ${error}`);
      }
    }
  };

  return(
    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">
            ID
          </label>
        </SSignInLabel>
        <SSignInInput>
          <input 
            id ="id" 
            value={userId} 
            type="text" 
            onChange={(evt)=>setUserId(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">
            Password
          </label>
        </SSignInLabel>
        <SSignInInput>
          <input 
            id ="password"
            value={pass}
            type="password"
            onChange={(evt)=>setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>
      <SSignInRowCenter>
        <SLoginButton type="button" onClick={onSignInClick}>
          Login
        </SLoginButton>
      </SSignInRowCenter>
      <SSignInRowCenter>
        <SInlineText>
          アカウントをお持ちでない方は <Link to="/register">こちら</Link>
        </SInlineText>
      </SSignInRowCenter>
    </SSignInFrame>
  );
}

const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
  width: 100%;
`;

const SSignInRowCenter = styled(SSignInRow)`
  justify-content: center;
`;

const SSignInLabel = styled.span`
  display: inline-block;
  width: 30%;
  text-align: right;
  margin-right: 8px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  flex: 1;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;

const SInlineText = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
`;