


import { deleteProductById } from "../../service/shoes";
import "./Product.css"
export const Card = (props) => {
  function onDelete(id){
    deleteProductById(id)
    props.onDelete(true)
  }
  return (
    <div className="card">
      <img src={props.product.image} alt="Product Image" />
      <div className="card-content">
        <h3 className="product-name">{props.product.productName}</h3>
        <p className="product-price">{props.product.price} $</p>
        <p className="product-description">
          {props.product.description}
        </p>
      </div>
      <div className="cardButtons">
        <button className="add-to-cart">Add to Cart</button>
        <button className="delete-button" onClick={() => onDelete(props.product.id)}>Delete</button>
      </div>
    </div>
  );
};
