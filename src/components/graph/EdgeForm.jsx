import { useState } from 'react';
import { X } from 'lucide-react';

const sSelectStyle = {
	backgroundColor: '#111',
	border: '1px solid #333',
	color: '#F0F0F0',
	borderRadius: 8,
	padding: '12px',
	width: '100%',
	fontSize: 14,
	outline: 'none',
	minHeight: '44px',
};

export default function EdgeForm({ aNodes, onSave, onClose }) {
	const [sSourceID, setSSourceID] = useState('');
	const [sTargetID, setSTargetID] = useState('');

	function HandleSubmit(e) {
		e.preventDefault();
		if (!sSourceID || !sTargetID || sSourceID === sTargetID) { return; }
		onSave({ sSourceID, sTargetID });
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center px-4"
			style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
		>
			<div
				className="relative w-full max-w-sm rounded-2xl p-6 font-inter"
				style={{
					backgroundColor: '#1A1A1A',
					border: '1px solid #2A2A2A',
					boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
				}}
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="font-grotesk font-semibold text-lg" style={{ color: '#F0F0F0' }}>
						Add Connection
					</h2>
					<button
						onClick={onClose}
						className="rounded-lg p-2 transition-colors"
						style={{ color: '#888' }}
						onMouseEnter={(e) => e.currentTarget.style.color = '#D4AF37'}
						onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
					>
						<X size={18} />
					</button>
				</div>

				<form onSubmit={HandleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							From Node
						</label>
						<select value={sSourceID} onChange={(e) => setSSourceID(e.target.value)} required style={sSelectStyle}>
							<option value="">Select source...</option>
							{aNodes.map((oNode) => (
								<option key={oNode.id} value={oNode.id}>{oNode.data.sLabel}</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							To Node
						</label>
						<select value={sTargetID} onChange={(e) => setSTargetID(e.target.value)} required style={sSelectStyle}>
							<option value="">Select target...</option>
							{aNodes.map((oNode) => (
								<option key={oNode.id} value={oNode.id}>{oNode.data.sLabel}</option>
							))}
						</select>
					</div>

					<div className="flex gap-3 mt-2">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-lg py-3 text-sm font-medium"
							style={{ backgroundColor: '#222', color: '#888', border: '1px solid #333' }}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 rounded-lg py-3 text-sm font-semibold transition-all"
							style={{ backgroundColor: '#8B0000', color: '#F0F0F0', border: '1px solid rgba(212,175,55,0.3)' }}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = '#A50000';
								e.currentTarget.style.boxShadow = '0 0 16px rgba(212,175,55,0.2)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = '#8B0000';
								e.currentTarget.style.boxShadow = 'none';
							}}
						>
							Connect
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}