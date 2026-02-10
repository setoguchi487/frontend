import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import {getUser} from "../api/User";
import styled from "styled-components";

export default function Header() {
	const navigate = useNavigate();
	const [ userName, setuserName ] = useState("");
	const {userInfo, setUserInfo} = useContext(UserContext);
	const onAccountClick = () => {
		navigate("/account");
	};
	const logout = () => {
		setUserInfo({id:0, token:"", name:""});
		navigate("/");
		
	}

	useEffect(() => {
			const myGetUser = async () => {
				if (!userInfo.id || !userInfo.token) {
					setuserName("");
					return;
				}
				try {
					const user = await getUser(userInfo.id, userInfo.token);
					setuserName(user.name ?? userInfo.name);
				} catch (error) {
					console.error("Failed to load user info:", error);
					setuserName(userInfo.name);
				}
			};
			myGetUser();
		}, [userInfo.id, userInfo.token, userInfo.name]);
		
	return (
		<SHeader>
			<SLogo>MicroPost</SLogo>
			<SRightItem>
				<SName>{userName}</SName>
				<SAccount onClick={onAccountClick}>My Page</SAccount>
				<SLogout onClick={logout}>ログアウト</SLogout>
			</SRightItem>
		</SHeader>
	);
}

const SHeader = styled.div`
  background-color: #222222;
  display: flex;
  flex-direction: row;
  color: #F8F8F8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`
const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justyify-content: start;
`

const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

const SName = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
`

const SLogout = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`

const SAccount = styled.div`
	padding-top: 8px;
	padding-bottom: 8px;
	text-align: center;
	margin-right: 12px;
	cursor: pointer;
`