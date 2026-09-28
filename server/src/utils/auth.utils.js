import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function generateAccessToken({ userId }) {
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
}

export function generateRefreshToken({userId}) {
    const refreshToken = jwt.sign({id: userId}, config.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });
    return refreshToken;
}

export function verifyRefreshToken(token){
    const decode = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    return decode;
}

export function verifyAccessToken(token){
    const decode = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    return decode;
}
