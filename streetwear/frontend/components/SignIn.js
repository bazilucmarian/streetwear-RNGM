import { useMutation } from '@apollo/client';
import { SIGNIN_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';
import { useForm } from '../customHooks/Form';
import Form from '../styles/Form';
import DisplayError from './ErrorMessage';
import { useRouter } from 'next/router';

const SignIn = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // referth the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send the email and password to graph ql api
    await signin();
    resetForm();
    router.push('/products');
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : '';
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign into your account ! 🙏</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Your email address"
            autoComplete="email"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Your password address"
            autoComplete="password"
            required
          />
        </label>
        <button type="submit">Sign in! </button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
