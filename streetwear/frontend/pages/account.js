import PleaseSignIn from '../components/PleaseSignIn';
import { AccountBox } from '../styles/AccountStyles';
import { useUser } from '../components/User';
const account = () => {
  const me = useUser();

  return (
    <PleaseSignIn>
      <AccountBox>
        <ul className="user-details">
          <li>
            <span>User name : </span>
            {me?.name}
          </li>
          <li>
            <span>User email : </span>
            {me?.email}
          </li>
          <li>
            <span>User ID : </span>
            {me?.id}
          </li>
        </ul>
      </AccountBox>
    </PleaseSignIn>
  );
};

export default account;
