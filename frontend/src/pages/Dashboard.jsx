import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header/Header'
import Tabs from '../components/Dashboard/Tabs'
import axios from 'axios'
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/PaginationComponent';
import Loader from '../components/Common/Loader/Loader';
import BackToTop from '../components/Common/BackToTop/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function Dashboard() {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [isloading, setIsLoading] = useState(true)

    const handlerPageChange = (event,value)=>{
        setPage(value)
        let prevIndex = (value-1)*10;
        setPaginatedCoins(coins.slice(prevIndex,prevIndex+10));
    };
    let onSearchChange = (e)=>{
        // console.log(e.target.value)
        setSearch(e.target.value);
    }
    let filteredCoins = coins.filter((item)=>(item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.symbol.toLowerCase().includes(search.toLowerCase())))
    useEffect(() => {
        getData();
    }, [])
    
    const getData = async ()=>{
        const myCoins  = await get100Coins();
        if(myCoins){
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0,10));
            setIsLoading(false);
        }
    }

  return (
    <>
    <Header/>
    <BackToTop/>
    {isloading ? <Loader/> :
        <div>
        <Search search={search} onSearchChange={onSearchChange}/>
        <Tabs coins={search ? filteredCoins : paginatedCoins}/>
        {!search && (<PaginationComponent page={page} handlerPageChange={handlerPageChange}/>)}
    </div>}
    </>
  )
}

export default Dashboard