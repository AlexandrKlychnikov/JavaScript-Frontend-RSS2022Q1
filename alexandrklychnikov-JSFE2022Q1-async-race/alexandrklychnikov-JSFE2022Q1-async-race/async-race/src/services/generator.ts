function getRandomInt(min: number, max: number) {
  const x = Math.ceil(min);
  const y = Math.floor(max);
  return Math.floor(Math.random() * (y - x + 1)) + x; // Максимум и минимум включаются
}

const make: string[] = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'KIA', 'LADA', 'Mazda', 'Mercedes', 'Mitsubishi'];
const model: string[][] = [
  ['A3', 'A4', 'A5', 'A6', 'A8', 'RS6', 'Q3', 'Q5', 'Q7', 'E-tron'],
  ['3', '4', '5', '7', '8', 'X1', 'X2', 'X3', 'X4', 'M5'],
  ['Aerostar', 'Transit', 'Mondeo', 'Mustang', 'Explorer', 'Kuga', 'Raptor', 'Edge', 'Focus', 'Bronco'],
  ['CR-V', 'Pilot', 'Accord', 'Avancier', 'Civic', 'Concerto', 'Capa', 'Legend', 'Africa', 'Goldwing'],
  ['Solaris', 'Elantra', 'Sonata', 'i30', 'Creta', 'Tucson', 'Santa Fe', 'Palisade', 'H1', 'Accent'],
  ['Rio', 'Cerato', 'K5', 'K900', 'Picanto', 'Ceed', 'Stinger', 'Soul', 'Seltos', 'Sportage'],
  ['Granta', 'Vesta', 'Largus', '4X4', '2131', 'XRAY', 'Niva', 'Bronto-Marsh', '2102', '2106'],
  ['6', 'CX-30', 'CX-5', 'CX-9', '2', '5', '3', '121', '6 MPS', '323'],
  ['A', 'C', 'E', 'Maybach', 'GLC', 'GLE', 'GLS', 'EQC', 'GLB', 'GLA'],
  ['ASX', 'Outlander', 'Eclipse', 'Pajero', 'L200', 'Canter', 'Aspire', 'Challenger', 'Chariot', 'Carisma'],
];

export function carModelGenerator(): string {
  const firstRandomInt = getRandomInt(0, 9);
  const makeOfCar: string = make[firstRandomInt];
  const modelOfCar: string = model[firstRandomInt][getRandomInt(0, 9)];
  const carModel = `${makeOfCar} ${modelOfCar}`;
  return carModel;
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function carColorGenerator(): string {
  const red = getRandomInt(0, 255);
  const green = getRandomInt(0, 255);
  const blue = getRandomInt(0, 255);
  const carColor = `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
  return carColor;
}
