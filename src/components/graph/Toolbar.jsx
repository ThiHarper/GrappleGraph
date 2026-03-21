import { Plus, Download, Upload, GitBranch } from 'lucide-react';
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
			className="flex items-center justify-between px-5 py-3 font-inter"
			style={{
				backgroundColor: '#1A1C1E',
				borderBottom: '1px solid #2E3540',
			}}
		>
			{/* Logo */}
			<div className="flex items-center gap-2.5">
				<svg width="28" height="28" viewBox="0 0 52 52" fill="none">
					<circle cx="14" cy="26" r="10" fill="#0056B3" stroke="#00E5FF" strokeWidth="2" />
					<circle cx="38" cy="14" r="8" fill="#0056B3" stroke="#00E5FF" strokeWidth="2" />
					<circle cx="38" cy="38" r="8" fill="#0056B3" stroke="#00E5FF" strokeWidth="2" />
					<line x1="22" y1="22" x2="31" y2="17" stroke="#00E5FF" strokeWidth="2" />
					<line x1="22" y1="30" x2="31" y2="35" stroke="#00E5FF" strokeWidth="2" />
				</svg>
				<span className="font-grotesk font-semibold text-base" style={{ color: '#F0F4F8' }}>
					Grapple<span style={{ color: '#00E5FF' }}>Graph</span>
				</span>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2">
				<button
					onClick={onAddNode}
					className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all"
					style={{
						backgroundColor: '#0056B3',
						color: '#F0F4F8',
						border: '1px solid rgba(0,229,255,0.25)',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#0068D9';
						e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.25)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = '#0056B3';
						e.currentTarget.style.boxShadow = 'none';
					}}
				>
					<Plus size={15} />
					<span>Add Node</span>
				</button>

				<button
					onClick={onExport}
					className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
					style={{
						backgroundColor: '#1E2226',
						color: '#C8D8E8',
						border: '1px solid #2E3540',
					}}
					onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00E5FF'}
					onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2E3540'}
				>
					<Download size={15} />
					<span>Export</span>
				</button>

				<button
					onClick={HandleImportClick}
					className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
					style={{
						backgroundColor: '#1E2226',
						color: '#C8D8E8',
						border: '1px solid #2E3540',
					}}
					onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00E5FF'}
					onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2E3540'}
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