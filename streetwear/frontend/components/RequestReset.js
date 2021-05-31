import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from '../customHooks/Form';
import Form from '../styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';
import { useRouter } from 'next/router';

const REQUEST_REST_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_REST_MUTATION,
    {
      variables: inputs,
      // referth the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password ! 🔑</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            <strong>
              Success ! ✅ <br />
              Check your email for a link ! 📧
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

        <button type="submit">Request Reset ! </button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
