"use strict"

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
    let options = { 
        defaultScope: {
        },
        scopes: {
        }
    }
    let Blog = sequelize.define('Blog', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        logo_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        craftjs_json_state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, options);
    Blog.findByPkOrError = async pk => {
        let blog = await Blog.findByPk(pk)
        if (!blog) throw new ErrorHandler.get404("Blog")
        return blog;
    }
    Blog.findByPkOr404 = Blog.findByPkOrError
    Blog.associate = models => {
        Blog.belongsTo(models.User, { foreignKey: { allowNull: false } });
        Blog.belongsTo(models.BlogCategory, { foreignKey: { allowNull: false } })
    }
    
    return Blog;
};