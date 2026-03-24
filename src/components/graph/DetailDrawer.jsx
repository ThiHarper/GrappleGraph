import { X, Youtube, FileText } from 'lucide-react';

function ConvertTimeToSeconds(sTimestamp) {
	if (!sTimestamp) { return 0; }
	const sTrimmed = String(sTimestamp).trim();
	if (sTrimmed.includes(':')) {
		const aParts = sTrimmed.split(':');
		const iMinutes = parseInt(aParts[0], 10) || 0;
		const iSeconds = parseInt(aParts[1], 10) || 0;
		return (iMinutes * 60) + iSeconds;
	}
	const nParsed = parseInt(sTrimmed, 10);
	return isNaN(nParsed) ? 0 : nParsed;
}

function BuildEmbedURL(sYoutubeURL, sTimestamp) {
	if (!sYoutubeURL) { return null; }
	let sVideoID = '';
	if (sYoutubeURL.includes('youtu.be/')) {
		const aParts = sYoutubeURL.split('youtu.be/');
		sVideoID = aParts[1] ? aParts[1].split('?')[0] : '';
	} else if (sYoutubeURL.includes('v=')) {
		const aParts = sYoutubeURL.split('v=');
		sVideoID = aParts[1] ? aParts[1].split('&')[0] : '';
	} else if (sYoutubeURL.includes('embed/')) {
		const aParts = sYoutubeURL.split('embed/');
		sVideoID = aParts[1] ? aParts[1].split('?')[0] : '';
	}
	if (!sVideoID) { return null; }
	const iStart = sTimestamp ? ConvertTimeToSeconds(sTimestamp) : 0;
	let sEmbedURL = `https://www.youtube.com/embed/${sVideoID}?rel=0&modestbranding=1`;
	if (iStart > 0) { sEmbedURL += `&start=${iStart}`; }
	return sEmbedURL;
}

export default function DetailDrawer({ oNode, onClose, onEdit, onDelete }) {
	if (!oNode) { return null; }
	const { sLabel, sNotes, sYoutubeURL, sTimestamp, sCategory } = oNode.data;
	const sEmbedURL = BuildEmbedURL(sYoutubeURL, sTimestamp);

	return (
		<div
			className="fixed right-0 top-0 h-full z-40 flex flex-col font-inter overflow-y-auto"
			style={{
				width: 380,
				backgroundColor: '#1A1A1A',
				borderLeft: '1px solid #2A2A2A',
				boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
			}}
		>
			{/* Header */}
			<div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #2A2A2A' }}>
				<div className="flex flex-col gap-0.5">
					<div className="flex items-center gap-2">
						<span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#888' }}>
							Technique
						</span>
						{sCategory && (
							<span
								className="text-xs px-2 py-0.5 rounded-full font-medium"
								style={{
									backgroundColor: 'rgba(212,175,55,0.15)',
									color: '#D4AF37',
									border: '1px solid rgba(212,175,55,0.3)',
								}}
							>
								{sCategory}
							</span>
						)}
					</div>
					<h2 className="font-grotesk font-semibold text-base" style={{ color: '#F0F0F0' }}>
						{sLabel}
					</h2>
				</div>
				<button
					onClick={onClose}
					className="rounded-lg p-1.5 transition-colors"
					style={{ color: '#888' }}
					onMouseEnter={(e) => e.currentTarget.style.color = '#D4AF37'}
					onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
				>
					<X size={18} />
				</button>
			</div>

			{/* Video embed */}
			<div className="px-5 pt-5">
				{sEmbedURL ? (
					<div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid #2A2A2A' }}>
						<iframe
							src={sEmbedURL}
							title={sLabel}
							className="w-full h-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				) : (
					<div
						className="w-full rounded-xl flex flex-col items-center justify-center gap-2"
						style={{ aspectRatio: '16/9', backgroundColor: '#111', border: '1px dashed #2A2A2A' }}
					>
						<Youtube size={28} style={{ color: '#333' }} />
						<span className="text-xs" style={{ color: '#444' }}>No video linked</span>
					</div>
				)}
			</div>

			{/* Notes */}
			{sNotes && (
				<div className="px-5 pt-5">
					<div className="rounded-xl p-4" style={{ backgroundColor: '#111', border: '1px solid #2A2A2A' }}>
						<div className="flex items-center gap-2 mb-2">
							<FileText size={14} style={{ color: '#D4AF37' }} />
							<span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#888' }}>
								Notes
							</span>
						</div>
						<p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#C0C0C0' }}>
							{sNotes}
						</p>
					</div>
				</div>
			)}

			{/* Action buttons */}
			<div className="px-5 pt-5 flex gap-3">
				<button
					onClick={() => onEdit(oNode)}
					className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-all"
					style={{ backgroundColor: '#8B0000', color: '#F0F0F0', border: '1px solid rgba(212,175,55,0.25)' }}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#A50000';
						e.currentTarget.style.boxShadow = '0 0 16px rgba(212,175,55,0.2)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = '#8B0000';
						e.currentTarget.style.boxShadow = 'none';
					}}
				>
					Edit Node
				</button>
				<button
					onClick={() => onDelete(oNode.id)}
					className="flex-1 rounded-lg py-2.5 text-sm font-medium transition-all"
					style={{ backgroundColor: 'rgba(220,38,38,0.12)', color: '#F87171', border: '1px solid rgba(220,38,38,0.25)' }}
					onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.22)'}
					onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.12)'}
				>
					Delete Node
				</button>
			</div>

			{/* Timestamp */}
			{sTimestamp && (
				<div className="px-5 pt-4 pb-6">
					<span className="text-xs" style={{ color: '#444' }}>
						Starts at: <span style={{ color: '#888' }}>{sTimestamp}</span>
					</span>
				</div>
			)}
		</div>
	);
}