import { useEffect } from "react";

function Orders() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return <div>Orders</div>;
}

export default Orders;
