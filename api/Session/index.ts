import api from "../index";

type SessionResponse = {
  data: {
    session: string
  }
}

export const PutSession: (session: string) => Promise<void | SessionResponse> = async (session: string) => {
  console.log({ session })
  return await api.put(`/session`, {}, { params: { session: session } })
    .then(({ data }) => data.session)
    .then(session => session)
}