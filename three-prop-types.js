import PropTypes from 'prop-types';
import { Geometry, Material, Vector3, Euler } from 'three';

export default {
	geometry: PropTypes.instanceOf(Geometry),
	material: PropTypes.instanceOf(Material),
	color: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),

	position: PropTypes.oneOfType([
		PropTypes.instanceOf(Vector3),
		PropTypes.arrayOf(PropTypes.number),
	]),
	rotation: PropTypes.oneOfType([
		PropTypes.instanceOf(Euler),
		PropTypes.arrayOf(PropTypes.number),
	]),
	scale: PropTypes.oneOfType([
		PropTypes.instanceOf(Vector3),
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.number,
	]),
};
