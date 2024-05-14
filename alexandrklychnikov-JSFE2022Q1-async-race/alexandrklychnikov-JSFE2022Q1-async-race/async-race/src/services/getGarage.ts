import { BASE_URL, MAX_CARS_ON_PAGE, PATH } from '../shared/constants';

async function getGarage(
  carState: React.Dispatch<React.SetStateAction<never[]>>,
  amountState: React.Dispatch<React.SetStateAction<number>>,
  page: number
): Promise<void> {
  try {
    const response = await fetch(
      `${BASE_URL}${PATH.garage}?_page=${page}&_limit=${MAX_CARS_ON_PAGE}`
    );
    carState(await response.json());
    amountState(Number(response.headers.get('X-Total-Count')));
  } catch (error) {
    console.error('Impossible');
  }
}

export default getGarage;
