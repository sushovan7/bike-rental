import { useEffect } from "react";

function Inventory() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return <div>Inventory</div>;
}

export default Inventory;
