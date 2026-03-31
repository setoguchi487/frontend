import { useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import SideBar from './SideBar';
import Contents from './Body';
import { UserContext } from '../providers/UserProvider';


export default function Layout() {
	const { userInfo } = useContext(UserContext);

	return (
		<>
			<SHeader>
				<Header></Header>
			</SHeader>
			<SBody>
				<SSideBar>
					<SideBar></SideBar>
				</SSideBar>
				<SContents>
					<Contents></Contents>
				</SContents>
			</SBody>
		</>
	);
}

const SHeader = styled.div`
  width: 100%;
  height: 32px;
  box-shadow: 0px 4px 4px #AAAAAA;
`;

const SBody = styled.div`
  width: 100%;
  height: calc(100vh - 32px);
  display: flex;
  flex-direction: row;
`;

const SSideBar = styled.div`
  border-right: 1px solid #222222;
  width: 30%;
  height: 100%;
`;

const SContents = styled.div`
  width: 100%;
  height: 100%;
`;