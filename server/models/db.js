const mongoose = require('mongoose')
const {Schema,model} = mongoose
const user = new Schema({
    FirstName:String,
    LastName:String,
    email:{ type: String,
        validate: {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            if(user) {
              if(this.id === user.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified email address is already in use.'
        },
        required: [true, 'User email required']
      },
    password:String,
    googleID: { type: String, default: "" },
    address: {
      shippingAddress: {
          address: { type: String, default: '' },
          city: { type: String, default: '' },
          country: { type: String, default: '' }
      },
      billingAddress: {
          address: { type: String, default: '' },
          city: { type: String, default: '' },
          country: { type: String, default: '' }
      }
  },
    orders:{
    type: [
      {
        Status: { type: String, default: 'Pending' }, 
        Price:Number,
        Date: { type: Date, default: Date.now }, 
        Time: { type: String, default: () => new Date().toLocaleTimeString() }
      }
  ],
  default:[]
},
    verified: { type: Boolean, default: false },
    expireAt: {
    type: Date,
    default: Date.now,
    index: {
        expireAfterSeconds: 200,
        partialFilterExpression: { verified: false }
  }
}
})
const User = model("User",user)
module.exports = User
// order schema order_id product seller_id buyer_id  status date 
// type:mongoose.Schema.Types.ObjectId, required:true,ref:'Orders'