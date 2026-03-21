import { useState } from 'react';
import { X } from 'lucide-react';

export default function EdgeForm({ aNodes, oEdge, onSave, onClose }) {
	const [sSourceID, setSSourceID] = useState(oEdge ? oEdge.source : '');
	const [sTargetID, setSTargetID] = useState(oEdge ? oEdge.target : '');

	function HandleSubmit(e) {
		e.preventDefault();
		if (!sSourceID || !sTargetID || sSourceID === sTargetID) { return; }
		onSave({ sSourceID, sTargetID });
	}

	const sSelectStyle = {
		backgroundColor: '#14171A',
		border: '1px solid #2E3540',
		color: '#F0F4F8',
		borderRadius: 8,
		padding: '10px 12px',
		width: '100%',
		fontSize: 14,
		outline: 'none',
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
		>
			<div
				className="relative w-full max-w-sm rounded-2xl p-6 font-inter"
				style={{
					backgroundColor: '#1E2226',
					border: '1px solid #2E3540',
					boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
				}}
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="font-grotesk font-semibold text-lg" style={{ color: '#F0F4F8' }}>
						Add Connection
					</h2>
					<button
						onClick={onClose}
						className="rounded-lg p-1.5 transition-colors"
						style={{ color: '#8899AA' }}
						onMouseEnter={(e) => e.currentTarget.style.color = '#00E5FF'}
						onMouseLeave={(e) => e.currentTarget.style.color = '#8899AA'}
					>
						<X size={18} />
					</button>
				</div>

				<form onSubmit={HandleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8899AA' }}>
							From Node
						</label>
						<select
							value={sSourceID}
							onChange={(e) => setSSourceID(e.target.value)}
							required
							style={sSelectStyle}
						>
							<option value="">Select source...</option>
							{aNodes.map((oNode) => (
								<option key={oNode.id} value={oNode.id}>
									{oNode.data.sLabel}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8899AA' }}>
							To Node
						</label>
						<select
							value={sTargetID}
							onChange={(e) => setSTargetID(e.target.value)}
							required
							style={sSelectStyle}
						>
							<option value="">Select target...</option>
							{aNodes.map((oNode) => (
								<option key={oNode.id} value={oNode.id}>
									{oNode.data.sLabel}
								</option>
							))}
						</select>
					</div>

					<div className="flex gap-3 mt-2">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-lg py-2.5 text-sm font-medium"
							style={{
								backgroundColor: '#2A2E33',
								color: '#8899AA',
								border: '1px solid #2E3540',
							}}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all"
							style={{
								backgroundColor: '#0056B3',
								color: '#F0F4F8',
								border: '1px solid rgba(0,229,255,0.3)',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = '#0068D9';
								e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.3)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = '#0056B3';
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