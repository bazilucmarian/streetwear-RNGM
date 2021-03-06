import ProductStyles from '../styles/ProductStyles';
import DeleteProduct from '../components/DeleteProduct';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import { formatMoney } from '../lib/formatMoney';
import Link from 'next/link';
import AddToCart from './AddToCart';

const Product = ({ product }) => {
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
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ProductStyles>
  );
};

export default Product;
