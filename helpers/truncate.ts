interface Trunc {
	text: string;
	length: number;
}

export function truncateText({ text, length }: Trunc) {
	if (text.length > length) {
		return text.slice(0, length) + '...';
	}
	return text;
}
