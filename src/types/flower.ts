// enum FlowerType {
//   cherry = 'cherry-blossom',
//   floral = 'floral',
//   sunflower = 'sunflower',
//   tulips = 'tulips',
// }

type Flower = {
  name: string;
  url: string;
  class: string | null;
  animated?: boolean;
};

export default Flower;
