import { useNavigate } from "react-router-dom";
import { useSubscription } from "react-stomp-hooks";
import { toast } from "react-toastify";

function SubscribeComponent() {
  const navigate = useNavigate();
  useSubscription("/topic/notify/order", (message) => {
    toast.info(message.body);
    setTimeout(() => {
      navigate(0);
    }, 3000);
  });
  return null;
}

export default SubscribeComponent;
