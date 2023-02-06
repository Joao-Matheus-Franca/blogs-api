module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'category',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      });
      
      models.BlogPost.belongsToMany(models.Category, {
        as: 'post',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId'
      });
    }
  
    return PostCategory;
  };
