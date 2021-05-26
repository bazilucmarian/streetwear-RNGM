import "dotenv/config"
import {config, createSchema} from "@keystone-next/keystone/schema"
import {createAuth} from "@keystone-next/auth"
import {withItemData, statelessSessions} from "@keystone-next/keystone/session"
import { User} from "./schemas/User"
import { Product} from "./schemas/Product"
import { ProductImage} from "./schemas/ProductImage"
import { insertSeedData } from "./seed-data"

const databaseURL=process.env.DATABASE_URL;

const sessionConfig={
  maxAge:60*60*24*360, //HOW LONG THEY STAY SIGNED IN
  secret:process.env.COOKIE_SECRET
}



const {withAuth} = createAuth({
  listKey:"User",
  identityField:"email",
  secretField:"password",
  initFirstItem:{
    fields: ["name", "email", "password"],
    // TODO:add in initial roles here
  }
})





export default withAuth(config({
  server:{
    cors:{
      origin:[process.env.FRONTEND_URL],
      credentials:true
    }
  },
  db:{
    adapter:"mongoose",
    url:databaseURL,
    // TODO ADD DATA SEEDING HERE 
    async onConnect(keystone){
      if(process.argv.includes("--seed-data")){
         await insertSeedData(keystone)
      }
     


    }
  },
  lists:createSchema({
    // schema items go in here
    User,
    Product,
    ProductImage
    
  }), 
  ui:{
    // todo change this for roles

// show the ui only for people whp pass this test (if they are logged in)
    isAccessAllowed:({session})=>{
     if(session){
       return session.data
     }
    }
  },
  // todo : add session values here
  session:withItemData(statelessSessions(sessionConfig),
  {
    User:"id"
  }),
})
);