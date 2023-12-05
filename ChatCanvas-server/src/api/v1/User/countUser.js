const user = require("../../../model/userModel");



const countUser =  async (req, res) => {
    try {
      const result = await user.estimatedDocumentCount()
      res.send({ count: result });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while fetching the user count.');
    }
  }


module.exports = countUser