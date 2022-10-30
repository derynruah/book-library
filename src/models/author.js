module.exports = (connection, DataTypes) => {
    const schema = {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [1,150],
                    msg: 'Author cannot be empty or more than 150 characters.',
                }
            }
        }
    };

    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
};
