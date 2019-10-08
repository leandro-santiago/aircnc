const User = require('../models/User');
const Spot = require('../models/Spot');
//index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const { tech } = request.query;
        
        const spots = await Spot.find({ techs: tech });

        return response.json(spots);
    },

    async store(request, response) {
        const { filename } = request.file;
        const { company, price, techs } = request.body;
        const { user_id } = request.headers;

        const user = await User.findById(user_id);
        
        if (!user) {
            return response.status(400).json( { error: "User does not exist" });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });

        return response.json(spot);        
    }
};