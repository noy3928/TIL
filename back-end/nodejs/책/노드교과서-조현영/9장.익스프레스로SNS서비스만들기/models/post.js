const Sequelize = require("sequelize")

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    )
  }

  static associate(db) {
    /*
    User와 Post는 1:N 관계이기 때문에 Post는 User에 belongTo로 연결되어있다. 
    */
    db.Post.belongTo(db.User)
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" })
  }
}
