import {Progress, ProgressFilledTrack} from '@gluestack-ui/themed';
import React, {FC} from 'react';
import {primaryColor} from '../../constants/Colors';

const ProgressTrack: FC<{progress: number}> = ({progress}) => {
	return (
		<Progress value={progress * 100} w={300} size='md'>
			<ProgressFilledTrack bgColor={primaryColor} />
		</Progress>
	);
};

export default ProgressTrack;
