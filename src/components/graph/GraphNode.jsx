import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

const oCategoryColors = {
	'Concept': '#8B0000',
	'Sub-Concept': '#B45309',
	'Technique': '#404040',
};

function GraphNode({ data, selected }) {
	const sBgColor = oCategoryColors[data.sCategory] || '#8B0000';
	const sBgSelected = data.sCategory === 'Sub-Concept' ? '#c96010' : data.sCategory === 'Technique' ? '#555' : '#A50000';
	return (
		<div
			className="relative flex items-center justify-center rounded-xl font-inter font-medium text-sm transition-all duration-200"
			style={{
				minWidth: 130,
				maxWidth: 180,
				padding: '10px 16px',
				backgroundColor: selected ? sBgSelected : sBgColor,
				color: '#F0F0F0',
				border: selected ? '2px solid #D4AF37' : '2px solid rgba(212,175,55,0.35)',
				boxShadow: selected
					? '0 0 20px rgba(212,175,55,0.45), 0 4px 16px rgba(0,0,0,0.6)'
					: '0 4px 12px rgba(0,0,0,0.5)',
				cursor: 'pointer',
				textAlign: 'center',
				lineHeight: 1.3,
				wordBreak: 'break-word',
			}}
		>
			<Handle type="target" position={Position.Top} style={{ top: -6 }} />
			<span>{data.sLabel}</span>
			{data.sYoutubeURL && (
				<span
					className="absolute top-1 right-1 rounded-full flex items-center justify-center"
					style={{ width: 8, height: 8, backgroundColor: '#D4AF37' }}
				/>
			)}
			<Handle type="source" position={Position.Bottom} style={{ bottom: -6 }} />
		</div>
	);
}

export default memo(GraphNode);