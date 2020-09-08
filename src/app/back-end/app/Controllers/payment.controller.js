const stripe = require('stripe')('sk_test_51HMz6DEHyKoO1QQOxXWohPATmy4xVaWUwnbCoCGTXqBU6NhW2TK8cDcoOf4ENaXHbQUK7C9LBo70rvjcpR46LAWH00j8xY1MIJ');
exports.create = (req,res)=>{
    console.log("The body is ",req.body)
    var charge = stripe.charges.create({
        amount:3000,
        currency:'usd',
        source:req.body.token
    },(err)=>{
        if(err){
            throw err;
        }
        res.json({
            success:true,
            messages:"payment Done"
        })
    })
}