const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!firstname || !lastname) {
      return res.status(401).send("Please enter your name.");
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      return res.status(401).send("Invalid email address.");
    }

    if (password.length < 7) {
      return res.status(401).send("password must be at least 7 characters.");
    }

    const user = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

// login to an existing account
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });

    // const match = await bcrypt.compare(req.body.password, user?.password);

    // if (!match) {
    //   res.status(401).send("Invalid login credentials.");
    // }

    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.send(token);
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", async (req, res, next) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
