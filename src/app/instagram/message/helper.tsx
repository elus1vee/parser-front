interface DataType {
  [key: string]: string;
}
export const sendMessage = async (username: string, message: string) => {
  const data : DataType = {
    username, message
  }
  const formData = new URLSearchParams();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }
  const result = fetch('http://localhost:3030/search/msg',{method: 'POST', body: formData, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
  return result;
}