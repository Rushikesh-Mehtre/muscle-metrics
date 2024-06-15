// ModalComponent.jsx
import React from 'react';
import './WeightRepTrackModalComponent.scss';
              // @ts-ignore
const WeightRepTrackModalComponent = ({ showModal, handleClose, data ,date}) => {
  return (
    <div className={`modal ${showModal ? 'display-block' : 'display-none'}`}>
      <section className="modal-main">
        <button className="close-button" onClick={handleClose}>Close</button>
       <p>Your last {data?.exerciseName} workout (on {date})</p>
        <table>
          <thead>
            <tr>
              <th>Set No</th>
              <th>Weight</th>
              <th>Rep Count</th>
            </tr>
          </thead>
          <tbody>
            
            {data && data.length>0 && data.map((row:any, index:any) => (
              <tr key={index}>
                <td>{row.setNo}</td>
                <td>{row.weight}</td>
                <td>{row.repCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default WeightRepTrackModalComponent;
