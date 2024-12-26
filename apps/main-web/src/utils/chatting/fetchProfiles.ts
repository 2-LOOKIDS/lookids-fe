import { getUserProfile } from '../../actions/user';
import { UserInfo } from '../../types/user';

export async function fetchParticipantsProfile(participants: string[]) {
  try {
    const profiles = await Promise.all(
      participants.map(async (participant) => ({
        uuid: participant,
        profile: await getUserProfile(participant),
      }))
    );

    return profiles.reduce(
      (acc, { uuid, profile }) => ({
        ...acc,
        [uuid]: profile,
      }),
      {} as Record<string, UserInfo>
    );
  } catch (error) {
    console.error('Failed to fetch participants profile:', error);
    throw new Error(`Failed to fetch participants profile: ${error}`);
  }
}
