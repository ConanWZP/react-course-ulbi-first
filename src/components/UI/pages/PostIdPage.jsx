import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PostService from "../../../API/PostService.ts";
import {useFetching} from "../../../hooks/useFetching.ts";
import Loader from "../Loader/Loader";


const PostIdPage = (props) => {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const paramas = useParams()
    console.log(paramas)
    const [fetchingPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })
    console.log(comments)

    useEffect(() => {
        fetchingPostById(paramas.id)
        fetchComments(paramas.id)
    }, [])

    return (
        <div>
            <h2>Вы открыли страницу поста с ID = {paramas.id}</h2>
            {isLoading
                ? <Loader/>
                : <div>{post.id} {post.title}</div>}
            <h2>Комментарии</h2>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: '15px'}}>
                            <h3>{comment.email}</h3>
                            <div>{comment.body}</div>
                        </div>

                        )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;