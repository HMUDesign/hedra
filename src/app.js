import React, { Component } from 'react';
import { HedraScene } from '@hmudesign/hedra';

import Cube from './cube';

export default class App extends Component {
	render() {
		return (
			<HedraScene
				stats
				fullscreen
				camera={[ 0, 0, 2 ]}
			>
				<Cube size={0.25} position={[ 0, 0.5, 0 ]} />
				<Cube size={0.25} scale={-2} />
			</HedraScene>
		);
	}
}
