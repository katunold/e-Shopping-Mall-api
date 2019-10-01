module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      review: DataTypes.STRING(255),
      rating: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      createdAt: 'created_on',
      updatedAt: false,
      tableName: 'review',
    }
  );

  Review.associate = ({ Customer, Product }) => {
    Review.belongsTo(Customer, {
      foreignKey: 'customer_id',
    });
    Review.belongsTo(Product, {
      foreignKey: 'product_id',
    });
  };

  return Review;
};
