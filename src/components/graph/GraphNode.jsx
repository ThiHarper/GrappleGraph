import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

function GraphNode({ data, selected }) {
	return (
		<div
			className="relative flex items-center justify-center rounded-xl font-inter font-medium text-sm transition-all duration-200"
			style={{
				minWidth: 130,
				maxWidth: 180,
				padding: '10px 16px',
				backgroundColor: selected ? '#0068D9' : '#0056B3',
				color: '#F0F4F8',
				border: selected ? '2px solid #00E5FF' : '2px solid rgba(0,229,255,0.35)',
				boxShadow: selected
					? '0 0 20px rgba(0,229,255,0.45), 0 4px 16px rgba(0,0,0,0.5)'
					: '0 0 10px rgba(0,86,179,0.4), 0 4px 12px rgba(0,0,0,0.4)',
				cursor: 'pointer',
				textAlign: 'center',
				lineHeight: 1.3,
				wordBreak: 'break-word',
			}}
		>
			<Handle
				type="target"
				position={Position.Top}
				style={{ top: -6 }}
			/>
			<span>{data.sLabel}</span>
			{data.sYoutubeURL && (
				<span
					className="absolute top-1 right-1 rounded-full flex items-center justify-center"
					style={{
						width: 8,
						height: 8,
						backgroundColor: '#00E5FF',
					}}
				/>
			)}
			<Handle
				type="source"
				position={Position.Bottom}
				style={{ bottom: -6 }}
			/>
		</div>
	);
}

export default memo(GraphNode);