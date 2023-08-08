import React from 'react'
import { useEffect, useState } from 'react'
import '../client/Client.css'

const Server = () => {
	const URL = "https://dummyjson.com/products";

	const [products, setproducts] = useState([]);
	const [page, setpage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		fetchProducts(page);
	}, [page])

	const fetchProducts = async () => {
		const res = await fetch(`${URL}?skip=${(page - 1) * 10}&limit=10`);
		const data = await res.json();
		if (data && data.products) {
			setTotalPages(data.total / 10);
			setproducts(data.products);
		}
	}

	const navigateToPage = (pageNo) => {
		setpage(pageNo);
	}

	return (
		<>
			<div className="products__wrapper">
				{products.map(product => (
					<div className="product__item" key={product.id}>
						<img className="product__thumbnail" src={product.thumbnail} alt={product.title} />
						<span className="product__title">{product.title}</span>
					</div>
				))}
			</div>
			{products.length > 0 ? <span className="pagination__buttons">
				<span className={page === 1 ? 'remove_pagination' : ''} onClick={() => navigateToPage(page - 1)}>◀️</span>
				{[...Array(totalPages)].map((_, i) =>
					(<span className={page === i + 1 ? 'pagination__button__active' : ''} onClick={() => navigateToPage(i + 1)} key={i}>{i + 1}</span>))}
				<span className={page === 10 ? 'remove_pagination' : ''} onClick={() => navigateToPage(page + 1)}>▶️</span>
			</span> : null}
		</>
	)
}

export default Server