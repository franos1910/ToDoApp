import React, {useState} from 'react';
import Card from './Card'

const AddCard = () => {
    const actualDate = new Date().toISOString().split('T')[0];
    
    const [cardAmount, AddCardAmount]=useState(0);
    const [newDate, newDateChange]=useState(actualDate);

    const HandleAddCard=()=>{
        if(newDate>=actualDate)
        AddCardAmount((prevstate)=>prevstate+1);
        
    }
    const HandleNewDateChange=(e)=>{
        newDateChange(e.target.value);
        
    }
    
    return (

        <>
        <header>
            <input type="date" min={actualDate}  value={newDate} onChange={HandleNewDateChange} />
            <button onClick={HandleAddCard}>Dodaj Kartę</button>
        </header>
        <div className="Cards">
        {Array(cardAmount).fill(<Card date={newDate}/>)}
        </div>
        </>
    );
};

export default AddCard;