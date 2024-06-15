// RepCountWeightInput.tsx
import React, { useState } from 'react';
import "./RepCountWeightInput.scss"
import { MdCancel } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

interface RepCountWeightInputProps {
    setNo: number;
    onAdd: (setNo: number, repCount: number, weight: number) => void;
    onCancel: (setNo:number) => void;

}

const RepCountWeightInput: React.FC<RepCountWeightInputProps> = ({ setNo, onAdd, onCancel }) => {
    const [repCount, setRepCount] = useState<string>('');
    const [weight, setWeight] = useState<number>(2.5);

    const handleAdd = () => {
        onAdd(setNo, Number(repCount), weight);
        setRepCount('');
        setWeight(2.5);
    };
    const handleRepCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
          setRepCount(value);
        }
      };
    const weightOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 2.5);

    return (
        <tr className='rep-count-weight-input-container'>
            <td>{setNo}</td>
            <td>
                <select
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                >
                    {weightOptions.map((weightOption) => (
                        <option key={weightOption} value={weightOption}>
                            {weightOption}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="number"
                    maxLength={2}
                    value={repCount}
                      onChange={handleRepCountChange}
          max="100"
                />
            </td>
          
            <td>
                <div className='icon-container'>

                <IoIosAddCircle onClick={handleAdd} className={`icon add-icon ${!repCount ? "disabled" : ''}`} />
                {setNo !==1 && <MdCancel onClick={()=>onCancel(setNo)} className='icon' />}
                </div>
            </td>
        </tr>
    );
};

export default RepCountWeightInput;
