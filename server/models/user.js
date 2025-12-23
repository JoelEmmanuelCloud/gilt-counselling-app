const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// In-memory storage (replace with database in production)
let users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gilt.com',
    phone: '+234 803 309 4050',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '+234 706 573 4165',
    password: bcrypt.hashSync('user123', 10),
    role: 'user'
  }
];

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

const findUserById = (id) => {
  return users.find(user => user.id === id);
};

const createUser = (name, email, password, phone) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: uuidv4(),
    name,
    email,
    phone,
    password: hashedPassword,
    role: 'user'
  };
  users.push(newUser);
  return newUser;
};

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  validatePassword
};
