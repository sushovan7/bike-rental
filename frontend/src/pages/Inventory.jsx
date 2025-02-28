import { useEffect } from "react";
import Image from "../components/Image";

function Inventory() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      Inventory
      <div>
        <Image
          path="default-image.jpg"
          lqiq={{ active: true, quality: 20, blur: 20 }}
          raw="l-text,i-Reeleiic,fs-50,lx-150,ly-200,l-end"
        />
      </div>
    </div>
  );
}

export default Inventory;
