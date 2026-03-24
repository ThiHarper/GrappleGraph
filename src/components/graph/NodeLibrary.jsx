import { useState } from 'react';
import { Search } from 'lucide-react';

const aCategoryOrder = ['Concept', 'Sub-Concept', 'Technique'];

export default function NodeLibrary({ aNodes, onSelectNode, sSelectedID }) {
	const [sSearch, setSSearch] = useState('');

	const sLower = sSearch.toLowerCase();
	const aFiltered = aNodes.filter((oNode) =>
		(oNode.data.sLabel || '').toLowerCase().includes(sLower)
	);

	// Group by category, ordered by aCategoryOrder, alphabetical within
	const oGrouped = {};
	for (let i = 0; i < aCategoryOrder.length; i++) {
		oGrouped[aCategoryOrder[i]] = [];
	}
	for (let i = 0; i < aFiltered.length; i++) {
		const sCat = aFiltered[i].data.sCategory || 'Concept';
		if (!oGrouped[sCat]) { oGrouped[sCat] = []; }
		oGrouped[sCat].push(aFiltered[i]);
	}
	for (let i = 0; i < aCategoryOrder.length; i++) {
		const sCat = aCategoryOrder[i];
		oGrouped[sCat].sort((a, b) => (a.data.sLabel || '').localeCompare(b.data.sLabel || ''));
	}

	return (
		<div className="flex flex-col h-full font-inter" style={{ backgroundColor: '#1A1A1A' }}>
			{/* Search */}
			<div className="px-3 pt-3 pb-2">
				<div
								className="flex items-center gap-2 rounded-lg px-3 py-2"
								style={{ backgroundColor: '#111', border: '1px solid #333' }}
							>
								<Search size={13} style={{ color: '#555', flexShrink: 0 }} />
								<input
									type="text"
									value={sSearch}
									onChange={(e) => setSSearch(e.target.value)}
									placeholder="Search..."
									className="flex-1 bg-transparent outline-none text-sm"
									style={{ color: '#F0F0F0', minHeight: '28px' }}
								/>
								{sSearch && (
									<button onClick={() => setSSearch('')} style={{ color: '#D4AF37', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>✕</button>
								)}
						</div>
		</div>

		{/* Groups */}
			<div className="flex-1 overflow-y-auto px-2 pb-4">
				{aCategoryOrder.map((sCat) => {
					const aGroup = oGrouped[sCat] || [];
					if (aGroup.length === 0) { return null; }
					return (
						<div key={sCat} className="mb-3">
							<div className="px-2 py-1.5">
								<span
									className="text-xs uppercase tracking-widest font-semibold"
									style={{ color: '#D4AF37' }}
								>
									{sCat}
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								{aGroup.map((oNode) => {
									const bSelected = oNode.id === sSelectedID;
									return (
										<button
											key={oNode.id}
											onClick={() => onSelectNode(oNode)}
											className="w-full text-left rounded-lg px-3 py-2.5 flex items-center gap-2 transition-all"
											style={{
												backgroundColor: bSelected ? 'rgba(139,0,0,0.3)' : 'transparent',
												border: bSelected ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
												color: bSelected ? '#F0F0F0' : '#B0B0B0',
												minHeight: '40px',
											}}
											onMouseEnter={(e) => {
												if (!bSelected) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }
											}}
											onMouseLeave={(e) => {
												if (!bSelected) { e.currentTarget.style.backgroundColor = 'transparent'; }
											}}
										>
											<span
												className="flex-shrink-0 rounded-full"
												style={{ width: 6, height: 6, backgroundColor: bSelected ? '#D4AF37' : '#8B0000' }}
											/>
											<span className="text-sm truncate">{oNode.data.sLabel}</span>
											{oNode.data.sYoutubeURL && (
												<span
													className="ml-auto flex-shrink-0 rounded-full"
													style={{ width: 5, height: 5, backgroundColor: '#D4AF37' }}
												/>
											)}
										</button>
									);
								})}
							</div>
						</div>
					);
				})}

				{aFiltered.length === 0 && (
					<div className="flex items-center justify-center py-8">
						<span className="text-sm" style={{ color: '#555' }}>No results</span>
					</div>
				)}
			</div>
		</div>
	);
}