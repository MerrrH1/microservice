module.exports = (sequelize, Sequelize) => {
    const User = this.sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    });
    return User;
};