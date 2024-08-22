import { useParams } from "react-router-dom";

function OrderDetails() {
  const params = useParams();

  return <div>{params.id}</div>;
}

export default OrderDetails;
