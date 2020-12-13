# Ajira virtual hacking hackathon

Ajira has developed a rover for extra-terrestrial exploration. It can be configured to act differently in different environments. Before sending it on a voyage, we need to simulate an extra-terrestrial environment and test the rover The rover consists of the following internal modules:

## Rover Modules

### Inventory

This is a storage unit which lets Ajirayaan store important samples and items it has retrieved during exploration.
For example,

| Samples       | Units | Priority |
| ------------- | ----- | -------- |
| Water Samples | 2     | 2        |
| Rock Samples  | 3     | 3        |
| Storm Shield  | 2     | 1        |

The inventory has a finite space.

We can add and remove items from the inventory. If the inventory is full and we need to add an item, we must remove items of a lower priority as required.

### Battery

The rover has limited battery charge and initially has a battery level of 11. For every step the rover takes, the battery level decreases by 1. 

Every 10 steps, the rover’s battery recharges to a level of 10 (it uses kinetic energy or movement to recharge itself).

**Note:**  If the battery level reaches 0, the rover dies.

### Extra-terrestrial Environment

The rover has been designed to be configurable to adapt to any kind of environment.

For the purposes of the simulation, we can consider the following environmental factors:

- Temperature
- Humidity
- Solar Flare. A solar flare recharges the rover's - battery fully
- Storm. If a storm occurs and the rover isn't shielded, it will be destroyed
- Terrain. There are different kinds of terrain such as: "dirt", "water", "rock", "sand"

---

## Run the code

Follow following steps to run the code

- Go to root directory of the project
- Run start script

```sh
npm start
```
