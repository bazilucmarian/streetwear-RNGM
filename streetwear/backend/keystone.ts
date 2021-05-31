/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { extendGraphqlSchema } from './mutations';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { Role } from './schemas/Role';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { permissionsList } from './schemas/fields';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO:add in initial roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO ADD DATA SEEDING HERE
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      // show the ui only for people whp pass this test (if they are logged in)
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // todo : add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id name email role {${permissionsList.join(' ')}}`,
    }),
  })
);
