import "../../configs/charjsConfig";
import { Doughnut } from "react-chartjs-2";

import PropTypes from "prop-types";
function DoughnutChart({ data, options, className }) {
  return <Doughnut data={data} options={options} className={className} />;
}
DoughnutChart.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  className: PropTypes.string,
};
export default DoughnutChart;
