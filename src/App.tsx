import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {

  // const downloadImage = () => {
  //   if (!imageUrl) return;
  //   const link = document.createElement("a");
  //   link.href = imageUrl;
  //   link.download = "generated.png";
  //   link.click();
  // };

  return (
    // <div>
    //   <Button onClick={generateImage}>Generate Image</Button>
    //   {imageUrl && (
    //     <div>
    //       <img src={imageUrl} alt="Generated" width={400} />
    //       <button onClick={downloadImage}>Download</button>
    //     </div>
    //   )}
    // </div>
    <div>
      <Button>Generate Image</Button>
    </div>
  );
}

export default App;