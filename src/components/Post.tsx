import React from 'react';
import {ReactNode } from 'react';
import styled from 'styled-components';

export default function Post(props: any) {
	const { children, post, onDelete, currentUser } = props;
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

	return (
		<SPost>
			<SHeader>
				<SHeaderLeft>
					<SName>{post.user_name}</SName>
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

const SName = styled.span`
  font-size: small;
  color: #000044;
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