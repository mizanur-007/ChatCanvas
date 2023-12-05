const posts = require("../../../../model/Posts");


const userCountPost =  async (req, res) => {
    try {
        const email = req.params.email
        
        const query = {author_email:email}
      const result = await posts.countDocuments(query);
      res.send({ count: result });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while fetching the post count.');
    }
  }


module.exports = userCountPost