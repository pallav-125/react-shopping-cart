import React from 'react';

const CartListItem = props => {
    const selectedProduct = props.selectedProduct;
    return (
        <div className="row cart-item">
            <div className="col-md-5">{selectedProduct.productName}</div>
            <div className="col-md-2">{selectedProduct.qty}</div>
            <div className="col-md-2">{selectedProduct.totalProductAmount}</div>
            <div className="col-md-3">
                <label 
                    className="label label-danger"
                    onClick={() => {props.removeItemFromCart(selectedProduct)}}>Remove</label>
            </div>
        </div>
    );
}

export default CartListItem;