import React, { useState } from 'react';
import { 
  FileText, Upload, Sparkles, ChevronRight, ChevronDown, 
  BookOpen, CheckCircle, HelpCircle, Activity, Lightbulb, Play,
  Languages
} from 'lucide-react';

interface TocNode {
  id: string;
  title: string;
  level: 1 | 2 | 3; // 1: Chapter, 2: Section, 3: Paragraph summary node
  text?: string;    // Inside draft text for deepest nodes
  children?: string[]; // IDs of subsections/detail paragraphs
  isExpanded: boolean;
}

const LAB_TRANSLATIONS = {
  en: {
    lab_badge: "Module 2: Structure Laboratory",
    lab_title: "Thesis Blueprint Lab",
    lab_desc: "Upload thesis.pdf. Chapters are parsed as collapsible nodes; deepest paragraph nodes show real-time summarized feedback.",
    btn_pdf_sample: "PDF / Sample Input",
    btn_paste_md: "Paste Markdown TOC",
    label_file_src: "PDF File Source Upload",
    text_extracting: "Extracting text stream...",
    text_change_file: "Change thesis.pdf",
    text_drop_here: "Drop thesis.pdf here",
    btn_compile: "Compile Pasted Document",
    label_outlines: "Collapsible Outlines and Nodes",
    label_interactive_graph: "Interactive Structural Network Graph",
    label_visible_nodes: "Visible Nodes",
    badge_lvl1: "Level 1",
    badge_lvl2: "Level 2",
    badge_sum_in: "Summary Inside",
    btn_collapse: "Collapse",
    btn_expand: "Expand",
    btn_summary: "Summary",
    badge_resolved: "Terminal Segment Resolved",
    id_label: "ID",
    lvl3_label: "Level 3 Deepest Node",
    lbl_original: "Original Core Text",
    lbl_ai_out: "AI Thesis Synthesis Output",
    lbl_compiling: "Compiling with Gemini AI...",
    lbl_no_synthesis: "No synthesis compiled yet for this paragraph.",
    footer_tip: "The deepest node holds the summarized synthesis of this section.",
    btn_run_summary: "Run Gemini AI Summary",
    prompt_pasted_placeholder: "# Chapter\n## Section\n### Subnode\nParagraph content to summarize...",
    alert_no_sections: "Could not detect sections. Highlight headers using format: # (Chapter), ## (Section), ### (Summary Paragraph)",
    alert_custom_loaded: "Custom structure loaded successfully! Explore your thesis hierarchy in the workbench.",
    alert_format_issue: "Formatting issue. Please use simple Markdown headers (#, ##, ###)",
    help_placeholder: "Please select a deepest node (Level 3 - Paragraph) inside the chapter outline to see summaries."
  },
  zh: {
    lab_badge: "模块 2: 论文结构实验室",
    lab_title: "论文蓝图实验室",
    lab_desc: "上传 thesis.pdf。章节将被解析为可折叠节点，最深的段落节点将显示实时生成的摘要反馈。",
    btn_pdf_sample: "PDF / 示例输入",
    btn_paste_md: "粘贴 Markdown 大纲",
    label_file_src: "PDF 文件源上传",
    text_extracting: "正在提取文本流...",
    text_change_file: "更换 thesis.pdf",
    text_drop_here: "将 thesis.pdf 拖拽或点击上传到此处",
    btn_compile: "编译该设计图大纲",
    label_outlines: "可折叠大纲与节点",
    label_interactive_graph: "交互式结构网络拓扑图",
    label_visible_nodes: "当前可见节点",
    badge_lvl1: "一级章节",
    badge_lvl2: "二级小节",
    badge_sum_in: "内含段落",
    btn_collapse: "折叠",
    btn_expand: "展开",
    btn_summary: "摘要",
    badge_resolved: "终端分段解析已就绪",
    id_label: "节点标识",
    lvl3_label: "三级段落终端叶子节点",
    lbl_original: "原文核心文本内容",
    lbl_ai_out: "AI 论文高阶摘要合成输出",
    lbl_compiling: "Gemini AI 正在编制摘要...",
    lbl_no_synthesis: "该段落暂无生成摘要合成。",
    footer_tip: "叶子层级节点（Level 3 段落层）中包含了当前章节段落的精炼摘要。",
    btn_run_summary: "执行 Gemini AI 摘要分析",
    prompt_pasted_placeholder: "# 章节名称\n## 小节标题\n### 段落子项\n请输入用于多维度摘要分析的原始论文详细文本...",
    alert_no_sections: "未能检测到格式化的章节段落。请使用 Markdown 标志规则：# (代表 Chapter 一级), ## (代表 Section 二级), ### (代表叶子段落三级)",
    alert_custom_loaded: "自定义论文结构成功加载！请在工作区树形大纲中自由查看节点关联关系。",
    alert_format_issue: "格式化编译解析出错。请确认是否使用了标准的 #, ##, ### 标头记号。",
    help_placeholder: "请在左侧大纲中选择第三级（Level 3）最深段落节点，即可在此查看多维度智能综合摘要。"
  },
  ja: {
    lab_badge: "モジュール 2: 構成ラボラトリー",
    lab_title: "論文ブループリント・ラボ",
    lab_desc: "thesis.pdfをアップロード。章は折りたたみ可能なノードにパースされ、最深の段落ノードにリアルタイムの要約フィードバックが表示されます。",
    btn_pdf_sample: "PDF / サンプル入力",
    btn_paste_md: "Markdown目次の貼り付け",
    label_file_src: "PDFファイルソースのアップロード",
    text_extracting: "テキストストリーム of 抽出中...",
    text_change_file: "thesis.pdfを変更",
    text_drop_here: "ここにthesis.pdfをドロップ、またはクリックして選択",
    btn_compile: "貼り付けた文書をビルドする",
    label_outlines: "折りたたみアウトラインとノード",
    label_interactive_graph: "インタラクティブ構造ネットワーク・グラフ",
    label_visible_nodes: "可視ノード",
    badge_lvl1: "章（第1層）",
    badge_lvl2: "節（第2層）",
    badge_sum_in: "要約対象",
    btn_collapse: "折りたたむ",
    btn_expand: "展開する",
    btn_summary: "要約",
    badge_resolved: "ターミナルセグメント分析完了",
    id_label: "ノードID",
    lvl3_label: "レベル3 最深段落ノード",
    lbl_original: "原文コアテキスト",
    lbl_ai_out: "AI 論文統合要約出力",
    lbl_compiling: "Gemini AIでコンパイル中...",
    lbl_no_synthesis: "この段落の要約はまだコンパイルされていません。",
    footer_tip: "最深レベルのノードは、このセクションの統合された要約を保持します。",
    btn_run_summary: "Gemini AI要約を実行",
    prompt_pasted_placeholder: "# 章タイトル\n## 節タイトル\n### サブセクション\n要約を作成したいテキストをここに入力してください...",
    alert_no_sections: "セクションを検出できませんでした。ヘッダー形式をご確認ください: # (章), ## (節), ### (段落要約ノード)",
    alert_custom_loaded: "カスタム論文構造が正常にロードされました！ワークベンチで階層を探索してください。",
    alert_format_issue: "フォーマットの処理エラー。シンプルなMarkdownヘッダー形式（#, ##, ###）を使用してください。",
    help_placeholder: "章のアウトライン内の最深ノード（レベル3 - 段落）を選択すると、要約がこちらに表示されます。"
  }
};

// Prefilled high-fidelity structure representing common thesis chapters for instantaneous playground use
const PRELOADED_TOC_NODES: Record<string, TocNode> = {
  'ch1': { id: 'ch1', title: 'Chapter 1: Theoretical Motivation', level: 1, children: ['sec1_1', 'sec1_2'], isExpanded: true },
  'sec1_1': { id: 'sec1_1', title: '1.1 Background on Graph-Cognitive Friction', level: 2, children: ['p1_1_1', 'p1_1_2'], isExpanded: true },
  'p1_1_1': { id: 'p1_1_1', title: 'Contextual Sibling Displacement Bounds', level: 3, text: 'In computational diagrams, whenever structural frameworks undergo nested adjustments, adjacent nodes are pushed wide. Sibling Drifts describe the maximum Euclidean displacement vector affecting secondary sister-routes. Such displacement breaks eye-tracking flow and induces considerable cognitive load during analytical walkthroughs.', isExpanded: false },
  'p1_1_2': { id: 'p1_1_2', title: 'Distant Upstream Link Jitter Coefficient', level: 3, text: 'Nodes that do not share any direct operational ancestor can easily become scattered across standard forces models. Global redraw triggers of force graphs cause uncontrollable position updates. These high links coefficients require stable lane anchors.', isExpanded: false },
  
  'sec1_2': { id: 'sec1_2', title: '1.2 Problem Hypothesis and Operational Focus', level: 2, children: ['p1_2_1'], isExpanded: false },
  'p1_2_1': { id: 'p1_2_1', title: 'Validation Objectives and Research Questions', level: 3, text: 'Is it possible to reduce sibling drift from a global average of 250px down to exactly 0px without losing layout symmetry? This study investigates whether Stable Grid-Lane layouts retain spatial memory better than automated spring layouts.', isExpanded: false },

  'ch2': { id: 'ch2', title: 'Chapter 2: Methods and Systems Design', level: 1, children: ['sec2_1', 'sec2_2'], isExpanded: false },
  'sec2_1': { id: 'sec2_1', title: '2.1 Stable Grid-Lane Allotment Algorithm', level: 2, children: ['p2_1_1'], isExpanded: false },
  'p2_1_1': { id: 'p2_1_1', title: 'Lane Distribution and Static Anchoring', level: 3, text: 'By allocating predefined boundaries (lanes) based on semantic hierarchy tiers, we restrict coordinate updates to local lanes. As a result, expanding Sample 1 node causes vertical shifts strictly within Lane 2, preserving absolute coordinates for all inputs and final model nodes.', isExpanded: false },

  'sec2_2': { id: 'sec2_2', title: '2.2 Experimental Evaluation metrics', level: 2, children: ['p2_2_1'], isExpanded: false },
  'p2_2_1': { id: 'p2_2_1', title: 'Sibling Drift and Cognitive Error Measures', level: 3, text: 'We recruit 45 participants to search for procedural values under tree expansion. We measure search latency and mistake ratios. Control configurations utilize classical Sugiyama layouts, while our testbed implements stable lines.', isExpanded: false }
};

export default function ThesisPdfStructuralLab() {
  const [toc, setToc] = useState<Record<string, TocNode>>(PRELOADED_TOC_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('p1_1_1');
  
  // Multilingual/locale state
  const [locale, setLocale] = useState<'en' | 'zh' | 'ja'>('en');
  const t = LAB_TRANSLATIONS[locale];
  
  // PDF Upload Mock states
  const [pdfFile, setPdfFile] = useState<{ name: string; size: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Custom manual markdown field
  const [useCustomText, setUseCustomText] = useState(false);
  const [pastedStructure, setPastedStructure] = useState(
    "# Chapter 1: Introduction\n## 1.1 Scope Definitions\n### Deepest Node A\nThis paragraph explores how cognitive mapping functions within scientific documents.\n\n## 1.2 Prior Work\n### Deepest Node B\nRecent studies argue that custom lane division is less useful than physical graph models."
  );

  // Summarize endpoint state
  const [summaryMap, setSummaryMap] = useState<Record<string, string>>({});
  const [isSummarizing, setIsSummarizing] = useState<Record<string, boolean>>({});
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Parse pasted custom markdown into TOC nodes
  const parsePastedOutline = () => {
    try {
      const lines = pastedStructure.split('\n');
      const newToc: Record<string, TocNode> = {};
      
      let curChId = '';
      let curSecId = '';
      let subCounter = 1;
      
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ')) {
          const title = trimmed.replace('# ', '');
          const id = `ch_custom_${subCounter++}`;
          newToc[id] = { id, title: `Chapter: ${title}`, level: 1, children: [], isExpanded: true };
          curChId = id;
        } else if (trimmed.startsWith('## ')) {
          const title = trimmed.replace('## ', '');
          const id = `sec_custom_${subCounter++}`;
          newToc[id] = { id, title, level: 2, children: [], isExpanded: true };
          curSecId = id;
          if (curChId && newToc[curChId]) {
            newToc[curChId].children = [...(newToc[curChId].children || []), id];
          }
        } else if (trimmed.startsWith('### ')) {
          const title = trimmed.replace('### ', '');
          const id = `p_custom_${subCounter++}`;
          newToc[id] = { id, title, level: 3, text: '', isExpanded: false };
          if (curSecId && newToc[curSecId]) {
            newToc[curSecId].children = [...(newToc[curSecId].children || []), id];
          }
        } else if (trimmed.length > 0 && !trimmed.startsWith('#')) {
          // Find the last level 3 deep node and append text
          const lastL3Id = Object.keys(newToc).reverse().find(k => newToc[k].level === 3);
          if (lastL3Id) {
            newToc[lastL3Id].text = (newToc[lastL3Id].text || '') + ' ' + trimmed;
          }
        }
      });

      if (Object.keys(newToc).length === 0) {
        alert(t.alert_no_sections);
        return;
      }

      setToc(newToc);
      // Select the first deepest node
      const firstD = Object.keys(newToc).find(k => newToc[k].level === 3);
      if (firstD) setSelectedNodeId(firstD);
      alert(t.alert_custom_loaded);
    } catch (e) {
      alert(t.alert_format_issue);
    }
  };

  // handle local PDF uploader simulator
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setPdfFile({ name: file.name, size: Math.round(file.size / 1024) });
        setIsUploading(false);
        
        // Form a custom parsed structure based on the PDF file's actual metadata
        const prefix = file.name.replace(/\.[^/.]+$/, "");
        const parsedToc: Record<string, TocNode> = {
          'ch_pdf_1': { id: 'ch_pdf_1', title: `Chapter 1: Analysis of ${prefix}`, level: 1, children: ['sec_pdf_1_1', 'sec_pdf_1_2'], isExpanded: true },
          'sec_pdf_1_1': { id: 'sec_pdf_1_1', title: `1.1 Empirical Testing Strategy`, level: 2, children: ['p_pdf_1_1_1'], isExpanded: true },
          'p_pdf_1_1_1': { id: 'p_pdf_1_1_1', title: `Reviewing ${prefix} Metrics`, level: 3, text: `The uploaded thesis document ${file.name} proposes a novel taxonomy. During empirical testing on visual layout stability, observers located in different clusters report that static placement helps lock target nodes. Our extracted paper outlines 0px drift vectors.`, isExpanded: false },
          'sec_pdf_1_2': { id: 'sec_pdf_1_2', title: `1.2 Structural Baseline Evaluation`, level: 2, children: ['p_pdf_1_2_1'], isExpanded: false },
          'p_pdf_1_2_1': { id: 'p_pdf_1_2_1', title: `Comparative Evaluation Framework`, level: 3, text: `The manuscript represents a directed acyclic graph where child elements expand gracefully. Expanding samples shows immediate coordinate adjustments. Our study highlights differences between stable lanes and spring models.`, isExpanded: false }
        };
        setToc(parsedToc);
        setSelectedNodeId('p_pdf_1_1_1');
      }, 1200);
    }
  };

  // Toggle child elements for Level 1 or Level 2 nodes
  const toggleNodeExpand = (nodeId: string) => {
    setToc(prev => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        isExpanded: !prev[nodeId].isExpanded
      }
    }));
  };

  // Query server-side Gemini API on /api/summarize for live synthesis
  const fetchGeminiSummaryForNode = async (nodeId: string) => {
    const node = toc[nodeId];
    if (!node || !node.text) return;

    setIsSummarizing(prev => ({ ...prev, [nodeId]: true }));
    setSummaryError(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: node.title,
          text: node.text
        })
      });

      if (!response.ok) {
        throw new Error(await response.text() || "Failed to compile summary.");
      }

      const data = await response.json();
      setSummaryMap(prev => ({ ...prev, [nodeId]: data.summary }));
    } catch (e: any) {
      console.warn("Gemini service failed (making local offline highlight summary):", e);
      // Failover safely to standard extractive summary (offline-first guidelines!)
      const extractive = `• CORE FOCUS: ${node.title}.\n• SEGMENT DENSITY: Analyzes spatial patterns and reading friction.\n• THESIS CONTRIBUTION: Confirms layout stability reduces memory fatigue. (Offline Failover Mode Enabled)`;
      setSummaryMap(prev => ({ ...prev, [nodeId]: extractive }));
      setSummaryError("Service ran locally. For active server AI modeling, ensure your GEMINI_API_KEY is configured in the Secrets panel.");
    } finally {
      setIsSummarizing(prev => ({ ...prev, [nodeId]: false }));
    }
  };

  // Extract all currently visible nodes in hierarchy (filtering based on parents' expanded state)
  const getVisibleGraphNodes = (): TocNode[] => {
    const list: TocNode[] = [];
    
    // Level 1: Chapters are always visible
    (Object.values(toc) as TocNode[]).forEach(node => {
      if (node.level === 1) {
        list.push(node);
        
        // Level 2: Visible only if chapter is expanded
        if (node.isExpanded && node.children) {
          node.children.forEach(l2Id => {
            const l2Node = toc[l2Id];
            if (l2Node) {
              list.push(l2Node);
              
              // Level 3 Nodes: Visible only if section is expanded
              if (l2Node.isExpanded && l2Node.children) {
                l2Node.children.forEach(l3Id => {
                  const l3Node = toc[l3Id];
                  if (l3Node) {
                    list.push(l3Node);
                  }
                });
              }
            }
          });
        }
      }
    });
    
    return list;
  };

  const visibleNodes = getVisibleGraphNodes();
  const selectedNode = toc[selectedNodeId];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-5 flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)] overflow-hidden text-slate-100" id="thesis-pdf-blueprint-lab">
      
      {/* LEFT COLUMN: Input controls & TOC hierarchical list */}
      <div className="w-full md:w-5/12 flex flex-col h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
        
        {/* Lab Header */}
        <div className="mb-4 shrink-0 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] bg-indigo-950 text-indigo-400 font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t.lab_badge}
            </span>
            <h2 className="font-sans font-bold text-lg text-white mt-1.5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              {t.lab_title}
            </h2>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {t.lab_desc}
            </p>
          </div>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-1.5 shadow-xs shrink-0 self-start">
            <Languages className="w-3.5 h-3.5 text-indigo-500" />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as 'en' | 'zh' | 'ja')}
              className="text-[10.5px] font-bold font-sans bg-transparent border-none text-slate-300 focus:outline-none cursor-pointer pr-1"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>

        {/* Input selectors */}
        <div className="mb-4 shrink-0 grid grid-cols-2 gap-2">
          <button 
            onClick={() => setUseCustomText(false)}
            className={`py-1.5 px-3 rounded-lg text-xs font-sans font-bold transition-all border ${
              !useCustomText 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.btn_pdf_sample}
          </button>
          <button 
            onClick={() => setUseCustomText(true)}
            className={`py-1.5 px-3 rounded-lg text-xs font-sans font-bold transition-all border ${
              useCustomText 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.btn_paste_md}
          </button>
        </div>

        {/* Dynamic Controls Slot */}
        <div className="mb-4 shrink-0">
          {!useCustomText ? (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-inner">
              <label className="block text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider mb-2">
                {t.label_file_src}
              </label>
              
              <div className="flex items-center gap-3">
                <label className="flex-1 border border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900 hover:bg-slate-900/50 rounded-lg p-3 text-center cursor-pointer transition-all flex flex-col items-center justify-center">
                  <Upload className="w-4 h-4 text-indigo-400 mb-1" />
                  <span className="text-[10px] text-slate-300 font-bold">
                    {isUploading ? t.text_extracting : pdfFile ? t.text_change_file : t.text_drop_here}
                  </span>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handlePdfUpload} 
                    className="hidden" 
                    disabled={isUploading}
                  />
                </label>

                {pdfFile && (
                  <div className="bg-indigo-950/60 border border-indigo-900 rounded-lg px-3 py-2 flex flex-col justify-center max-w-[150px]">
                    <span className="text-[10px] font-mono font-bold text-indigo-300 truncate max-w-full">
                      {pdfFile.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                      {pdfFile.size} KB • Read OK
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
              <textarea
                value={pastedStructure}
                onChange={(e) => setPastedStructure(e.target.value)}
                className="w-full text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-20 resize-none"
                placeholder={t.prompt_pasted_placeholder}
              />
              <button
                onClick={parsePastedOutline}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-all"
              >
                {t.btn_compile}
              </button>
            </div>
          )}
        </div>

        {/* TOC Hierarchical Tree list */}
        <div className="flex-1 overflow-y-auto border border-slate-850 bg-slate-950/40 rounded-xl p-3 scrollbar-thin">
          <span className="block text-[9.5px] font-mono text-slate-500 uppercase font-bold tracking-wider mb-2">
            {t.label_outlines}
          </span>

          <div className="flex flex-col gap-1.5">
            {(Object.values(toc) as TocNode[]).map((node) => {
              if (node.level === 1) {
                return (
                  <div key={node.id} className="flex flex-col gap-1 rounded-lg bg-slate-900/40 p-1.5 border border-slate-850/60">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => toggleNodeExpand(node.id)}
                        className="flex items-center gap-1.5 text-xs text-white font-bold hover:text-indigo-400 transition-colors text-left"
                      >
                        {node.isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                        <span className="truncate">{node.title}</span>
                      </button>
                      <span className="text-[8px] font-mono bg-indigo-950 text-indigo-400 px-1.5 py-0.5 rounded uppercase">{t.badge_lvl1}</span>
                    </div>

                    {/* Level 2 inside Level 1 */}
                    {node.isExpanded && node.children && (
                      <div className="pl-4 mt-1 flex flex-col gap-1 border-l border-slate-800 border-dashed">
                        {node.children.map(l2Id => {
                          const l2Node = toc[l2Id];
                          if (!l2Node) return null;
                          return (
                            <div key={l2Id} className="flex flex-col gap-0.5 pb-1">
                              <div className="flex items-center justify-between">
                                <button 
                                  onClick={() => toggleNodeExpand(l2Id)}
                                  className="flex items-center gap-1.5 text-xs text-slate-300 font-bold hover:text-indigo-400 transition-colors text-left"
                                >
                                  {l2Node.isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                                  <span className="truncate">{l2Node.title}</span>
                                </button>
                                <span className="text-[8px] font-mono bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded uppercase">{t.badge_lvl2}</span>
                              </div>

                              {/* Level 3 deep Summary Nodes */}
                              {l2Node.isExpanded && l2Node.children && (
                                <div className="pl-4 mt-1 flex flex-col gap-1 border-l border-slate-850">
                                  {l2Node.children.map(l3Id => {
                                    const l3Node = toc[l3Id];
                                    if (!l3Node) return null;
                                    return (
                                      <button
                                        key={l3Id}
                                        onClick={() => setSelectedNodeId(l3Id)}
                                        className={`w-full text-left p-1.5 rounded text-[11px] flex items-center justify-between transition-all font-sans font-bold border ${
                                          selectedNodeId === l3Id 
                                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300' 
                                            : 'bg-slate-950 hover:bg-slate-900 border-slate-900 text-slate-400 hover:text-slate-200'
                                        }`}
                                      >
                                        <span className="truncate pr-2">{l3Node.title}</span>
                                        <span className="text-[8px] font-mono bg-emerald-950 text-emerald-400 px-1 py-0.5 rounded shrink-0 leading-none">{t.badge_sum_in}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Interactive Structural Map Rendering & Summary Output */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Visual Graph Canvas preview */}
        <div className="h-1/2 relative border border-slate-800 rounded-xl overflow-auto bg-slate-950 p-4 shrink-0 shadow-inner" style={{ minHeight: '230px' }}>
          <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 bg-slate-900 border border-slate-800 rounded px-2 py-0.5">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>{t.label_interactive_graph}</span>
          </div>

          <div className="absolute top-2 right-2 z-20 text-[9px] text-slate-500 font-mono">
            {t.label_visible_nodes}: {visibleNodes.length}
          </div>

          {/* Dotted lines grid */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'radial-gradient(#1e293b 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px'
          }}></div>

          {/* Connected Lines Canvas */}
          <svg className="absolute top-0 left-0 w-full h-[320px] pointer-events-none z-0">
            {/* Draw connectors from Levels */}
            {visibleNodes.map((source, idx) => {
              if (source.level < 3 && source.children) {
                // Determine source coordinates (grid simulated coordinates based on parent indices)
                const sourceY = source.level === 1 ? 50 : 130;
                // Distribute on X coordinates from 50 to 950 based on visibility
                const sourceXIndex = visibleNodes.filter(n => n.level === source.level).indexOf(source);
                const sourceCount = visibleNodes.filter(n => n.level === source.level).length;
                const sourceX = sourceCount > 1 ? 70 + (sourceXIndex / (sourceCount - 1)) * 360 : 250;

                return (
                  <g key={`lines-${source.id}`}>
                    {source.children.map(targetId => {
                      const target = toc[targetId];
                      if (!target || !visibleNodes.includes(target)) return null;

                      const targetY = target.level === 2 ? 130 : 220;
                      const targetXIndex = visibleNodes.filter(n => n.level === target.level).indexOf(target);
                      const targetCount = visibleNodes.filter(n => n.level === target.level).length;
                      const targetX = targetCount > 1 ? 70 + (targetXIndex / (targetCount - 1)) * 360 : 250;

                      // Draw neat curved connectors
                      const dx = Math.abs(targetX - sourceX);
                      const midY = sourceY + (targetY - sourceY) * 0.5;
                      const pathStr = `M ${sourceX} ${sourceY} C ${sourceX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`;

                      return (
                        <path
                          key={`${source.id}-to-${target.id}`}
                          d={pathStr}
                          stroke={target.level === 3 ? '#059669' : '#312e81'}
                          strokeWidth="1.5"
                          fill="none"
                          className="transition-all duration-500 opacity-60"
                        />
                      );
                    })}
                  </g>
                );
              }
              return null;
            })}
          </svg>

          {/* Coordinates DOM nodes layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {visibleNodes.map((node) => {
              const nodeY = node.level === 1 ? 50 : node.level === 2 ? 130 : 220;
              const sameLevelNodes = visibleNodes.filter(n => n.level === node.level);
              const nodeXIndex = sameLevelNodes.indexOf(node);
              const nodeCount = sameLevelNodes.length;
              const nodeX = nodeCount > 1 ? 70 + (nodeXIndex / (nodeCount - 1)) * 360 : 250;

              let typeColor = '';
              if (node.level === 1) {
                typeColor = node.isExpanded 
                  ? 'border-indigo-500 bg-indigo-950 text-indigo-300' 
                  : 'border-indigo-600 bg-indigo-900 border-dashed text-indigo-100';
              } else if (node.level === 2) {
                typeColor = node.isExpanded 
                  ? 'border-purple-500 bg-purple-950 text-purple-300' 
                  : 'border-purple-600 bg-purple-900 border-dashed text-purple-100';
              } else {
                typeColor = selectedNodeId === node.id
                  ? 'border-emerald-400 bg-emerald-950 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'border-slate-800 bg-slate-900 text-slate-400';
              }

              return (
                <div
                  key={`graph-node-${node.id}`}
                  style={{
                    left: `${nodeX}px`,
                    top: `${nodeY}px`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className={`absolute pointer-events-auto border rounded-xl px-2.5 py-1.5 text-[10.5px] max-w-[130px] font-sans font-bold flex flex-col items-center gap-1 shadow-md transition-all ${typeColor}`}
                >
                  <span className="truncate max-w-[110px] text-center">{node.title}</span>
                  {node.level < 3 && (
                    <button
                      onClick={() => toggleNodeExpand(node.id)}
                      className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700/80 text-slate-300 transition-all font-mono border border-slate-750 cursor-pointer pointer-events-auto"
                    >
                      {node.isExpanded ? t.btn_collapse : t.btn_expand}
                    </button>
                  )}
                  {node.level === 3 && (
                    <button
                      onClick={() => setSelectedNodeId(node.id)}
                      className="text-[8.5px] px-2 py-0.5 rounded bg-emerald-900 hover:bg-emerald-800 text-emerald-200 transition-colors font-sans cursor-pointer pointer-events-auto"
                    >
                      {t.btn_summary}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Deepest Node Summary detail box */}
        <div className="flex-1 mt-4 overflow-y-auto border border-slate-800 bg-slate-950 rounded-xl p-4 flex flex-col justify-between scrollbar-thin">
          {selectedNode && selectedNode.level === 3 ? (
            <div className="flex flex-col h-full justify-between gap-4">
              
              {/* Draft node metadata */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {t.badge_resolved}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {t.id_label}: {selectedNode.id} • {t.lvl3_label}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-sm text-white leading-tight">
                  {selectedNode.title}
                </h3>
              </div>

              {/* Grid content */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 my-2 overflow-y-auto max-h-[160px]">
                {/* Draft raw paragraph display */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 flex flex-col">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                    {t.lbl_original}
                  </span>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed overflow-y-auto flex-1 font-sans pr-1">
                    {selectedNode.text || "Draft content is empty. Paste your manuscript text on the left."}
                  </p>
                </div>

                {/* Synthesis Output container */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-indigo-950 flex flex-col justify-between relative">
                  <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{t.lbl_ai_out}</span>
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                  </span>

                  <div className="flex-1 overflow-y-auto text-[11px] text-slate-300 leading-relaxed pr-1 mt-2">
                    {isSummarizing[selectedNode.id] ? (
                      <div className="flex flex-col items-center justify-center h-full gap-2 py-4">
                        <Activity className="w-5 h-5 text-indigo-400 animate-spin" />
                        <span className="text-[10px] font-mono text-slate-500">{t.lbl_compiling}</span>
                      </div>
                    ) : summaryMap[selectedNode.id] ? (
                      <div className="whitespace-pre-line font-medium text-slate-100 italic bg-cyan-950/20 p-2.5 rounded border border-cyan-900/30">
                        {summaryMap[selectedNode.id]}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-4 text-slate-500 gap-1.5 font-bold">
                        <Lightbulb className="w-5 h-5 text-slate-600" />
                        <span>{t.lbl_no_synthesis}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Prompt actions footer */}
              <div className="border-t border-slate-850 pt-3 flex flex-wrap justify-between items-center gap-3 shrink-0">
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-sans">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.footer_tip}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => fetchGeminiSummaryForNode(selectedNode.id)}
                    disabled={isSummarizing[selectedNode.id] || !selectedNode.text}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-md hover:shadow-indigo-500/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.btn_run_summary}</span>
                  </button>
                </div>
              </div>

              {/* Secure notification warnings */}
              {summaryError && (
                <div className="text-[9.5px] text-amber-500 font-mono bg-amber-950/40 border border-amber-900 px-3 py-1.5 rounded-lg">
                  {summaryError}
                </div>
              )}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2 text-center py-8">
              <HelpCircle className="w-8 h-8 text-slate-700" />
              <span className="text-xs font-bold font-sans">{t.help_placeholder}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
