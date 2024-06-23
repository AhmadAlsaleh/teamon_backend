const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error('Error encrypting password');
    }
};

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error('Error comparing password');
    }
};

module.exports = {
    encryptPassword,
    comparePassword
};
