import type { ProfileName } from '../types/chat.types';

export const AVAILABLE_PROFILES: ProfileName[] = [
  'Ja',
  'Gość1',
  'Gość2',
  'Gość3',
];

export function getInitialForProfile(profile: string = 'Ja'): string {
  switch (profile) {
    case 'Mama':
      return 'M';

    case 'Babcia':
      return 'B';

    case 'Tata':
      return 'T';

    default:
      return 'H';
  }
}