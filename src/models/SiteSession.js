"use strict";

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
  let options = {
    defaultScope: {},
    scopes: {},
  };
  let SiteSession = sequelize.define(
    "SiteSession",
    {
      endedAt: {
        type: DataTypes.DATETIME,
        allowNull: false,
      },
    },
    options
  );
  SiteSession.findByPkOrError = async (pk) => {
    let SiteSession = await SiteSession.findByPk(pk);
    if (!SiteSession) throw new ErrorHandler.get404("SiteSession");
    return SiteSession;
  };
  SiteSession.associate = (models) => {
    SiteSession.belongsTo(models.User, { foreignKey: { allowNull: true } });
    SiteSession.belongsTo(models.Blog, { foreignKey: { allowNull: false } });
  };

  return SiteSession;
};
