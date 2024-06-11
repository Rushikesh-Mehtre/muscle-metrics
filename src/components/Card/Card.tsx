// Card.tsx
import React from 'react';
import Button from '../Button/Button';
import "./Card.scss";

interface CardProps {
  heading: string;
  description?: string;
  button1Label?: string;
  button2Label?: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
}

const Card: React.FC<CardProps> = ({
  heading,
  description,
  button1Label,
  button2Label,
  onButton1Click,
  onButton2Click
}) => {
  return (
    <div className="card">
      <p className='card-heading'>{heading}</p>
      <p className='card-description'>{description}</p>
      <div className="buttons">
        <Button buttonTitle={button1Label} onClick={onButton1Click} />
        <Button buttonTitle={button2Label} onClick={onButton2Click} />
      </div>
    </div>
  );
};

export default Card;
