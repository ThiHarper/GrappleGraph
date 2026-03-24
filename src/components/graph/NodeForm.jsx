import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const aCategoryOptions = ['Concept', 'Sub-Concept', 'Technique'];

const sInputStyle = {
	backgroundColor: '#111',
	border: '1px solid #333',
	color: '#F0F0F0',
	borderRadius: 8,
	padding: '10px 12px',
	fontSize: 14,
	width: '100%',
	outline: 'none',
	minHeight: '44px',
};

export default function NodeForm({ oNode, onSave, onClose }) {
	const [sLabel, setSLabel] = useState('');
	const [sCategory, setSCategory] = useState('Concept');
	const [sNotes, setSNotes] = useState('');
	const [sYoutubeURL, setSYoutubeURL] = useState('');
	const [sTimestamp, setSTimestamp] = useState('');
	const [sReference, setSReference] = useState('');

	useEffect(() => {
		if (oNode) {
			setSLabel(oNode.data.sLabel || '');
			setSCategory(oNode.data.sCategory || 'Concept');
			setSNotes(oNode.data.sNotes || '');
			setSYoutubeURL(oNode.data.sYoutubeURL || '');
			setSTimestamp(oNode.data.sTimestamp || '');
			setSReference(oNode.data.sReference || '');
		} else {
			setSLabel('');
			setSCategory('Concept');
			setSNotes('');
				setSYoutubeURL('');
			setSTimestamp('');
			setSReference('');
		}
	}, [oNode]);

	function HandleSubmit(e) {
		e.preventDefault();
		if (!sLabel.trim()) { return; }
		onSave({
			sLabel: sLabel.trim(),
			sCategory: sCategory,
			sNotes: sNotes.trim(),
			sYoutubeURL: sYoutubeURL.trim(),
			sTimestamp: sTimestamp.trim(),
			sReference: sReference.trim(),
		});
	}

	function HandleFocus(e) { e.target.style.borderColor = '#D4AF37'; }
	function HandleBlur(e) { e.target.style.borderColor = '#333'; }

	const sTitle = oNode ? 'Edit Node' : 'Add Node';

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center px-4"
			style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
		>
			<div
				className="relative w-full max-w-md rounded-2xl p-6 font-inter"
				style={{
					backgroundColor: '#1A1A1A',
					border: '1px solid #2A2A2A',
					boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
				}}
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="font-grotesk font-semibold text-lg" style={{ color: '#F0F0F0' }}>
						{sTitle}
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
					{/* Label */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							Label <span style={{ color: '#D4AF37' }}>*</span>
						</label>
						<input
							type="text"
							value={sLabel}
							onChange={(e) => setSLabel(e.target.value)}
							placeholder="e.g. Armbar from Guard"
							required
							style={sInputStyle}
							onFocus={HandleFocus}
							onBlur={HandleBlur}
						/>
					</div>

					{/* Category */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							Category
						</label>
						<select
							value={sCategory}
							onChange={(e) => setSCategory(e.target.value)}
							style={{ ...sInputStyle, appearance: 'none', cursor: 'pointer' }}
							onFocus={HandleFocus}
							onBlur={HandleBlur}
						>
							{aCategoryOptions.map((sCat) => (
								<option key={sCat} value={sCat}>{sCat}</option>
							))}
						</select>
					</div>

					{/* Notes */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							Notes
						</label>
						<textarea
							value={sNotes}
							onChange={(e) => setSNotes(e.target.value)}
							placeholder="Key details, concepts, or tips..."
							rows={3}
							style={{ ...sInputStyle, resize: 'none', minHeight: 'unset' }}
							onFocus={HandleFocus}
							onBlur={HandleBlur}
						/>
					</div>

					{/* YouTube URL */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							YouTube URL
						</label>
						<input
							type="text"
							value={sYoutubeURL}
							onChange={(e) => setSYoutubeURL(e.target.value)}
							placeholder="https://www.youtube.com/watch?v=..."
							style={sInputStyle}
							onFocus={HandleFocus}
							onBlur={HandleBlur}
						/>
					</div>

					{/* Timestamp */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							Timestamp
							<span className="ml-2 normal-case font-normal" style={{ color: '#555' }}>
								(seconds or m:ss)
							</span>
						</label>
						<input
							type="text"
							value={sTimestamp}
							onChange={(e) => setSTimestamp(e.target.value)}
							placeholder="120 or 2:00"
							style={sInputStyle}
							onFocus={HandleFocus}
							onBlur={HandleBlur}
						/>
					</div>

					{/* Reference */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>
							Reference / Source
						</label>
						<input
							type="text"
							value={sReference}
							onChange={(e) => setSReference(e.target.value)}
							placeholder="e.g. Rob Biernacki"
							style={sInputStyle}
							onFocus={HandleFocus}
							onBlur={HandleBlur}
						/>
					</div>

					{/* Buttons */}
					<div className="flex gap-3 mt-2">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-lg py-3 text-sm font-medium transition-colors"
							style={{
								backgroundColor: '#222',
								color: '#888',
								border: '1px solid #333',
							}}
							onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A2A2A'}
							onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#222'}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 rounded-lg py-3 text-sm font-semibold transition-all"
							style={{
								backgroundColor: '#8B0000',
								color: '#F0F0F0',
								border: '1px solid rgba(212,175,55,0.3)',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = '#A50000';
								e.currentTarget.style.boxShadow = '0 0 16px rgba(212,175,55,0.2)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = '#8B0000';
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