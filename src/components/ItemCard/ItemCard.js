import React from 'react';
import './ItemCart.scss'


export const ItemCard = ({title, imageUrl, desc, price, extLink, enlargePhoto, productTitle}) => {
    return (
        <div className='item-card'>
            <div className='item-card__title'>
               {title} - {productTitle}
            </div>

            <div className='item-card__content'>
                <div className='item-card__left-side'>
                    <img src={imageUrl}
                         alt="" className='item-card-image'
                         onClick={enlargePhoto}
                         data_product_title={productTitle}/>
                    <div className='item-card__price'>Ціна, м: {price} $</div>
                </div>

                <div className='item-card__right-side'>
                    <div>
                        {desc}
                    </div>
                    {extLink && <a className='item-card__ext-link'
                                   href={extLink}
                                   target='_blank'>Детальніше...</a>}
                </div>
            </div>
        </div>
    );
};