import React from 'react';
import MyInput from "./input/MyInput.tsx";
import MyButton from "./button/MyButton";
import {useState} from "react";

const PostForm = ({create, ...props}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
        console.log(post.title)
        console.log(post.body)

        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost)
        /*setPosts([...posts, {...post, id: Date.now()}])*/
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput type={'text'}
                     placeholder={'Название поста'}
                     value={post.title}
                /*onChange={(e) => setTitle(e.target.value)}*/
                     onChange={e => setPost({...post, title: e.target.value})}
            />
            {/*<input ref={bodyInputRef} />*/}
            {/*<MyInput type={'text'}
                         placeholder={'Описание поста'}
                         ref={bodyInputRef}
                />*/}
            <MyInput type={'text'}
                     placeholder={'Описание поста'}
                     value={post.body}
                /*onChange={(e) => setBody(e.target.value)}*/
                     onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Добавить пост</MyButton>
        </form>
    );
};

export default PostForm;