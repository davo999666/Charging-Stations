export function timePassed(start, end) {
    const diffMs = end - start;

    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
}