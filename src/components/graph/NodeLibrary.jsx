import { useState } from 'react';
import { Search, Circle } from 'lucide-react';

export default function NodeLibrary({ aNodes, onSelectNode, sSelectedID }) {
	const [sSearch, setSSearch] = useState('');

	const aFiltered = aNodes.filter((oNode) => {
		const sLower = sSearch.toLowerCase();
		return oNode.data.sLabel.toLowerCase().includes(sLower);
	});

	return (
		<div
			className="flex flex-col h-full font-inter"
			style={{ backgroundColor: '#1E2226' }}
		>
			<div className="px-4 pt-4 pb-3">
				<div
					className="flex items-center gap-2 rounded-lg px-3 py-2"
					style={{
						backgroundColor: '#14171A',
						border: '1px solid #2E3540',
					}}
				>
					<Search size={14} style={{ color: '#556677', flexShrink: 0 }} />
					<input
						type="text"
						value={sSearch}
						onChange={(e) => setSSearch(e.target.value)}
						placeholder="Search nodes..."
						className="flex-1 bg-transparent outline-none text-sm"
						style={{ color: '#F0F4F8' }}
					/>
				</div>
			</div>

			<div className="px-4 pb-2">
				<span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#556677' }}>
					{aFiltered.length} {aFiltered.length === 1 ? 'technique' : 'techniques'}
				</span>
			</div>

			<div className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-1">
				{aFiltered.length === 0 && (
					<div className="flex items-center justify-center py-8">
						<span className="text-sm" style={{ color: '#556677' }}>No results</span>
					</div>
				)}
				{aFiltered.map((oNode) => {
					const bSelected = oNode.id === sSelectedID;
					return (
						<button
							key={oNode.id}
							onClick={() => onSelectNode(oNode)}
							className="w-full text-left rounded-lg px-3 py-2.5 flex items-center gap-2.5 transition-all"
							style={{
								backgroundColor: bSelected ? 'rgba(0,86,179,0.25)' : 'transparent',
								border: bSelected ? '1px solid rgba(0,229,255,0.25)' : '1px solid transparent',
								color: bSelected ? '#F0F4F8' : '#C8D8E8',
							}}
							onMouseEnter={(e) => {
								if (!bSelected) {
									e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
								}
							}}
							onMouseLeave={(e) => {
								if (!bSelected) {
									e.currentTarget.style.backgroundColor = 'transparent';
								}
							}}
						>
							<Circle
								size={7}
								fill={bSelected ? '#00E5FF' : '#0056B3'}
								style={{ color: bSelected ? '#00E5FF' : '#0056B3', flexShrink: 0 }}
							/>
							<span className="text-sm truncate">{oNode.data.sLabel}</span>
							{oNode.data.sYoutubeURL && (
								<span
									className="ml-auto rounded-full flex-shrink-0"
									style={{ width: 6, height: 6, backgroundColor: '#00E5FF' }}
								/>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}