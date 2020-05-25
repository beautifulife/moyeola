import jwt from 'jsonwebtoken';

const generateToken = (id: string, expires: number, type: string) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET as any, { expiresIn: expires });
};

export const generateTokens = (id: string) => {
  return {
    refreshToken: generateToken(id, 60 * 60 * 12 * 30, 'refreshToken'),
    accessToken: generateToken(id, 60 * 30, 'accessToken'),
  };
};
