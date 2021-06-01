import { useState, useContext } from 'react';
import { LocalStateContext } from '../context/cartState';
import { useMutation } from '@apollo/client';
import {
  CheckoutFormStyle,
  CheckoutButton,
} from '../styles/CheckoutFormStyles';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Nprogress from 'nprogress';
import { useRouter } from 'next/router';
import { CREATE_ORDER_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { toggleCart } = useContext(LocalStateContext);

  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    // 1.Stop the form for submitting and tun the loader on
    e.preventDefault();
    setLoading(true);
    console.log('add functionality here!!');
    // 2.Start the page transition with nprogress
    Nprogress.start();
    // 3.Crate the paymethod via stripe(return token)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // 4.handle any errors from strype
    if (error) {
      setError(error);
      Nprogress.done();
      return; //stops the checkout from happening
    }
    // 5.Send the token from step 3 to keystone server, via mutation
    const order = await checkout({
      variables: { token: paymentMethod.id },
    });
    console.log(`finished with the order !!`, order);
    // 6.Change the page to view the orders
    router.push(`/order/${order.data.checkout.id}`);

    // 7.Close the cartItem
    toggleCart();
    // 8.Turn the loader off
    setLoading(false);
    Nprogress.done();
  };

  return (
    <CheckoutFormStyle onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <CheckoutButton>Checkout now 💰</CheckoutButton>
    </CheckoutFormStyle>
  );
};

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
