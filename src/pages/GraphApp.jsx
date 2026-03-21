import { useState, useCallback, useRef } from 'react';
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

const aInitialNodes = [
	{
		id: 'node-1',
		type: 'graphNode',
		position: { x: 300, y: 200 },
		data: {
			sLabel: 'Alignment',
			sNotes: 'The foundation of all BJJ movement. Proper spine alignment controls posture, base, and leverage.',
			sYoutubeURL: '',
			sTimestamp: '',
		},
	},
];

const aInitialEdges = [];

let iNodeCounter = 2;

function GenerateNodeID() {
	const sID = `node-${iNodeCounter}`;
	iNodeCounter++;
	return sID;
}

export default function GraphApp() {
	const [aNodes, setNodes, onNodesChange] = useNodesState(aInitialNodes);
	const [aEdges, setEdges, onEdgesChange] = useEdgesState(aInitialEdges);

	const [oSelectedNode, setOSelectedNode] = useState(null);
	const [bShowNodeForm, setBShowNodeForm] = useState(false);
	const [oEditingNode, setOEditingNode] = useState(null);
	const [bShowEdgeForm, setBShowEdgeForm] = useState(false);
	const [bSidebarOpen, setBSidebarOpen] = useState(true);

	const onConnect = useCallback(
		(oParams) => setEdges((aE) => addEdge({ ...oParams, animated: false }, aE)),
		[setEdges]
	);

	function HandleNodeClick(oEvent, oNode) {
		setOSelectedNode(oNode);
	}

	function HandlePaneClick() {
		setOSelectedNode(null);
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
		setNodes((aN) => aN.filter((oN) => oN.id !== sNodeID));
		setEdges((aE) => aE.filter((oE) => oE.source !== sNodeID && oE.target !== sNodeID));
		setOSelectedNode(null);
	}

	function HandleNodeFormSave(oData) {
		if (oEditingNode) {
			setNodes((aN) =>
				aN.map((oN) =>
					oN.id === oEditingNode.id
						? { ...oN, data: { ...oN.data, ...oData } }
						: oN
				)
			);
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
			setNodes((aN) => [...aN, oNewNode]);
		}
		setBShowNodeForm(false);
		setOEditingNode(null);
	}

	function HandleEdgeSave({ sSourceID, sTargetID }) {
		const sEdgeID = `edge-${sSourceID}-${sTargetID}-${Date.now()}`;
		const oNewEdge = {
			id: sEdgeID,
			source: sSourceID,
			target: sTargetID,
			animated: false,
		};
		setEdges((aE) => [...aE, oNewEdge]);
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
			setNodes(oData.nodes);
			setEdges(oData.edges);
			setOSelectedNode(null);
		}
	}

	function HandleLibrarySelect(oNode) {
		setOSelectedNode(oNode);
	}

	const iDrawerWidth = oSelectedNode ? 380 : 0;
	const iSidebarWidth = bSidebarOpen ? 220 : 0;

	return (
		<div
			className="flex flex-col h-screen w-screen overflow-hidden font-inter"
			style={{ backgroundColor: '#1A1C1E' }}
		>
			<Toolbar
				onAddNode={HandleAddNode}
				onExport={ExportGraphData}
				onImport={ImportGraphData}
			/>

			<div className="flex flex-1 overflow-hidden relative">
				{/* Sidebar - Node Library */}
				<div
					className="flex-shrink-0 overflow-hidden transition-all duration-300"
					style={{
						width: iSidebarWidth,
						borderRight: bSidebarOpen ? '1px solid #2E3540' : 'none',
					}}
				>
					{bSidebarOpen && (
						<div className="h-full">
							<div
								className="flex items-center justify-between px-4 py-3"
								style={{ borderBottom: '1px solid #2E3540' }}
							>
								<span className="text-xs uppercase tracking-widest font-medium" style={{ color: '#556677' }}>
									Library
								</span>
								<button
									onClick={() => setBShowEdgeForm(true)}
									className="text-xs px-2.5 py-1 rounded-lg transition-colors"
									style={{
										backgroundColor: 'rgba(0,86,179,0.15)',
										color: '#7AADFF',
										border: '1px solid rgba(0,86,179,0.3)',
									}}
									onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,86,179,0.25)'}
									onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,86,179,0.15)'}
								>
									+ Link
								</button>
							</div>
							<NodeLibrary
								aNodes={aNodes}
								onSelectNode={HandleLibrarySelect}
								sSelectedID={oSelectedNode ? oSelectedNode.id : ''}
							/>
						</div>
					)}
				</div>

				{/* Toggle sidebar button */}
				<button
					onClick={() => setBSidebarOpen((b) => !b)}
					className="absolute z-20 flex items-center justify-center rounded-r-lg transition-all"
					style={{
						left: iSidebarWidth,
						top: '50%',
						transform: 'translateY(-50%)',
						width: 18,
						height: 48,
						backgroundColor: '#2A2E33',
						border: '1px solid #2E3540',
						borderLeft: 'none',
						color: '#556677',
					}}
				>
					<span style={{ fontSize: 10 }}>{bSidebarOpen ? '‹' : '›'}</span>
				</button>

				{/* Graph Canvas */}
				<div
					className="flex-1 overflow-hidden"
					style={{ marginRight: iDrawerWidth }}
				>
					<ReactFlow
						nodes={aNodes}
						edges={aEdges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						onNodeClick={HandleNodeClick}
						onPaneClick={HandlePaneClick}
						nodeTypes={oNodeTypes}
						fitView
						style={{ backgroundColor: '#1A1C1E' }}
						defaultEdgeOptions={{
							style: { stroke: '#00E5FF', strokeWidth: 2 },
						}}
					>
						<Background
							variant={BackgroundVariant.Dots}
							gap={28}
							size={1}
							color="rgba(0,229,255,0.12)"
						/>
						<Controls />
						<MiniMap
							nodeColor={() => '#0056B3'}
							maskColor="rgba(26,28,30,0.8)"
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