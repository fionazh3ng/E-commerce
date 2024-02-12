// const prismaClient = require("@prisma/client");
// const prisma = new prismaClient();
const { Client } = require("pg");
const { product, descriptions, prices, url } = require("./index.js");

const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://fionazh3ng@localhost:5432/ecommerce?schema=public",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS orderDetails;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          firstName varchar(255) NOT NULL,
          lastName varchar(255) NOT NULL,
          email varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          isAdmin BOOLEAN DEFAULT false
        );
  
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          url varchar(255) NOT NULL,
          description varchar(255) NOT NULL,
          price FLOAT NOT NULL
        );

        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            createdAt date DEFAULT CURRENT_DATE,
            userId INTEGER REFERENCES users(id)
          );

          CREATE TABLE orderDetails (
            id SERIAL PRIMARY KEY,
            productId INTEGER REFERENCES products(id),
            orderId INTEGER REFERENCES orders(id)
          );

          CREATE TABLE cart (
            id SERIAL PRIMARY KEY,
            productId INTEGER REFERENCES products(id),
            userId INTEGER REFERENCES users(id)
          );

      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({
      firstName: "qiao",
      lastName: "chen",
      email: "qiao@gmail.com",
      password: "123",
      isAdmin: true,
    });
    await createUser({
      firstName: "fiona",
      lastName: "zheng",
      email: "fiona@gmail.com",
      password: "123",
      isAdmin: true,
    });
    await createUser({
      firstName: "malik",
      lastName: "garvin",
      email: "malik@gmail.com",
      password: "123",
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
        url: url,
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
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(firstName, lastName, email, password, isAdmin)
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *;
      `,
      [firstName, lastName, email, password, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createProduct({ name, url, description, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products("name", "url", description, price)
        VALUES($1, $2, $3, $4) 
        RETURNING *;
      `,
      [name, url, description, price]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function createOrders({ userId }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders(userId)
        VALUES($1) 
        RETURNING *;
      `,
      [userId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function createOrderDetails({ productId, orderId }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orderDetails(productId, orderId)
        VALUES($1, $2) 
        RETURNING *;
      `,
      [productId, orderId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function createCart({ productId, userid }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO cart(productId, userid)
        VALUES($1, $2) 
        RETURNING *;
      `,
      [productId, userid]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderDetails();
    await createInitialCart()
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
