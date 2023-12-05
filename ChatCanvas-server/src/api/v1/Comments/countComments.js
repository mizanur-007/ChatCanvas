const comments = require("../../../model/commentsModel");



const countComments =  async (req, res) => {
    try {
      const result = await comments.estimatedDocumentCount()
      res.send({ count: result });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while fetching the user count.');
    }
  }


module.exports = countComments