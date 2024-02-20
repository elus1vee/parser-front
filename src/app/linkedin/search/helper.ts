export async function searchFunction(queryName: string, filter: string) {
  const splitWords = queryName.split(" ").join("-");
  const result = await fetch(
    `http://localhost:3030/search/${filter}/${splitWords}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
  return result;
}