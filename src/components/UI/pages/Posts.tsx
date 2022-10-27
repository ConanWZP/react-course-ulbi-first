import {useEffect, useMemo, useRef, useState} from "react";

import './../../../Styles/App.css'
import {usePosts} from "../../../hooks/usePosts";
// @ts-ignore
import {useFetching} from "../../../hooks/useFetching.ts";
// @ts-ignore
import PostService from "../../../API/PostService.ts";
import {getPageCount} from "../../../utils/pages";
import MyButton from "../button/MyButton";
import MyModal from "../MyModal/MyModal";
import PostFilter from "../../PostFilter";
import Pagination from "../Pagination/Pagination";
import PostList from "../../PostList";
import Loader from "../Loader/Loader";
import PostForm from "../PostForm";
import {useObserver} from "../../../hooks/useObserver";
// @ts-ignore
import MySelect from "../MySelect/MySelect.tsx";
import {IPosts} from "../../../types/types";





const Posts = () => {

    const [posts, setPosts] = useState<IPosts[]>([
        /*{id: 1, title: 'JavaScript', body: 'К js'},
        {id: 2, title: 'Python', body: 'К змее'},
        {id: 3, title: 'C++', body: 'К плюсам'},*/
    ])


    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
    /*const [isPostLoading, setIsPostLoading] = useState(false)*/
    const [totalPages, setTotalPages] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);



    /*let pagesArray = [];
    for (let i = 0; i < totalPages; i++) {
        pagesArray.push(i + 1);
    }*/




    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll<IPosts[]>(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })


    const lastElement = useRef()
    /*const observer = useRef()*/
    console.log(lastElement)
    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })
    /*useEffect(() => {
        if (isPostLoading) return;
        if (observer.current) observer.current.disconnect();
        var callback = function (entries, observer){
            if (entries[0].isIntersecting && page < totalPages) {
                console.log('Див в зоне видимости')
                setPage(page + 1)
            }

        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current)
    }, [isPostLoading])*/


    useEffect(() => {
        fetchPosts(limit, page)
    }, [filter, page, limit])

    /*const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');*/

    /* const [title, setTitle] = useState('')

     const [body, setBody] = useState('')*/

    const bodyInputRef = useRef()

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (newPage) => {
        setPage(newPage)
    }

    /*async function fetchPosts() {
        setIsPostLoading(true)
        const posts = await PostService.getAll()
        setPosts(posts)
        setIsPostLoading(false)
    }*/


    /*const changeOnSort = (sort) => {
        setSelectedSort(sort);
        /!*setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))*!/

        console.log(selectedSort)
    }*/

    /*const addNewPost = (e) => {
        e.preventDefault();
        console.log(post.title)
        console.log(post.body)
        /!*console.log(bodyInputRef.current.value)*!/
        /!*const newPost = {
            id: Date.now(),
            /!*title,
            body,*!/
            ...post
        }*!/
        /!*setPosts([...posts, newPost])*!/
        setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: '', body: ''})
        /!*setTitle('');
        setBody('')*!/

        /!*console.log(newPost)*!/
    }*/

    /*function getSortedPosts() {
        console.log('Сработал вызов')
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts
    }

    const sortedPosts = getSortedPosts()*/

    /*const sortedPosts = useMemo(() => {
        console.log('Сработал вызов')
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [sortedPosts, filter.query])*/

    return (
        <div className='App'>
            <button onClick={fetchPosts}>Get</button>
            <MyButton style={{marginTop: '15px'}} onClick={() => {
                setModal(true)
            }}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0px'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                changeOnSort={valasdasdasdue => setLimit(valasdasdasdue)}
                defaultValue='Кол-во элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'показать все'}
                ]}
            />
            {postError &&
                <h1>Призошла ошибка {postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchPosts} title='Список постов 1'/>
            <div ref={lastElement} style={{height: 20, background:'red'}}></div>
            {isPostLoading &&<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                <Loader />
            </div>}
            {/*<PostList posts={posts2} title='Список постов 2' />*/}
            <Pagination page={page} totalPages={totalPages} changePage={changePage} />

        </div>
    );
};

export default Posts;
