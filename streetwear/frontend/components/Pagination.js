import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { PAGINATION_QUERY } from '../graphql/queries';
import { PaginationStyles } from '../styles/PaginationStyles';
import { perPage } from '../config';
import { useRouter } from 'next/router';

// 1.Render the actual links to ✅
// 2.Allow for dynamic routing of
// (ex: http://localhost:7777/products?page=1 or http://localhost:7777/products/1)
// 3.Filter the products for the current page
// 4.Deal with cache invalidation

const Pagination = ({ page }) => {
  const router = useRouter();
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading ... </p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data?._allProductsMeta;
  const nrPages = Math.ceil(count / perPage);

  // useEffect(() => {
  //   console.log('render ---userffect');
  //   if (page > nrPages) {
  //     router.push(`/products/${nrPages}`);
  //   }
  // }, [page, nrPages]);

  return (
    <PaginationStyles>
      <Head>
        <title>
          StreetWear - Page {page} of {nrPages}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}> ⬅ Prev</a>
      </Link>
      <p>
        Page {page} of {nrPages}{' '}
      </p>
      <p>{count} Items Total </p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= nrPages}> Next ➡</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
