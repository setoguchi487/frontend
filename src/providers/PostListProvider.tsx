import React from "react";
import { useState, createContext, Dispatch, SetStateAction } from "react";



// ポストを保持する型を定義

export type PostType = {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  created_at: Date;
};

export const PostListContext = createContext(
  {} as {
    postList: PostType[]; // ポストの配列を保持
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    currentPage: number; // 現在のページ番号
    setCurrentPage: Dispatch<SetStateAction<number>>;
    refreshTrigger: number; // リフレッシュ用トリガー
    triggerRefresh: () => void;
  },
);

export const PostListProvider = (props: any) => {
  const { children } = props;
  const [postList, setPostList] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <PostListContext.Provider value={{ postList, setPostList, currentPage, setCurrentPage, refreshTrigger, triggerRefresh }}>
      {children}
    </PostListContext.Provider>
  );
};