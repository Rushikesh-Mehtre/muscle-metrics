
import React, { useState } from 'react';
import "./Accordian.scss"
import {AccordionItemProps,AccordionProps} from "./Accordian.d"
import { IoIosAdd } from "react-icons/io";

const Accordion = (props:AccordionProps) => {
  const { items, handleCurrentSet ,repCountHandler} = props;
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleItemClick = (index:number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
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

const AccordionItem = (props:AccordionItemProps) => {
  const { 
    index, 
    isActive, 
    title, 
    currentSet, 
    onClick, 
    handleCurrentSet, 
    exerciseCount,
    repCountHandler } = props;

  const repCount =  0;
  const addSetHandler = () => {
    handleCurrentSet(index, currentSet, repCount);
  }
  const handleRepCount = (repCount:string)=>{
    repCountHandler(index,currentSet,repCount)
  }
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => onClick(index)}>
        <p className='title'>{title}</p>
        <span className='icon'>{isActive ? '-' : '+'}</span>
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
              <IoIosAdd onClick={addSetHandler}  className={`add-icon ${!item.repCount?'disabled':''}`} />
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
