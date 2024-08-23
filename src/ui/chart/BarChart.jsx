import "../../configs/charjsConfig";
import { Bar } from "react-chartjs-2";
function BarChart({ data, options, className }) {
  return <Bar className={className} data={data} options={options} />;
}

export default BarChart;
