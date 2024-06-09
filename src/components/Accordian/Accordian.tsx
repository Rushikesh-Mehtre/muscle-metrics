// src/components/Accordion.js

import React, { useEffect, useState } from 'react';
import "./Accordian.scss"
import Button from '../Button/Button';
const Accordion = ({ items, handleCurrentSet ,repCountHandler}) => {
  console.log("items", items)
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          isActive={index === activeIndex}
          title={item.title}
          onClick={handleItemClick}
          handleCurrentSet={handleCurrentSet}
          exerciseCount={item.exerciseCount || []}
          currentSet={item.exerciseCount.length}
          repCountHandler={repCountHandler}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ index, isActive, title, currentSet, onClick, handleCurrentSet, exerciseCount,repCountHandler }) => {
  console.log("currentSet",currentSet)
  const [repCount, setRepCount] = useState(0);
  const addSetHandler = () => {
    handleCurrentSet(index, currentSet, repCount,);
  }
  const handleRepCount = (repCount)=>{
    repCountHandler(index,currentSet,repCount)
  }
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => onClick(index)}>
        <h3>{title}</h3>
        <span>{isActive ? '-' : '+'}</span>
      </div>
      {isActive && <div className="accordion-content">
        <div className='table-header'>
          <p className='item'>Set No.</p>
          <p className='item'>Rep Count</p>
          <p className='item'>Action</p>
        </div>
        {exerciseCount.length > 0 &&
          exerciseCount.map((item, index) => {
            return <div className='accordion-content-item'>
              <span className='item'>{item.setNo}</span>
              <input className={`input-item ${index+1 !== currentSet?'disabled':''}`} type="number" onChange={(e) => handleRepCount(e.target.value)} value={item.repCount} disabled={index+1 !== currentSet} />              
              <div className='item'>
              {exerciseCount.length === index + 1 &&
                <Button buttonTitle='Add' onClick={addSetHandler} disabled={!item.repCount}   />
                }
              </div>
            </div>
          }
          )
        }

      </div>}
    </div>
  );
};

export default Accordion;
