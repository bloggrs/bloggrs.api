"use strict";

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
  let options = {
    defaultScope: {},
    scopes: {},
  };
  let PageView = sequelize.define(
    "PageView",
    {
      pathname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    options
  );
  PageView.findByPkOrError = async (pk) => {
    let pageView = await PageView.findByPk(pk);
    if (!pageView) throw new ErrorHandler.get404("PageView");
    return pageView;
  };
  PageView.associate = (models) => {
    PageView.belongsTo(models.SiteSession, { foreignKey: { allowNull: false } });
  };

  return PageView;
};
