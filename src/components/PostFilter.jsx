import React from 'react';
import MyInput from "./UI/input/MyInput.tsx";
import MySelect from "./UI/MySelect/MySelect.tsx";

const PostFilter = ({filter, setFilter}) => {




    return (
        <div>
            <MyInput placeholder={'Поиск'}
                     value={filter.query}
                     /*onChange={e => setSearchQuery(e.target.value)}*/
                onChange={e => setFilter({query: e.target.value})}
            />
            <MySelect
                /*changeOnSort={changeOnSort}*/
                changeOnSort={sortSelected => setFilter({...filter, sort: sortSelected })}
                defaultValue={'Сортировка по'}
                value={filter.sort}
                options={[
                    {value: 'title', name: 'названию'},
                    {value: 'body', name: 'содержанию'}
                ]}
            />
        </div>

    );
};

export default PostFilter;