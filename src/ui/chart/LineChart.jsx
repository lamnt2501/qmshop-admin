import "../../configs/charjsConfig";
import { Line } from "react-chartjs-2";
function LineChart({ className, options, data }) {
  return <Line className={className} data={data} options={options}></Line>;
}

export default LineChart;
