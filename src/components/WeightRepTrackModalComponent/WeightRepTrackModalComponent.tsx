// ModalComponent.jsx
import React from 'react';
import './WeightRepTrackModalComponent.scss';
import { IoIosClose } from "react-icons/io";

              // @ts-ignore
const WeightRepTrackModalComponent = ({ showModal, handleClose, data,title,dataType}) => {
  console.log("data",data)
  return (
    <div className={`modal-container ${showModal ? 'display-block' : 'display-none'}`}>
      <section className="modal-main">
        <button className="close-button" onClick={handleClose}>
          <IoIosClose className='close-icon'/>
        </button>
       <p className='modal-header'>
        <span>Your last {title} workout</span>
        <span>(on {"date"})</span>
         </p>
      {dataType==="exercise"?  <table>
          <thead>
            <tr>
              <th>Set No</th>
              <th>Weight</th>
              <th>Rep Count</th>
            </tr>
          </thead>
          <tbody>
            
            {data && data.length>0 && data[0].exercisesTrackingArr && data[0].exercisesTrackingArr.length>0 && data[0].exercisesTrackingArr.map((row:any, index:any) => (
              <tr key={index}>
                <td>{row.setNo}</td>
                <td>{row.weight}</td>
                <td>{row.repCount}</td>
              </tr>
            ))}
          </tbody>
        </table> : 
       
          // <p>workout data will be here</p>
           data && data.length>0 && data.map((item:any)=> <div>
              <p>{item.exerciseName}</p>
              <table>
          <thead>
            <tr>
              <th>Set No</th>
              <th>Weight</th>
              <th>Rep Count</th>
            </tr>
          </thead>
          <tbody>
            
            {item.exercisesTrackingArr && item.exercisesTrackingArr.length>0 && item.exercisesTrackingArr.map((row:any, index:any) => (
              <tr key={index}>
                <td>{row.setNo}</td>
                <td>{row.weight}</td>
                <td>{row.repCount}</td>
              </tr>
            ))}
          </tbody>
        </table> 
            </div> )
          
     
        }
      </section>
    </div>
  );
};

export default WeightRepTrackModalComponent;
