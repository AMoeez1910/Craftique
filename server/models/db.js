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

    phoneNo: {
      type: String,
      unique: true,
      default: null
  },
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
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
    verified: { type: Boolean, default: false },
    expireAt: {
    type: Date,
    default: Date.now,
    index: {
        expireAfterSeconds: 200,
        partialFilterExpression: { verified: false }
  }
},
// seller 
  brand:{
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  }
})
const User = model("User",user)
module.exports = User
// order schema order_id product seller_id buyer_id  status date 
// type:mongoose.Schema.Types.ObjectId, required:true,ref:'Orders'