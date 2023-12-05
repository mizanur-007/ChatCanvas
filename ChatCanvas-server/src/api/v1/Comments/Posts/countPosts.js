const posts = require("../../../../model/Posts");


const countPost =  async (req, res) => {
    try {
      const result = await posts.estimatedDocumentCount();
      res.send({ count: result });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while fetching the post count.');
    }
  }


module.exports = countPost