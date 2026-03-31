import React from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostType } from '../providers/PostListProvider';

type PostProps = {
	post: PostType;
	onDelete: (postId: number) => void;
	currentUserId: number;
};

export default function Post({ post, onDelete, currentUserId }: PostProps) {
	const navigate = useNavigate();
	
	const getDateStr = (dateObj: Date) => {
		const year = dateObj.getFullYear();
		const month = dateObj.getMonth() + 1;
		const date = dateObj.getDate();
		const hours = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		const seconds = dateObj.getSeconds();
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
				{currentUserId === post.user_id && (
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