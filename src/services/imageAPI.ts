const generateImage = async (prompt: string) => {
    try {
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

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        return getMockImage();
    }
};

const getMockImage = async () => {
    try {
        const image = await fetch('https://picsum.photos/200');
        if (!image.ok) {
            throw new Error('Error while fetching mock image');
        }
        return image.url;
    } catch (error) {
        console.log(error);
    }
};

export { generateImage, getMockImage };
