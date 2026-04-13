

export async function tipoLiga( token : string ) {
    const request = await fetch("http://localhost:3000/api/formatos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
    });    
    const response = await request.json();
    console.log("Tipos de liga:", response);
    return response;
}