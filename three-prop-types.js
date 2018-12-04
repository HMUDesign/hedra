import PropTypes from 'prop-types';
import { Object3D, Geometry, BufferGeometry, Material, Vector3, Euler } from 'three';

export default {
	object3d: PropTypes.instanceOf(Object3D),
	geometry: PropTypes.oneOfType([
		PropTypes.instanceOf(Geometry),
		PropTypes.instanceOf(BufferGeometry),
	]),
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
