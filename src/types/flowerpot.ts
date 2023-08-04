import Flower from './flower';

type Flowerpot = {
  name: string,
  id: string | null,
  flowers: Flower[],
  animated?: boolean
};

export default Flowerpot;
