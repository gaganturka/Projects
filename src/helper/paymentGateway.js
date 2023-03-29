const stripe = require("stripe")(
  "sk_test_51MqUEUSAmAQHR5JWTyjhFHfdzqHxCHPJYCTLUhtIphv9dArj5Rtw0L37lBTmQf2YSbP43rekZQAw110Ipkx6r00i00k0wuUwVd"
);

// app.post('/create-checkout-session', async (req, res) => {
const YOUR_DOMAIN = "http://localhost:3000/";
const payment = async (req, res) => {
  try {
    console.log("hit");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1MqZrMSAmAQHR5JWNIuTscnB',
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    return res.send({message : 'done', data : session.url })


 ///////////// create price id
    // stripe.prices.create({
    //     unit_amount: 2000, // Amount in cents
    //     currency: 'usd',
    //     product_data: {
    //       name: 'laptope',
    //     },
    //   }).then(price => {
    //     console.log('Price created:', price.id);
    //   }).catch(err => {
    //     console.log('Error:', err.message);
    //   });

//    window.location.redirect(303, session.url);
  } catch (err) {
    console.log("errr", err);
  } 
}
// app.post('/payment', function(req, res){
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
//     stripe.customers.create({
//         email: 'gagan@gmail.com',
//         source  : SXGAJSGH,
//         name: 'Gourav Hammad',
//         address: {
//             line1: 'TC 9/4 Old MES colony',
//             postal_code: '452331',
//             city: 'Indore',
//             state: 'Madhya Pradesh',
//             country: 'India',
//         }
//     })
//     .then((customer) => {
//         console.log('custmo',customer)
 
//         return stripe.charges.create({
//             amount: 2500,     // Charging Rs 25
//             description: 'Web Development Product',
//             currency: 'INR',
//             customer: customer.id
//         });
//     })
//     .then((charge) => {
//         console.log('sdsdssd',charge)
//         res.send("Success")  // If no error occurs
//     })
//     .catch((err) => {
//     console.log('eer', err)
//         res.send(err)       // If some error occurs
//     });

// };

module.exports.payment = payment;
