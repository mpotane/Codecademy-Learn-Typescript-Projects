import { getObstacleEvents } from './computer-vision';

//Types

interface AutonomousCar {
  isRunning?: boolean
  respond : (events : Events) => void
}

interface AutonomousCarProps {
  isRunning?: boolean
  steeringControl: Steering
}

interface Events {
  [event: string]: boolean
}

interface Control {
  execute: (command: string) => void
}

interface Steering extends Control {
  turn: (direction: string) => void
}

/* The Car class implements the AutonomousCar interface and has a constructor that takes in an object
that implements the AutonomousCarProps interface */
class Car implements AutonomousCar{
  isRunning
  steeringControl
  constructor(props : AutonomousCarProps){
    this.isRunning = props.isRunning
    this.steeringControl = props.steeringControl
  }

  respond(events: Events) {
    
    if (this.isRunning === false) {
      return 'Car is off'
    }

    Object.keys(events).forEach(eventKey => {
      if (events.eventKey === false) {
        return ''
      } else if (eventKey === 'ObstacleLeft') {
        this.steeringControl.turn('right')
      } else if(eventKey === 'ObstacleRight') {
        this.steeringControl.turn('left')
      }

    })

    return 'Car stopped!'
  }
}

/* "The Car class has a steeringControl property that is an instance of the SteeringControl class."

The Car class has a steeringControl property that is an instance of the SteeringControl class */
class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`)
  }

  turn(direction: string) {
    this.execute(`turn ${direction}`)
  }
}

const steering = new SteeringControl()

const autonomousCar = new Car({
  isRunning: true,
  steeringControl: steering
})

console.log(autonomousCar.respond(getObstacleEvents()))