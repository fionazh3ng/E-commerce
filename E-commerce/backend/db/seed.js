// const prismaClient = require("@prisma/client");
// const prisma = new prismaClient();
const { Client } = require("pg");
const {product,descriptions, prices, url}=require("./index.js")

const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://qiao@localhost:5432/ecommerce?schema=public",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
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

    // await createProduct({
    //   name: "iphone",
    //   url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818",
    //   description: "a phone made by apple",
    //   price: 600,
    // });
    // await createProduct({
    //   name: "laptop",
    //   url: "https://m.media-amazon.com/images/I/71sgAr9atBS._AC_UF894,1000_QL80_.jpg",
    //   description: "a gaming laptop",
    //   price: 1200,
    // });
    // await createProduct({
    //   name: "TV",
    //   url: "https://cdn.thewirecutter.com/wp-content/media/2023/09/lcdledtv-2048px-tclQM8-2109-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024",
    //   description: "a flat screen tv",
    //   price: 400,
    // });

    for(let i=0;i<48;i++){
        await createProduct({
            name:product[i],
            url: url,
            description:descriptions[i],
            price:prices[i]
        })
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
      orderId:1
    });
    await createOrderDetails({
      productId: 1,
      orderId:2
    });
    await createOrderDetails({
      productId: 1,
      orderId:3
    });

    console.log("Finished creating orderDetails!");
  } catch (error) {
    console.error("Error creating orderDetails!");
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

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderDetails()
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
