import SHA256 from "crypto-js/sha256";

 function createRoleHash(role) {
    return SHA256(role).toString();
}



export function checkToken(token){
    return token === createRoleHash("admin");
}