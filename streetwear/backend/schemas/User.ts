/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
import { rules, permissions } from '../access';

export const User = list({
  // access:
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    delete: permissions.canManageUsers,
  },
  // ui
  ui: {
    // hide the backend ui from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },

  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: 'Product.user',
      many: true,
    }),
  },
});
