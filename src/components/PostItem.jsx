import React from 'react';
import './../Styles/App.css'
import MyButton from "./UI/button/MyButton";
import {useLocation, useNavigate, useParams} from "react-router-dom";




export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                match={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}




const PostItem = (props) => {
    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id} {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => props.match.navigate(`/posts/${props.post.id}`)}>Открыть</MyButton>
                    <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
                </div>
            </div>
        </div>
    );
};

export default withRouter(PostItem);