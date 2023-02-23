import { useEffect, useState } from "react";
import { Card } from "./prod";

import { getAllProducts } from "../../service/shoes";



import "./Product.css"
export function Products() {
  const [data, setData] = useState("");
  
  async function fetchData() {
    const products = await getAllProducts();
    setData(products);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log("data",data);
const Delete=(d)=>{
  fetchData()
}
  return (
    <div className="displayCards">
      {data ? (
        data.map((product) => <Card onDelete={Delete} key={product.id} product={product} />)
      ) : (
        <h1>loading ..</h1>
      )}
    </div>
  );
}