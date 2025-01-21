
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../repository/mongoDb/user';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const strategy = new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await User.find({ email: email }).findOne();
      if (!user) return done(null, false);
      const match  = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false);
      return done(null, user);
    }
)

export const createNewUser = async (req, res) => {
  // Access data from the request body
  const { name, email, password } = req.body;

  // Basic input validation (you should add more robust checks)
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    id: uuid(),
    name: name,
    email: email,
    password: hashedPassword,
    provider: 'local',
    providerId: ''
  });
  
  await newUser.save();

  res.status(201).json({ message: 'User created successfully', status: true });
}

export default strategy;