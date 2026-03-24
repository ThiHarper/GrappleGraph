import { Plus, Download, Upload } from 'lucide-react';
import { useRef } from 'react';

export default function Toolbar({ onAddNode, onExport, onImport }) {
	const oFileInputRef = useRef(null);

	function HandleImportClick() {
		oFileInputRef.current.click();
	}

	function HandleFileChange(e) {
		const oFile = e.target.files[0];
		if (!oFile) { return; }
		const oReader = new FileReader();
		oReader.onload = (oEvent) => {
			const oData = JSON.parse(oEvent.target.result);
			onImport(oData);
		};
		oReader.readAsText(oFile);
		e.target.value = '';
	}

	return (
		<div
			className="flex items-center justify-between px-5 py-3 font-inter flex-shrink-0"
			style={{ backgroundColor: '#111', borderBottom: '1px solid #2A2A2A' }}
		>
			{/* Logo */}
			<div className="flex items-center gap-2.5">
				<svg width="28" height="28" viewBox="0 0 52 52" fill="none">
					<circle cx="14" cy="26" r="10" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
					<circle cx="38" cy="14" r="8" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
					<circle cx="38" cy="38" r="8" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
					<line x1="22" y1="22" x2="31" y2="17" stroke="#D4AF37" strokeWidth="2" />
					<line x1="22" y1="30" x2="31" y2="35" stroke="#D4AF37" strokeWidth="2" />
				</svg>
				<span className="font-grotesk font-semibold text-base" style={{ color: '#F0F0F0' }}>
					Grapple<span style={{ color: '#D4AF37' }}>Graph</span>
				</span>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2">
				<button
					onClick={onAddNode}
					className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all"
					style={{
						backgroundColor: '#8B0000',
						color: '#F0F0F0',
						border: '1px solid rgba(212,175,55,0.3)',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#A50000';
						e.currentTarget.style.boxShadow = '0 0 14px rgba(212,175,55,0.2)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = '#8B0000';
						e.currentTarget.style.boxShadow = 'none';
					}}
				>
					<Plus size={15} />
					<span>Add Node</span>
				</button>

				<button
					onClick={onExport}
					className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
					style={{ backgroundColor: '#1A1A1A', color: '#C0C0C0', border: '1px solid #333' }}
					onMouseEnter={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
					onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
				>
					<Download size={15} />
					<span>Export</span>
				</button>

				<button
					onClick={HandleImportClick}
					className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
					style={{ backgroundColor: '#1A1A1A', color: '#C0C0C0', border: '1px solid #333' }}
					onMouseEnter={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
					onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
				>
					<Upload size={15} />
					<span>Import</span>
				</button>

				<input
					ref={oFileInputRef}
					type="file"
					accept=".json"
					className="hidden"
					onChange={HandleFileChange}
				/>
			</div>
		</div>
	);
}