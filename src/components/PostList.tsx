import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {PostType} from "../store/postsSlice";
import {PostItem} from "./PostItem";

export const PostList: React.FC = () => {
    const posts = useSelector<RootState, PostType[]>(state => state.posts.posts)
    debugger
    return (

        <>
            <ul>
                {
                    posts.map(posts => {
                        return <PostItem key={posts.id} {...posts} />
                    })
                }
            </ul>
        </>
    );
};
