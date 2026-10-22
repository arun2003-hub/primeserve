import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    throw new Error('Error comparing password');
  }
};