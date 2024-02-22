const { PrismaClient } =require('@prisma/client')
const prisma = new PrismaClient()
// const { Client } = require("pg");
const { product, descriptions, prices, url } = require("./index.js");
const bcrypt = require("bcrypt");

// const client = new Client({
//   connectionString:
//     process.env.DATABASE_URL ||
//     "postgresql://fionazh3ng@localhost:5432/ecommerce",
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : undefined,
// });

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
   await prisma.cart.deleteMany()
   await prisma.orderdetails.deleteMany()
   await prisma.orders.deleteMany()
   await prisma.products.deleteMany()
   await prisma.users.deleteMany()

   await prisma.$executeRaw`ALTER SEQUENCE "orders_id_seq" RESTART WITH 1`;
   await prisma.$executeRaw`ALTER SEQUENCE "products_id_seq" RESTART WITH 1`;
   await prisma.$executeRaw`ALTER SEQUENCE "users_id_seq" RESTART WITH 1`;

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error);
  }
}

// async function createTables() {
//   try {
//     console.log("Starting to build tables...");

//     await client.query(`
//       //   CREATE TABLE users (
//       //     id SERIAL PRIMARY KEY,
//       //     firstName varchar(255) NOT NULL,
//       //     lastName varchar(255) NOT NULL,
//       //     email varchar(255) UNIQUE NOT NULL,
//       //     password varchar(255) NOT NULL,
//       //     isAdmin BOOLEAN DEFAULT false
//       //   );
  
//       //   CREATE TABLE products (
//       //     id SERIAL PRIMARY KEY,
//       //     name varchar(255) NOT NULL,
//       //     url Text NOT NULL,
//       //     description varchar(255) NOT NULL,
//       //     price FLOAT NOT NULL
//       //   );

//       //   CREATE TABLE orders (
//       //       id SERIAL PRIMARY KEY,
//       //       createdAt date DEFAULT CURRENT_DATE,
//       //       userId INTEGER REFERENCES users(id)
//       //     );

//       //     CREATE TABLE orderDetails (
//       //       id SERIAL PRIMARY KEY,
//       //       productId INTEGER REFERENCES products(id),
//       //       orderId INTEGER REFERENCES orders(id)
//       //     );

//       //     CREATE TABLE cart (
//       //       id SERIAL PRIMARY KEY,
//       //       productId INTEGER REFERENCES products(id),
//       //       userId INTEGER REFERENCES users(id)
//       //     );

//       // `);

//     console.log("Finished building tables!");
//   } catch (error) {
//     console.error("Error building tables!");
//     throw error;
//   }
// }

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    const salt = await bcrypt.genSalt(10);
    await createUser({
      firstName: "qiao",
      lastName: "chen",
      email: "qiao@gmail.com",
      password: await bcrypt.hash("123", salt),
      isAdmin: true,
    });
    await createUser({
      firstName: "fiona",
      lastName: "zheng",
      email: "fiona@gmail.com",
      password: await bcrypt.hash("123", salt),
      isAdmin: true,
    });
    await createUser({
      firstName: "malik",
      lastName: "garvin",
      email: "malik@gmail.com",
      password: await bcrypt.hash("123", salt),
      isAdmin: true,
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    for (let i = 0; i < 48; i++) {
      await createProduct({
        name: product[i],
        url: url[i],
        description: descriptions[i],
        price: prices[i],
      });
    }

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Starting to create orders...");

    await createOrders({
      userId: 1,
    });
    await createOrders({
      userId: 1,
    });
    await createOrders({
      userId: 1,
    });

    console.log("Finished creating orders!");
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

async function createInitialOrderDetails() {
  try {
    console.log("Starting to create orderDetails...");

    await createOrderDetails({
      productId: 1,
      orderId: 1,
    });

    await createOrderDetails({
      productId: 2,
      orderId: 1,
    });

    await createOrderDetails({
      productId: 1,
      orderId: 2,
    });
    await createOrderDetails({
      productId: 1,
      orderId: 3,
    });

    console.log("Finished creating orderDetails!");
  } catch (error) {
    console.error("Error creating orderDetails!");
    throw error;
  }
}

async function createInitialCart() {
  try {
    console.log("Starting to create cart...");

    await createCart({
      productId: 1,
      userid: 1,
    });

    await createCart({
      productId: 2,
      userid: 1,
    });

    await createCart({
      productId: 3,
      userid: 1,
    });

    await createCart({
      productId: 4,
      userid: 1,
    });

    console.log("Finished creating cart!");
  } catch (error) {
    console.error("Error creating cart!");
    throw error;
  }
}

async function createUser({ firstName, lastName, email, password, isAdmin }) {
  try {
    await prisma.users.create({
      data:{
        firstname:firstName,
        lastname:lastName,
        email,
        password,
        isadmin:isAdmin
      }
  })
  } catch (error) {
    throw error;
  }
}

async function createProduct({ name, url, description, price }) {
  try {
  await prisma.products.create({
    data:{
      name,
      url,
      description,
      price
    }
  })
  } catch (error) {
    throw error;
  }
}

async function createOrders({ userId }) {
  try {
    await prisma.orders.create({
      data:{
        userid:userId,
      }
    })

  } catch (error) {
    throw error;
  }
}

async function createOrderDetails({ productId, orderId }) {
  try {
   await prisma.orderdetails.create({
    data:{
      productid:productId,
      orderid:orderId
    }
   })

  } catch (error) {
    throw error;
  }
}

async function createCart({ productId, userid }) {
  try {
    await prisma.cart.create({
      data:{
        productid:productId,
        userid
      }
    })
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderDetails();
    await createInitialCart();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
