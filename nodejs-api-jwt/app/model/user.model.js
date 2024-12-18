module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Ensure IDs are auto-incremented
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true // Ensures email is unique
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User;
};
