import React from 'react';
import ReactDOM from 'react-dom';
import productData from './components/data';
import ProductCategory from './components/product_category';
import ProductList from './components/product_list';
import ShoppingCart from './components/shopping_cart.js';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.productData = productData.slice();
		this.selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) ||  [];

		if(this.selectedProducts.length) {
			this.selectedProducts.forEach(item => {
				this.productData.forEach(product => {
					if(product.id === item.id) {
						product.qty = item.qty;
					}
				})
			});
		}

		this.state = { 
			products: this.productData,
			selectedProducts: this.selectedProducts 
		};
	}

	updateProducts(selectedProducts) {
		let productData = this.state.products.slice();

		selectedProducts.forEach(item => {
			productData.forEach(product => {
				if(product.id === item.id) {
					product.qty = item.qty;
				}
			})
		});

		selectedProducts = selectedProducts.filter(item => {
			return item.qty;
		})

		localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
		this.setState({
			products: productData,
			selectedProducts: selectedProducts
		})
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

		this.updateProducts(selectedProducts);
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

	removeProduct(selectedProduct) {
		let selectedProducts = this.state.selectedProducts.slice();

		selectedProducts.forEach(item => {
			if(item.id === selectedProduct.id) {
				item.qty -= 1;
				item.totalProductAmount -= item.price;
			}
		});
		
		this.updateProducts(selectedProducts);
	}

	render() {
		return (
			<div>
				<ProductCategory />
				<div className="row">
					<ProductList 
						products={this.state.products}
						onProductAdd={selectedProduct => {this.addProduct(selectedProduct)} } 
						removeProduct={selectedProduct => {this.removeProduct(selectedProduct)} } />
					<ShoppingCart 
						selectedProducts={this.state.selectedProducts}
						removeItemFromCart={ selectedProduct => {this.removeItemFromCart(selectedProduct)} } />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
