import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../customHooks/Form";
import Form from "../styles/Form";
import { CURRENT_USER_QUERY } from "../components/User";
import DisplayError from "./ErrorMessage";
import { useRouter } from "next/router";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // referth the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up for an account ! 📝</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            <strong>Signed up with {data.createUser.email}</strong> ✅<br />
            Please complete the form on the left for sign in !
          </p>
        )}
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            id="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </label>
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
        <button type="submit">Sign in! </button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
