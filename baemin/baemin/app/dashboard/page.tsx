'use client'
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
    const prevNumberRef = useRef();
    const banneritems = [
        {
            id: '1',
            name: 'anh 1',
            url: '/images/map1.png',
        },
        {
            id: '2',
            name: 'anh 2',
            url: '/images/map2.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map3.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map4.png',
        }
    ]
    const [todayFood,setFood] =useState<any>( {
        title: 'Hôm Nay ăn gì',
        items: [
         
        ]})
    
      const [menu,setMenu] = useState<any>(null)
      const [idFood,setidFood] = useState<any>(0)
      const handleClickcate =(id:any)=>{
        setidFood(id)
      }
        useEffect(() => {
           
            if(idFood===0){
                axios.get("http://localhost:3300/menu/get-menu").then(res => {
                    console.log(res.data)
        
                    setMenu(res.data)
                    const newTodayFood = {...todayFood}
                    newTodayFood.items= res.data
                    setFood(newTodayFood)})
            }
            else{
                axios.get(`http://localhost:3300/menu/get-menu-category/${idFood}`).then(res => {
                    console.log(res.data)
        
                    
                    const newTodayFood = {...todayFood}
                    newTodayFood.items= res.data
                    setFood(newTodayFood)})
                    prevNumberRef.current = idFood
            }
                
            },[idFood])
      
    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
                    <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
                        <span>Thực đơn </span>
                        {menu?.map((item:any, index:any) => (
                            <div key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100">
                                <div className="flex flex-row items-center gap-1">
                                    <Image src={`http://localhost:3300/public/images/`+`${item?.image}`} width={30} height={30} alt={item?.description} />
                                    <span onClick={() => { handleClickcate(item.id) }}>{item.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banneritems} ></ScrollBar>
                    <ScrollFood items={todayFood}></ScrollFood>
                   
                </div>

            </div>

        </>
    )
}