/**
 * Update rover and env on env config change
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {
    Object.entries(req.body).forEach(obj => {
        __envConfig[obj[0]] = obj[1];
        // Check if rover can survive the solar flare
        if(obj[0] === "storm") {
            if(__roverConfig.hasOwnProperty("inventory")){
                __roverConfig.inventory.forEach(inv => {
                    if(inv.type === "storm-shield") {
                        if(inv.quantity === 0) {
                            if(__roverConfig.states.filter(state => state.name === "destroyed").length === 0) {
                                __roverConfig.states.push(
                                    {
                                        "name": "destroyed",
                                        "allowedActions": []
                                    }
                                )
                            }
                        } else if(inv.quantity > 0) {
                            inv.quantity--;
                        }
                    }
                })
            }
        }
        if(obj[0] === "solar-flare") {
            __roverConfig["initial-battery"] = 100;
        }
    });
    res.sendStatus(200);
};