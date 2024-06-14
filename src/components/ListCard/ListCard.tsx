import React from 'react'
import { listItem, ListCardProps } from "./ListCard.d"
import "./ListCard.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiFillDelete } from "react-icons/ai";


const ListCard = (props: ListCardProps) => {
    const { cardHeading, cardList, addToListHandler, removeFromListHandler, updatedList, editable, deleteWorkout, canBeDeleted, myWorkOutExercises,exerciseDocId } = props;

    return (
        <div className='list-card-container'>
            <div className='list-card-header'>
                <p className='list-card-heading'>{cardHeading}</p>
                {canBeDeleted && exerciseDocId &&
                    <AiFillDelete 
                    onClick={() => deleteWorkout && deleteWorkout(exerciseDocId)} 
                    className='delete-icon' />}
            </div>
            {
                cardList && cardList.length > 0 && editable &&
                <div className='card-list'>
                    {cardList.map((item: listItem) => <p className={`card-list-item ${(updatedList && updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0) || myWorkOutExercises?.filter((exeItem: any) => exeItem.id === item.id).length > 0 ? 'already-added' : 'not-added'}`} key={item.title}
                        onClick={() => {
                            if (updatedList && updatedList.length > 0 && updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0) {
                                removeFromListHandler && removeFromListHandler(item)
                            } else {
                                addToListHandler && addToListHandler(item)
                            }
                        }
                        }
                    >
                        <span className='item-title'>{item.title}</span>
                        {
                            updatedList && updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0 ?
                                <FontAwesomeIcon icon={faMinus} className='plus-icon' />
                                :
                                <FontAwesomeIcon icon={faPlus} className='minus-icon' />
                        }
                    </p>)}
                </div>
            }
            {
                cardList && cardList.length > 0 && !editable && <div className='card-list'>
                    {cardList.map((item: listItem) => <p className={`card-list-item`} key={item.title}

                    >
                        <span className='item-title'>{item.title}</span>

                    </p>)}
                </div>
            }
        </div>
    )
}

export default ListCard