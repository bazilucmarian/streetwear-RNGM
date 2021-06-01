import { useQuery } from '@apollo/client';
import { SINGLE_ORDER_QUERY } from '../../graphql/queries';
import DisplayError from '../../components/ErrorMessage';
import { OrderStyles } from '../../styles/OrderStyles';
import { formatMoney } from '../../lib/formatMoney';
import Head from 'next/head';

const SingleOrderPage = ({ query }) => {
  const { orderId } = query;
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: orderId },
  });
  if (loading) return <p>Loading ... </p>;
  if (error) return <DisplayError error={error} />;
  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Streetwear - Order </title>
      </Head>
      <p>
        <span>Order Id :</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge :</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total :</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Quanity: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal : {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};
export default SingleOrderPage;
