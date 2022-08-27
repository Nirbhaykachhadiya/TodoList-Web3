import detectEthereumProvider from "@metamask/detect-provider";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { loadContract } from "./utils/load-contract";
import List from "./components/List";
function App() {


  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
   contract: null,
  });


  const [account, setAccount] = useState(null);
  const [place,setPlace]=useState();
  const [final,setfinal]=useState();
  const[reload,setreload]=useState(false)
  const[fale,setfale]=useState(false)



  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };



  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
     const contract = await loadContract("Todo", provider);
      if (provider) {
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please install MetaMask!");
      }
    };

    loadProvider();
  },[]);

  const Change=(e)=>{
    setPlace(e.target.value)

  }

  const Add=async(place)=>{
    const {  web3,contract } = web3Api;
    await contract.addTodo(place,{
      from: account });
      console.log("success")
      setreload(reload=>!reload)
      setPlace("")

  }
useEffect(()=>{
  const seen=async(place)=>{
    const {  web3,contract } = web3Api;
    const rera =await contract.getTodo({from: account });
    setfinal(rera);
    setfale(true);

  }

  web3Api.contract && seen();
},[reload])

 

const remove=async(id)=>{
  const { contract } = web3Api;
  await contract.deleteTodo(id,{from: account });
  console.log("remove")
  setreload(reload=>!reload)
  console.log(id)
}


  return (
    <>
    <div><h1>Todo List</h1></div>
    <div><input type="text"placeholder="Enter Your Task"  value={place} onChange={Change}/>
    <button onClick={()=>Add(place)}>AddTodo</button></div>
    <hr/>
    {!fale ?"":final.map((item)=>{return(<><div>{item}<button onClick={()=>remove(final.indexOf(item))}>X</button></div>
 
  </>)
})
}
    </>
  );
}

export default App;
//