import React from 'react'
import { listItem, ListCardProps } from "./ListCard.d"
import "./ListCard.scss"

const ListCard = (props: ListCardProps) => {
    const { cardHeading, cardList, addToListHandler, removeFromListHandler, updatedList } = props;
    const cardItemClickHandler = (item)=>{
      // add or remove depending on whether already present or not
      
    }
    return (
        <div className='list-card-container'>
            <p className='list-card-heading'>{cardHeading}</p>
            {
                cardList.length > 0 &&
                <div className='card-list'>

                    {cardList.map((item: listItem) => <p className={`card-list-item ${updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0 ? 'already-added' : 'not-added'}`} key={item.title}
                        onClick={()=>cardItemClickHandler(item)}
                        >
                        <span>{item.title}</span>
                        {
                            updatedList.filter((updatedListItem) => updatedListItem.id === item.id).length > 0 ? <span onClick={() => removeFromListHandler(item)}>-</span> : <span onClick={() => addToListHandler(item)}>+</span>
                        }

                    </p>)}
                </div>
            }
        </div>
    )
}

export default ListCard