const User = require('../models/User');
//index, show, store, update, destroy

module.exports = {
    async store(request, response) {
        const { email } = request.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create( { email });
        }

        return response.json(user);
        
    }
};