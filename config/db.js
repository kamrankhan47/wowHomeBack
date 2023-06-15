const { default: mongoose } = require("mongoose");



const db = {
    connect: async () => {

        try {
            await mongoose.connect("mongodb+srv://kamran47:0503773575Kamran@cluster0.8cv3hap.mongodb.net/")
            console.log('Mongoose connected!!');
        } catch (error) {

            console.log('Mongoose Error', error);
        }
    }
}

module.exports = {
    db
}
