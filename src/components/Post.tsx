import React from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Post(props: any) {
	const { children, post, onDelete, currentUser } = props;
	const navigate = useNavigate();
	
	console.log('Post render:', { 
		id: post.id, 
		id_type: typeof post.id,
		currentUser, 
		post_user_name: post.user_name, 
		match: currentUser === post.user_name 
	});
	
	const getDateStr = (dateObj: Date) => {
		const year = post.created_at.getFullYear();
		const month = post.created_at.getMonth() + 1;
		const date = post.created_at.getDate();
		const hours = post.created_at.getHours();
		const minutes = post.created_at.getMinutes();
		const seconds = post.created_at.getSeconds();
		return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
	};

	const getLines = (src: string):ReactNode => {
		return src.split('\n').map((line, index) => {
			return (
				<React.Fragment key={index}>
					{line}
					<br />
				</React.Fragment>
			)
		});
	}

	const onNameClick = () => {
		if (post.user_id) {
			navigate(`/users/${post.user_id}`);
		}
	};

	return (
		<SPost>
			<SHeader>
				<SHeaderLeft>
					<SNameButton type="button" onClick={onNameClick}>
						{post.user_name}
					</SNameButton>
					<SDate>{getDateStr(post.created_at)}</SDate>
				</SHeaderLeft>
				{currentUser === post.user_name && (
					<SDeleteButton onClick={() => onDelete(post.id)}>
						×
					</SDeleteButton>
				)}
			</SHeader>
			<div>{getLines(post.content)}</div>
		</SPost>
	);
}

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
`

const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const SNameButton = styled.button`
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
  font-size: small;
  color: #000044;
	text-decoration: underline;
`

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`

const SDeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 0;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #d32f2f;
  }
`