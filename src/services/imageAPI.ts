const generateImage = async (prompt: string) => {
  const API_URL =
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.REACT_APP_HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return url;
};


export { generateImage };