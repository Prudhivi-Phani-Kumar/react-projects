const Img = ({ thumbnail, title }) => {
    return (
        <img className="product__thumbnail" src={thumbnail} alt={title} />
    )
}

export default Img