export function startGeolocationWatch(onSuccess, onError) {
    if ("geolocation" in navigator) {
        return navigator.geolocation.watchPosition(
            (pos) => {
                onSuccess([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                if (onError) onError(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    }
    return null;
}

export function stopGeolocationWatch(watchId) {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}
