import "../../configs/charjsConfig";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ data, options, clasName }) {
  return <Doughnut data={data} options={options} className={clasName} />;
}

export default DoughnutChart;
