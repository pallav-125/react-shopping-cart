import React from 'react';
import ReactDOM from 'react-dom';
import productData from './components/data';
import ProductCategory from './components/product_category';
import ProductList from './components/product_list';
import ShoppingCart from './components/shopping_cart.js';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			products: productData,
			selectedProducts: JSON.parse(localStorage.getItem('selectedProducts')) ||  []
		};
	}

	addProduct(product) {
		let selectedProducts = this.state.selectedProducts.slice();
		
		// if cart is empty 
		if(!selectedProducts.length) {
			// add product
			product.qty += 1;
			product.totalProductAmount = product.price * product.qty;
			selectedProducts.push(product);
		} else {
			let addedProduct = selectedProducts.filter(item => {
				return product.id === item.id;
			});

			// update product quantity in cart if product exists
			if(addedProduct.length) {
				selectedProducts.forEach(selectedProduct => {
					if(product.id === selectedProduct.id) {
						selectedProduct.qty += 1;
						selectedProduct.totalProductAmount = product.price * selectedProduct.qty; 
					}
				}); 
			} else {
				// add new product
				product.qty += 1;
				product.totalProductAmount = product.price * product.qty;
				selectedProducts.push(product);
			}
		}

		localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
		this.setState({selectedProducts: selectedProducts});
	}

	removeItemFromCart(selectedProduct) {
		let selectedProducts = this.state.selectedProducts.slice();
		selectedProducts = selectedProducts.filter(item => {
			return selectedProduct.id !== item.id;
		});

		// reset product quantity
		let products = this.state.products.slice();
		products.forEach(item => {
			if(selectedProduct.id === item.id) {
				item.qty = 0;
			}
		});

		localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
		this.setState({selectedProducts: selectedProducts});
	}

	render() {
		return (
			<div>
				<ProductCategory />
				<div className="row">
					<ProductList 
						products={this.state.products}
						onProductAdd={selectedProduct => {this.addProduct(selectedProduct)} } />
					<ShoppingCart 
						selectedProducts={this.state.selectedProducts}
						removeItemFromCart={ selectedProduct => {this.removeItemFromCart(selectedProduct)} } />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
