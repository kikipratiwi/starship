import api from './httpAdapter.service';

export const getStarships = async (link = "https://swapi.dev/api/starships/") => {
    try {
        const { data } = await api.get(link);

        return data
    } catch (error) {
        throw new Error(error)
    }
}
