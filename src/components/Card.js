import React, {useState} from 'react';
import '../css/Card.css';
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const CardItem = ({ disabled, change, click,isAdded, value,important, isDone})=>{

    return(
        <label>
        <input 
        value={value}
        disabled={disabled} 
        onChange={change}
        style={important? {color:"red"}:null}
        className={isDone? "isDone" :null}
        type="text"
        />
        {isAdded ?<>
        <div className="buttonWrapper">
            <button onClick={click} id={"!"}>!</button>
            <button onClick={click} ><FiCheck id={"V"}/></button>
            <button onClick={click}><FiX id={"X"}/></button>
        </div>
        </>:null}
        
        </label>
    )
}

const Card = ({date}) => {
    const [renderComponent,setRenderComponent]=useState(true);
    const [showDate]=useState(date);
    const [tasksAmount, setTasksAmount]=useState("0");
    const [item,setItem] = useState([
     {
        id: 1,
        name: "",
        value: "",
        disabled: false,
        isAdded:false,
        important:false,
        isDone:false,
     },
     {
        id: 2,
        name: "",
        value: "",
        disabled: false,
        isAdded:false,
        important:false,
        isDone:false,
     },
     {
        id: 3,
        name: "",
        value: "",
        disabled: false,
        isAdded:false,
        important:false,
        isDone:false,
     },
     {
        id: 4,
        name: "",
        value: "",
        disabled: false,
        isAdded:false,
        important:false,
        isDone:false,
     },
    
        
    ]);
    const TaskDate = ({date})=>{
   
        return(
        <p>{showDate}</p>
        )
    }
    const handleChange=index=>e=>{
        let newArr = [...item];
        newArr[index].value=e.target.value;
        newArr[index].isAdded=true;
        if(e.target.value.length===0){
            newArr[index].isAdded=false;
        }
        setTasksAmount(item.filter(x=> x.value && !x.isDone).length)
        setItem(newArr);
        
    }
    const handleClick=index=>e=>{ 
        const action = e.target.id;
        let newArr = [...item];
        const Arr=newArr[index];
        if(action==='!'){
            Arr.important=!Arr.important;
        }else if(action==='V'){
            Arr.isDone=!Arr.isDone;
            Arr.disabled=!Arr.disabled;
        }else if(action==='X'){
            Arr.value="";
            Arr.isAdded=false;
            Arr.important=false;
            Arr.isDone=false;
            Arr.disabled=false;
        }
        setTasksAmount(item.filter(x=> x.value && !x.isDone).length)
        setItem(newArr);
    }
    const handleAddLineTask=()=>{
        setItem([...item,[{
            id: item[item.length] +1,
            name: "",
            value: "",
            disabled: false,
            isAdded:false,
            isDone:false,
            important:false,
        }]])
    }

    const handleDeleteCard = (e)=>{
        const div = e.currentTarget.closest("div");
        
        div.style.opacity="0";
        div.style.transition = "all 0.5s";
       setTimeout(
       ()=>{ 
        setRenderComponent(false)},500);
    }
    let cardItems = item.map((x,index) =>( 
    <CardItem 
        key={x.id}
        id={x.id}
        value={x.value}
        disabled={x.disabled}
        isAdded={x.isAdded}
        isDone={x.isDone}
        important={x.important}
        change={handleChange(index)}
        click={handleClick(index)}
    />
   ));
    
    
    if(renderComponent){
    return (
        
        <div className={renderComponent? "card card-active" : "card card-hide"}>
            <button className={"closeCard"} onClick={handleDeleteCard}><FiX/></button>
            <h2><TaskDate date={showDate}/></h2>
          {cardItems}
         
            <button className={"taskButton"} onClick={handleAddLineTask}>+</button>
        
            <p>{tasksAmount===0 ? "Wszystko dzis zrobiles!" :<>Zadania do zrobienia: {tasksAmount}</>}</p>
        </div>
    )}else{
        return null;
    }
};

export default Card;