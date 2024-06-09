import React from 'react'
import { listItem, ListCardProps } from "./ListCard.d"
import "./ListCard.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const ListCard = (props: ListCardProps) => {
    const { cardHeading, cardList, addToListHandler, removeFromListHandler, updatedList, editable, deleteWorkout } = props;
    const cardItemClickHandler = (item) => {
        // add or remove depending on whether already present or not
    }
    const deleteMyWorkOutHandler = (workOutToDelete: string) => {
        deleteWorkout(workOutToDelete)
    }
    return (
        <div className='list-card-container'>
            <div className='list-card-header'>
                <p className='list-card-heading'>{cardHeading}</p>
                <Button buttonTitle='Delete' size="small" onClick={() => deleteMyWorkOutHandler(cardHeading)} />
            </div>
            {
              cardList &&  cardList.length > 0 && editable &&
                <div className='card-list'>
                    {cardList.map((item: listItem) => <p className={`card-list-item ${updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0 ? 'already-added' : 'not-added'}`} key={item.title}
                        onClick={() => {
                            if (updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0) {
                                removeFromListHandler(item)
                            } else {
                                addToListHandler(item)
                            }
                        }
                        }
                    >
                        <span className='item-title'>{item.title}</span>
                        {
                            updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0 ?
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