const Sequelize = require("sequelize")

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100), // 비밀번호를 암호화 하기 때문에 길이를 길게 잡음
          allowNull: true,
        },
        provider: {
          // 로그인 제공자
          type: Sequelize.STRING(10), // local, kakao, google, naver 등
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30), // SNS 로그인 ID
          allowNull: true,
        },
      },
      {
        /*
        설명 : 
        sequelize.define() 메서드와 비슷
        테이블에 대한 설정을 함
        */
        sequelize,
        timestamps: true,
        underscored: false, // 기본적으로 카멜케이스로 컬럼명을 만들지만, 이를 스네이크 케이스로 바꿔주는 옵션
        modelName: "User", // 모델 이름 설정
        tableName: "users", // 실제 데이터베이스의 테이블 이름, 기본적으로 모델 이름을 소문자 및 복수형으로 만듬
        paranoid: true, // true로 설정하면 deletedAt 컬럼이 생성됨, 로우를 삭제할 때 완전히 지우지 않고 deletedAt에 지운 날짜를 기록
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    )
  }

  // 각 모델간의 관계를 정의
  static associate(db) {
    // 1:N 관계
    db.User.hasMany(db.Post)
    // N:M 관계
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow", // 같은 테이블 간 N:M 관계에서는 모델 이름과 컬럼 이름을 따로 정해야 한다. 모델 이름이 UserUser일 수는 없다. 따라서 through 옵션을 사용하여 중간 테이블의 이름을 Follow로 바꿔준다.
    })
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    })
  }
}
