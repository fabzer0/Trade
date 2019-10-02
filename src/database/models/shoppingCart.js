module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define(
    'ShoppingCart',
    {
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attributes: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      buy_now: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      added_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: 'shopping_cart',
    }
  );

  ShoppingCart.associate = ({ Product }) => {
    ShoppingCart.belongsTo(Product, {
      foreignKey: 'product_id',
      as: 'products',
      onDelete: 'CASCADE',
    });
  };

  return ShoppingCart;
};
