import Post from './Post';
import { useContext, useEffect, useState } from "react";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { getList } from "../api/Post";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";

export default function PostList() {
	//ポストリストコンテキスト、ユーザーコンテキストの使用
	const { postList, setPostList, currentPage, setCurrentPage } = useContext(PostListContext);
	const { userInfo } = useContext(UserContext);

	// ページネーション用のステート
	const [totalPages, setTotalPages] = useState(1);
	const recordsPerPage = 10;

	//ポスト一覧を取得する関数
	const getPostList = async (page: number) => {
		const response = await getList(userInfo.token, page, recordsPerPage);
		console.log(response);

		//getListで取得したポスト配列をコンテキストに保存
		let postList: Array<PostType> = [];
		if (response && response.posts) {
			response.posts.forEach((p: any) => {
				postList.push({
					id: p.id,
					user_name: p.user_name,
					content: p.content,
					created_at: new Date(p.created_at),
				});
			});
			// 総ページ数を計算
			setTotalPages(Math.ceil(response.total / recordsPerPage));
		}
		setPostList(postList);
	};
	
	//コンポーネントがレンダリングされたときにポスト一覧を取得
	useEffect(() => {
		getPostList(currentPage);
	}, [currentPage]);

	// 前のページへ
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// 次のページへ
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// リロード
	const handleReload = () => {
		getPostList(currentPage);
	};

	return (
		<SContainer>
			<SPostList>
				{postList.map((p) => (
					<Post key={p.id} post={p} />
				))}
			</SPostList>
			<SPaginationContainer>
				<SPaginationButton 
					onClick={handlePrevPage} 
					disabled={currentPage === 1}
				>
					前のページ
				</SPaginationButton>
				<SPageInfo>
					{currentPage} / {totalPages}
				</SPageInfo>
				<SPaginationButton 
					onClick={handleNextPage} 
					disabled={currentPage === totalPages}
				>
					次のページ
				</SPaginationButton>
				<SReloadButton onClick={handleReload}>
					🔄 リロード
				</SReloadButton>
			</SPaginationContainer>
		</SContainer>
	);	
}

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SPostList = styled.div`
  margin-top: 16px;
  flex: 1;
  overflow-y: scroll;
`;

const SPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #f5f5f5;
`;

const SPaginationButton = styled.button`
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover:not(:disabled) {
    background-color: #1565c0;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SPageInfo = styled.span`
  font-size: 14px;
  color: #333;
  min-width: 60px;
  text-align: center;
`;

const SReloadButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #45a049;
  }
`;