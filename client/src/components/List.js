import React from 'react'
//mport { loadContract } from "./utils/load-contract";

const List=({final},{contract},{account})=> {

    const remove=async(id)=>{
        //const { contract } = web3Api;
        await contract.deleteTodo(id,{from: account });
        console.log("remove")
    }

    const RandorList=final.map((item)=>{
        return<>
        <div>{item}<button onClick={()=>remove(final.indexOf(item))}>X</button></div>
       { console.log(final.indexOf(item))}
        </>
    })



    
  return (
    <>
    <div>{RandorList}</div>
  </>)
}

export default List



