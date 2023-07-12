import api from "../index";

export type User = {
  [x: string]: number
}

type SessionResponse = {
  session: string,
  userId: string
}

type RankingResponse = {
  users: User[]
}

export const PutSession = async (session: string, userId: string | null) => {
  return await api.put<SessionResponse>(`/session`, {}, { params: { session: session, userId } })
    .then(({ data }) => data.userId)
    .then(userId => userId)
}

export const StartSession = async (session: string): Promise<void> => {
  return api.post('/session/start', { data: { session } });
};

export const GetRanking =async (session: string) => {
  return await api.get<RankingResponse>(`/session/ranking/${session}`)
    .then(({ data }) => {
      return data.users
    })
    .then(users => {
      return users.sort((userA: User, userB: User) => userA[0] - userB[0])
    })
}