import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from '../components/ErrorMessage';
import { OrdersList, OrdersListItem, OrderStyles } from '../styles/OrderStyles';
import { formatMoney } from '../lib/formatMoney';
import Head from 'next/head';
import Link from 'next/link';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const countItemsInAnOrder = (order) => {
  return order.items.reduce((acc, item) => acc + item.quantity, 0);
};

const OrdersPage = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading ... </p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <div>
        <h2>You have {allOrders.length} orders !</h2>
        <OrdersList>
          {allOrders.map((order) => (
            <OrdersListItem key={order.id}>
              <Link href={`/order/${order.id}`}>
                <a>
                  <div className="order-meta">
                    <p>{countItemsInAnOrder(order)} Items</p>
                    <p>
                      {order.items.length} Product
                      {order.items.length === 1 ? '' : 's'}{' '}
                    </p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img
                        key={`image -${item.id}`}
                        src={item?.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </a>
              </Link>
            </OrdersListItem>
          ))}
        </OrdersList>
      </div>
    </OrderStyles>
  );
};
export default OrdersPage;
