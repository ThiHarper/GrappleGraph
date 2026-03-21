import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NodeForm({ oNode, onSave, onClose }) {
	const [sLabel, setSLabel] = useState('');
	const [sNotes, setSNotes] = useState('');
	const [sYoutubeURL, setSYoutubeURL] = useState('');
	const [sTimestamp, setSTimestamp] = useState('');

	useEffect(() => {
		if (oNode) {
			setSLabel(oNode.data.sLabel || '');
			setSNotes(oNode.data.sNotes || '');
			setSYoutubeURL(oNode.data.sYoutubeURL || '');
			setSTimestamp(oNode.data.sTimestamp || '');
		} else {
			setSLabel('');
			setSNotes('');
			setSYoutubeURL('');
			setSTimestamp('');
		}
	}, [oNode]);

	function HandleSubmit(e) {
		e.preventDefault();
		if (!sLabel.trim()) { return; }
		onSave({
			sLabel: sLabel.trim(),
			sNotes: sNotes.trim(),
			sYoutubeURL: sYoutubeURL.trim(),
			sTimestamp: sTimestamp.trim(),
		});
	}

	const sTitle = oNode ? 'Edit Node' : 'Add Node';

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
		>
			<div
				className="relative w-full max-w-md rounded-2xl p-6 font-inter"
				style={{
					backgroundColor: '#1E2226',
					border: '1px solid #2E3540',
					boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
				}}
			>
				<div className="flex items-center justify-between mb-6">
					<h2
						className="font-grotesk font-semibold text-lg"
						style={{ color: '#F0F4F8' }}
					>
						{sTitle}
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
							Label <span style={{ color: '#00E5FF' }}>*</span>
						</label>
						<input
							type="text"
							value={sLabel}
							onChange={(e) => setSLabel(e.target.value)}
							placeholder="e.g. Armbar from Guard"
							required
							className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
							style={{
								backgroundColor: '#14171A',
								border: '1px solid #2E3540',
								color: '#F0F4F8',
							}}
							onFocus={(e) => e.target.style.borderColor = '#00E5FF'}
							onBlur={(e) => e.target.style.borderColor = '#2E3540'}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8899AA' }}>
							Notes
						</label>
						<textarea
							value={sNotes}
							onChange={(e) => setSNotes(e.target.value)}
							placeholder="Key details, concepts, or tips..."
							rows={3}
							className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all resize-none"
							style={{
								backgroundColor: '#14171A',
								border: '1px solid #2E3540',
								color: '#F0F4F8',
							}}
							onFocus={(e) => e.target.style.borderColor = '#00E5FF'}
							onBlur={(e) => e.target.style.borderColor = '#2E3540'}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8899AA' }}>
							YouTube URL
						</label>
						<input
							type="text"
							value={sYoutubeURL}
							onChange={(e) => setSYoutubeURL(e.target.value)}
							placeholder="https://www.youtube.com/watch?v=..."
							className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
							style={{
								backgroundColor: '#14171A',
								border: '1px solid #2E3540',
								color: '#F0F4F8',
							}}
							onFocus={(e) => e.target.style.borderColor = '#00E5FF'}
							onBlur={(e) => e.target.style.borderColor = '#2E3540'}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8899AA' }}>
							Timestamp
							<span className="ml-2 normal-case font-normal" style={{ color: '#556677' }}>
								(seconds or m:ss)
							</span>
						</label>
						<input
							type="text"
							value={sTimestamp}
							onChange={(e) => setSTimestamp(e.target.value)}
							placeholder="120 or 2:00"
							className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
							style={{
								backgroundColor: '#14171A',
								border: '1px solid #2E3540',
								color: '#F0F4F8',
							}}
							onFocus={(e) => e.target.style.borderColor = '#00E5FF'}
							onBlur={(e) => e.target.style.borderColor = '#2E3540'}
						/>
					</div>

					<div className="flex gap-3 mt-2">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors"
							style={{
								backgroundColor: '#2A2E33',
								color: '#8899AA',
								border: '1px solid #2E3540',
							}}
							onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333840'}
							onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2A2E33'}
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
							{oNode ? 'Save Changes' : 'Add Node'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}