module.exports = (sequelize, Sequelize) => {
    const Role = this.sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    });
    return Role;
};