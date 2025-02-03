
'use client'
import React, { useEffect, useState } from 'react';
import TypeSelector from '../type';
import AreaSelector from '../area';
import FilterSelector from '../filter';
import ResultFood from '../result';
import { useRouter } from 'next/router';
import axios from 'axios';
const Page: React.FC = (props:any) => {
    const [items,setItems] = useState([])

const [category, setCategory] = useState<string|string[]>('');

const { slug } = props.params;
const decodedSlug = decodeURIComponent(slug);

useEffect(() => {  
    axios.get(`http://localhost:3300/menu/get-menuname-category/${decodedSlug}`).then(res => {
        setItems(res.data)
    })
},[decodedSlug])
console.log(items)
return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>

            </div>
            <div className='my-3 flex flex-row'>
                asdasd
            </div>
            <ResultFood items={items} />
        </>
    )
}
export default Page;