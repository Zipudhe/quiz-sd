import api from "../index";

type SessionResponse = {
  data: {
    session: string,
    id: string
  }
}

export const PutSession: (session: string) => Promise<SessionResponse> = async (session: string) => {
  console.log({ session })
  return await api.put(`/session`, {}, { params: { session: session } })
    .then(({ data }) => data.id)
    .then(id => id)
}

export const StartSession = async (session: string): Promise<void> => {
  return api.post('/session/start', { data: { session } });
};