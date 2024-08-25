import "../../configs/charjsConfig";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
function LineChart({ className, options, data }) {
  return <Line className={className} data={data} options={options}></Line>;
}
LineChart.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  className: PropTypes.string,
};
export default LineChart;
