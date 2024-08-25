import "../../configs/charjsConfig";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
function BarChart({ data, options, className }) {
  return <Bar className={className} data={data} options={options} />;
}

BarChart.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  className: PropTypes.string,
};
export default BarChart;
