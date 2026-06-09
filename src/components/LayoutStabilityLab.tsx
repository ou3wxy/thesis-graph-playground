import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, Box, Download, Languages, ZoomIn, ZoomOut, Maximize, ChevronDown, ChevronRight } from 'lucide-react';
import { GraphData, LayoutStrategyType, GraphNode } from '../types';
import { INITIAL_GRAPHS, SUB_NODE_DETAILS } from '../data/graphs';

const TRANSLATIONS = {
  en: {
    playground_title: "Graph Playground",
    graph_subtitle: "Graph: {name}. Click on any text inside a node box to edit the text immediately. Click \"Expand\" on any purple sample to drill into detail steps.",
    graph_blueprint_label: "Graph Blueprint Structure",
    collapse_all: "Collapse All",
    export_html: "Export HTML",
    node_customizer: "Node Customizer Hub",
    rename_label: "Rename Label",
    active_input_streams: "Streams Complexity",
    remove_node: "Remove Selected Node",
    incoming_sources: "Incoming / Upstream Sources",
    no_incoming: "No incoming linkages",
    outgoing_targets: "Outgoing / Downstream Targets",
    no_outgoing: "No outgoing linkages",
    link_existing: "Link Existing Node",
    link_incoming: "Link Incoming Source:",
    link_outgoing: "Link Outgoing Target:",
    new_node_name: "New Node Name",
    relationship: "Relationship",
    node_type: "Node Type",
    create_link: "Create & Link Node",
    type: "Type",
    placeholder_rename: "Enter custom nickname...",
    placeholder_new_node: "E.g., Financial Audit...",
    zoom_in: "Zoom In",
    zoom_out: "Zoom Out",
    zoom_fit: "Fit / Reset",
    outgoing_to: "Outgoing to...",
    incoming_from: "Incoming from...",
    relationship_upstream: "Upstream src",
    relationship_downstream: "Downstream tgt",
    relationship_none: "Linked to none",
    node_type_custom: "Process Node",
    node_type_sample: "Expandable Module",
    streams_complexity: "Streams Complexity:",
    inputs_label: "Inputs",
    non_sample_info: "Non-sample module. Streams complexity applies exclusively to expandable samples.",
    expand_btn: "Expand",
    collapse_btn: "✕",
    color_choice_label: "Node Color Theme"
  },
  zh: {
    playground_title: "图结构游乐场",
    graph_subtitle: "图表名称：{name}。可以直接点击节点框内的文字进行就地编辑。点击紫色样本节点上的“展开”以查看详细步骤。",
    graph_blueprint_label: "图表蓝图结构说明",
    collapse_all: "折叠所有",
    export_html: "导出为独立 HTML",
    node_customizer: "节点定制器面板",
    rename_label: "重命名节点标签",
    active_input_streams: "输入流子节点复杂度",
    remove_node: "删除选定节点",
    incoming_sources: "输入 / 上游节点源",
    no_incoming: "没有检测到传入链接",
    outgoing_targets: "输出 / 下游目标节点",
    no_outgoing: "没有检测到传出链接",
    link_existing: "连接到已有节点",
    link_incoming: "连接入站源:",
    link_outgoing: "连接出站目标:",
    new_node_name: "新建节点名称",
    relationship: "连线依赖关系",
    node_type: "新建节点类型",
    create_link: "新建并自动连线",
    type: "类型",
    placeholder_rename: "请输入自定义标签...",
    placeholder_new_node: "例如：财务审计步骤...",
    zoom_in: "画面放大",
    zoom_out: "画面缩小",
    zoom_fit: "画面重置",
    outgoing_to: "选择传出目标...",
    incoming_from: "选择传入源...",
    relationship_upstream: "上游入站源",
    relationship_downstream: "下游出站目标",
    relationship_none: "纯孤立节点",
    node_type_custom: "常规流程节点",
    node_type_sample: "自展结构样本",
    streams_complexity: "依赖流节点复杂度:",
    inputs_label: "输入子节点",
    non_sample_info: "常规子节点不可添加内部流。流子节点仅限于「自展结构单元」。",
    expand_btn: "展开分析",
    collapse_btn: "✕",
    color_choice_label: "节点配色主题"
  },
  ja: {
    playground_title: "グラフ・プレイグラウンド",
    graph_subtitle: "対象図面：{name}。ノード内の任意のテキストをクリックして直接編集できます。「展開」で紫色サンプルの詳細ステップが開きます。",
    graph_blueprint_label: "図面設計图の構造テンプレート",
    collapse_all: "すべて折りたたむ",
    export_html: "HTMLで書き出す",
    node_customizer: "ノード設定ハブ",
    rename_label: "ラベル名を編集",
    active_input_streams: "ストリーム入力数",
    remove_node: "このノードを削除する",
    incoming_sources: "インプット / 上流ソースリンク",
    no_incoming: "受信リンクはありません",
    outgoing_targets: "アウトプット / 下流ターゲットリンク",
    no_outgoing: "送信リンクはありません",
    link_existing: "既存ノードを接続する",
    link_incoming: "上流ノード接続:",
    link_outgoing: "下流ノード接続:",
    new_node_name: "新しいノード名",
    relationship: "オートリンク関係",
    node_type: "新規ノード種類",
    create_link: "ノードを生成して繋ぐ",
    type: "種別",
    placeholder_rename: "名前を変更します...",
    placeholder_new_node: "例：プロセス監査...",
    zoom_in: "ズームイン",
    zoom_out: "ズームアウト",
    zoom_fit: "リセット",
    outgoing_to: "下流ノードを選択...",
    incoming_from: "上流ノードを選択...",
    relationship_upstream: "上流ノードに繋ぐ",
    relationship_downstream: "下流ノードに繋ぐ",
    relationship_none: "接続せず配置のみ",
    node_type_custom: "基本ノード型",
    node_type_sample: "展開可能モジュール",
    streams_complexity: "集約ストリーム複雑度:",
    inputs_label: "入力構成要素",
    non_sample_info: "この種類のノードは集約ストリームをサポートしていません。紫色モジュールのみ可能です。",
    expand_btn: "詳細を展開",
    collapse_btn: "✕",
    color_choice_label: "ノードの配色テーマ"
  }
};

export default function LayoutStabilityLab() {
  const [graphs, setGraphs] = useState<GraphData[]>(INITIAL_GRAPHS);
  const [selectedGraphId, setSelectedGraphId] = useState<string>('chain-3x6');
  const [customNodeLabels, setCustomNodeLabels] = useState<Record<string, string>>({});
  const [customSubNodeLabels, setCustomSubNodeLabels] = useState<Record<string, string>>({});
  const [selectedNodeId, setSelectedNodeId] = useState<string>('sample-1');
  const [nodeStreamCounts, setNodeStreamCounts] = useState<Record<string, number>>({});
  const activeStrategy: LayoutStrategyType = 'custom-lanes';

  // State elements for customized node color schemes
  const [customNodeColors, setCustomNodeColors] = useState<Record<string, 'indigo' | 'emerald' | 'rose' | 'amber' | 'blue' | 'purple'>>({});
  const [newNodeColor, setNewNodeColor] = useState<'indigo' | 'emerald' | 'rose' | 'amber' | 'blue' | 'purple'>('indigo');

  // Multilingual & Zoom control states
  const [locale, setLocale] = useState<'en' | 'zh' | 'ja'>('en');
  const [zoom, setZoom] = useState<number>(1.0);
  const [isCustomizerExpanded, setIsCustomizerExpanded] = useState<boolean>(true);

  // State variables for creating new connected nodes
  const [newNodeLabel, setNewNodeLabel] = useState<string>('');
  const [newRelationship, setNewRelationship] = useState<'upstream' | 'downstream' | 'none'>('downstream');
  const [newNodeType, setNewNodeType] = useState<'custom' | 'sample'>('custom');

  // Canvas Panning State
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Helper to retrieve stream count for a specific node
  const getNumStreamsForNode = (nodeId: string): number => {
    return nodeStreamCounts[nodeId] ?? 5;
  };

  // Dynamic symmetric spacing helper for subnodes inside expanded box
  const getSubNodeOffsets = (subNodeId: string, node: GraphNode) => {
    const details = SUB_NODE_DETAILS[subNodeId];
    if (!details) return { offset_x: 0, offset_y: 0, label: '' };

    const subKeys = node.subNodes || [];
    const idx = subKeys.indexOf(subNodeId);

    // If it is one of the input streams (indexes 0 to 4)
    if (idx >= 0 && idx < 5) {
      const spacing = 45;
      const nodeNumStreams = getNumStreamsForNode(node.id);
      const totalY = (nodeNumStreams - 1) * spacing;
      const offset_y = -totalY / 2 + idx * spacing;
      return {
        offset_x: -60,
        offset_y: offset_y,
        label: customSubNodeLabels[subNodeId] !== undefined ? customSubNodeLabels[subNodeId] : details.label
      };
    }

    // It's the assembly node (index 5)
    return {
      offset_x: 60,
      offset_y: 0,
      label: customSubNodeLabels[subNodeId] !== undefined ? customSubNodeLabels[subNodeId] : details.label
    };
  };

  // Create a new node and link it automatically with selected relationships on the SAME horizontal line
  const addConnectedNode = (label: string, relationship: 'upstream' | 'downstream' | 'none', type: 'custom' | 'sample') => {
    if (!selectedNodeId) return;
    const targetNode = activeGraph.nodes.find(n => n.id === selectedNodeId);
    if (!targetNode) return;

    const newId = `${type}-${Date.now()}`;
    const cleanLabel = label.trim() || `${type === 'sample' ? 'Sample Module' : 'Process Node'} ${activeGraph.nodes.length + 1}`;

    // Place coordinates exactly 240px away for perfect horizontal alignment and stage spacing
    let newX = targetNode.x;
    let newY = targetNode.y;

    if (relationship === 'upstream') {
      newX = targetNode.x - 240;
      
      // Look for other existing upstream nodes connected to the targetNode to prevent overlapping
      const existingUpstream = activeGraph.edges.filter(e => e.target === selectedNodeId);
      const count = existingUpstream.length;
      if (count > 0) {
        const offsetMultiplier = Math.ceil(count / 2) * (count % 2 === 1 ? 1 : -1);
        newY = targetNode.y + offsetMultiplier * 120;
      }
    } else if (relationship === 'downstream') {
      newX = targetNode.x + 240;

      // Look for other existing downstream nodes connected to the targetNode to prevent overlapping
      const existingDownstream = activeGraph.edges.filter(e => e.source === selectedNodeId);
      const count = existingDownstream.length;
      if (count > 0) {
        const offsetMultiplier = Math.ceil(count / 2) * (count % 2 === 1 ? 1 : -1);
        newY = targetNode.y + offsetMultiplier * 120;
      }
    } else {
      // Find the first node of the pipeline (leftmost or node with no incoming edges)
      const firstNodes = activeGraph.nodes.filter(n => !activeGraph.edges.some(e => e.target === n.id));
      const firstNode = firstNodes.length > 0 
        ? firstNodes.reduce((leftmost, curr) => curr.x < leftmost.x ? curr : leftmost, firstNodes[0])
        : (activeGraph.nodes.length > 0 ? activeGraph.nodes.reduce((leftmost, curr) => curr.x < leftmost.x ? curr : leftmost, activeGraph.nodes[0]) : targetNode);

      newX = firstNode.x;
      let foundSlot = false;
      const rowGap = 120;
      
      // Try vertical offsets parallel to the first node (both above and below) starting at 2 standard distances away to prevent downstream overlap
      for (let multiplier = 2; multiplier <= 12; multiplier++) {
        const testY1 = firstNode.y + multiplier * rowGap;
        const collision1 = activeGraph.nodes.some(n => Math.abs(n.x - newX) < 120 && Math.abs(n.y - testY1) < 100);
        if (!collision1) {
          newY = testY1;
          foundSlot = true;
          break;
        }
        
        const testY2 = firstNode.y - multiplier * rowGap;
        const collision2 = activeGraph.nodes.some(n => Math.abs(n.x - newX) < 120 && Math.abs(n.y - testY2) < 100);
        if (!collision2) {
          newY = testY2;
          foundSlot = true;
          break;
        }
      }
      
      if (!foundSlot) {
        newY = firstNode.y + 240;
      }
    }

    // Optional snap to nearest grid line
    const gridSize = 20;
    newX = Math.round(newX / gridSize) * gridSize;
    newY = Math.round(newY / gridSize) * gridSize;

    const newNode: GraphNode = {
      id: newId,
      label: cleanLabel,
      type: type,
      x: newX,
      y: newY,
      isExpanded: false,
      subNodes: type === 'sample' ? ['revenue', 'expenses', 'capex', 'dna', 'price', 'assemble'] : undefined,
      positions: {
        collapsed: { x: newX, y: newY },
        expanded: {
          'inflate': { x: newX, y: newY },
          'dagre': { x: newX, y: newY },
          'custom-lanes': { x: newX, y: newY }
        }
      }
    };

    const newEdges = [];
    if (relationship === 'upstream') {
      newEdges.push({
        id: `edge-${Date.now()}`,
        source: newId,
        target: selectedNodeId,
        type: 'default' as const
      });
    } else if (relationship === 'downstream') {
      newEdges.push({
        id: `edge-${Date.now()}`,
        source: selectedNodeId,
        target: newId,
        type: 'default' as const
      });
    }

    setGraphs(prev => prev.map(g => {
      if (g.id !== selectedGraphId) return g;
      return {
        ...g,
        nodes: [...g.nodes, newNode],
        edges: [...g.edges, ...newEdges]
      };
    }));

    // Save choice to custom colors mapping
    setCustomNodeColors(prev => ({
      ...prev,
      [newId]: newNodeColor
    }));

    // Auto-select newly created node
    setSelectedNodeId(newId);
  };

  // Node selection mouse handler (bubbles up to Canvas to allow canvas dragging)
  const handleNodeMouseDownSelect = (e: React.MouseEvent, nodeId: string) => {
    const targetTag = (e.target as HTMLElement).tagName;
    if (targetTag === 'INPUT' || targetTag === 'BUTTON' || targetTag === 'SELECT' || (e.target as HTMLElement).closest('button')) {
      return;
    }
    setSelectedNodeId(nodeId);
  };

  // Canvas Drag/Pan Event Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    // Do not initiate pan on interactive form elements
    const targetTag = (e.target as HTMLElement).tagName;
    if (targetTag === 'INPUT' || targetTag === 'BUTTON' || targetTag === 'SELECT' || targetTag === 'TEXTAREA' || (e.target as HTMLElement).closest('button')) {
      return;
    }

    setIsPanning(true);
    setPanStart({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    });

    e.preventDefault();
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  // Remove a node entirely along with all its connected linkages
  const removeNode = (nodeId: string) => {
    // Select a fallback node before deletion
    const remainingNodes = activeGraph.nodes.filter(n => n.id !== nodeId);
    if (remainingNodes.length > 0) {
      setSelectedNodeId(remainingNodes[0].id);
    }

    setGraphs(prev => prev.map(g => {
      if (g.id !== selectedGraphId) return g;
      return {
        ...g,
        nodes: g.nodes.filter(n => n.id !== nodeId),
        edges: g.edges.filter(e => e.source !== nodeId && e.target !== nodeId)
      };
    }));
  };

  // Connect an existing node as upstream or downstream
  const addEdgeLink = (sourceId: string, targetId: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    
    // Check if line/dependency already exists
    const exists = activeGraph.edges.some(e => e.source === sourceId && e.target === targetId);
    if (exists) return;

    const newEdge = {
      id: `edge-link-${Date.now()}`,
      source: sourceId,
      target: targetId,
      type: 'default' as const
    };

    setGraphs(prev => prev.map(g => {
      if (g.id !== selectedGraphId) return g;
      return {
        ...g,
        edges: [...g.edges, newEdge]
      };
    }));
  };

  // Remove a connection edge
  const removeEdgeLink = (edgeId: string) => {
    setGraphs(prev => prev.map(g => {
      if (g.id !== selectedGraphId) return g;
      return {
        ...g,
        edges: g.edges.filter(e => e.id !== edgeId)
      };
    }));
  };

  // Export current graph as fully self-contained interactive HTML page
  const exportToHtml = () => {
    // Collect the current customized labels
    const exportedNodes = activeGraph.nodes.map(n => ({
      ...n,
      label: customNodeLabels[n.id] !== undefined ? customNodeLabels[n.id] : n.label,
      isExpanded: false
    }));

    const exportedSubDetails: Record<string, { label: string; offset_x: number; offset_y: number }> = {};
    Object.entries(SUB_NODE_DETAILS).forEach(([key, value]) => {
      exportedSubDetails[key] = {
        ...value,
        label: customSubNodeLabels[key] !== undefined ? customSubNodeLabels[key] : value.label
      };
    });

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thesis Graph Export: \${activeGraph.name}</title>
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;750;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen p-6 flex flex-col justify-between">
  <!-- Content Header -->
  <header class="max-w-6xl mx-auto w-full mb-6 border-b border-slate-800 pb-4 flex justify-between items-center">
    <div>
      <h1 class="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
        <span class="bg-blue-600 p-1.5 rounded text-white text-xs font-mono select-none">DAG</span>
        Interactive Thesis Graph
      </h1>
      <p class="text-xs text-slate-400 mt-1">Exported snapshot of <strong>\${activeGraph.name}</strong>. Feel free to edit text and expand modules directly.</p>
    </div>
    <span class="text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-400 px-2.5 py-1 rounded">Interactive Offline Bundle</span>
  </header>

  <!-- Interactive Workbench Container -->
  <main class="max-w-6xl mx-auto w-full flex-1 flex flex-col bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden p-6 shadow-2xl relative border-slate-800">
    <div class="mb-4 flex items-center justify-between border-b border-slate-900 pb-3">
      <span class="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Graph Canvas</span>
      <button onclick="collapseAll()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-3 py-1.5 rounded transition-all cursor-pointer">
        Reset Layout
      </button>
    </div>

    <!-- Canvas -->
    <div class="flex-1 relative border border-slate-850 rounded-xl overflow-auto bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] bg-[size:18px_18px]" style="min-height: 500px; width: 100%; height: 500px;" id="canvas">
      <!-- SVG Connectors -->
      <svg id="svgConnectors" class="absolute top-0 left-0 pointer-events-none z-0" style="width: 1100px; height: 680px; stroke: #475569; fill: none;"></svg>

      <!-- Nodes Layer -->
      <div id="nodesLayer" class="absolute pointer-events-none z-10" style="width: 1100px; height: 680px;"></div>
    </div>
  </main>

  <footer class="max-w-6xl mx-auto w-full text-center text-[10px] font-mono text-slate-500 mt-6 pt-4 border-t border-slate-800">
    Thesis Framework Analyzer • Generated on \${new Date().toLocaleDateString()}
  </footer>

  <script>
    // Embedded Data
    const graphData = {
      nodes: \${JSON.stringify(exportedNodes, null, 2)},
      edges: \${JSON.stringify(activeGraph.edges, null, 2)}
    };
    const subNodeDetails = \${JSON.stringify(exportedSubDetails, null, 2)};
    const nodeStreamCounts = \${JSON.stringify(nodeStreamCounts, null, 2)};
    let expandedNodeId = null;

    function getNumStreamsForNode(nodeId) {
      return nodeStreamCounts[nodeId] ?? 5;
    }

    // Drawing utils
    function drawBezierCurve(x1, y1, x2, y2) {
      const dx = Math.abs(x2 - x1);
      const midX = x1 + dx * 0.45;
      return "M " + x1 + " " + y1 + " C " + midX + " " + y1 + ", " + (x2 - dx * 0.45) + " " + y2 + ", " + x2 + " " + y2;
    }

    function getNodeCoordinates(node) {
      if (!expandedNodeId) return node.positions.collapsed;
      return node.positions.expanded['custom-lanes'] || node.positions.collapsed;
    }

    function toggleNodeExpand(nodeId) {
      if (expandedNodeId === nodeId) {
        expandedNodeId = null;
      } else {
        expandedNodeId = nodeId;
      }
      render();
    }

    function collapseAll() {
      expandedNodeId = null;
      render();
    }

    // Dynamic rendering
    function render() {
      const svg = document.getElementById('svgConnectors');
      const nodesContainer = document.getElementById('nodesLayer');
      
      // Clear containers
      svg.innerHTML = '';
      nodesContainer.innerHTML = '';

      // 1. Render edges/lines
      graphData.edges.forEach(edge => {
        const sourceNode = graphData.nodes.find(n => n.id === edge.source);
        const targetNode = graphData.nodes.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode) return;

        const sourceCoords = getNodeCoordinates(sourceNode);
        const targetCoords = getNodeCoordinates(targetNode);

        let x1 = sourceCoords.x;
        let y1 = sourceCoords.y;
        let x2 = targetCoords.x;
        let y2 = targetCoords.y;

        const isSourceExpanded = sourceNode.type === 'sample' && (expandedNodeId === sourceNode.id);
        const isTargetExpanded = targetNode.type === 'sample' && (expandedNodeId === targetNode.id);

        if (isSourceExpanded) {
          const assembleId = sourceNode.subNodes[5] || 'assemble';
          const assembleDetails = subNodeDetails[assembleId];
          if (assembleDetails) {
            x1 = sourceCoords.x + assembleDetails.offset_x;
            y1 = sourceCoords.y + assembleDetails.offset_y;
          }
        }

        if (isTargetExpanded) {
          const targetNumStreams = getNumStreamsForNode(targetNode.id);
          targetNode.subNodes.slice(0, targetNumStreams).forEach((snId, i) => {
            const details = subNodeDetails[snId];
            if (!details) return;
            const subX = targetCoords.x + details.offset_x;
            const subY = targetCoords.y + details.offset_y;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', drawBezierCurve(x1, y1, subX, subY));
            path.setAttribute('stroke', '#475569');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-width', '1.5');
            path.setAttribute('class', 'transition-all duration-500 opacity-60');
            svg.appendChild(path);
          });
          return;
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', drawBezierCurve(x1, y1, x2, y2));
        path.setAttribute('stroke', edge.type === 'dashed' ? '#475569' : '#64748b');
        path.setAttribute('fill', 'none');
        if (edge.type === 'dashed') {
          path.setAttribute('stroke-dasharray', '4 4');
        }
        path.setAttribute('stroke-width', '1.8');
        path.setAttribute('class', 'transition-all duration-500');
        svg.appendChild(path);
      });

      // 1.5 Render internal subnode lines for expanded nodes
      graphData.nodes.forEach(node => {
        if (node.type === 'sample' && expandedNodeId === node.id) {
          const coords = getNodeCoordinates(node);
          const subKeys = node.subNodes || [];
          const assembleDetails = subNodeDetails[subKeys[5]];
          if (!assembleDetails) return;

          const ax = coords.x + assembleDetails.offset_x;
          const ay = coords.y + assembleDetails.offset_y;

          const nodeNumStreams = getNumStreamsForNode(node.id);
          subKeys.slice(0, nodeNumStreams).forEach(snId => {
            const d = subNodeDetails[snId];
            if (!d) return;
            const sx = coords.x + d.offset_x;
            const sy = coords.y + d.offset_y;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', drawBezierCurve(sx, sy, ax, ay));
            path.setAttribute('stroke', '#10b981');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-width', '1.5');
            path.setAttribute('class', 'transition-all duration-500 opacity-70');
            svg.appendChild(path);
          });
        }
      });

      // 2. Render nodes
      graphData.nodes.forEach(node => {
        const coords = getNodeCoordinates(node);
        const el = document.createElement('div');
        el.className = 'absolute pointer-events-auto transition-all duration-500';
        el.style.left = coords.x + 'px';
        el.style.top = coords.y + 'px';
        el.style.transform = 'translate(-50%, -50%)';

        // Styling based on node type
        if (node.type !== 'sample') {
          let col = 'border-blue-500 bg-blue-950/80 text-blue-200';
          if (node.type === 'projection') col = 'border-amber-500 bg-amber-950/80 text-amber-200';
          if (node.type === 'final') col = 'border-orange-500 bg-orange-950/80 text-orange-200';

          el.innerHTML = \`<div class="border rounded-xl px-4 py-2 font-bold text-xs tracking-wide shadow-md flex items-center \${col}">
            <input type="text" value="\&quot;" oninput="updateNodeLabel('\${node.id}', this.value)" class="bg-transparent text-center focus:outline-none w-32 cursor-text" />
          </div>\`;
          el.querySelector('input').value = node.label;
        } else if (expandedNodeId !== node.id) {
          // Collapsed sample
          el.innerHTML = \`<div class="border border-purple-500 border-dashed bg-purple-950/60 text-purple-300 p-4 rounded-xl text-xs font-bold shadow-md flex flex-col items-center gap-1.5">
            <input type="text" value="\&quot;" oninput="updateNodeLabel('\${node.id}', this.value)" class="bg-transparent text-center focus:outline-none w-28 cursor-text" />
            <button onclick="toggleNodeExpand('\${node.id}')" class="text-[10px] bg-purple-900 border border-purple-700 hover:bg-purple-800 text-purple-200 px-2 py-0.5 rounded transition-all cursor-pointer font-bold">
              Expand
            </button>
          </div>\`;
          el.querySelector('input').value = node.label;
        } else {
          // Expanded sample box
          const boxWidth = 260;
          const boxHeight = 240;
          el.style.width = boxWidth + 'px';
          el.style.height = boxHeight + 'px';
          
          let subElementsHtml = '';
          const subKeys = node.subNodes || [];
          const nodeNumStreams = getNumStreamsForNode(node.id);
          
          // Render left column of subnodes inside box
          subKeys.slice(0, nodeNumStreams).forEach(snId => {
            const d = subNodeDetails[snId];
            if (!d) return;
            const spacing = 45;
            const totalY = (nodeNumStreams - 1) * spacing;
            const idx = subKeys.indexOf(snId);
            const computedOffset_y = -totalY / 2 + idx * spacing;

            const sn_x = boxWidth / 2 - 60;
            const sn_y = boxHeight / 2 + computedOffset_y - 20;
            
            subElementsHtml += \`<div id="sub-node-wrap-\${snId}" class="absolute bg-emerald-950/95 border border-emerald-500 text-emerald-300 rounded px-2.5 py-1 text-[10px] font-bold shadow-xs whitespace-nowrap flex items-center" style="left: \${sn_x}px; top: \${sn_y}px; transform: translate(-50%, -50%);">
              <input type="text" value="\&quot;" oninput="updateSubNodeLabel('\${snId}', this.value)" class="bg-transparent text-center focus:outline-none w-20 cursor-text font-bold" />
            </div>\`;
          });

          // Render right action node
          const assembleId = subKeys[5];
          const assD = subNodeDetails[assembleId];
          let rightNodeHtml = '';
          if (assD) {
            const sn_x = boxWidth / 2 + assD.offset_x;
            const sn_y = boxHeight / 2 + assD.offset_y - 20;
            
            rightNodeHtml = \`<div id="sub-node-wrap-\${assembleId}" class="absolute bg-emerald-600 border border-emerald-500 text-white rounded px-2.5 py-1.5 text-[10px] font-bold shadow-md whitespace-nowrap flex items-center" style="left: \${sn_x}px; top: \${sn_y}px; transform: translate(-50%, -50%); z-index: 10;">
              <input type="text" value="\&quot;" oninput="updateSubNodeLabel('\${assembleId}', this.value)" class="bg-transparent text-center focus:outline-none w-20 cursor-text text-white font-bold" />
            </div>\`;
          }

          el.className = 'absolute pointer-events-auto z-10';
          el.innerHTML = \`<div class="border border-purple-500 border-dashed bg-purple-950/45 shadow-xl rounded-2xl w-full h-full p-3.5 relative backdrop-blur-md">
            <!-- Header badge -->
            <div class="absolute top-0 left-4 -translate-y-1/2 bg-purple-900 border border-purple-700 text-purple-200 rounded px-2 py-0.5 text-[9px] font-bold font-sans flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <input type="text" value="\&quot;" oninput="updateNodeLabel('\${node.id}', this.value)" class="bg-transparent text-left focus:outline-none w-28 cursor-text font-bold font-sans text-[9px]" />
            </div>

            <!-- Close icon -->
            <button onclick="toggleNodeExpand('\${node.id}')" class="absolute top-2.5 right-2.5 text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 w-5 h-5 rounded flex items-center justify-center transition-all cursor-pointer font-bold">
              ✕
            </button>

            <!-- Inner Canvas -->
            <div class="relative w-full h-full">\${subElementsHtml}\${rightNodeHtml}</div>
          </div>\`;
          
          el.querySelector('.absolute.top-0.left-4 input').value = node.label;
          subKeys.slice(0, nodeNumStreams).forEach(snId => {
            const wrap = el.querySelector('#sub-node-wrap-' + snId + ' input');
            if (wrap) wrap.value = subNodeDetails[snId].label;
          });
          if (assD) {
            const wrap = el.querySelector('#sub-node-wrap-' + assembleId + ' input');
            if (wrap) wrap.value = assD.label;
          }
        }

        nodesContainer.appendChild(el);
      });
    }

    function updateNodeLabel(nodeId, val) {
      const node = graphData.nodes.find(n => n.id === nodeId);
      if (node) {
        node.label = val;
      }
    }

    function updateSubNodeLabel(snId, val) {
      if (subNodeDetails[snId]) {
        subNodeDetails[snId].label = val;
      }
    }

    // Initial load
    render();
  </script>
</body>
</html>`;

    // Download flow
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thesis-graph-\${selectedGraphId}-\${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  // Find active graph
  const activeGraph = useMemo(() => {
    return graphs.find(g => g.id === selectedGraphId) || graphs[0];
  }, [graphs, selectedGraphId]);

  // List of currently expanded sample node IDs
  const expandedNodeIds = useMemo(() => {
    return activeGraph.nodes.filter(n => n.type === 'sample' && n.isExpanded).map(n => n.id);
  }, [activeGraph]);

  // Handle toggle node expand/collapse
  const toggleNodeExpand = (nodeId: string) => {
    setGraphs(prev => prev.map(g => {
      if (g.id !== selectedGraphId) return g;
      
      return {
        ...g,
        nodes: g.nodes.map(n => {
          if (n.id === nodeId) {
            return { ...n, isExpanded: !n.isExpanded };
          }
          return n;
        })
      };
    }));
  };

  // Collapse all sample nodes
  const collapseAll = () => {
    setGraphs(prev => prev.map(g => {
      if (g.id !== selectedGraphId) return g;
      return {
        ...g,
        nodes: g.nodes.map(n => {
          if (n.type === 'sample') {
            return { ...n, isExpanded: false };
          }
          return n;
        })
      };
    }));
  };

  // Calculate live coordinate position for each node
  const getNodeCoordinates = (node: GraphNode): { x: number; y: number } => {
    if (expandedNodeIds.length === 0) {
      // If nothing is expanded, all nodes are at their original collapsed coordinates
      return node.positions.collapsed;
    }

    // Otherwise look up their position relative to lanes expansion (which preserves coordinates)
    return node.positions.expanded[activeStrategy] || node.positions.collapsed;
  };



  // Helper to draw clean curves between two coordinate points
  const drawBezierCurve = (x1: number, y1: number, x2: number, y2: number) => {
    // Control points for clean symmetric flow
    const dx = Math.abs(x2 - x1);
    const midX = x1 + dx * 0.45;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`;
  };

  const t = TRANSLATIONS[locale];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col h-[calc(100vh-130px)] overflow-hidden text-slate-800" id="stability-lab-panel">
      
      {/* Title block */}
      <div className="border-b border-slate-100 pb-4 mb-4 shrink-0 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-sans font-bold text-lg text-slate-900 flex items-center gap-2">
            <Box className="w-5 h-5 text-blue-600" />
            {t.playground_title}
          </h2>
          <p className="font-sans text-xs text-slate-500 mt-1 select-none leading-relaxed">
            {t.graph_subtitle.replace('{name}', activeGraph.name)}
          </p>
        </div>

        {/* Multilingual Selector */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1.5 shadow-xs shrink-0 self-start md:self-center">
          <Languages className="w-4 h-4 text-indigo-500" />
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as 'en' | 'zh' | 'ja')}
            className="text-xs font-bold font-sans bg-transparent border-none text-slate-700 focus:outline-none cursor-pointer pr-1"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      {/* Control Row 1: Global Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 shrink-0">
        {/* Graph selection */}
        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div>
            <label className="block text-[10px] font-mono text-indigo-500 uppercase font-bold tracking-wide">{t.graph_blueprint_label}</label>
            <select
              id="g-select-dropdown"
              value={selectedGraphId}
              onChange={(e) => {
                const nextId = e.target.value;
                setSelectedGraphId(nextId);
                collapseAll();
                const nextGraph = graphs.find(g => g.id === nextId);
                if (nextGraph && nextGraph.nodes.length > 0) {
                  const firstSample = nextGraph.nodes.find(n => n.type === 'sample');
                  setSelectedNodeId(firstSample ? firstSample.id : nextGraph.nodes[0].id);
                }
              }}
              className="w-full text-xs font-bold font-sans text-slate-800 bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all mt-1 shadow-xs"
            >
              {graphs.map(g => (
                <option key={g.id} value={g.id} className="bg-white text-slate-800">{g.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* WorkSpace Quick control actions */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-center">
          <div className="flex space-x-2">
            <button
              id="action-btn-collapse"
              onClick={collapseAll}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-slate-700 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.collapse_all}</span>
            </button>
            <button
              id="action-btn-export-html"
              onClick={exportToHtml}
              className="flex-1 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-xs"
              title="Export HTML"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.export_html}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Row 2: Selected Node Customizer & Upstream/Downstream Linker */}
      {(() => {
        const selectedNode = activeGraph.nodes.find(n => n.id === selectedNodeId) || activeGraph.nodes[0];
        if (!selectedNode) return null;

        const currentUpstreamEdges = activeGraph.edges.filter(e => e.target === selectedNode.id);
        const currentDownstreamEdges = activeGraph.edges.filter(e => e.source === selectedNode.id);

        const eligibleUpstreamNodes = activeGraph.nodes.filter(
          n => n.id !== selectedNode.id && !currentUpstreamEdges.some(e => e.source === n.id)
        );
        const eligibleDownstreamNodes = activeGraph.nodes.filter(
          n => n.id !== selectedNode.id && !currentDownstreamEdges.some(e => e.target === n.id)
        );

        const isSampleNode = selectedNode.type === 'sample';
        const nodeStreams = getNumStreamsForNode(selectedNode.id);

        return (
          <div className={`bg-slate-50 border border-slate-200 rounded-2xl ${isCustomizerExpanded ? 'p-3.5 mb-4' : 'p-2 mb-2'} shrink-0 transition-all shadow-xs`}>
            <div 
              className={`flex items-center gap-1.5 cursor-pointer select-none hover:opacity-85 transition-all ${isCustomizerExpanded ? 'border-b border-slate-200 pb-2 mb-2' : ''}`}
              onClick={() => setIsCustomizerExpanded(!isCustomizerExpanded)}
              title={isCustomizerExpanded ? "Click to Collapse Panel" : "Click to Expand Panel"}
            >
              <span className={`w-2 h-2 rounded-full ${isSampleNode ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
              <h3 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1">
                {t.node_customizer} &bull; <span className="text-slate-900 font-mono underline">{customNodeLabels[selectedNode.id] || selectedNode.label}</span>
                {isCustomizerExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
              </h3>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-mono ml-auto">
                {isCustomizerExpanded 
                  ? (locale === 'zh' ? '点击收起 ✕' : locale === 'ja' ? '折りたたむ ✕' : 'Collapse ✕') 
                  : (locale === 'zh' ? '点击展开以进行节点配置 ＋' : locale === 'ja' ? '展開して変数を編集 ＋' : 'Expand & Edit ＋')
                }
              </span>
            </div>

            {isCustomizerExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Parameter Editor & Danger Zone Delete */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wide">{t.rename_label}</label>
                    <input
                      type="text"
                      value={customNodeLabels[selectedNode.id] !== undefined ? customNodeLabels[selectedNode.id] : selectedNode.label}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setCustomNodeLabels(prev => ({ ...prev, [selectedNode.id]: newVal }));
                      }}
                      className="w-full text-xs font-bold font-sans text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 mt-1"
                      placeholder={t.placeholder_rename}
                    />

                    <div className="mt-2.5">
                      {isSampleNode ? (
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-sans font-bold text-slate-600">
                            <span>{t.streams_complexity}</span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold leading-none">{nodeStreams} {t.inputs_label}</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={nodeStreams}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setNodeStreamCounts(prev => ({ ...prev, [selectedNode.id]: val }));
                            }}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-600 transition-all mt-1.5"
                          />
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-400 italic">
                          {t.non_sample_info}
                        </div>
                      )}
                    </div>

                    {/* Active Selected Node Custom Color Palette Picker */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">{t.color_choice_label}</label>
                      <div className="flex items-center gap-1.5 justify-start">
                        {(['indigo', 'emerald', 'rose', 'amber', 'blue', 'purple'] as const).map(color => {
                          const colorBgMap = {
                            indigo: 'bg-indigo-500',
                            emerald: 'bg-emerald-500',
                            rose: 'bg-rose-500',
                            amber: 'bg-amber-500',
                            blue: 'bg-blue-500',
                            purple: 'bg-purple-500'
                          };
                          const activeColor = customNodeColors[selectedNode.id] || (selectedNode.type === 'sample' ? 'purple' : (selectedNode.type === 'input' ? 'blue' : (selectedNode.type === 'projection' ? 'amber' : (selectedNode.type === 'final' ? 'rose' : 'indigo'))));
                          return (
                            <button
                              key={color}
                              type="button"
                              onClick={() => {
                                setCustomNodeColors(prev => ({
                                  ...prev,
                                  [selectedNode.id]: color
                                }));
                              }}
                              className={`w-4 h-4 rounded-full ${colorBgMap[color]} transition-all cursor-pointer ${
                                activeColor === color ? 'ring-2 ring-slate-800 ring-offset-1 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                              }`}
                              title={color}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => removeNode(selectedNode.id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-250 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-xs"
                      title={t.remove_node}
                    >
                      <span>🗑 {t.remove_node}</span>
                    </button>
                  </div>
                </div>

                {/* Column 2: Connections & Linkage Manager */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-mono text-blue-500 uppercase font-bold tracking-wide mb-1">{t.incoming_sources}</label>
                      <div className="flex flex-wrap gap-1 max-h-[45px] overflow-y-auto pr-1">
                        {currentUpstreamEdges.map(edge => {
                          const srcNode = activeGraph.nodes.find(n => n.id === edge.source);
                          if (!srcNode) return null;
                          return (
                            <span key={edge.id} className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold bg-blue-50 border border-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                              {customNodeLabels[srcNode.id] || srcNode.label}
                              <button
                                 type="button"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   removeEdgeLink(edge.id);
                                 }}
                                 className="text-[9px] font-bold text-blue-400 hover:text-blue-800 w-3 h-3 rounded-full flex items-center justify-center cursor-pointer ml-0.5"
                                 title="Disconnect"
                              >
                                ✕
                              </button>
                            </span>
                          );
                        })}
                        {currentUpstreamEdges.length === 0 && (
                          <span className="text-[10px] italic text-slate-400">{t.no_incoming}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-amber-600 uppercase font-bold tracking-wide mb-1">{t.outgoing_targets}</label>
                      <div className="flex flex-wrap gap-1 max-h-[45px] overflow-y-auto pr-1">
                        {currentDownstreamEdges.map(edge => {
                          const tgtNode = activeGraph.nodes.find(n => n.id === edge.target);
                          if (!tgtNode) return null;
                          return (
                            <span key={edge.id} className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold bg-amber-50 border border-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                              {customNodeLabels[tgtNode.id] || tgtNode.label}
                              <button
                                 type="button"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   removeEdgeLink(edge.id);
                                 }}
                                 className="text-[9px] font-bold text-amber-400 hover:text-amber-800 w-3 h-3 rounded-full flex items-center justify-center cursor-pointer ml-0.5"
                                 title="Disconnect"
                              >
                                ✕
                              </button>
                            </span>
                          );
                        })}
                        {currentDownstreamEdges.length === 0 && (
                          <span className="text-[10px] italic text-slate-400">{t.no_outgoing}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
                    <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">{t.link_existing}</label>
                    <div className="space-y-1.5 flex flex-col">
                      <select
                        className="w-full text-[10.5px] font-sans bg-slate-50 border border-slate-200 rounded p-1.5 text-slate-700 focus:outline-none cursor-pointer"
                        onChange={(e) => {
                          const targetVal = e.target.value;
                          if (targetVal) {
                            addEdgeLink(selectedNode.id, targetVal);
                            e.target.value = "";
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>{t.outgoing_to}</option>
                        {eligibleDownstreamNodes.map(n => (
                          <option key={n.id} value={n.id}>{customNodeLabels[n.id] || n.label}</option>
                        ))}
                      </select>

                      <select
                        className="w-full text-[10.5px] font-sans bg-slate-50 border border-slate-200 rounded p-1.5 text-slate-700 focus:outline-none cursor-pointer"
                        onChange={(e) => {
                          const sourceVal = e.target.value;
                          if (sourceVal) {
                            addEdgeLink(sourceVal, selectedNode.id);
                            e.target.value = "";
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>{t.incoming_from}</option>
                        {eligibleUpstreamNodes.map(n => (
                          <option key={n.id} value={n.id}>{customNodeLabels[n.id] || n.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Column 3: Create & Autolink New Node */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-mono text-indigo-500 uppercase font-bold tracking-wide">{t.new_node_name}</label>
                      <input
                        type="text"
                        value={newNodeLabel}
                        onChange={(e) => setNewNodeLabel(e.target.value)}
                        className="w-full text-xs font-sans text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-1 px-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-550/20 mt-0.5"
                        placeholder={t.placeholder_new_node}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">{t.relationship}</label>
                        <select
                          value={newRelationship}
                          onChange={(e) => setNewRelationship(e.target.value as any)}
                          className="w-full text-[10.5px] font-sans bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 focus:outline-none mt-0.5"
                        >
                          <option value="upstream">{t.relationship_upstream}</option>
                          <option value="downstream">{t.relationship_downstream}</option>
                          <option value="none">{t.relationship_none}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold">{t.node_type}</label>
                        <select
                          value={newNodeType}
                          onChange={(e) => setNewNodeType(e.target.value as any)}
                          className="w-full text-[10.5px] font-sans bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 focus:outline-none mt-0.5"
                        >
                          <option value="custom">{t.node_type_custom}</option>
                          <option value="sample">{t.node_type_sample}</option>
                        </select>
                      </div>
                    </div>

                    {/* Creator Custom Color Palette Picker */}
                    <div className="mt-2.5">
                      <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">{t.color_choice_label}</label>
                      <div className="flex items-center gap-1.5 justify-start">
                        {(['indigo', 'emerald', 'rose', 'amber', 'blue', 'purple'] as const).map(color => {
                          const colorBgMap = {
                            indigo: 'bg-indigo-500',
                            emerald: 'bg-emerald-500',
                            rose: 'bg-rose-500',
                            amber: 'bg-amber-500',
                            blue: 'bg-blue-500',
                            purple: 'bg-purple-500'
                          };
                          return (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setNewNodeColor(color)}
                              className={`w-4 h-4 rounded-full ${colorBgMap[color]} transition-all cursor-pointer ${
                                newNodeColor === color ? 'ring-2 ring-slate-800 ring-offset-1 scale-110 shadow-sm' : 'hover:scale-105 opacity-80 hover:opacity-100'
                              }`}
                              title={color}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        addConnectedNode(newNodeLabel, newRelationship, newNodeType);
                        setNewNodeLabel('');
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer shadow-xs leading-none"
                      title={t.create_link}
                    >
                      <span>＋ {t.create_link}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Canvas container */}
      <div
        className="flex-1 relative border border-slate-200 rounded-xl overflow-hidden bg-white shadow-inner select-none"
        style={{ minHeight: '440px', cursor: isPanning ? 'grabbing' : 'grab' }}
        id="graph-stage-canvas"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {/* Floating Zoom Controls */}
        <div className="absolute top-4 right-4 z-40 bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md rounded-xl p-1.5 flex flex-col gap-1.5">
          <button
            onClick={() => setZoom(z => Math.min(2.5, z + 0.15))}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200/50"
            title={t.zoom_in}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <div className="text-[10px] font-bold font-mono text-center text-slate-500 py-0.5 select-none leading-none min-w-[36px]">
            {Math.round(zoom * 100)}%
          </div>

          <button
            onClick={() => setZoom(z => Math.max(0.4, z - 0.15))}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200/50"
            title={t.zoom_out}
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <div className="border-t border-slate-200/60 my-0.5" />

          <button
            onClick={() => {
              setZoom(1.0);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200/80"
            title={t.zoom_fit}
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* Absolute translation wrapper for infinite panning canvas */}
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          className="origin-top-left overflow-visible"
        >
          {/* Engineering Blueprint Grid Background (highly extensive range) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: -2500,
              top: -2500,
              width: 6000,
              height: 6000,
              backgroundImage: `
                linear-gradient(to right, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(226, 232, 240, 0.5) 1px, transparent 1px),
                linear-gradient(to right, rgba(203, 213, 225, 0.8) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(203, 213, 225, 0.8) 1.5px, transparent 1.5px)
              `,
              backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px'
            }}
          />

          {/* SVG Bezier connectors sheet */}
          <svg
            className="absolute pointer-events-none z-0"
            style={{
              left: -2500,
              top: -2500,
              width: 6000,
              height: 6000
            }}
          >
            <g stroke="currentColor" fill="none" transform="translate(2500, 2500)">
              {activeGraph.edges.map((edge) => {
                const sourceNode = activeGraph.nodes.find(n => n.id === edge.source);
                const targetNode = activeGraph.nodes.find(n => n.id === edge.target);

                if (!sourceNode || !targetNode) return null;

                // Compute basic positions
                const sourceCoordinates = getNodeCoordinates(sourceNode);
                const targetCoordinates = getNodeCoordinates(targetNode);

                // Position offsets based on whether standard or expanded
                let x1 = sourceCoordinates.x;
                let y1 = sourceCoordinates.y;
                let x2 = targetCoordinates.x;
                let y2 = targetCoordinates.y;

                const isSourceExpanded = sourceNode.type === 'sample' && sourceNode.isExpanded;
                const isTargetExpanded = targetNode.type === 'sample' && targetNode.isExpanded;

                if (isSourceExpanded) {
                  // If the source is expanded, route starting from its internal 'assemble' step node
                  const offsets = getSubNodeOffsets(sourceNode.subNodes?.[5] || 'assemble', sourceNode);
                  x1 = sourceCoordinates.x + offsets.offset_x;
                  y1 = sourceCoordinates.y + offsets.offset_y;
                }

                if (isTargetExpanded) {
                  // If target is expanded, we draw individual paths to all internal input stacked subnodes:
                  const targetNumStreams = getNumStreamsForNode(targetNode.id);
                  return (
                    <g key={edge.id}>
                      {targetNode.subNodes?.slice(0, targetNumStreams).map((snId, i) => {
                        const offsets = getSubNodeOffsets(snId, targetNode);
                        const sub_x = targetCoordinates.x + offsets.offset_x;
                        const sub_y = targetCoordinates.y + offsets.offset_y;

                        return (
                          <path
                            key={`${edge.id}-sub-${i}`}
                            d={drawBezierCurve(x1, y1, sub_x, sub_y)}
                            stroke="#94a3b8"
                            className="transition-all duration-500 opacity-80"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </g>
                  );
                }

                return (
                  <path
                    key={edge.id}
                    d={drawBezierCurve(x1, y1, x2, y2)}
                    className="transition-all duration-500"
                    stroke={edge.type === 'dashed' ? '#94a3b8' : '#64748b'}
                    strokeDasharray={edge.type === 'dashed' ? '4 4' : undefined}
                    strokeWidth="1.8"
                  />
                );
              })}

              {/* Internal expansion subnode connections if Sample is Expanded */}
              {activeGraph.nodes.map((node) => {
                if (node.type === 'sample' && node.isExpanded) {
                  const nodeCoords = getNodeCoordinates(node);
                  const subKeys = node.subNodes || [];
                  const assembleOffsets = getSubNodeOffsets(subKeys[5] || 'assemble', node);

                  const ax = nodeCoords.x + assembleOffsets.offset_x;
                  const ay = nodeCoords.y + assembleOffsets.offset_y;

                  return (
                    <g key={`internal-lines-${node.id}`}>
                      {subKeys.slice(0, getNumStreamsForNode(node.id)).map((snId, idx) => {
                        const offsets = getSubNodeOffsets(snId, node);
                        const sx = nodeCoords.x + offsets.offset_x;
                        const sy = nodeCoords.y + offsets.offset_y;

                        return (
                          <path
                            key={snId}
                            d={drawBezierCurve(sx, sy, ax, ay)}
                            stroke="#34d399"
                            className="transition-all duration-500 opacity-80"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </g>
                  );
                }
                return null;
              })}
            </g>
          </svg>

          {/* Nodes layer container */}
          <div className="absolute w-full h-full overflow-visible pointer-events-none">
            {activeGraph.nodes.map((node) => {
              const coords = getNodeCoordinates(node);

              // Setup custom styling based on type and status
              let typeClasses = '';
              const customColor = customNodeColors[node.id];
              if (customColor) {
                if (customColor === 'blue') {
                  typeClasses = 'border-blue-400 bg-blue-50 text-blue-900 shadow-sm hover:bg-blue-100/85';
                } else if (customColor === 'amber') {
                  typeClasses = 'border-amber-400 bg-amber-50 text-amber-900 shadow-sm hover:bg-amber-100/85';
                } else if (customColor === 'rose') {
                  typeClasses = 'border-rose-400 bg-rose-50 text-rose-900 shadow-sm hover:bg-rose-100/85';
                } else if (customColor === 'emerald') {
                  typeClasses = 'border-emerald-400 bg-emerald-50 text-emerald-900 shadow-sm hover:bg-emerald-100/85';
                } else if (customColor === 'purple') {
                  typeClasses = 'border-purple-400 bg-purple-50 text-purple-900 shadow-sm hover:bg-purple-100/85';
                } else if (customColor === 'indigo') {
                  typeClasses = 'border-indigo-400 bg-indigo-50 text-indigo-900 shadow-sm hover:bg-indigo-100/85';
                }
              } else {
                if (node.type === 'input') {
                  typeClasses = 'border-blue-400 bg-blue-50 text-blue-900 shadow-sm hover:bg-blue-100/80';
                } else if (node.type === 'projection') {
                  typeClasses = 'border-amber-400 bg-amber-50 text-amber-900 shadow-sm hover:bg-amber-100/80';
                } else if (node.type === 'final') {
                  typeClasses = 'border-orange-400 bg-orange-50 text-orange-950 shadow-sm hover:bg-orange-100/80';
                } else {
                  typeClasses = 'border-indigo-400 bg-indigo-50 text-indigo-900 shadow-sm hover:bg-indigo-100/80';
                }
              }

              // Normal node rendering
              if (node.type !== 'sample') {
                const isSelected = selectedNodeId === node.id;
                const activeColor = customColor || (node.type === 'input' ? 'blue' : (node.type === 'projection' ? 'amber' : (node.type === 'final' ? 'rose' : 'indigo')));
                
                let ringClass = 'ring-blue-500 border-blue-600 text-blue-950';
                if (activeColor === 'indigo') ringClass = 'ring-indigo-500 border-indigo-600 text-indigo-950 bg-indigo-50';
                else if (activeColor === 'emerald') ringClass = 'ring-emerald-500 border-emerald-600 text-emerald-950 bg-emerald-50';
                else if (activeColor === 'rose') ringClass = 'ring-rose-500 border-rose-600 text-rose-950 bg-rose-50';
                else if (activeColor === 'amber') ringClass = 'ring-amber-500 border-amber-600 text-amber-955 bg-amber-50';
                else if (activeColor === 'purple') ringClass = 'ring-purple-500 border-purple-600 text-purple-950 bg-purple-50';
                else if (activeColor === 'blue') ringClass = 'ring-blue-500 border-blue-600 text-blue-950 bg-blue-50';

                return (
                  <div
                    key={node.id}
                    id={`node-${node.id}`}
                    style={{
                      left: `${coords.x}px`,
                      top: `${coords.y}px`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    className={`absolute pointer-events-auto rounded-xl border px-3 py-2 text-xs font-bold tracking-wide transition-all ${typeClasses} flex items-center justify-center cursor-pointer ${
                      isSelected ? `ring-3 ${ringClass} scale-[1.03] shadow-md` : ''
                    }`}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseDown={(e) => handleNodeMouseDownSelect(e, node.id)}
                  >
                    <input
                      type="text"
                      value={customNodeLabels[node.id] !== undefined ? customNodeLabels[node.id] : node.label}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setCustomNodeLabels(prev => ({ ...prev, [node.id]: newVal }));
                      }}
                      className="bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-slate-500/20 w-32 px-1 cursor-text rounded font-sans font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id);
                      }}
                    />
                  </div>
                );
              }

              // Sample Node - COLLAPSED
              if (!node.isExpanded) {
                const isSelected = selectedNodeId === node.id;
                const activeColor = customColor || 'purple';

                let sampleCollapsedClasses = '';
                if (activeColor === 'blue') {
                  sampleCollapsedClasses = `border-blue-500 border-dashed bg-blue-50/50 hover:bg-blue-100 hover:border-blue-600 text-blue-700 ${
                    isSelected ? 'ring-3 ring-blue-500 ring-offset-2 scale-[1.03] bg-blue-100/95 border-blue-600 text-blue-900' : ''
                  }`;
                } else if (activeColor === 'amber') {
                  sampleCollapsedClasses = `border-amber-500 border-dashed bg-amber-50/50 hover:bg-amber-100 hover:border-amber-600 text-amber-700 ${
                    isSelected ? 'ring-3 ring-amber-500 ring-offset-2 scale-[1.03] bg-amber-100/95 border-amber-600 text-amber-900' : ''
                  }`;
                } else if (activeColor === 'rose') {
                  sampleCollapsedClasses = `border-rose-500 border-dashed bg-rose-50/50 hover:bg-rose-100 hover:border-rose-600 text-rose-700 ${
                    isSelected ? 'ring-3 ring-rose-500 ring-offset-2 scale-[1.03] bg-rose-100/95 border-rose-600 text-rose-900' : ''
                  }`;
                } else if (activeColor === 'emerald') {
                  sampleCollapsedClasses = `border-emerald-500 border-dashed bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-600 text-emerald-700 ${
                    isSelected ? 'ring-3 ring-emerald-500 ring-offset-2 scale-[1.03] bg-emerald-100/95 border-emerald-600 text-emerald-900' : ''
                  }`;
                } else if (activeColor === 'indigo') {
                  sampleCollapsedClasses = `border-indigo-500 border-dashed bg-indigo-50/50 hover:bg-indigo-100 hover:border-indigo-600 text-indigo-700 ${
                    isSelected ? 'ring-3 ring-indigo-500 ring-offset-2 scale-[1.03] bg-indigo-100/95 border-indigo-600 text-indigo-900' : ''
                  }`;
                } else {
                  sampleCollapsedClasses = `border-purple-500 border-dashed bg-purple-50/50 hover:bg-purple-100 hover:border-purple-600 text-purple-700 ${
                    isSelected ? 'ring-3 ring-purple-500 ring-offset-2 scale-[1.03] bg-purple-100/95 border-purple-600 text-purple-900' : ''
                  }`;
                }

                return (
                  <div
                    key={node.id}
                    id={`node-${node.id}`}
                    style={{
                      left: `${coords.x}px`,
                      top: `${coords.y}px`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    className={`absolute pointer-events-auto rounded-xl border p-4 text-xs font-bold tracking-wide transition-all scale-100 hover:scale-[1.03] shadow-sm flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${sampleCollapsedClasses}`}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseDown={(e) => handleNodeMouseDownSelect(e, node.id)}
                  >
                    <input
                      type="text"
                      value={customNodeLabels[node.id] !== undefined ? customNodeLabels[node.id] : node.label}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setCustomNodeLabels(prev => ({ ...prev, [node.id]: newVal }));
                      }}
                      className="bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-purple-550 max-w-[130px] px-1 cursor-text rounded font-sans font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNodeExpand(node.id);
                        setSelectedNodeId(node.id);
                      }}
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded cursor-pointer pointer-events-auto transition-colors font-bold ${
                        activeColor === 'blue' ? 'text-blue-700 bg-blue-100 border border-blue-200 hover:bg-blue-200' :
                        activeColor === 'amber' ? 'text-amber-700 bg-amber-100 border border-amber-200 hover:bg-amber-200' :
                        activeColor === 'rose' ? 'text-rose-700 bg-rose-100 border border-rose-200 hover:bg-rose-200' :
                        activeColor === 'emerald' ? 'text-emerald-700 bg-emerald-100 border border-emerald-200 hover:bg-emerald-200' :
                        activeColor === 'indigo' ? 'text-indigo-700 bg-indigo-100 border border-indigo-200 hover:bg-indigo-200' :
                        'text-purple-700 bg-purple-100 border border-purple-200 hover:bg-purple-200'
                      }`}
                    >
                      {t.expand_btn}
                    </button>
                  </div>
                );
              }

              // Sample Node - EXPANDED
              const boxWidth = 260;
              const boxHeight = 240;
              const isSelected = selectedNodeId === node.id;
              const nodeStreams = getNumStreamsForNode(node.id);
              const activeColor = customNodeColors[node.id] || 'purple';

              let containerBorderClass = 'border-purple-500';
              let containerBgClass = 'bg-purple-50/20';
              let activeRingClass = 'ring-purple-600 border-purple-600 bg-purple-50/40';
              let badgeBgClass = 'bg-purple-100 text-purple-800 border-purple-200';
              let bulletBgClass = 'bg-purple-500';
              let closeBorderClass = 'border-purple-200 text-purple-700 hover:bg-purple-100';
              let snFocusRing = 'focus:ring-purple-400';

              if (activeColor === 'blue') {
                containerBorderClass = 'border-blue-500';
                containerBgClass = 'bg-blue-50/20';
                activeRingClass = 'ring-blue-600 border-blue-600 bg-blue-50/45';
                badgeBgClass = 'bg-blue-100 text-blue-800 border-blue-200';
                bulletBgClass = 'bg-blue-500';
                closeBorderClass = 'border-blue-200 text-blue-700 hover:bg-blue-100';
                snFocusRing = 'focus:ring-blue-400';
              } else if (activeColor === 'amber') {
                containerBorderClass = 'border-amber-500';
                containerBgClass = 'bg-amber-50/20';
                activeRingClass = 'ring-amber-600 border-amber-600 bg-amber-50/45';
                badgeBgClass = 'bg-amber-100 text-amber-805 border-amber-200';
                bulletBgClass = 'bg-amber-500';
                closeBorderClass = 'border-amber-200 text-amber-700 hover:bg-amber-100';
                snFocusRing = 'focus:ring-amber-400';
              } else if (activeColor === 'rose') {
                containerBorderClass = 'border-rose-500';
                containerBgClass = 'bg-rose-50/20';
                activeRingClass = 'ring-rose-600 border-rose-600 bg-rose-50/45';
                badgeBgClass = 'bg-rose-100 text-rose-800 border-rose-200';
                bulletBgClass = 'bg-rose-500';
                closeBorderClass = 'border-rose-200 text-rose-700 hover:bg-rose-100';
                snFocusRing = 'focus:ring-rose-400';
              } else if (activeColor === 'emerald') {
                containerBorderClass = 'border-emerald-500';
                containerBgClass = 'bg-emerald-50/20';
                activeRingClass = 'ring-emerald-600 border-emerald-600 bg-emerald-50/45';
                badgeBgClass = 'bg-emerald-100 text-emerald-850 border-emerald-250';
                bulletBgClass = 'bg-emerald-500';
                closeBorderClass = 'border-emerald-200 text-emerald-700 hover:bg-emerald-100';
                snFocusRing = 'focus:ring-emerald-400';
              } else if (activeColor === 'indigo') {
                containerBorderClass = 'border-indigo-500';
                containerBgClass = 'bg-indigo-50/20';
                activeRingClass = 'ring-indigo-600 border-indigo-600 bg-indigo-50/45';
                badgeBgClass = 'bg-indigo-100 text-indigo-805 border-indigo-200';
                bulletBgClass = 'bg-indigo-500';
                closeBorderClass = 'border-indigo-200 text-indigo-700 hover:bg-indigo-100';
                snFocusRing = 'focus:ring-indigo-400';
              }

              return (
                <div
                  key={node.id}
                  id={`node-${node.id}-container`}
                  style={{
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className={`absolute border border-dashed shadow-lg rounded-2xl p-3.5 pointer-events-auto z-10 transition-all backdrop-blur-xs cursor-pointer ${containerBorderClass} ${containerBgClass} ${
                    isSelected ? `ring-3 ${activeRingClass}` : ''
                  }`}
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseDown={(e) => handleNodeMouseDownSelect(e, node.id)}
                >
                  {/* Header label badge */}
                  <div className={`absolute top-0 left-4 -translate-y-1/2 rounded px-2 py-0.5 text-[9.5px] font-bold font-sans flex items-center gap-1 shadow-sm leading-none z-20 border ${badgeBgClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${bulletBgClass}`}></span>
                    <input
                      type="text"
                      value={customNodeLabels[node.id] !== undefined ? customNodeLabels[node.id] : node.label}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setCustomNodeLabels(prev => ({ ...prev, [node.id]: newVal }));
                      }}
                      className={`bg-transparent text-left focus:outline-none focus:ring-1 max-w-[150px] px-0.5 cursor-text rounded font-sans font-bold text-[9.5px] ${snFocusRing}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id);
                      }}
                    />
                  </div>

                  {/* Close Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNodeExpand(node.id);
                    }}
                    className={`absolute top-2.5 right-2.5 text-[10px] font-mono px-1.5 py-0.5 rounded transition-all cursor-pointer z-20 border bg-white ${closeBorderClass}`}
                  >
                    ✕
                  </button>

                  {/* Internal subnodes layout */}
                  <div className="relative w-full h-full">
                    {/* Left stacked columns nodes */}
                    {node.subNodes?.slice(0, nodeStreams).map((snId) => {
                      const offsets = getSubNodeOffsets(snId, node);

                      return (
                        <div
                          key={snId}
                          style={{
                            left: `${boxWidth / 2 + offsets.offset_x}px`,
                            top: `${boxHeight / 2 + offsets.offset_y - 20}px`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          className="absolute bg-emerald-50 border border-emerald-400 text-emerald-800 rounded px-2.5 py-1 text-[10.5px] font-sans font-bold shadow-xs whitespace-nowrap flex items-center justify-center transition-all duration-300"
                        >
                          <input
                            type="text"
                            value={customSubNodeLabels[snId] !== undefined ? customSubNodeLabels[snId] : offsets.label}
                            onChange={(e) => {
                              const newVal = e.target.value;
                              setCustomSubNodeLabels(prev => ({ ...prev, [snId]: newVal }));
                            }}
                            className="bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-emerald-400 max-w-[80px] px-0.5 pointer-events-auto cursor-text rounded font-sans font-bold text-[10px]"
                          />
                        </div>
                      );
                    })}

                    {/* Right assemble action node */}
                    {(() => {
                      const snId = node.subNodes?.[5];
                      if (!snId) return null;
                      const offsets = getSubNodeOffsets(snId, node);

                      return (
                        <div
                          key={snId}
                          style={{
                            left: `${boxWidth / 2 + offsets.offset_x}px`,
                            top: `${boxHeight / 2 + offsets.offset_y - 20}px`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          className="absolute bg-emerald-500 border border-emerald-600 text-white rounded px-2.5 py-1.5 text-[10.5px] font-sans font-bold shadow-md shadow-emerald-500/10 whitespace-nowrap flex items-center justify-center transition-all duration-300"
                        >
                          <input
                            type="text"
                            value={customSubNodeLabels[snId] !== undefined ? customSubNodeLabels[snId] : offsets.label}
                            onChange={(e) => {
                              const newVal = e.target.value;
                              setCustomSubNodeLabels(prev => ({ ...prev, [snId]: newVal }));
                            }}
                            className="bg-transparent text-center text-white focus:outline-none focus:ring-1 focus:ring-white max-w-[80px] px-0.5 pointer-events-auto cursor-text rounded font-sans font-bold text-[10px]"
                          />
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
