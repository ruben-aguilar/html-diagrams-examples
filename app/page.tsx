const Node = ({ children, tone = "cyan", className = "" }: { children: React.ReactNode; tone?: string; className?: string }) => (
  <div className={`node node-${tone} ${className}`}>{children}</div>
);

const FlowArrow = ({ vertical = false }: { vertical?: boolean }) => (
  <span className={vertical ? "flow-arrow vertical" : "flow-arrow"} aria-hidden="true">
    <i />
  </span>
);

function ArchitectureDiagram() {
  return (
    <div className="architecture diagram-stage" aria-label="Distributed service architecture diagram">
      <Node tone="blue" className="arch-client"><span className="node-icon">UI</span><b>Clients</b><small>Web · Mobile</small></Node>
      <FlowArrow />
      <Node tone="violet" className="arch-gateway"><span className="node-icon">GW</span><b>Edge Gateway</b><small>Auth · Routing</small></Node>
      <div className="branch-lines" aria-hidden="true"><span /><span /><span /></div>
      <div className="service-row">
        <Node tone="cyan"><span className="status-dot" /><b>Identity</b><small>OAuth 2.1</small></Node>
        <Node tone="green"><span className="status-dot" /><b>Orders</b><small>Core domain</small></Node>
        <Node tone="amber"><span className="status-dot" /><b>Payments</b><small>Ledger</small></Node>
      </div>
      <div className="data-row"><span>Postgres</span><span>Redis</span><span>Event Bus</span></div>
    </div>
  );
}

function PipelineDiagram() {
  const steps = [["01", "Commit", "Signed"], ["02", "Build", "42s"], ["03", "Test", "128/128"], ["04", "Deploy", "Live"]];
  return <div className="pipeline diagram-stage" aria-label="Continuous delivery pipeline diagram">
    <div className="pipeline-track" aria-hidden="true"><span /></div>
    {steps.map(([n, title, meta], i) => <div className="pipeline-step" key={title} style={{"--delay": `${i * .6}s`} as React.CSSProperties}>
      <span className="step-index">{n}</span><span className="step-light"/><b>{title}</b><small>{meta}</small>
    </div>)}
  </div>;
}

function SequenceDiagram() {
  const actors = ["Client", "API", "Worker", "Store"];
  return <div className="sequence diagram-stage" aria-label="Request sequence diagram">
    <div className="sequence-head">{actors.map(a => <span key={a}>{a}</span>)}</div>
    <div className="lifelines">{actors.map(a => <i key={a} />)}</div>
    <div className="sequence-call call-1"><span>POST /jobs</span></div>
    <div className="sequence-call call-2"><span>enqueue()</span></div>
    <div className="sequence-call call-3 reverse"><span>job_id</span></div>
    <div className="sequence-call call-4"><span>persist()</span></div>
  </div>;
}

function ERDiagram() {
  return <div className="er diagram-stage" aria-label="Entity relationship diagram">
    <div className="entity entity-user"><b>USER</b><span><em>PK</em> id</span><span>email</span><span>team_id</span></div>
    <div className="entity entity-team"><b>TEAM</b><span><em>PK</em> id</span><span>name</span></div>
    <div className="entity entity-event"><b>EVENT</b><span><em>PK</em> id</span><span>user_id</span><span>payload</span></div>
    <div className="relation rel-a"><i>1</i><span /><i>N</i></div>
    <div className="relation rel-b"><i>1</i><span /><i>N</i></div>
  </div>;
}

function StateDiagram() {
  return <div className="state-machine diagram-stage" aria-label="Job state machine diagram">
    <span className="start-state" />
    <Node tone="blue" className="state queued">Queued</Node>
    <Node tone="violet" className="state running">Running<span className="state-pulse" /></Node>
    <Node tone="green" className="state complete">Complete</Node>
    <Node tone="red" className="state failed">Failed</Node>
    <span className="state-edge edge-1">claim</span><span className="state-edge edge-2">resolve</span><span className="state-edge edge-3">reject</span><span className="state-edge edge-4">retry</span>
  </div>;
}

function StreamDiagram() {
  return <div className="stream diagram-stage" aria-label="Event streaming topology diagram">
    <div className="producer-stack"><Node tone="blue">API</Node><Node tone="blue">IoT</Node><Node tone="blue">CDC</Node></div>
    <div className="stream-lanes"><span /><span /><span /><div className="event-packets">{[0,1,2,3,4].map(i => <i key={i} style={{"--packet": i} as React.CSSProperties}/>)}</div></div>
    <div className="broker"><small>PARTITIONS</small><b>EVENT BUS</b><div><i/><i/><i/></div><em>24.8k msg/s</em></div>
    <div className="consumer-stack"><Node tone="green">Index</Node><Node tone="green">Notify</Node><Node tone="green">Lake</Node></div>
  </div>;
}

function CircuitDiagram() {
  return <div className="circuit diagram-stage" aria-label="Circuit breaker health diagram">
    <div className="circuit-ring"><div><strong>99.98<sup>%</sup></strong><small>SUCCESS</small></div></div>
    <div className="circuit-states">
      <span className="active"><i/>CLOSED<small>Healthy traffic</small></span>
      <span><i/>OPEN<small>Fail fast</small></span>
      <span><i/>HALF-OPEN<small>Probe</small></span>
    </div>
    <div className="circuit-metrics"><span><b>18ms</b> P50</span><span><b>62ms</b> P99</span><span><b>0.02%</b> ERR</span></div>
  </div>;
}

function LoadBalancerDiagram() {
  return <div className="load-balancer diagram-stage" aria-label="Load balancing diagram">
    <div className="request-dots">{[0,1,2,3,4,5].map(i => <i key={i} style={{"--dot": i} as React.CSSProperties}/>)}</div>
    <Node tone="violet" className="balancer"><span className="balance-icon">⇄</span><b>LOAD BALANCER</b><small>least connections</small></Node>
    <div className="fanout"><span/><span/><span/></div>
    <div className="instance-stack">
      {[38,62,24].map((load,i) => <div className="instance" key={load}><span><i/>node-0{i+1}</span><div><i style={{width:`${load}%`}}/></div><em>{load}%</em></div>)}
    </div>
  </div>;
}

function ObservabilityDiagram() {
  const bars = [26,44,32,61,52,82,64,71,48,76,66,91,72,83,59,78];
  return <div className="observability diagram-stage" aria-label="Observability signal dashboard diagram">
    <div className="signal-chart"><div className="chart-label"><span>REQUEST RATE</span><b>4.2k/s</b></div><div className="bars">{bars.map((h,i)=><i key={i} style={{height:`${h}%`,"--bar":i} as React.CSSProperties}/>)}</div></div>
    <div className="signal-grid"><span><i className="signal-icon latency"/><b>48 ms</b><small>LATENCY</small></span><span><i className="signal-icon traffic"/><b>4.2k</b><small>TRAFFIC</small></span><span><i className="signal-icon errors"/><b>0.08%</b><small>ERRORS</small></span><span><i className="signal-icon saturation"/><b>68%</b><small>SATURATION</small></span></div>
  </div>;
}

function CacheDiagram() {
  return <div className="cache diagram-stage" aria-label="Cache hierarchy diagram">
    <div className="cache-level l1"><span><b>L1</b><small>IN-PROCESS</small></span><em>2 ns</em><i style={{width:"98%"}}/></div>
    <div className="cache-level l2"><span><b>L2</b><small>DISTRIBUTED</small></span><em>0.7 ms</em><i style={{width:"82%"}}/></div>
    <div className="cache-level l3"><span><b>L3</b><small>EDGE</small></span><em>18 ms</em><i style={{width:"64%"}}/></div>
    <div className="cache-level origin"><span><b>Ø</b><small>ORIGIN STORE</small></span><em>126 ms</em><i style={{width:"38%"}}/></div>
    <div className="cache-footer"><span>HIT RATE</span><strong>94.7%</strong><span>↓ 71% ORIGIN LOAD</span></div>
  </div>;
}

const diagrams = [
  { n:"01", tag:"SYSTEMS", title:"Service Architecture", desc:"A distributed platform mapped from edge to persistence.", accent:"blue", body:<ArchitectureDiagram/> },
  { n:"02", tag:"DELIVERY", title:"CI/CD Pipeline", desc:"Every change, traced from commit to production.", accent:"green", body:<PipelineDiagram/> },
  { n:"03", tag:"PROTOCOL", title:"Request Sequence", desc:"The choreography of an asynchronous job request.", accent:"violet", body:<SequenceDiagram/> },
  { n:"04", tag:"DATA", title:"Entity Relationship", desc:"A compact view of core data ownership and cardinality.", accent:"amber", body:<ERDiagram/> },
  { n:"05", tag:"RUNTIME", title:"State Machine", desc:"Job lifecycle transitions, including failure and recovery.", accent:"cyan", body:<StateDiagram/> },
  { n:"06", tag:"EVENTS", title:"Streaming Topology", desc:"Producers, partitions, and consumers in continuous motion.", accent:"blue", body:<StreamDiagram/> },
  { n:"07", tag:"RELIABILITY", title:"Circuit Breaker", desc:"Live resilience posture and the three breaker states.", accent:"green", body:<CircuitDiagram/> },
  { n:"08", tag:"TRAFFIC", title:"Load Distribution", desc:"Least-connections routing across healthy instances.", accent:"violet", body:<LoadBalancerDiagram/> },
  { n:"09", tag:"TELEMETRY", title:"Golden Signals", desc:"The four essential signals of production health.", accent:"cyan", body:<ObservabilityDiagram/> },
  { n:"10", tag:"PERFORMANCE", title:"Cache Hierarchy", desc:"Latency and hit rates across a layered cache strategy.", accent:"amber", body:<CacheDiagram/> },
];

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Diagram systems home"><span className="brand-mark"><i/><i/><i/></span><b>DIAGRAM.SYSTEMS</b></a>
      <nav aria-label="Page sections"><a href="#atlas">Atlas</a><a href="#principles">Principles</a><a className="nav-cta" href="https://github.com/ruben-aguilar/html-diagrams-examples">View source <span>↗</span></a></nav>
    </header>

    <section className="hero" id="top">
      <div className="eyebrow"><span/>ENGINEERING VISUAL ATLAS <em>v1.0</em></div>
      <h1>Complex systems.<br/><span>Clearly rendered.</span></h1>
      <p>Ten living diagrams that turn software architecture, infrastructure, and operational telemetry into a visual language.</p>
      <div className="hero-actions"><a className="primary-button" href="#atlas">Explore the atlas <span>↓</span></a><span className="hero-note"><i/>ALL SYSTEMS OPERATIONAL</span></div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one"><i/></div><div className="orbit orbit-two"><i/></div><div className="orbit-core"><span/><span/><span/></div></div>
    </section>

    <section className="atlas" id="atlas">
      <div className="section-intro"><div><span className="section-number">01 / ATLAS</span><h2>Ten ways to see<br/>how systems work.</h2></div><p>Each diagram uses native HTML and CSS—semantic, responsive, and ready to inspect. Motion reveals flow without getting in the way.</p></div>
      <div className="diagram-grid">
        {diagrams.map(d => <article className={`diagram-card accent-${d.accent}`} key={d.n}>
          <div className="card-heading"><span className="card-number">{d.n}</span><span className="card-tag">{d.tag}</span><span className="card-status"><i/>LIVE</span></div>
          <div className="diagram-wrap">{d.body}</div>
          <div className="card-copy"><h3>{d.title}</h3><p>{d.desc}</p></div>
        </article>)}
      </div>
    </section>

    <section className="principles" id="principles">
      <div className="section-intro"><div><span className="section-number">02 / PRINCIPLES</span><h2>Built for clarity<br/>under pressure.</h2></div></div>
      <div className="principle-grid">
        <div><span>01</span><h3>Signal, not noise.</h3><p>Every line and glow communicates hierarchy, health, or flow.</p></div>
        <div><span>02</span><h3>Motion with meaning.</h3><p>Animation shows state changes and direction—never decoration alone.</p></div>
        <div><span>03</span><h3>One visual language.</h3><p>Shared color, spacing, and type make different systems feel related.</p></div>
      </div>
    </section>

    <footer><a className="brand" href="#top"><span className="brand-mark"><i/><i/><i/></span><b>DIAGRAM.SYSTEMS</b></a><p>HTML diagrams for complex ideas.</p><span>© 2026 · OPEN SOURCE</span></footer>
  </main>;
}
