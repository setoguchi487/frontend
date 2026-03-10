import Post from './Post';
import { useContext, useEffect, useState } from "react";
import { PostListContext, PostType } from "../providers/PostListProvider";
import { getList, deletePost, searchPosts } from "../api/Post";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";

export default function PostList() {
	//ポストリストコンテキスト、ユーザーコンテキストの使用
	const { postList, setPostList, currentPage, setCurrentPage, refreshTrigger } = useContext(PostListContext);
	const { userInfo } = useContext(UserContext);

	// ページネーション用のステート
	const [totalPages, setTotalPages] = useState(1);
	const recordsPerPage = 10;
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	//ポスト一覧を取得する関数
	const getPostList = async (page: number) => {
		const response = await getList(userInfo.token, page, recordsPerPage);

		//getListで取得したポスト配列をコンテキストに保存
		let postList: Array<PostType> = [];
		if (response && response.posts) {
			response.posts.forEach((p: any) => {
				postList.push({
					id: p.id,
					user_id: p.user_id,
					user_name: p.user_name,
					content: p.content,
					created_at: new Date(p.created_at),
				});
			});
			if (postList.length > recordsPerPage) {
				const startIndex = (page - 1) * recordsPerPage;
				postList = postList.slice(startIndex, startIndex + recordsPerPage);
			}
			postList.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
			// 総ページ数を計算
			setTotalPages(Math.ceil(response.total / recordsPerPage));
		}
		setPostList(postList);
	};
	
	//コンポーネントがレンダリングされたときにポスト一覧を取得
	useEffect(() => {
		if (userInfo.token) {
			getPostList(currentPage);
		}
	}, [currentPage, userInfo.token, refreshTrigger]);

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

	// 削除
	const handleDelete = async (postId: number) => {
		if (window.confirm('このメッセージを削除しますか？')) {
			try {
				await deletePost(postId, userInfo.token);
				await getPostList(currentPage);
			} catch (error: any) {
				if (error.response) {
					alert(`削除に失敗しました: ${error.response.data.message || error.response.statusText}`);
				} else {
					alert('削除に失敗しました');
				}
			}
		}
	};

	// 検索実行
	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim() === "") {
			setIsSearching(false);
			setCurrentPage(1);
			return;
		}

		setIsSearching(true);
		setCurrentPage(1);
		
		try {
			const response = await searchPosts(searchQuery, userInfo.token, 1, recordsPerPage);

			let postList: Array<PostType> = [];
			if (response && response.posts) {
				response.posts.forEach((p: any) => {
					postList.push({
						id: p.id,
						user_id: p.user_id,
						user_name: p.user_name,
						content: p.content,
						created_at: new Date(p.created_at),
					});
				});
				postList.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
				setTotalPages(Math.ceil(response.total / recordsPerPage));
			}
			setPostList(postList);
		} catch (error: any) {
			alert('検索に失敗しました');
		}
	};

	// 検索クリア
	const handleClearSearch = async () => {
		setSearchQuery("");
		setIsSearching(false);
		setCurrentPage(1);
		await getPostList(1);
	};

	return (
		<SContainer>
			<SSearchContainer>
				<SSearchForm onSubmit={handleSearch}>
					<SSearchInput
						type="text"
						placeholder="メッセージを検索..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<SSearchButton type="submit">検索</SSearchButton>
					{isSearching && (
						<SClearSearchButton type="button" onClick={handleClearSearch}>
							✕ クリア
						</SClearSearchButton>
					)}
				</SSearchForm>
				{isSearching && (
					<SSearchStatus>
						検索結果: {postList.length} 件
					</SSearchStatus>
				)}
			</SSearchContainer>
			<SPostList>
				{postList.map((p) => (
					<Post key={p.id} post={p} onDelete={handleDelete} currentUser={userInfo.name} />
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
					リロード
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

const SSearchContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
`;

const SSearchForm = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SSearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }
`;

const SSearchButton = styled.button`
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  &:hover {
    background-color: #1565c0;
  }
`;

const SClearSearchButton = styled.button`
  padding: 8px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  
  &:hover {
    background-color: #da190b;
  }
`;

const SSearchStatus = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
`;

const SPostList = styled.div`
  margin-top: 8px;
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