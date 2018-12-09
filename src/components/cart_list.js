import React from 'react';
import CartListItem from './cart_list_item';

const CartList = props => {
    const selectedProducts = props.selectedProducts.map((selectedProduct, i) => {
        return <CartListItem 
            key={i}
            selectedProduct={selectedProduct}
            removeItemFromCart={props.removeItemFromCart} />;
    });

    return (<div>{selectedProducts}</div>);
}

export default CartList;