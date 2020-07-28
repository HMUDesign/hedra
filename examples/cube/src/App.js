import React from 'react';

import { Scene, AmbientLight, DirectionalLight } from '@hmudesign/hedra';
import Cube from './Cube';

export default function App() {
	return (
		<Scene
			stats
			resize
			camera={[ 0, 0, 2 ]}
		>
			<AmbientLight
				name="Ambient light"
				color="white"
				intensity={0.2}
			/>
			<DirectionalLight
				name="Key light"
				helper

				color="white"
				intensity={0.7}
				position={[ -8, 6, 8 ]}
			/>
			<DirectionalLight
				name="Fill light"
				helper

				color="white"
				intensity={0.3}
				position={[ 8, 4, 4 ]}
			/>
			<DirectionalLight
				name="Back light"
				helper

				color="white"
				intensity={0.6}
				position={[ -2, 8, -8 ]}
			/>

			<Cube size={0.25} position={[ 0, 0.5, 0 ]} />
			<Cube size={0.25} scale={-2} />
		</Scene>
	);
}
