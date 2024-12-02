import React, {FC} from 'react';
import InfoAlert from './InfoAlert';

const EmptyList: FC<{message: string}> = ({message}) => {
	return <InfoAlert message={message} />;
};

export default EmptyList;
