import EventEmitter from '../../dom-helper/event-emitter';
import { Flowerpot, Flower } from '../../types';
import FlowerClass from '../flower/flower';
import FlowerpotClass from '../flowerpot/flowerpot';
import isFlower from './isFlower';

export default class Windowsill {
  public elements: (FlowerpotClass | FlowerClass)[] = [];

  constructor(private windowsill: (Flowerpot | Flower)[], public eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.elements = windowsill
      .map((element) => Windowsill.buildElement(element, this.eventEmitter));
  }

  private static buildElement(
    element: Flower | Flowerpot,
    eventEmitter: EventEmitter,
  ): FlowerpotClass | FlowerClass {
    if (isFlower(element)) {
      return new FlowerClass(element, eventEmitter);
    }
    return new FlowerpotClass(element, eventEmitter);
  }
}
