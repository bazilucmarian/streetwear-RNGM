import { useMutation } from '@apollo/client';
import { useForm } from '../customHooks/Form';
import Form from '../styles/Form';
import { RESET_MUTATION } from '../graphql/mutations';
import DisplayError from './ErrorMessage';
import { useRouter } from 'next/router';

const Reset = ({ token }) => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword();
    resetForm();
  };

  const successfulerror = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : '';

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password ! 🔑</h2>
      <DisplayError error={error || successfulerror} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>
            <strong>
              Success ! ✅ <br />
              You can now sign in !
            </strong>
          </p>
        )}

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
            placeholder="Your password"
            autoComplete="password"
            required
          />
        </label>

        <button type="submit">Request Reset ! </button>
      </fieldset>
    </Form>
  );
};

export default Reset;
