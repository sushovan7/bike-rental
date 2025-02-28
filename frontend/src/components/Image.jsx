import { IKImage } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

function Image(props) {
  return (
    <div>
      <h1>ImageKit React quick start</h1>
      <IKImage urlEndpoint={urlEndpoint} {...props} />
    </div>
  );
}

export default Image;
