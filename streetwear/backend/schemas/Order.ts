/* eslint-disable @typescript-eslint/unbound-method */
import { list } from '@keystone-next/keystone/schema';
import {
  text,
  select,
  integer,
  relationship,
  virtual,
} from '@keystone-next/fields';
import { formatMoney } from '../lib/formatMoney';
import { isSignedIn, rules } from '../access';

export const Order = list({
  // access
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
      graphQLReturnType: 'String',

      resolver(item) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders', many: true }),
    charge: text(),
  },
});
