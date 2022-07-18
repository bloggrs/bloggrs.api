"use strict"

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
    let options = { 
        defaultScope: {
        },
        scopes: {
        }
    }
    let BlogTheme = sequelize.define('BlogTheme', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, options);
    BlogTheme.findByPkOrError = async pk => {
        let blogTheme = await BlogTheme.findByPk(pk)
        if (!blogTheme) throw new ErrorHandler.get404("BlogTheme")
        return blogTheme;
    }
    BlogTheme.associate = models => {
    }
    
    return BlogTheme;
};