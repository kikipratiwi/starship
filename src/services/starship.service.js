import api from './httpAdapter.service';

export const getStarships = async (link = "https://swapi.dev/api/starships/") => {
    try {
        const { data } = await api.get(link);

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const getUsers = async (limit, skip) =>{
    const users = await api.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    )

    return users.data.users
}