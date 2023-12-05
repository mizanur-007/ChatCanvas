const payments = require("../../../model/paymentModel")

const savePayment = async(req,res)=>{
    const data = req.body
    const doc = {
        Name:data.Name,
        email:data.email,
        transactionID:data.transactionID,
        date:data.date
    }

    const result = await payments.create(doc)
    res.send(result)
}

module.exports = savePayment