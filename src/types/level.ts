import Description from './description';
import Flowerpot from './flowerpot';
import Flower from './flower';

export default interface Level {
  id: number,
  title: string,
  windowsill: (Flowerpot | Flower)[],
  answer: string,
  description: Description
}
