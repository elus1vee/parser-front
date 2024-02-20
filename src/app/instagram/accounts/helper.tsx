export async function searchFunction(filter: string) {
  const result = await fetch(
    `http://localhost:3030/accounts/${filter}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
  return result;
}