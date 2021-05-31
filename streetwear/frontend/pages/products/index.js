import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';
import PleaseSignIn from '../../components/PleaseSignIn';

const products = () => {
  const { query } = useRouter();
  return (
    <PleaseSignIn>
      <Pagination page={+query.page || 1} />
      <Products page={+query.page || 1} />
      <Pagination page={+query.page || 1} />
    </PleaseSignIn>
  );
};

export default products;
