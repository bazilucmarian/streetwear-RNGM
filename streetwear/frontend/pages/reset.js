import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you need a token ! ⛔</p>
        <p>Please complete the form for genereting a new token ! </p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password ! </p>
      <Reset token={query.token} />
    </div>
  );
};
export default ResetPage;
