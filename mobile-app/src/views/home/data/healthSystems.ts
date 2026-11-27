export interface HealthSystem {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  color: string;
}

export const healthSystems: HealthSystem[] = [
  {
    id: '1',
    name: 'Układ endokrynologiczny',
    score: 8.3,
    maxScore: 10,
    color: '#CBE6C7',
  },
  {
    id: '2',
    name: 'Układ krążenia',
    score: 9.1,
    maxScore: 10,
    color: '#F3B5CD',
  },
  {
    id: '3',
    name: 'Układ pokarmowy / wątroba',
    score: 8.8,
    maxScore: 10,
    color: '#B4CCCF',
  },
];
