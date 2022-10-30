module.exports = (connection, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: {
          args: true,
          msg: 'Email address is not valid.'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: {
          args: [8,25],
          msg: 'Password should be between 8 and 25 characters.'
        }
      }
    }
  };
  
    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
  };