import FeaturedCard from "@/components/FeaturedCard";
import Navbar from "@/components/navbar";
import { getProducts } from "@/db/models/product";




const ProductPage = async() => {

  const products = await getProducts();
  // console.log(products);
  
  
  return (
    <>
      <Navbar />
      <div className="w-screen px-20"> 
        <FeaturedCard products={JSON.stringify(products)}/>
      </div>
      <div></div>
    </>
  );
}

export default ProductPage