import { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { post } from "../api/Post";
import { PostListContext } from "../providers/PostListProvider";
import styled from "styled-components";

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const { userInfo } = useContext(UserContext);
  const { setCurrentPage, triggerRefresh } = useContext(PostListContext);

  const onSendClick = async () => {
	try {
		await post(String(userInfo.id), userInfo.token, msg);
		setMsg(""); // メッセージをクリア
		setCurrentPage(1); // ページを1にリセット
		triggerRefresh(); // リストを更新
	} catch (error) {
		console.error('Failed to send message:', error);
		alert('メッセージの送信に失敗しました');
	}
  };

  return (
    <SSideBar>
      <SSideBarRow>{userInfo.name}</SSideBarRow>
      <SSideBarRow>ID: {userInfo.id}</SSideBarRow>
      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(evt) => setMsg(evt.target.value)}
        ></SSideBarTextArea>
      </SSideBarRow>
      <SSideBarRow>
        <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  );
}

const SSideBar = styled.div`
  padding: 8px;
`

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
`

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
`