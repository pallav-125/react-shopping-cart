import React from 'react';
import CartList from './cart_list';

const ShoppingCart = props => {
    const selectedProducts = props.selectedProducts;
    let totalCartAmount = 0;

    if(!selectedProducts.length) {
        return '';
    }

    selectedProducts.forEach(product => {
        totalCartAmount += product.qty * product.price;
    });

    return (
        <div className="col-md-4">
            <div className="col-md-12">Your cart summary</div>
            <div className="col-md-6">
                <p>Items in Cart</p>
                <p>{selectedProducts.length}</p>
            </div>
            <div className="col-md-6">
                <p>Total Rs</p>
                <p>{totalCartAmount}</p>
            </div>
            <div className="row">
                <div className="col-md-5">Item</div>
                <div className="col-md-2">Qty</div>
                <div className="col-md-2">Total</div>
                <div className="col-md-3"></div>
            </div>
            <CartList 
                selectedProducts={selectedProducts} 
                removeItemFromCart={props.removeItemFromCart} />
        </div>
    );
}

export default ShoppingCart;
