import jwt from "jsonwebtoken";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

function hashPassword(password) {
    const salt = genSaltSync(10, 'b');
    return hashSync(password, salt);
}

function comparePassword(plainPassword, hashedPassword) {
    const compare = compareSync(plainPassword, hashedPassword);
    return compare;
}

function generateToken(payload, expiresIn) {
    var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });
    return token;
}

function decodeToken(token) {
    // console.log('decodeToken', token);
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(verify);
    return verify;
}
 
export { hashPassword, comparePassword, generateToken, decodeToken }
