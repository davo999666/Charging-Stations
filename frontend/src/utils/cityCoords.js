export const getCityCoords = async (city) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&country=Israel&format=json`
    );
    const data = await res.json();
    if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
};
