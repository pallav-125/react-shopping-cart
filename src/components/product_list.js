import React from 'react';
import ProductListItem from './product_list_item';

const ProductList = props => {
    const productItems = props.products.map((product) => {
        return <ProductListItem 
            key={product.id}
            product={product}
            onProductAdd={props.onProductAdd}
            removeProduct={props.removeProduct} />
    });

    return (
        <div className="col-md-8">{productItems}</div>
    );
}

export default ProductList;
