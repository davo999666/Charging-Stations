import SHA256 from "crypto-js/sha256";

export function createRoleHash(role) {
    return SHA256(role).toString();
}