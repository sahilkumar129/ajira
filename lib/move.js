/**
 * Check if rover is functional anymore
 * @param {*} res 
 */
function checkRoverFunctional(res) {
    // battery is dead
    if((__roverConfig["initial-battery"] <= 0) ||
    // state is destroyed
        (__roverConfig.states.filter(state => state.name === "destroyed").length !== 0)) {
        res.status(404).end();
        return true;
    }
}

/**
 * Check if storm is there
 * @param {*} res 
 */
function checkStorm(res) {
    if(__envConfig.storm) {
        res.json({
            "message": "Cannot move during a storm"
        });
        return true;
    }
}

/**
 * Check if rover is moving outside the boundaries
 * @param {*} move 
 * @param {*} res 
 */
function checkAndUpdateBoundaries(move, res) {
    // Get old and new deploy points
    const oldDeployPoints = __roverConfig["deploy-point"];
    const newDeployPoints = {};
    newDeployPoints.row = oldDeployPoints.row + move[0];
    newDeployPoints.column = oldDeployPoints.column + move[1];
    
    // Find the mapped area dimenstions
    const envArea = {};
    envArea.maxLength = __envConfig["area-map"].length;
    envArea.maxBreadth = envArea.maxLength > 0 ? __envConfig["area-map"][0].length : 0;
    // Row out of range
    if(0>newDeployPoints.row || newDeployPoints.row>envArea.maxLength-1 || 
    // Column out of range
        0>newDeployPoints.column || newDeployPoints.row>envArea.maxBreadth-1) {
        res.json({
            "message": "Can move only within mapped area"
        });
        return true;
    }
    
    // Update the new deploy points
    __roverConfig["deploy-point"] = newDeployPoints;
    
    // Update the battery if steps reached 10
    __roverConfig["initial-battery"]--; 
    if(__roverConfig.hasOwnProperty("total-steps") && __roverConfig["total-steps"] === 9) {
        __roverConfig["initial-battery"] +=  10; 
    }
    __roverConfig["total-steps"] =  ((__roverConfig["total-steps"] ? __roverConfig["total-steps"] : 0)  + 1) % 10; 

}

/**
 * Logic to update the rover status on move
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => { 
    const dir=req.body.direction;
    let move;
    switch(dir) {
        case "up": {
            move = [-1,0];
            break;
        }
        case "down": {
            move = [1,0];
            break;
        };
        case "left": {
            move = [0,-1];
            break;
        };
        case "right": {
            move = [0,1];
            break;
        };
        default: {
            move = [0,0];
            break;
        }
    }

    if(checkRoverFunctional(res)) return;
    if(checkStorm(res)) return;
    if(checkAndUpdateBoundaries(move, res)) return;

    res.sendStatus(200);
}