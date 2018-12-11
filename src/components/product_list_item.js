import React from 'react';

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = { product: props.product }
    }
    

    plusMinusLabel = () => {
        return (
            <div>
                <label className="label label-danger"
                    onClick={() => {this.props.removeProduct(this.state.product)}}>
                    -
                </label>
                <label className="label label-default">
                    {this.state.product.qty} in cart
                </label>
                <label className="label label-primary"
                    onClick={() => {this.props.onProductAdd(this.state.product)}}>
                    +
                </label>
            </div>
        );
    }

    addLabel = () => {
        return (
            <div>
                <label 
                    className="label label-primary"
                    onClick={() => {this.props.onProductAdd(this.state.product)}}>
                    Add to cart
                </label>
            </div>
        );
    }

    render() {
        let button;
        button = this.state.product.qty ? this.plusMinusLabel() : this.addLabel();

        return (
            <div className="product-list-item card text-xs-center">
                <div className="card-body">
                    <img src={this.state.product.url} />
                    <div>{this.state.product.brandName}</div>
                    <div>{this.state.product.productName}</div>
                    <small>{this.state.product.packagingDetail}</small>
                    <div><strong>Rs {this.state.product.price}</strong></div>
                    {button}
                </div>
            </div>
        );
    }
}

export default Product;
