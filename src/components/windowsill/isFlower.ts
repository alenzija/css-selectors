import { Flower, Flowerpot } from '../../types';

export default function isFlower(element: Flower | Flowerpot): element is Flower {
  return !('flowers' in element);
}
