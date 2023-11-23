const SECRET_KEY= process.env || RKOyK66aKfIAnoNWlniL7onDvZ9Fdoek;
const REFRESH_SECRET_KEY=process.env || R9W28c4IOuGeK3ox!Bb6SEAzrTqtJl0k;

const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");


const generateAccessToken = (userId) => {   
  const payload = {
    userId,
    type: tokens.access.type,
    
  };
  const options = {
    expiresIn: tokens.access.expiresIn,
  };
  return jwt.sign(payload, SECRET_KEY, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: nanoid(),
    type: tokens.refresh.type,
  };
  const options = {
    expiresIn: tokens.refresh.expiresIn,
  };
  return {
    id: payload.id,
    token: jwt.sign(payload, REFRESH_SECRET_KEY, options),
  };
};

const replaceDbRefreshToken = async (tokenId, userId) => {
  await Token.findOneAndRemove({userId});

  const result = await Token.create({ tokenId, userId });

  return result;
};

const updateTokens = async (userId, type) => {
  const accessToken = generateAccessToken(userId, type);
  const refreshToken = generateRefreshToken();
  await replaceDbRefreshToken(refreshToken.id, userId);

  return { 
    accessToken,
    refreshToken: refreshToken.token
   };
};

const authHelper = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
  updateTokens
 };

module.exports = authHelper;