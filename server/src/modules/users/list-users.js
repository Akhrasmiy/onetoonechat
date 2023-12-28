const { BadRequestError } = require('../../shared/errors');
const User = require('./User');

const listUsers = async (q) => {
  let query = {};
    
  // TODO q kamida 1 ta belgi bo'lsin
    if (q&&q!="") {
      query = {
        $or: [
          { email: { $regex: q, $options: 'i' } },
          { last_name: { $regex: q, $options: 'i' } },
          { first_name: { $regex: q, $options: 'i' } }
        ]
      };
    }
  
    try {
      const data = await User.aggregate([
        { $match: query },
        { $sort: { created_at: -1 }},
        { $sample: { size: 10 } },
        { $project: { first_name: 1, last_name: 1, username: 1, email: 1 } },
      ]);
  
      return (data);
    } catch (error) {
      throw new BadRequestError(error);
    }
};

module.exports = listUsers;
