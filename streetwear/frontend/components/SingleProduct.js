import ProductStyles from "../styles/ProductStyles";
import Title from "../styles/Title";
import PriceTag from "../styles/PriceTag";
import { formatMoney } from "../lib/formatMoney";
import Link from "next/link";

const SingleProduct = ({ product }) => {
  console.log(product);
  return (
    <ProductStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO : Add buttons to edit and delete item */}
    </ProductStyles>
  );
};

export default SingleProduct;
