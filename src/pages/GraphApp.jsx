import { useState, useCallback, useEffect } from 'react';
import {
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	addEdge,
	useNodesState,
	useEdgesState,
	BackgroundVariant,
} from '@xyflow/react';

import Toolbar from '../components/graph/Toolbar';
import NodeLibrary from '../components/graph/NodeLibrary';
import DetailDrawer from '../components/graph/DetailDrawer';
import NodeForm from '../components/graph/NodeForm';
import EdgeForm from '../components/graph/EdgeForm';
import GraphNode from '../components/graph/GraphNode';

const oNodeTypes = { graphNode: GraphNode };

const oDefaultNode = {
	id: `node-${crypto.randomUUID()}`,
	type: 'graphNode',
	position: { x: 300, y: 200 },
	data: {
		sLabel: 'Alignment',
		sNotes: 'Alignment is the framework of mechanical efficiency. It is the ability to maximize force generation and absorption through three components: Posture (spinal integrity), Structure (limb positioning), and Base (contact/stability). The key is to maintain your own alignment while systematically breaking your opponent\'s.',
		sYoutubeURL: '',
		sTimestamp: '',
		sCategory: 'Concept',
		sReference: 'Rob Biernacki',
	},
};

function GenerateNodeID() {
	return `node-${crypto.randomUUID()}`;
}

function SaveToLocalStorage(aNodes, aEdges) {
	const oGraphData = { nodes: aNodes, edges: aEdges };
	localStorage.setItem('oGraphData', JSON.stringify(oGraphData));
}

export default function GraphApp() {
	const [aNodes, setNodes, onNodesChange] = useNodesState([]);
	const [aEdges, setEdges, onEdgesChange] = useEdgesState([]);
	const [oSelectedNode, setOSelectedNode] = useState(null);
	const [bShowNodeForm, setBShowNodeForm] = useState(false);
	const [oEditingNode, setOEditingNode] = useState(null);
	const [bShowEdgeForm, setBShowEdgeForm] = useState(false);
	const [bSidebarOpen, setBSidebarOpen] = useState(true);
	const [oSelectedEdge, setOSelectedEdge] = useState(null);
	const [oEdgeClickPos, setOEdgeClickPos] = useState({ x: 0, y: 0 });

	// Auto-Load on mount
	useEffect(() => {
		const sSaved = localStorage.getItem('oGraphData');
		if (sSaved) {
			const oParsed = JSON.parse(sSaved);
			const aLoadedNodes = (oParsed.nodes || []).map((oN) => ({
				...oN,
				data: { ...oN.data, sCategory: oN.data.sCategory || 'Concept' },
			}));
			setNodes(aLoadedNodes);
			setEdges(oParsed.edges || []);
		} else {
			setNodes([oDefaultNode]);
			setEdges([]);
		}
	}, []);

	const onConnect = useCallback(
		(oParams) => {
			setEdges((aE) => {
				const aNew = addEdge({ ...oParams, animated: false }, aE);
				SaveToLocalStorage(aNodes, aNew);
				return aNew;
			});
		},
		[setEdges, aNodes]
	);

	function HandleNodeClick(oEvent, oNode) {
		setOSelectedEdge(null);
		setOSelectedNode(oNode);
	}

	function HandleEdgeClick(oEvent, oEdge) {
		setOSelectedNode(null);
		setOSelectedEdge(oEdge);
		setOEdgeClickPos({ x: oEvent.clientX, y: oEvent.clientY });
	}

	function HandleDeleteSelectedEdge() {
		const sEdgeID = oSelectedEdge.id;
		setEdges((aE) => {
			const aNew = aE.filter((oE) => oE.id !== sEdgeID);
			SaveToLocalStorage(aNodes, aNew);
			return aNew;
		});
		setOSelectedEdge(null);
	}

	function HandlePaneClick() {
		setOSelectedNode(null);
		setOSelectedEdge(null);
	}

	function HandleAddNode() {
		setOEditingNode(null);
		setBShowNodeForm(true);
	}

	function HandleEditNode(oNode) {
		setOEditingNode(oNode);
		setBShowNodeForm(true);
	}

	function HandleDeleteNode(sNodeID) {
		setNodes((aN) => {
			const aNew = aN.filter((oN) => oN.id !== sNodeID);
			setEdges((aE) => {
				const aNewEdges = aE.filter((oE) => oE.source !== sNodeID && oE.target !== sNodeID);
				SaveToLocalStorage(aNew, aNewEdges);
				return aNewEdges;
			});
			return aNew;
		});
		setOSelectedNode(null);
	}

	function HandleNodeFormSave(oData) {
		if (oEditingNode) {
			setNodes((aN) => {
				const aNew = aN.map((oN) =>
					oN.id === oEditingNode.id ? { ...oN, data: { ...oN.data, ...oData } } : oN
				);
				SaveToLocalStorage(aNew, aEdges);
				return aNew;
			});
			setOSelectedNode((oPrev) =>
				oPrev && oPrev.id === oEditingNode.id
					? { ...oPrev, data: { ...oPrev.data, ...oData } }
					: oPrev
			);
		} else {
			const sID = GenerateNodeID();
			const oNewNode = {
				id: sID,
				type: 'graphNode',
				position: { x: 150 + Math.random() * 300, y: 150 + Math.random() * 200 },
				data: oData,
			};
			setNodes((aN) => {
				const aNew = [...aN, oNewNode];
				SaveToLocalStorage(aNew, aEdges);
				return aNew;
			});
		}
		setBShowNodeForm(false);
		setOEditingNode(null);
	}

	function HandleEdgeSave({ sSourceID, sTargetID }) {
		const sEdgeID = `edge-${crypto.randomUUID()}`;
		const oNewEdge = { id: sEdgeID, source: sSourceID, target: sTargetID, animated: false };
		setEdges((aE) => {
			const aNew = [...aE, oNewEdge];
			SaveToLocalStorage(aNodes, aNew);
			return aNew;
		});
		setBShowEdgeForm(false);
	}

	function ExportGraphData() {
		const oGraphData = { nodes: aNodes, edges: aEdges };
		const sJSON = JSON.stringify(oGraphData, null, 2);
		const oBlob = new Blob([sJSON], { type: 'application/json' });
		const sURL = URL.createObjectURL(oBlob);
		const oAnchor = document.createElement('a');
		oAnchor.href = sURL;
		oAnchor.download = 'grapplegraph-library.json';
		oAnchor.click();
		URL.revokeObjectURL(sURL);
	}

	function ImportGraphData(oData) {
		if (oData.nodes && oData.edges) {
			const aImported = oData.nodes.map((oN) => ({
				...oN,
				data: { ...oN.data, sCategory: oN.data.sCategory || 'Concept' },
			}));
			setNodes(aImported);
			setEdges(oData.edges);
			setOSelectedNode(null);
			setOSelectedEdge(null);
			SaveToLocalStorage(aImported, oData.edges);
		}
	}

	function HandleLibrarySelect(oNode) {
		setOSelectedNode(oNode);
		setOSelectedEdge(null);
	}

	const iDrawerWidth = oSelectedNode ? 380 : 0;
	const iSidebarWidth = bSidebarOpen ? 220 : 0;

	return (
		<div
			className="flex flex-col h-screen w-screen overflow-hidden font-inter"
			style={{ backgroundColor: '#121212' }}
		>
			<Toolbar
				onAddNode={HandleAddNode}
				onExport={ExportGraphData}
				onImport={ImportGraphData}
			/>

			<div className="flex flex-1 overflow-hidden relative">
				{/* Sidebar */}
				<div
					className="flex-shrink-0 overflow-hidden transition-all duration-300"
					style={{
						width: iSidebarWidth,
						borderRight: bSidebarOpen ? '1px solid #2A2A2A' : 'none',
					}}
				>
					{bSidebarOpen && (
						<div className="h-full flex flex-col" style={{ backgroundColor: '#1A1A1A' }}>
							<div
								className="flex items-center justify-between px-4 py-3 flex-shrink-0"
								style={{ borderBottom: '1px solid #2A2A2A' }}
							>
								<span className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#D4AF37' }}>
									{aNodes.length} NODES
								</span>
								<button
									onClick={() => setBShowEdgeForm(true)}
									className="text-xs px-2.5 py-1 rounded-lg transition-colors"
									style={{
										backgroundColor: 'rgba(139,0,0,0.2)',
										color: '#D4AF37',
										border: '1px solid rgba(139,0,0,0.4)',
									}}
									onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139,0,0,0.35)'}
									onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(139,0,0,0.2)'}
								>
									+ Link
								</button>
							</div>
							<div className="flex-1 overflow-hidden">
								<NodeLibrary
									aNodes={aNodes}
									onSelectNode={HandleLibrarySelect}
									sSelectedID={oSelectedNode ? oSelectedNode.id : ''}
								/>
							</div>
						</div>
					)}
				</div>

				{/* Toggle sidebar */}
				<button
					onClick={() => setBSidebarOpen((b) => !b)}
					className="absolute z-20 flex items-center justify-center rounded-r-lg transition-all"
					style={{
						left: iSidebarWidth,
						top: '50%',
						transform: 'translateY(-50%)',
						width: 18,
						height: 48,
						backgroundColor: '#2A2A2A',
						border: '1px solid #333',
						borderLeft: 'none',
						color: '#888',
					}}
				>
					<span style={{ fontSize: 10 }}>{bSidebarOpen ? '‹' : '›'}</span>
				</button>

				{/* Graph Canvas */}
				<div className="flex-1 overflow-hidden" style={{ marginRight: iDrawerWidth }}>
					<ReactFlow
						nodes={aNodes}
						edges={aEdges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						onNodeClick={HandleNodeClick}
						onEdgeClick={HandleEdgeClick}
						onPaneClick={HandlePaneClick}
						nodeTypes={oNodeTypes}
						fitView
						style={{ backgroundColor: '#121212' }}
						defaultEdgeOptions={{
							style: { stroke: '#D4AF37', strokeWidth: 2 },
						}}
					>
						<Background
							variant={BackgroundVariant.Dots}
							gap={28}
							size={1}
							color="rgba(212,175,55,0.1)"
						/>
						<Controls />
						<MiniMap
							nodeColor={() => '#8B0000'}
							maskColor="rgba(18,18,18,0.8)"
						/>
					</ReactFlow>
				</div>

				{/* Detail Drawer */}
				{oSelectedNode && (
					<DetailDrawer
						oNode={oSelectedNode}
						onClose={() => setOSelectedNode(null)}
						onEdit={HandleEditNode}
						onDelete={HandleDeleteNode}
					/>
				)}

				{/* Edge Delete Button */}
				{oSelectedEdge && (
					<div
						className="fixed z-50 flex flex-col items-center gap-1"
						style={{ left: oEdgeClickPos.x, top: oEdgeClickPos.y, transform: 'translate(-50%, -120%)' }}
					>
						<button
							onClick={HandleDeleteSelectedEdge}
							className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-lg"
							style={{
								backgroundColor: '#1A1A1A',
								border: '1px solid #D4AF37',
								color: '#D4AF37',
							}}
						>
							✕ Delete Link
						</button>
					</div>
				)}
			</div>

			{/* Node Form Modal */}
			{bShowNodeForm && (
				<NodeForm
					oNode={oEditingNode}
					onSave={HandleNodeFormSave}
					onClose={() => {
						setBShowNodeForm(false);
						setOEditingNode(null);
					}}
				/>
			)}

			{/* Edge Form Modal */}
			{bShowEdgeForm && (
				<EdgeForm
					aNodes={aNodes}
					onSave={HandleEdgeSave}
					onClose={() => setBShowEdgeForm(false)}
				/>
			)}
		</div>
	);
}