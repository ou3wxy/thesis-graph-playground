import { GraphData, LayoutStrategyType, ThesisPaper } from '../types';

export const INITIAL_GRAPHS: GraphData[] = [
  {
    id: 'chain-3x6',
    name: 'Chain 3x6 (intra-deps, no extra upstream)',
    description: 'Distilled from the DCF build-DAG lab & priority-node. Visualizes how subcomponent expansion affects neighbouring nodes.',
    nodes: [
      {
        id: 'inputs',
        label: 'Inputs',
        type: 'input',
        x: 120, y: 300,
        positions: {
          collapsed: { x: 120, y: 300 },
          expanded: {
            'inflate': { x: 75, y: 300 },
            'dagre': { x: 120, y: 150 },
            'custom-lanes': { x: 120, y: 300 }
          }
        }
      },
      {
        id: 'sample-1',
        label: 'Sample 1 x6',
        type: 'sample',
        isExpanded: false,
        subNodes: ['revenue', 'expenses', 'capex', 'dna', 'price', 'assemble'],
        x: 360, y: 180,
        positions: {
          collapsed: { x: 360, y: 180 },
          expanded: {
            'inflate': { x: 360, y: 180 },
            'dagre': { x: 360, y: 140 },
            'custom-lanes': { x: 360, y: 180 }
          }
        }
      },
      {
        id: 'sample-2',
        label: 'Sample 2 x6',
        type: 'sample',
        isExpanded: false,
        subNodes: ['market_size', 'market_share', 'cogs', 'tax_rate', 'debt_level', 'valuation'],
        x: 360, y: 300,
        positions: {
          collapsed: { x: 360, y: 300 },
          expanded: {
            'inflate': { x: 360, y: 466 }, // drift of 166px downward!
            'dagre': { x: 260, y: 520 },   // massive drift of 244px
            'custom-lanes': { x: 360, y: 300 } // stable 0px drift!
          }
        }
      },
      {
        id: 'sample-3',
        label: 'Sample 3 x6',
        type: 'sample',
        isExpanded: false,
        subNodes: ['interest_rate', 'inflation', 'gdp_growth', 'discount_rate', 'wacc', 'terminal_value'],
        x: 360, y: 420,
        positions: {
          collapsed: { x: 360, y: 420 },
          expanded: {
            'inflate': { x: 360, y: 580 }, // pushed further down
            'dagre': { x: 260, y: 640 },
            'custom-lanes': { x: 360, y: 420 }
          }
        }
      },
      {
        id: 'projections',
        label: 'Projections',
        type: 'projection',
        x: 620, y: 300,
        positions: {
          collapsed: { x: 620, y: 300 },
          expanded: {
            'inflate': { x: 740, y: 300 }, // pushed right by 120px
            'dagre': { x: 780, y: 260 },   // shifted up and right
            'custom-lanes': { x: 620, y: 300 }
          }
        }
      },
      {
        id: 'final-model',
        label: 'Final model',
        type: 'final',
        x: 820, y: 300,
        positions: {
          collapsed: { x: 820, y: 300 },
          expanded: {
            'inflate': { x: 940, y: 300 }, // pushed right
            'dagre': { x: 970, y: 260 },
            'custom-lanes': { x: 820, y: 300 }
          }
        }
      }
    ],
    edges: [
      { id: 'e1', source: 'inputs', target: 'sample-1' },
      { id: 'e2', source: 'inputs', target: 'sample-2' },
      { id: 'e3', source: 'inputs', target: 'sample-3' },
      { id: 'e4', source: 'sample-1', target: 'projections' },
      { id: 'e5', source: 'sample-2', target: 'projections' },
      { id: 'e6', source: 'sample-3', target: 'projections' },
      { id: 'e7', source: 'projections', target: 'final-model' }
    ]
  },
  {
    id: 'thesis-methodology',
    name: 'Thesis Framework: Mixed-Methods Design',
    description: 'A standard structural framework for a doctoral dissertation linking Qualitative Interviews and Quantitative Surveys into a joint synthesis Model.',
    nodes: [
      {
        id: 'inputs',
        label: 'Primary Literature',
        type: 'input',
        x: 120, y: 300,
        positions: {
          collapsed: { x: 120, y: 300 },
          expanded: {
            'inflate': { x: 80, y: 300 },
            'dagre': { x: 120, y: 160 },
            'custom-lanes': { x: 120, y: 300 }
          }
        }
      },
      {
        id: 'sample-1',
        label: 'Phase 1: Qual Study',
        type: 'sample',
        isExpanded: false,
        subNodes: ['coding_tier1', 'axial_coding', 'selective_coding', 'theme_extraction', 'member_checking', 'qual_synthesis'],
        x: 360, y: 180,
        positions: {
          collapsed: { x: 360, y: 180 },
          expanded: {
            'inflate': { x: 360, y: 180 },
            'dagre': { x: 360, y: 150 },
            'custom-lanes': { x: 360, y: 180 }
          }
        }
      },
      {
        id: 'sample-2',
        label: 'Phase 2: Quant Survey',
        type: 'sample',
        isExpanded: false,
        subNodes: ['pilot_survey', 'demographics', 'factor_analysis', 'cronbach_alpha', 'regression', 'hypothesis_test'],
        x: 360, y: 300,
        positions: {
          collapsed: { x: 360, y: 300 },
          expanded: {
            'inflate': { x: 360, y: 450 },
            'dagre': { x: 280, y: 500 },
            'custom-lanes': { x: 360, y: 300 }
          }
        }
      },
      {
        id: 'sample-3',
        label: 'Phase 3: Case Studies',
        type: 'sample',
        isExpanded: false,
        subNodes: ['site_selection', 'cross_case', 'triangulation', 'theoretical_saturation', 'document_review', 'reporting'],
        x: 360, y: 420,
        positions: {
          collapsed: { x: 360, y: 420 },
          expanded: {
            'inflate': { x: 360, y: 590 },
            'dagre': { x: 280, y: 620 },
            'custom-lanes': { x: 360, y: 420 }
          }
        }
      },
      {
        id: 'projections',
        label: 'Triangulation Synthesis',
        type: 'projection',
        x: 620, y: 300,
        positions: {
          collapsed: { x: 620, y: 300 },
          expanded: {
            'inflate': { x: 760, y: 300 },
            'dagre': { x: 740, y: 280 },
            'custom-lanes': { x: 620, y: 300 }
          }
        }
      },
      {
        id: 'final-model',
        label: 'Grounded Meta-Model',
        type: 'final',
        x: 820, y: 300,
        positions: {
          collapsed: { x: 820, y: 300 },
          expanded: {
            'inflate': { x: 960, y: 300 },
            'dagre': { x: 940, y: 280 },
            'custom-lanes': { x: 820, y: 300 }
          }
        }
      }
    ],
    edges: [
      { id: 'te1', source: 'inputs', target: 'sample-1' },
      { id: 'te2', source: 'inputs', target: 'sample-2' },
      { id: 'te3', source: 'inputs', target: 'sample-3' },
      { id: 'te4', source: 'sample-1', target: 'projections' },
      { id: 'te5', source: 'sample-2', target: 'projections' },
      { id: 'te6', source: 'sample-3', target: 'projections' },
      { id: 'te7', source: 'projections', target: 'final-model' }
    ]
  }
];

export const SUB_NODE_DETAILS: Record<string, { label: string; offset_x: number; offset_y: number }> = {
  // Sample 1 subnodes
  'revenue': { label: 'revenue', offset_x: -60, offset_y: -100 },
  'expenses': { label: 'expenses', offset_x: -60, offset_y: -50 },
  'capex': { label: 'capex', offset_x: -60, offset_y: 0 },
  'dna': { label: 'D&A', offset_x: -60, offset_y: 50 },
  'price': { label: 'price', offset_x: -60, offset_y: 100 },
  'assemble': { label: 'assemble', offset_x: 60, offset_y: 0 },

  // Sample 2 subnodes (valuation metrics)
  'market_size': { label: 'market size', offset_x: -60, offset_y: -100 },
  'market_share': { label: 'market share', offset_x: -60, offset_y: -50 },
  'cogs': { label: 'COGS %', offset_x: -60, offset_y: 0 },
  'tax_rate': { label: 'effective tax', offset_x: -60, offset_y: 50 },
  'debt_level': { label: 'debt ratio', offset_x: -60, offset_y: 100 },
  'valuation': { label: 'DCF valuation', offset_x: 60, offset_y: 0 },

  // Sample 3 subnodes (macro assumptions)
  'interest_rate': { label: 'risk-free rate', offset_x: -60, offset_y: -100 },
  'inflation': { label: 'CPI inflation', offset_x: -60, offset_y: -50 },
  'gdp_growth': { label: 'GDP growth', offset_x: -60, offset_y: 0 },
  'discount_rate': { label: 'beta weight', offset_x: -60, offset_y: 50 },
  'wacc': { label: 'calculated WACC', offset_x: -60, offset_y: 100 },
  'terminal_value': { label: 'terminal mult', offset_x: 60, offset_y: 0 },

  // Thesis methodology sample-1
  'coding_tier1': { label: 'Open Coding', offset_x: -60, offset_y: -100 },
  'axial_coding': { label: 'Axial Coding', offset_x: -60, offset_y: -50 },
  'selective_coding': { label: 'Selective Coding', offset_x: -60, offset_y: 0 },
  'theme_extraction': { label: 'Themes', offset_x: -60, offset_y: 50 },
  'member_checking': { label: 'Audit Trail', offset_x: -60, offset_y: 100 },
  'qual_synthesis': { label: 'Qual Synthesis', offset_x: 60, offset_y: 0 },

  // Thesis methodology sample-2
  'pilot_survey': { label: 'Pilot (N=30)', offset_x: -60, offset_y: -100 },
  'demographics': { label: 'Demographics', offset_x: -60, offset_y: -50 },
  'factor_analysis': { label: 'EFA / CFA', offset_x: -60, offset_y: 0 },
  'cronbach_alpha': { label: 'Cronbach α', offset_x: -60, offset_y: 50 },
  'regression': { label: 'SEM Modeling', offset_x: -60, offset_y: 100 },
  'hypothesis_test': { label: 'Hypothesis Rigor', offset_x: 60, offset_y: 0 },

  // Case Studies
  'site_selection': { label: 'Site Profile', offset_x: -60, offset_y: -100 },
  'cross_case': { label: 'Pattern Matching', offset_x: -60, offset_y: -50 },
  'triangulation': { label: 'Triangulation', offset_x: -60, offset_y: 0 },
  'theoretical_saturation': { label: 'Saturation', offset_x: -60, offset_y: 50 },
  'document_review': { label: 'Archival Data', offset_x: -60, offset_y: 100 },
  'reporting': { label: 'Case Reports', offset_x: 60, offset_y: 0 }
};

export const MOCK_THESIS_PAPER: ThesisPaper = {
  title: "Evaluating Graph Layout Stability and Cognition in Structural Framework Modeling",
  authors: "E. Lawrence, S. Kobayashi, J. Patterson",
  journal: "Journal of Computational Academic Frameworks • Vol 14, No. 3",
  doi: "10.1111/jcaf.2026.0429",
  sections: [
    {
      id: "abstract",
      title: "Abstract",
      content: [
        "In academic thesis writing and model analysis, structural frameworks are commonly modeled as Directed Acyclic Graphs (DAGs). When a researcher expands a compact 'black-box' methodological stage to analyze its internal sub-steps, standard automated layout frameworks (e.g. Sugiyama/Dagre) recalculate all positions from scratch. This global reshuffling induces severe 'representational cognitive load' as existing nodes drift dramatically across the screen.",
        "We introduce a layout stability evaluation metric: Sibling Drift (measured in pixels). We compare three paradigm strategies: Inflate-and-Push (local insert), global layout recalculation (Dagre baseline), and Stable Grid-Lane Allotment. Our experimental outcomes reveal that holding structural nodes completely static (0px drift) within lanes results in the lowest recall error and highest reading speed."
      ]
    },
    {
      id: "venn-analysis",
      title: "6. Common High-Frequent Words and Readability Bands",
      content: [
        "To evaluate readability and word density inside our framework, we analyzed the intersection of the top Single-Unit Words (SUWs) across three independent thesis readability cohorts: Easy, Moderate, and Difficult structural models.",
        "The overlap results are shown in the academic figures below. Over 326 highly specific procedural terms dominate the intersection, demonstrating the high structural commonality among otherwise different methodologies. When designing visual software, consistent placement of these common procedural terms is vital to prevent cognitive disorientation."
      ],
      figures: [
        {
          title: "Figure 6: Venn diagram of the top 1,000 frequent SUWs in three bands",
          description: "Quantifies the linguistic overlaps. Core overlap has 326 common terms, with 442 terms exclusive to the Difficult readability group.",
          type: "venn-1000"
        },
        {
          title: "Figure 7: Venn diagram of the top 100 frequent SUWs in three bands",
          description: "Focuses on high-use terms. Core overlap is 52 words, proving extremely high procedural symmetry.",
          type: "venn-100"
        }
      ]
    },
    {
      id: "methodology",
      title: "7. The Layout Stability Experiment",
      content: [
        "The core experiment is implemented directly in the Layout Lab on the right. We represent the thesis structure as 'Inputs' proceeding through three parallel sample steps of 6 sub-steps each, converging onto 'Projections' and a final 'Analytical Model'.",
        "By expanding the first sample node, researchers can witness the visual displacement. Sibling Drift is computed dynamically as the maximum Euclidean distance between the collapsed coordinates and expanded coordinates of all unexpanded nodes in the active graph layout."
      ]
    }
  ]
};
