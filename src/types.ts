export type LayoutStrategyType = 'inflate' | 'dagre' | 'custom-lanes';

export interface GraphNode {
  id: string;
  label: string;
  type: 'input' | 'sample' | 'internal' | 'projection' | 'final' | 'custom';
  // State for sample nodes
  isExpanded?: boolean;
  // Subnodes if it is a sample and is expanded
  subNodes?: string[]; 
  // Custom display fields
  category?: string;
  // Coordinates for rendering
  x: number;
  y: number;
  // Storage of coordinates under different strategies
  positions: {
    collapsed: { x: number; y: number };
    expanded: {
      'inflate': { x: number; y: number };
      'dagre': { x: number; y: number };
      'custom-lanes': { x: number; y: number };
    };
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type?: 'default' | 'dashed' | 'subpath';
  label?: string;
}

export interface GraphData {
  id: string;
  name: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface LayoutStrategyInfo {
  id: LayoutStrategyType;
  name: string;
  accent: string;
  notes: string;
}

export interface ThesisPaper {
  title: string;
  authors: string;
  journal: string;
  doi: string;
  sections: {
    id: string;
    title: string;
    content: string[];
    figures?: {
      title: string;
      description: string;
      type: 'venn-1000' | 'venn-100' | 'flowchart';
    }[];
  }[];
}
