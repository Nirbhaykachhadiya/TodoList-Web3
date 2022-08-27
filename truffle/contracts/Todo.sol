// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo{
    //string[]public Todos;

  
     mapping(address=>string[])public Todolist;
     uint count=0;
   
     function addTodo(string memory _todo)public {
        // bytes memory str_bytes1 = bytes(_todo);
        // string memory str = new string(str_bytes1.length);
        // str=_todo;

        // Todos memory todos;
        // todos.id=count;
        // todos.work=_todo;
       
        if(Todolist[msg.sender].length==0){
            Todolist[msg.sender].push(_todo);
        }
        else{
        for(uint i=0;i<Todolist[msg.sender].length;i++){
            string memory str=Todolist[msg.sender][i];

            
            if(keccak256(abi.encodePacked(str)) == keccak256(abi.encodePacked(_todo))){
               i=Todolist[msg.sender].length;
               // revert("same no");
               
              
                }
                 else{
                     if(i==Todolist[msg.sender].length-1){
                 Todolist[msg.sender].push(_todo);
                     }
             
            }
        }

        }
        

     }
    
    function getTodo()public view returns( string[] memory){
        return Todolist[msg.sender];
    }

    function deleteTodo(uint _index)public {
       // ;
       for(uint i=_index;i<Todolist[msg.sender].length-1;i++){
            Todolist[msg.sender][i]= Todolist[msg.sender][i+1];
       }
      Todolist[msg.sender].pop();
    }
}