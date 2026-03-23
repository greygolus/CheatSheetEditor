// ===== STATE =====
let sections = [];
let sectionIdCounter = 0;
let draggedItem = null;

// ===== INITIALIZE WITH CURRENT SHEET CONTENT =====
function initSections() {
  const initialSections = [
    {title:"Special Relativity", color:"#64748b", content:`<p>$\\gamma=1/\\sqrt{1-v^2/c^2}$, $\\beta=v/c$ &nbsp;|&nbsp; $E^2=m^2c^4+p^2c^2$</p><p><b>Lorentz:</b> $x'=\\gamma(x-vt)$, $t'=\\gamma(t-vx/c^2)$</p><p><b>Vel add:</b> $u_x'=\\frac{u_x-v}{1-u_xv/c^2}$, $u_{y,z}'=\\frac{u_{y,z}}{\\gamma(1-u_xv/c^2)}$</p><p><b>4-vec:</b> $x_\\mu=(ct,x,y,z)$, $P_\\mu=(E/c,\\vec p)$, $M_\\mu=\\gamma(c,\\vec v)$</p><p>$a\\cdot b=-a_0b_0+a_1b_1+a_2b_2+a_3b_3$</p><p><b>Light Doppler:</b> $\\nu_{obs}=\\nu_s\\sqrt{\\frac{c\\pm v}{c\\mp v}}$ <span class="n">+top = approaching (blueshift), bottom = receding. λ shifts inversely to ν.</span></p>`},
    {title:"SHM Essentials", color:"#2563eb", content:`<p>$\\ddot x+(k/m)x=0$, $\\omega^2=k/m$, $x=A\\cos(\\omega t+\\phi)$, $v=-A\\omega\\sin(\\omega t+\\phi)$</p><p>$T=2\\pi/\\omega$, $f=1/T$ | <b>Pendulum:</b> $T=2\\pi\\sqrt{\\ell/g}$ <span class="n">— period indep. of mass & amplitude</span></p><p><b>Energy:</b> $KE=\\frac12 m\\omega^2A^2\\sin^2(\\omega t+\\phi)$, $PE=\\frac12 kx^2$, $E_{tot}=\\frac12 kA^2$</p><p>$KE/PE=\\tan^2(\\omega t+\\phi)$ <span class="n">— use for ratio at specific phase/time</span></p><p><b>Add mass at equil:</b> momentum: $m_1v_1=m_2v_2$. Then $A_2=v_2\\sqrt{m_2/k}$, $T_2=2\\pi\\sqrt{m_2/k}$</p><p><b>Damped:</b> $x=Ae^{-bt/2m}\\cos(\\omega't+\\phi)$, $\\omega'=\\sqrt{\\omega_0^2-(b/2m)^2}$. $E\\propto A^2$: 5% A drop → 9.75% E loss.</p><p><b>Driven:</b> $A=\\frac{F_0}{\\sqrt{m^2(\\omega^2-\\omega_0^2)^2+b^2\\omega^2}}$, $\\tan\\delta=\\frac{b\\omega}{m(\\omega_0^2-\\omega^2)}$ <span class="n">— resonance near ω≈ω₀</span></p><p><b>Custom potential:</b> Taylor expand $V(x)$ about equil $x_0$: $\\omega=\\sqrt{V''(x_0)/m}$. Find equil where V'=0, confirm V''>0.</p>`},
    {title:"Traveling Waves", color:"#059669", content:`<div class="fb">$y=A\\sin(kx-\\omega t+\\phi)$ | $v=\\lambda f=\\omega/k$ | $k=2\\pi/\\lambda$ | $\\omega=2\\pi f=2\\pi/T$</div><p><b>Wave eqns:</b> $\\frac{1}{v^2}\\frac{\\partial^2y}{\\partial t^2}=\\frac{\\partial^2y}{\\partial x^2}$ (1D) &nbsp; $\\nabla^2\\psi=\\frac{1}{v^2}\\frac{\\partial^2\\psi}{\\partial t^2}$ (3D)</p><p><b>String:</b> $v=\\sqrt{\\tau/\\mu}$, $\\mu=m/L$ | <b>Sound:</b> $v=\\sqrt{B/\\rho}$</p><p><b>Transverse vel:</b> $u=\\partial y/\\partial t$, max $u_m=A\\omega$ → $\\omega=u_m/A$ <span class="n">— use when given max transverse speed</span></p><p><b>Direction:</b> $kx-\\omega t$ → +x | $kx+\\omega t$ → −x <span class="w">⚠ sign of ω sets direction!</span></p><p><b>Power:</b> $P=\\frac12\\mu v\\omega^2 y_m^2\\propto\\sqrt\\tau\\, f^2$. 4×τ→2×P, ½f→¼P</p><p><b>τ from v:</b> $\\tau_2=\\tau_1(v_2/v_1)^2$ | <b>Hanging rope:</b> $v(y)=\\sqrt{gy}$, $t=2\\sqrt{L/g}$</p><p><b>Phase diff:</b> $\\Delta\\phi=\\frac{2\\pi}{\\lambda}\\Delta d$ | Constr: $\\Delta d=n\\lambda$ | Destr: $\\Delta d=(n-\\frac12)\\lambda$</p><p><b>Superposition amp:</b> $y_{net}=2y_m\\cos(\\phi/2)$</p><div class="tip">🎯 Given $y=A\\sin(kx-\\omega t)$ → extract: $\\lambda=2\\pi/k$, $f=\\omega/2\\pi$, $v=\\omega/k$, $T=1/f$</div>`},
    {title:"Standing Waves & Resonance", color:"#059669", content:`<div class="fb">$\\psi=[2A\\sin(\\omega t)]\\cos(kx)$ <span class="n">(standing wave)</span> | $\\psi=2A\\sin[\\frac{\\omega_1+\\omega_2}{2}t]\\cos[\\frac{\\omega_1-\\omega_2}{2}t]$ <span class="n">(beats)</span></div><p>Node spacing = $\\lambda/2$. Each traveling wave amp = ½ standing max.</p><p><b>Both fixed (or open):</b> $\\lambda_n=2L/n$, $f_n=nv/2L$, $n=1,2,3…$ | $\\Delta f=v/2L$</p><p><b>One end closed:</b> $\\lambda_n=4L/n$, $f_n=nv/4L$, <span class="w">n=1,3,5… ODD ONLY!</span> <span class="n">Closed=node, Open=antinode</span></p><svg width="160" height="36" viewBox="0 0 160 36" xmlns="http://www.w3.org/2000/svg"><text x="0" y="7" font-size="4.5" fill="#059669" font-weight="bold">Mode shapes (both ends fixed):</text><line x1="5" y1="14" x2="5" y2="32" stroke="#333" stroke-width="0.6"/><line x1="75" y1="14" x2="75" y2="32" stroke="#333" stroke-width="0.6"/><text x="3" y="13" font-size="3.3" fill="#333">wall</text><text x="69" y="13" font-size="3.3" fill="#333">wall</text><path d="M5,18 Q40,10 75,18" fill="none" stroke="#059669" stroke-width="0.6"/><text x="78" y="19" font-size="3.8" fill="#333">n=1: λ=2L (fundamental)</text><path d="M5,24 Q22,19 40,24 Q57,29 75,24" fill="none" stroke="#2563eb" stroke-width="0.6"/><text x="78" y="25" font-size="3.8" fill="#333">n=2: λ=L (1st overtone)</text><path d="M5,30 Q16,26 28,30 Q39,34 51,30 Q62,26 75,30" fill="none" stroke="#dc2626" stroke-width="0.6"/><text x="78" y="31" font-size="3.8" fill="#333">n=3: λ=⅔L (2nd overtone)</text></svg><p><b>String w/ mass:</b> $f_n=\\frac{n}{2L}\\sqrt{mg/\\mu}$ | <b>Two-section:</b> $n_2/n_1=(L_2\\sqrt{\\rho_2})/(L_1\\sqrt{\\rho_1})$</p><p><b>Path-diff interf:</b> Destr: $f_{min}=\\frac{(2n-1)v}{2\\Delta L}$ | Constr: $f_{max}=\\frac{nv}{\\Delta L}$</p><p><b>SWR:</b> $\\frac{A+B}{A-B}$, $R=(\\frac{\\text{SWR}-1}{\\text{SWR}+1})^2$ <span class="n">— SWR=1 means no reflection</span></p><div class="tip">🎯 Given standing wave → ID k,ω → find λ,f,v → locate nodes ($\\sin(kx)=0$) → count loops.</div>`},
    {title:"Fourier", color:"#059669", content:`<p>$F(x)=A_0+\\sum A_m\\cos(mkx)+\\sum B_m\\sin(mkx)$</p><p>$\\int_0^\\lambda\\sin(mkx)\\cos(nkx)dx=0$ | $\\int_0^\\lambda\\sin(mkx)\\sin(nkx)dx=\\frac\\lambda2\\delta_{mn}$ (same cos·cos)</p>`},
    {title:"Sound Waves", color:"#d97706", content:`<div class="fb">$\\beta=10\\log(I/I_0)$, $I_0=10^{-12}$ W/m² | $v_{snd}\\approx343$ m/s | $\\rho_{air}=1.21$ kg/m³</div><p><b>Intensity:</b> $I=\\frac12\\rho v(2\\pi f)^2s_m^2$ → $s_m=\\sqrt{\\frac{I}{2\\pi^2\\rho v f^2}}$ <span class="n">— use for displacement amp from intensity/dB</span></p><p><b>From dB:</b> $I=I_0\\cdot10^{\\beta/10}$ then plug in above</p><p><b>Point source:</b> $I=P/4\\pi r^2$ | +10dB=10×I | +3dB≈2×I | +20dB=100×I</p><p><b>Beats:</b> $f_{beat}=|f_1-f_2|$ <span class="n">— add mass→↓f. If beat↓ fork was higher.</span></p><p class="w">⚠ One-end-closed pipes: ODD harmonics only!</p>`},
    {title:"Doppler (Sound)", color:"#d97706", content:`<div class="fb">$f'=f\\left(\\frac{v_{snd}\\pm v_{obs}}{v_{snd}\\mp v_{src}}\\right)$</div><p><b>"Toward = Together = Top signs"</b> (↑f). Apart = bottom (↓f).</p><p><b>Numerator</b> = observer. <b>Denominator</b> = source.</p><p><b>Mach cone:</b> $\\sin\\theta=v_{snd}/v_{obj}$ <span class="n">— half-angle when source > sound speed</span></p><div class="tip">🎯 <b>Sonar:</b> Apply formula TWICE. Target is "observer" then "source". $f'_r=f\\frac{(v+u_1)(v+u_2)}{v(v-u_2)}$</div>`},
    {title:"Electromagnetic Waves", color:"#dc2626", content:`<div class="fb">$c=1/\\sqrt{\\varepsilon_0\\mu_0}$ | $|\\vec E|=c|\\vec B|$ | $\\vec S=\\vec E\\times\\vec B/\\mu_0$</div><p><b>Avg intensity:</b> $\\langle S\\rangle=\\frac{E_0^2}{2\\mu_0c}=\\frac{cB_0^2}{2\\mu_0}$ <span class="n">— use with field amplitudes</span></p><p><b>Instantaneous:</b> $S=EB/\\mu_0$ | $E_m=\\sqrt{2\\mu_0cI}$, $B_m=E_m/c$</p><p><b>Point src:</b> $I=P/4\\pi r^2$ (sphere) or $P/2\\pi r^2$ (hemisphere)</p><p><b>EM momentum:</b> $p=u/c$ | <b>Rad pressure:</b> absorb: $p_r=I/c$ | reflect: $p_r=2I/c$</p><p><b>Force:</b> $F=p_rA=IA/c$ (or $2IA/c$) | <b>Pulse energy:</b> $E=P\\Delta t$</p><p><b>Solar sail:</b> $GmM_s/d^2=2IA/c$ → solve for A</p><svg width="175" height="38" viewBox="0 0 175 38" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="175" height="38" fill="#fef2f2" rx="1.5"/><text x="3" y="8" font-size="4.5" fill="#dc2626" font-weight="bold">🎯 Given B → find E (exam &#39;18 &amp; &#39;19):</text><text x="3" y="15" font-size="4" fill="#333">1) |E| = c|B|, same ω, k, phase constant</text><text x="3" y="21" font-size="4" fill="#333">2) Ê × B̂ = k̂ (propagation dir). Use right-hand rule.</text><text x="3" y="27" font-size="4" fill="#333">3) Ex: B = B₀cos(kz−ωt+π) ŷ → E = cB₀cos(kz−ωt+π) x̂, prop +ẑ</text><text x="3" y="34" font-size="4" fill="#333">4) Polarization = direction of E. Multi-component: tanθ = Ey/Ex</text></svg>`},
    {title:"Polarization", color:"#7c3aed", content:`<div class="fb">$I=I_0\\cos^2\\theta$ (Malus) | Unpolarized → 1st polarizer: $I_1=\\frac12I_0$ always</div><p>Each subsequent: $I_{out}=I_{in}\\cos^2(\\Delta\\theta)$ <span class="w">⚠ Δθ between ADJACENT axes!</span></p><p><b>3-polarizer:</b> unpol→P1→P2(θ₂)→P3(90°): $I=\\frac18I_0\\sin^2(2\\theta_2)$</p><p><b>Pre-computed:</b> θ₂=45°→$I_0/8$ | 30°→$3I_0/32$ | 22.5°→$I_0/16$ | 60°→$3I_0/32$</p><p><b>Partial polarization:</b> $I_f/I_0=E_v^2/(E_v^2+E_h^2)$ for V-polarizer</p><div class="tip">🎯 Always track intensity step-by-step through each polarizer. Draw the axes!</div>`},
    {title:"Geometrical Optics — Refraction, TIR", color:"#0e7490", content:`<div class="fb">$n_1\\sin\\theta_1=n_2\\sin\\theta_2$ | $n=c/v$ | $\\lambda_n=\\lambda_{vac}/n$ | <b>TIR:</b> $\\sin\\theta_c=n_2/n_1$ ($n_1>n_2$)</div><svg width="175" height="50" viewBox="0 0 175 50" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="84" height="50" fill="#f0fdfa" rx="1.5"/><text x="42" y="7" text-anchor="middle" font-size="4.3" fill="#0e7490" font-weight="bold">Snell&#39;s Law</text><line x1="5" y1="25" x2="80" y2="25" stroke="#0e7490" stroke-width="0.8"/><line x1="42" y1="8" x2="42" y2="46" stroke="#999" stroke-width="0.4" stroke-dasharray="1.5"/><text x="44" y="11" font-size="3.3" fill="#999">normal</text><text x="8" y="16" font-size="4" fill="#0e7490" font-weight="bold">n₁</text><text x="8" y="38" font-size="4" fill="#0e7490" font-weight="bold">n₂</text><line x1="18" y1="10" x2="42" y2="25" stroke="#dc2626" stroke-width="0.7"/><text x="24" y="21" font-size="3.8" fill="#dc2626">θ₁</text><line x1="42" y1="25" x2="58" y2="44" stroke="#2563eb" stroke-width="0.7"/><text x="47" y="36" font-size="3.8" fill="#2563eb">θ₂</text><text x="5" y="48" font-size="3.4" fill="#333">n₁&lt;n₂: toward normal. n₁&gt;n₂: away.</text><rect x="90" y="0" width="85" height="50" fill="#fff7ed" rx="1.5"/><text x="132" y="7" text-anchor="middle" font-size="4.3" fill="#b45309" font-weight="bold">Total Internal Reflection</text><line x1="95" y1="25" x2="170" y2="25" stroke="#b45309" stroke-width="0.8"/><text x="98" y="17" font-size="3.6" fill="#b45309">n₁ (denser)</text><text x="98" y="35" font-size="3.6" fill="#b45309">n₂ (less dense)</text><line x1="132" y1="10" x2="132" y2="46" stroke="#999" stroke-width="0.4" stroke-dasharray="1.5"/><line x1="114" y1="13" x2="132" y2="25" stroke="#059669" stroke-width="0.5"/><line x1="132" y1="25" x2="148" y2="12" stroke="#059669" stroke-width="0.5" stroke-dasharray="1"/><text x="118" y="23" font-size="3" fill="#059669">θ&lt;θc</text><line x1="118" y1="8" x2="132" y2="25" stroke="#dc2626" stroke-width="0.6"/><line x1="132" y1="25" x2="146" y2="8" stroke="#dc2626" stroke-width="0.6"/><text x="138" y="14" font-size="3.2" fill="#dc2626">θ&gt;θc: TIR!</text><text x="95" y="45" font-size="3.3" fill="#333">sinθc = n₂/n₁. Only n₁ → n₂ when n₁ &gt; n₂</text></svg><p><b>Pre-computed θ_c:</b> water→air: <b>48.8°</b> | glass→air: <b>41.8°</b> | glass→water: <b>62.5°</b></p><p><b>Multi-layer:</b> $n_1\\sin\\theta_1=n_2\\sin\\theta_2=…$ — only first & last n matter if skipping intermediate θ's</p><p><b>Parallel slab:</b> exits same angle as entry. <b>Circle of light:</b> $D=2h\\tan\\theta_c$, water: $D=2.28h$</p><p><b>Dispersion:</b> $n(\\lambda)$ varies. Blue→higher n→bends more.</p><div class="tip">🎯 <b>TIR in block ('17&amp;'18):</b> $\\sin\\theta=n\\sin\\psi$ at entry → at top: angle=$(90°-\\psi)$ → need $(90°-\\psi)>\\theta_c$ → $\\sin\\theta=n\\cos\\theta_c$. Shark: $x=h\\tan\\theta_c$.</div>`},
    {title:"Thin Lenses & Mirrors", color:"#db2777", content:`<div class="fb">$\\frac{1}{p}+\\frac{1}{i}=\\frac{1}{f}$ → $i=\\frac{pf}{p-f}$ | $m=-\\frac{i}{p}=\\frac{h_i}{h_o}$ | Power: $P=1/f$ (diopters)</div><p><b>Signs:</b> i>0→real/inverted/opposite side | i<0→virtual/upright/same side | |m|>1→enlarged</p><p><b>Converging (f>0):</b> p>f→real,inverted | p<f→virtual,upright,magnified</p><p><b>Diverging (f<0):</b> always virtual, upright, diminished (|m|<1)</p><p><b>Flat mirror:</b> image = object dist behind. Virtual, $m=+1$.</p><svg width="175" height="48" viewBox="0 0 175 48" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="84" height="48" fill="#fdf2f8" rx="1.5"/><text x="42" y="7" text-anchor="middle" font-size="4" fill="#db2777" font-weight="bold">CONVERGING (p&gt;f)</text><ellipse cx="38" cy="26" rx="2" ry="16" fill="none" stroke="#db2777" stroke-width="0.6"/><line x1="3" y1="26" x2="80" y2="26" stroke="#ccc" stroke-width="0.3"/><line x1="12" y1="26" x2="12" y2="15" stroke="#333" stroke-width="0.7"/><polygon points="10.5,15 12,11.5 13.5,15" fill="#333"/><text x="12" y="30" text-anchor="middle" font-size="3" fill="#333">O</text><circle cx="25" cy="26" r="0.8" fill="#db2777"/><text x="25" y="32" text-anchor="middle" font-size="2.8" fill="#db2777">F</text><circle cx="51" cy="26" r="0.8" fill="#db2777"/><text x="51" y="32" text-anchor="middle" font-size="2.8" fill="#db2777">F</text><line x1="12" y1="15" x2="38" y2="15" stroke="#dc2626" stroke-width="0.4"/><line x1="38" y1="15" x2="75" y2="37" stroke="#dc2626" stroke-width="0.4"/><text x="77" y="38" font-size="2.8" fill="#dc2626">①∥→F</text><line x1="12" y1="15" x2="75" y2="40" stroke="#2563eb" stroke-width="0.4"/><text x="77" y="42" font-size="2.8" fill="#2563eb">②ctr→str</text><line x1="12" y1="15" x2="38" y2="37" stroke="#059669" stroke-width="0.4"/><line x1="38" y1="37" x2="75" y2="37" stroke="#059669" stroke-width="0.4"/><text x="77" y="35" font-size="2.8" fill="#059669">③F→∥</text><line x1="62" y1="26" x2="62" y2="37" stroke="#333" stroke-width="0.5"/><polygon points="60.5,37 62,40.5 63.5,37" fill="#333"/><text x="62" y="45" text-anchor="middle" font-size="2.8" fill="#333">I (real,inv)</text><rect x="90" y="0" width="85" height="48" fill="#f5f3ff" rx="1.5"/><text x="132" y="7" text-anchor="middle" font-size="4" fill="#7c3aed" font-weight="bold">DIVERGING</text><ellipse cx="128" cy="26" rx="2" ry="16" fill="none" stroke="#7c3aed" stroke-width="0.6"/><line x1="93" y1="26" x2="172" y2="26" stroke="#ccc" stroke-width="0.3"/><line x1="105" y1="26" x2="105" y2="15" stroke="#333" stroke-width="0.7"/><polygon points="103.5,15 105,11.5 106.5,15" fill="#333"/><text x="105" y="30" text-anchor="middle" font-size="3" fill="#333">O</text><circle cx="118" cy="26" r="0.8" fill="#7c3aed"/><text x="118" y="32" text-anchor="middle" font-size="2.8" fill="#7c3aed">F₂</text><circle cx="140" cy="26" r="0.8" fill="#7c3aed"/><text x="140" y="32" text-anchor="middle" font-size="2.8" fill="#7c3aed">F₁</text><line x1="105" y1="15" x2="128" y2="15" stroke="#dc2626" stroke-width="0.4"/><line x1="128" y1="15" x2="170" y2="10" stroke="#dc2626" stroke-width="0.4"/><line x1="128" y1="15" x2="118" y2="26" stroke="#dc2626" stroke-width="0.3" stroke-dasharray="1"/><text x="172" y="11" font-size="2.8" fill="#dc2626">①∥→F(nr)</text><line x1="105" y1="15" x2="170" y2="28" stroke="#2563eb" stroke-width="0.4"/><text x="172" y="29" font-size="2.8" fill="#2563eb">②ctr→str</text><line x1="115" y1="26" x2="115" y2="20" stroke="#333" stroke-width="0.4" stroke-dasharray="1"/><text x="115" y="18" text-anchor="middle" font-size="2.8" fill="#333">I (virt,upr)</text></svg><div class="tip">🎯 <b>Two-lens ('PS7, HIGH prob):</b> 1) $i_1=p_1f_1/(p_1-f_1)$ 2) $p_2=d-i_1$ <span class="w">⚠ if i₁<0: p₂=d+|i₁|</span> 3) $i_2=p_2f_2/(p_2-f_2)$ 4) $M=i_1i_2/(p_1p_2)$</div><p><b>Projector:</b> $p+i=d$ → $p=\\frac12(d\\pm\\sqrt{d^2-4df})$. Need $d\\geq4f$. At $d=4f$: $p=i=2f$, $m=-1$.</p>`},
    {title:"Pre-computed & Constants", color:"#374151", content:`<p><b>TIR trig:</b> $\\sin48.8°=0.752$, $\\tan48.8°=1.14$ (water) | $\\sin41.8°=0.667$, $\\tan41.8°=0.894$ (glass)</p><p><b>EM:</b> $\\mu_0c=120\\pi\\approx377\\,\\Omega$ | $2\\mu_0c\\approx754$ (for $E_m=\\sqrt{2\\mu_0cI}$)</p><p>$c=3\\times10^8$ m/s · $\\mu_0=4\\pi\\times10^{-7}$ H/m · $\\varepsilon_0=8.85\\times10^{-12}$ F/m · $v_{snd}=343$ m/s · $\\rho_{air}=1.21$ kg/m³</p><p>$I_0=10^{-12}$ W/m² · $g=9.80$ m/s² · $hc=1240$ eV·nm · $n_{air}=1.00$ · $n_{water}=1.33$ · $n_{glass}\\approx1.50$</p>`}
  ];

  initialSections.forEach(s => {
    sections.push({ id: sectionIdCounter++, title: s.title, color: s.color, content: s.content });
  });
  renderAll();
}

// ===== RENDER =====
function renderAll() {
  renderPage();
  renderSectionList();
  checkFit();
}

function createSectionHTML(s) {
  return `
    <div class="s" data-id="${s.id}" style="border-left:1.5pt solid ${s.color};">
      <div class="section-controls">
        <button onclick="moveSection(${s.id},-1)" title="Move up">▲</button>
        <button onclick="moveSection(${s.id},1)" title="Move down">▼</button>
        <button onclick="moveToOtherPage(${s.id})" title="Move to other page">⇋</button>
        <button onclick="editSection(${s.id})" title="Edit in large window" style="color:#60a5fa;">✎</button>
        <button onclick="duplicateSection(${s.id})" title="Duplicate">⧉</button>
        <button onclick="showImageModalFor(${s.id})" title="Add image">🖼</button>
        <button onclick="deleteSection(${s.id})" title="Delete" style="color:#fca5a5;">✕</button>
      </div>
      <h2 style="background:${s.color}; cursor:pointer;" onclick="collapseSection(${s.id})" title="Click to collapse/expand">${s.title} ${s.collapsed ? '▼' : ''}</h2>
      <div class="content" contenteditable="true" data-section-id="${s.id}" style="display:${s.collapsed ? 'none' : 'block'};">${s.content}</div>
    </div>
  `;
}

function renderMathInEl(el) {
  try {
    renderMathInElement(el, { delimiters: [{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}], throwOnError: false });
  } catch(e) {}
}

function recalculatePages(testMode = false) {
  const pagesCount = parseInt(document.getElementById('pagesSelect').value);
  const c1 = document.getElementById('columnsContainer');
  const c2 = document.getElementById('columnsContainer2');
  const p1 = document.getElementById('page');
  const p2 = document.getElementById('page2');
  
  // Gather direct DOM nodes
  const nodes = [];
  Array.from(c1.children).forEach(n => { if (n.classList.contains('s')) nodes.push(n); });
  if (c2) {
    Array.from(c2.children).forEach(n => { if (n.classList.contains('s')) nodes.push(n); });
  }
  
  c1.innerHTML = '';
  if (c2) c2.innerHTML = '';
  
  if (pagesCount === 1) {
    nodes.forEach(n => c1.appendChild(n));
    if (!testMode) {
      nodes.forEach(n => {
        const s = sections.find(x => x.id === parseInt(n.dataset.id));
        if (s) s.page = 1;
      });
    }
    return (p1.scrollWidth > p1.clientWidth + 100 || p1.scrollHeight > p1.clientHeight + 2);
  } else {
    let tPage = 1;
    for (const node of nodes) {
      if (tPage === 1) {
        c1.appendChild(node);
        if (p1.scrollWidth > p1.clientWidth + 100 || p1.scrollHeight > p1.clientHeight + 2) {
          c1.removeChild(node);
          tPage = 2;
          c2.appendChild(node);
        }
      } else {
        c2.appendChild(node);
      }
    }
    
    const overflowed = (p2.scrollWidth > p2.clientWidth + 100 || p2.scrollHeight > p2.clientHeight + 2);
    
    if (!testMode) {
      Array.from(c1.children).forEach(n => {
        const s = sections.find(x => x.id === parseInt(n.dataset.id));
        if (s) s.page = 1;
      });
      Array.from(c2.children).forEach(n => {
        const s = sections.find(x => x.id === parseInt(n.dataset.id));
        if (s) s.page = 2;
      });
    }
    return overflowed;
  }
}

function attachBlurListeners() {
  document.querySelectorAll('.content[contenteditable]').forEach(el => {
    el.addEventListener('blur', function() {
      const id = parseInt(this.dataset.sectionId);
      const sec = sections.find(s => s.id === id);
      if (sec) sec.content = this.innerHTML;
    });
  });
}

function renderPage() {
  const lineHeight = document.getElementById('lineSlider').value;
  const cols = document.getElementById('colSelect').value;
  const gap = document.getElementById('gapSlider').value;
  const orientation = document.getElementById('orientationSelect').value;
  const theme = document.getElementById('themeSelect').value;
  const size = document.getElementById('paperSizeSelect').value;
  const pages = parseInt(document.getElementById('pagesSelect').value);
  const margin = document.getElementById('marginSlider').value;
  const ruleChecked = document.getElementById('ruleCheckbox').checked;
  const ruleColor = document.getElementById('ruleColor').value;
  const globalScale = document.getElementById('globalScale').value;
  const smartBreaks = document.getElementById('smartBreaksCheck').checked;
  const showHeader = document.getElementById('showHeaderCheck').checked;
  const fontVars = ['fsTitle', 'fsBody', 'fsFormula', 'fsBold', 'fsAnnot', 'fsWarn', 'fsTip', 'fsTable', 'fsConst'];

  const page1 = document.getElementById('page');
  const page2 = document.getElementById('page2');
  const page2Shadow = document.getElementById('page2Shadow');

  const hdr = document.getElementById('pageHeader');
  if (hdr) hdr.style.display = showHeader ? 'block' : 'none';

  [page1, page2].forEach(p => {
    if (!p) return;
    p.className = `page ${orientation} ${size === 'a4' ? 'a4' : ''} ${theme === 'bw' ? 'theme-bw' : ''} ${smartBreaks ? 'smart-breaks' : ''}`;
    p.style.setProperty('--page-margin', `${margin}in`);
    p.style.setProperty('--page-cols', cols);
    p.style.setProperty('--page-gap', `${gap}pt`);
    p.style.setProperty('--page-rule', ruleChecked ? `0.4pt solid ${ruleColor}` : 'none');
    p.style.setProperty('--global-scale', globalScale);
    fontVars.forEach(id => p.style.setProperty(`--${id.replace(/([A-Z])/g, '-$1').toLowerCase()}`, document.getElementById(id).value + 'pt'));
    p.style.lineHeight = lineHeight;
  });

  if (page2Shadow) page2Shadow.style.display = pages === 2 ? 'block' : 'none';

  const container1 = document.getElementById('columnsContainer');
  const container2 = document.getElementById('columnsContainer2');
  
  let html1 = ''; let html2 = '';
  sections.forEach(s => {
    if (s.page === 2) html2 += createSectionHTML(s);
    else html1 += createSectionHTML(s);
  });
  container1.innerHTML = html1;
  if(container2) container2.innerHTML = html2;

  attachBlurListeners();
  reRenderMath();
}

function renderSectionList() {
  const list = document.getElementById('sectionList');
  list.innerHTML = sections.map(s => `
    <div class="section-item" draggable="true" data-id="${s.id}"
         ondragstart="onDragStart(event)" ondragover="onDragOver(event)" ondrop="onDrop(event)" ondragend="onDragEnd(event)">
      <div class="dot" style="background:${s.color};"></div>
      <div class="name">${s.title}</div>
      <div class="btns">
        <button onclick="editSection(${s.id})" title="Edit" style="color:#60a5fa;">✎</button>
        <button onclick="collapseSection(${s.id})" title="Collapse/Expand">${s.collapsed ? '◧' : '◨'}</button>
        <button onclick="moveSection(${s.id},-1)">▲</button>
        <button onclick="moveSection(${s.id},1)">▼</button>
        <button onclick="deleteSection(${s.id})" style="color:#fca5a5;">✕</button>
      </div>
    </div>
  `).join('');
}

// ===== SECTION MANAGEMENT =====
let currentModalTab = 'wys';
function switchModalTab(tab) {
  currentModalTab = tab;
  document.getElementById('tabWys').className = tab === 'wys' ? 'active' : '';
  document.getElementById('tabHtml').className = tab === 'html' ? 'active' : '';
  document.getElementById('wysEditor').style.display = tab === 'wys' ? 'block' : 'none';
  document.getElementById('htmlEditor').style.display = tab === 'html' ? 'block' : 'none';
  
  if (tab === 'wys') {
    document.getElementById('newSectionRich').innerHTML = document.getElementById('newSectionContent').value;
  } else {
    document.getElementById('newSectionContent').value = document.getElementById('newSectionRich').innerHTML;
  }
}

let editingSectionId = null;

function editSection(id) {
  const sec = sections.find(s => s.id === id);
  if (!sec) return;
  editingSectionId = id;
  
  const el = document.querySelector(`.content[data-section-id="${id}"]`);
  if (el) sec.content = el.innerHTML;
  
  document.getElementById('newSectionTitle').value = sec.title;
  document.getElementById('newSectionColor').value = sec.color;
  document.getElementById('newSectionTemplate').value = 'none';
  document.getElementById('newSectionRich').innerHTML = sec.content;
  document.getElementById('newSectionContent').value = sec.content;
  
  const actionBtn = document.getElementById('modalActionButton');
  const titleText = document.getElementById('modalTitleText');
  if (actionBtn) actionBtn.textContent = 'Save Changes';
  if (titleText) titleText.textContent = 'Edit Section';
  
  document.getElementById('addSectionModal').style.display = 'flex';
  switchModalTab('wys');
}

function showAddSectionModal() {
  editingSectionId = null;
  document.getElementById('newSectionTitle').value = '';
  document.getElementById('newSectionContent').value = '';
  document.getElementById('newSectionRich').innerHTML = '';
  document.getElementById('newSectionTemplate').value = 'none';
  
  const actionBtn = document.getElementById('modalActionButton');
  const titleText = document.getElementById('modalTitleText');
  if (actionBtn) actionBtn.textContent = 'Add Section';
  if (titleText) titleText.textContent = 'Add New Section';
  
  document.getElementById('addSectionModal').style.display = 'flex';
  switchModalTab('wys');
}

function clearAllSections() {
  if (confirm("Are you sure you want to clear all sections and start a blank sheet?")) {
    sections = [];
    sectionIdCounter = 0;
    renderAll();
    saveStateToHistory();
  }
}

function addSection() {
  const title = document.getElementById('newSectionTitle').value || 'New Section';
  const color = document.getElementById('newSectionColor').value;
  
  let rawContent = currentModalTab === 'wys' 
    ? document.getElementById('newSectionRich').innerHTML 
    : document.getElementById('newSectionContent').value;
    
  let content = rawContent;
  if (currentModalTab === 'html') {
    content = rawContent.replace(/\n/g, '<br>').replace(/^(?!<)/, '<p>').replace(/(?<!>)$/, '</p>');
  }
  
  if (editingSectionId !== null) {
    const sec = sections.find(s => s.id === editingSectionId);
    if (sec) {
      sec.title = title;
      sec.color = color;
      sec.content = content || '<p>Click to edit...</p>';
    }
  } else {
    sections.push({ id: sectionIdCounter++, title, color, content: content || '<p>Click to edit...</p>' });
  }
  
  closeModal('addSectionModal');
  renderAll();
  saveStateToHistory();
}

function formatModal(cmd) {
  document.getElementById('newSectionRich').focus();
  document.execCommand(cmd, false, null);
}

function insertModalTemplate(type) {
  document.getElementById('newSectionRich').focus();
  let html = '';
  if (type === 'formula') html = '<div class="fb"><b>Formula Name:</b> $...$</div><br>';
  else if (type === 'tip') html = '<div class="tip"><b>Tip:</b> ...</div><br>';
  else if (type === 'warning') html = '<div class="w">⚠ <b>Warning:</b> ...</div><br>';
  else if (type === 'example') html = '<div style="border:1.5pt solid #cbd5e1; padding:2pt; background:#f8fafc; margin:2pt 0; border-radius:1.5pt;"><b>Example:</b> ...</div><br>';
  else if (type === 'table') html = '<table><tr><td>Header 1</td><td>Header 2</td></tr><tr><td>Cell 1</td><td>Cell 2</td></tr></table><br>';
  document.execCommand('insertHTML', false, html);
}

function deleteSection(id) {
  if (confirm('Delete this section?')) {
    sections = sections.filter(s => s.id !== id);
    renderAll();
  }
}

function moveSection(id, dir) {
  const idx = sections.findIndex(s => s.id === id);
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= sections.length) return;
  [sections[idx], sections[newIdx]] = [sections[newIdx], sections[idx]];
  renderAll();
}

function moveToOtherPage(id) {
  const sec = sections.find(s => s.id === id);
  if (sec) {
    sec.page = sec.page === 2 ? 1 : 2;
    // ensure 2-page mode is on
    if (sec.page === 2) document.getElementById('pagesSelect').value = '2';
    renderAll();
  }
}

function collapseSection(id) {
  const sec = sections.find(s => s.id === id);
  if (sec) {
    sec.collapsed = !sec.collapsed;
    renderAll();
  }
}

function duplicateSection(id) {
  const sec = sections.find(s => s.id === id);
  if (sec) {
    const idx = sections.findIndex(s => s.id === id);
    const newSec = JSON.parse(JSON.stringify(sec));
    newSec.id = sectionIdCounter++;
    newSec.title += ' (copy)';
    sections.splice(idx + 1, 0, newSec);
    renderAll();
  }
}

function applyTemplateToModal() {
  const t = document.getElementById('newSectionTemplate').value;
  let val = '';
  if (t === 'formula') val = '<div class="fb"><b>Formula Name:</b> $...$</div>\n<p>Explain variables here...</p>';
  if (t === 'procedure') val = '<p><b>Step 1:</b> ...</p>\n<p><b>Step 2:</b> ...</p>';
  if (t === 'table') val = '<table border="1">\n<tr><td>Var</td><td>Val</td></tr>\n<tr><td>...</td><td>...</td></tr>\n</table>';
  if (t === 'diagram') val = '<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">\n  <rect width="200" height="150" fill="#f1f5f9"/>\n  <text x="100" y="75" text-anchor="middle" font-size="14" fill="#64748b">Diagram</text>\n</svg>';
  
  if (currentModalTab === 'wys') {
    document.getElementById('newSectionRich').innerHTML = val.replace(/\n/g, '<br>');
  } else {
    document.getElementById('newSectionContent').value = val;
  }
}

// ===== DRAG & DROP =====
function onDragStart(e) {
  draggedItem = e.currentTarget;
  e.currentTarget.style.opacity = '0.4';
  e.dataTransfer.effectAllowed = 'move';
}
function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
function onDrop(e) {
  e.preventDefault();
  const fromId = parseInt(draggedItem.dataset.id);
  const toId = parseInt(e.currentTarget.dataset.id);
  const fromIdx = sections.findIndex(s => s.id === fromId);
  const toIdx = sections.findIndex(s => s.id === toId);
  const [moved] = sections.splice(fromIdx, 1);
  sections.splice(toIdx, 0, moved);
  renderAll();
}
function onDragEnd(e) { e.currentTarget.style.opacity = '1'; draggedItem = null; }

// ===== IMAGE UPLOAD =====
function showAddImageModal() {
  populateImageSectionSelect();
  document.getElementById('addImageModal').style.display = 'flex';
}
function showImageModalFor(id) {
  populateImageSectionSelect();
  document.getElementById('imageTargetSection').value = id;
  document.getElementById('addImageModal').style.display = 'flex';
}
function populateImageSectionSelect() {
  const sel = document.getElementById('imageTargetSection');
  sel.innerHTML = sections.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
}
document.getElementById('imageWidth').addEventListener('input', function() {
  document.getElementById('imageWidthVal').textContent = this.value + '%';
});

function addImageToSection() {
  const file = document.getElementById('imageFileInput').files[0];
  if (!file) { alert('Please select an image.'); return; }
  const secId = parseInt(document.getElementById('imageTargetSection').value);
  const maxW = document.getElementById('imageWidth').value;
  const reader = new FileReader();
  reader.onload = function(e) {
    const sec = sections.find(s => s.id === secId);
    if (sec) {
      sec.content += `<div class="section-img"><img src="${e.target.result}" style="max-width:${maxW}%;"><button class="remove-img" onclick="this.parentElement.remove()">×</button></div>`;
      renderAll();
    }
  };
  reader.readAsDataURL(file);
  closeModal('addImageModal');
}

// ===== TEXT FORMATTING =====
function formatText(command, value = null) {
  document.execCommand(command, false, value);
}

function insertTemplate(type) {
  let html = '';
  if (type === 'formula') html = '<div class="fb"><b>Formula Name:</b> $...$</div><br>';
  else if (type === 'tip') html = '<div class="tip"><b>Tip:</b> ...</div><br>';
  else if (type === 'warning') html = '<div class="w">⚠ <b>Warning:</b> ...</div><br>';
  else if (type === 'example') html = '<div style="border:1.5pt solid #cbd5e1; padding:2pt; background:#f8fafc; margin:2pt 0; border-radius:1.5pt;"><b>Example:</b> ...</div><br>';
  else if (type === 'table') html = '<table><tr><td>Header 1</td><td>Header 2</td></tr><tr><td>Cell 1</td><td>Cell 2</td></tr></table><br>';
  else if (type === 'break') html = '<div style="break-after:column; height:8px;"></div><br>';
  document.execCommand('insertHTML', false, html);
}

// ===== AUTO-FIT =====
function autoFitPage() {
  const p1 = document.getElementById('page');
  const p2 = document.getElementById('page2');
  
  p1.style.lineHeight = '1.06';
  if (p2) p2.style.lineHeight = '1.06';
  
  let lo = 0.5, hi = 2.0, bestScale = 0.5;
  while (lo <= hi) {
    const mid = Math.round(((lo + hi) / 2) * 100) / 100;
    p1.style.setProperty('--global-scale', mid);
    if (p2) p2.style.setProperty('--global-scale', mid);
    
    if (!recalculatePages(true)) {
      bestScale = mid;
      if (lo === mid) break;
      lo = Math.round((mid + 0.01) * 100) / 100;
    } else {
      if (hi === mid) break;
      hi = Math.round((mid - 0.01) * 100) / 100;
    }
  }
  
  p1.style.setProperty('--global-scale', bestScale);
  if (p2) p2.style.setProperty('--global-scale', bestScale);
  document.getElementById('globalScale').value = bestScale;
  document.getElementById('globalScaleVal').textContent = bestScale.toFixed(2);
  
  lo = 1.0; hi = 1.6; let bestLine = 1.0;
  while (lo <= hi) {
    const mid = Math.round(((lo + hi) / 2) * 100) / 100;
    p1.style.lineHeight = mid;
    if (p2) p2.style.lineHeight = mid;
    
    if (!recalculatePages(true)) {
      bestLine = mid;
      if (lo === mid) break;
      lo = Math.round((mid + 0.01) * 100) / 100;
    } else {
      if (hi === mid) break;
      hi = Math.round((mid - 0.01) * 100) / 100;
    }
  }
  
  p1.style.lineHeight = bestLine;
  if (p2) p2.style.lineHeight = bestLine;
  document.getElementById('lineSlider').value = bestLine;
  document.getElementById('lineVal').textContent = bestLine;
  
  recalculatePages(false);
  checkFit();
}

function checkFit() {
  const p1 = document.getElementById('page');
  const p2 = document.getElementById('page2');
  const pages = parseInt(document.getElementById('pagesSelect').value);
  const ind = document.getElementById('fitIndicator');
  
  const o1 = (p1.scrollWidth > p1.clientWidth + 100 || p1.scrollHeight > p1.clientHeight + 2);
  const o2 = pages === 2 && p2 && (p2.scrollWidth > p2.clientWidth + 100 || p2.scrollHeight > p2.clientHeight + 2);
  
  if (o1 || o2) {
    ind.className = 'fit-indicator fit-over';
    ind.textContent = '✕ Overflows!';
  } else {
    ind.className = 'fit-indicator fit-ok';
    ind.textContent = pages === 2 ? '✓ Fits on 2 pages' : '✓ Fits on 1 page';
  }
}

// ===== MATH RENDERING =====
function reRenderMath() {
  renderMathInEl(document.getElementById('page'));
  const p2 = document.getElementById('page2');
  if (p2) renderMathInEl(p2);
  setTimeout(checkFit, 100);
}
function reRenderMathSync() {
  renderMathInEl(document.getElementById('page'));
  const p2 = document.getElementById('page2');
  if (p2) renderMathInEl(p2);
}

// ===== SLIDER LISTENERS =====
const TYPO_DEFAULTS = { globalScale:1.0, fsTitle:7.0, fsBody:5.5, fsFormula:6.0, fsBold:5.8, fsAnnot:4.8, fsWarn:5.5, fsTip:5.5, fsTable:5.0, fsConst:5.0 };

document.getElementById('globalScale').addEventListener('input', function() {
  document.getElementById('globalScaleVal').textContent = parseFloat(this.value).toFixed(2);
  renderPage(); checkFit();
});

['fsTitle', 'fsBody', 'fsFormula', 'fsBold', 'fsAnnot', 'fsWarn', 'fsTip', 'fsTable', 'fsConst'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    document.getElementById(id + 'Val').textContent = this.value + 'pt';
    renderPage(); checkFit();
  });
});

function resetTypography() {
  for (const [key, val] of Object.entries(TYPO_DEFAULTS)) {
    document.getElementById(key).value = val;
    const valText = key === 'globalScale' ? val.toFixed(2) : val + 'pt';
    document.getElementById(key + 'Val').textContent = valText;
  }
  renderPage(); checkFit();
}

document.getElementById('lineSlider').addEventListener('input', function() {
  document.getElementById('lineVal').textContent = this.value;
  renderPage(); checkFit();
});
document.getElementById('colSelect').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('gapSlider').addEventListener('input', function() {
  document.getElementById('gapVal').textContent = this.value + 'pt';
  renderPage(); checkFit();
});
document.getElementById('pagesSelect').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('paperSizeSelect').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('orientationSelect').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('themeSelect').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('smartBreaksCheck').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('showHeaderCheck').addEventListener('change', function() { renderPage(); checkFit(); });
document.getElementById('marginSlider').addEventListener('input', function() {
  document.getElementById('marginVal').textContent = this.value + 'in';
  renderPage(); checkFit();
});
document.getElementById('ruleCheckbox').addEventListener('change', function() { renderPage(); });
document.getElementById('ruleColor').addEventListener('input', function() { renderPage(); });

// ===== STATE MANAGEMENT & HISTORY =====
let historyStack = [];
let historyIndex = -1;

function flushDOMToState() {
  document.querySelectorAll('.content[contenteditable]').forEach(el => {
    const id = parseInt(el.dataset.sectionId);
    const sec = sections.find(s => s.id === id);
    if (sec) sec.content = el.innerHTML;
  });
}

function getStateObj() {
  flushDOMToState();
  return {
    header: document.getElementById('pageHeader').innerHTML,
    globalScale: document.getElementById('globalScale').value,
    fsTitle: document.getElementById('fsTitle').value,
    fsBody: document.getElementById('fsBody').value,
    fsFormula: document.getElementById('fsFormula').value,
    fsBold: document.getElementById('fsBold').value,
    fsAnnot: document.getElementById('fsAnnot').value,
    fsWarn: document.getElementById('fsWarn').value,
    fsTip: document.getElementById('fsTip').value,
    fsTable: document.getElementById('fsTable').value,
    fsConst: document.getElementById('fsConst').value,
    lineHeight: document.getElementById('lineSlider').value,
    columns: document.getElementById('colSelect').value,
    gap: document.getElementById('gapSlider').value,
    pages: document.getElementById('pagesSelect').value,
    paperSize: document.getElementById('paperSizeSelect').value,
    orientation: document.getElementById('orientationSelect').value,
    theme: document.getElementById('themeSelect').value,
    margin: document.getElementById('marginSlider').value,
    smartBreaks: document.getElementById('smartBreaksCheck').checked,
    showHeader: document.getElementById('showHeaderCheck').checked,
    ruleChecked: document.getElementById('ruleCheckbox').checked,
    ruleColor: document.getElementById('ruleColor').value,
    sections: sections
  };
}

function loadStateObj(data) {
  if (data.header) document.getElementById('pageHeader').innerHTML = data.header;
  const typeKeys = ['globalScale', 'fsTitle', 'fsBody', 'fsFormula', 'fsBold', 'fsAnnot', 'fsWarn', 'fsTip', 'fsTable', 'fsConst'];
  typeKeys.forEach(k => {
    if (data[k]) {
      document.getElementById(k).value = data[k];
      document.getElementById(k + 'Val').textContent = k === 'globalScale' ? parseFloat(data[k]).toFixed(2) : data[k] + 'pt';
    }
  });
  if (data.lineHeight) { document.getElementById('lineSlider').value = data.lineHeight; document.getElementById('lineVal').textContent = data.lineHeight; }
  if (data.columns) document.getElementById('colSelect').value = data.columns;
  if (data.gap) { document.getElementById('gapSlider').value = data.gap; document.getElementById('gapVal').textContent = data.gap+'pt'; }
  if (data.pages) document.getElementById('pagesSelect').value = data.pages;
  if (data.paperSize) document.getElementById('paperSizeSelect').value = data.paperSize;
  if (data.orientation) document.getElementById('orientationSelect').value = data.orientation;
  if (data.theme) document.getElementById('themeSelect').value = data.theme;
  if (data.margin) { document.getElementById('marginSlider').value = data.margin; document.getElementById('marginVal').textContent = data.margin+'in'; }
  if (data.smartBreaks !== undefined) document.getElementById('smartBreaksCheck').checked = data.smartBreaks;
  if (data.showHeader !== undefined) document.getElementById('showHeaderCheck').checked = data.showHeader;
  if (data.ruleChecked !== undefined) document.getElementById('ruleCheckbox').checked = data.ruleChecked;
  if (data.ruleColor) document.getElementById('ruleColor').value = data.ruleColor;
  if (data.sections) {
    sections = data.sections;
    sectionIdCounter = sections.length ? Math.max(...sections.map(s => s.id)) + 1 : 0;
  }
}

function saveStateToHistory() {
  const stateStr = JSON.stringify(getStateObj());
  if (historyIndex >= 0 && historyStack[historyIndex] === stateStr) return;
  historyStack = historyStack.slice(0, historyIndex + 1);
  historyStack.push(stateStr);
  if (historyStack.length > 50) { historyStack.shift(); } else { historyIndex++; }
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    loadStateObj(JSON.parse(historyStack[historyIndex]));
    renderAll();
  }
}

function redo() {
  if (historyIndex < historyStack.length - 1) {
    historyIndex++;
    loadStateObj(JSON.parse(historyStack[historyIndex]));
    renderAll();
  }
}

// ===== IMPORT / EXPORT =====
function exportJSON() {
  const data = getStateObj();
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cheatsheet_project.json';
  a.click();
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      loadStateObj(JSON.parse(e.target.result));
      renderAll();
      saveStateToHistory();
    } catch(err) { alert('Error loading file: ' + err.message); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    const k = e.key.toLowerCase();
    if (k === 'b') { e.preventDefault(); formatText('bold'); }
    if (k === 'i') { e.preventDefault(); formatText('italic'); }
    if (k === 'u') { e.preventDefault(); formatText('underline'); }
    if (k === 's') { e.preventDefault(); exportJSON(); }
    if (k === 'p') { e.preventDefault(); window.print(); }
    if (k === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
    if (k === 'y') { e.preventDefault(); redo(); }
  }
});

// ===== UI ZOOM =====
document.getElementById('zoomSlider').addEventListener('input', function() {
  document.getElementById('zoomVal').textContent = Math.round(this.value * 100) + '%';
  document.getElementById('pagesWrapper').style.transform = `scale(${this.value})`;
});

// ===== INIT & AUTO-SAVE =====
const saved = localStorage.getItem('cheatsheet_autosave');
if (saved) {
  try {
    loadStateObj(JSON.parse(saved));
    renderAll();
  } catch(e) { initSections(); }
} else {
  initSections();
}
saveStateToHistory(); // Initial state

setInterval(() => {
  saveStateToHistory();
}, 5000);

setInterval(() => {
  if (sections.length > 0) {
    localStorage.setItem('cheatsheet_autosave', JSON.stringify(getStateObj()));
  }
}, 30000);

// ===== FLOATING IMAGE CONTROLS =====
let selectedImage = null;

document.addEventListener('click', function(e) {
  const target = e.target.closest('img, svg');
  if (target && target.closest('.content') && !target.closest('.katex')) {
    selectImage(target);
  } else if (!e.target.closest('#imageToolbar')) {
    deselectImage();
  }
});

function selectImage(img) {
  if (selectedImage) selectedImage.classList.remove('img-selected');
  selectedImage = img;
  img.classList.add('img-selected');
  const toolbar = document.getElementById('imageToolbar');
  toolbar.style.display = 'flex';
  const rect = img.getBoundingClientRect();
  toolbar.style.top = (window.scrollY + rect.top - 40) + 'px';
  toolbar.style.left = (window.scrollX + Math.max(0, rect.left)) + 'px';
  
  let w = img.style.width;
  if (!w || !w.endsWith('%')) w = img.style.maxWidth || '100%';
  document.getElementById('floatImgWidth').value = parseInt(w);
}

function deselectImage() {
  if (selectedImage) {
    selectedImage.classList.remove('img-selected');
    selectedImage = null;
  }
  document.getElementById('imageToolbar').style.display = 'none';
}

document.getElementById('floatImgWidth').addEventListener('input', function() {
  if (selectedImage) {
    selectedImage.style.width = this.value + '%';
    selectedImage.style.maxWidth = '100%';
    selectedImage.style.height = 'auto'; // ensure aspect ratio
  }
});

function alignImage(align) {
  if (selectedImage) {
    if (align === 'center') {
      selectedImage.style.display = 'block';
      selectedImage.style.margin = '1pt auto';
      selectedImage.style.float = 'none';
    } else {
      selectedImage.style.display = 'inline-block';
      selectedImage.style.float = align;
      selectedImage.style.margin = align === 'left' ? '1pt 4pt 1pt 0' : '1pt 0 1pt 4pt';
    }
  }
}

function deleteImage() {
  if (selectedImage) {
    selectedImage.remove();
    deselectImage();
  }
}

document.addEventListener('paste', function(e) {
  const contentEl = e.target.closest('.content');
  if (!contentEl) return;
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      e.preventDefault();
      const file = items[i].getAsFile();
      const reader = new FileReader();
      reader.onload = function(evt) {
        document.execCommand('insertImage', false, evt.target.result);
        const images = contentEl.getElementsByTagName('img');
        const newImg = images[images.length - 1];
        if (newImg) newImg.style.maxWidth = '100%';
      };
      reader.readAsDataURL(file);
      break;
    }
  }
});

// ===== AI SKILL EXPORT =====
const CHEAT_SHEET_SKILL_B64 = 'LS0tCm5hbWU6IGV4YW0tY2hlYXQtc2hlZXQtdjIKZGVzY3JpcHRpb246ICJVc2UgdGhpcyBza2lsbCB3aGVuZXZlciB0aGUgdXNlciB3YW50cyB0byBjcmVhdGUgYSBjaGVhdCBzaGVldCwgZm9ybXVsYSBzaGVldCwgcmVmZXJlbmNlIHNoZWV0LCBvciBjcmliIHNoZWV0IGZvciBhbiBleGFtLCB0ZXN0LCBxdWl6LCBvciBmaW5hbC4gVHJpZ2dlcnMgaW5jbHVkZTogYW55IG1lbnRpb24gb2YgJ2NoZWF0IHNoZWV0JywgJ2Zvcm11bGEgc2hlZXQnLCAncmVmZXJlbmNlIHNoZWV0JywgJ2NyaWIgc2hlZXQnLCAnYWxsb3dlZCBub3RlcycsICdvbmUgcGFnZSBvZiBub3RlcycsICdleGFtIHByZXAgc2hlZXQnLCBvciByZXF1ZXN0cyB0byBjb25kZW5zZSBjb3Vyc2UgbWF0ZXJpYWwgb250byBvbmUgb3IgdHdvIHBhZ2VzLiBBbHNvIHRyaWdnZXIgd2hlbiB0aGUgdXNlciBzYXlzIHRoaW5ncyBsaWtlICdJIGNhbiBicmluZyBhIHNoZWV0IHRvIG15IGV4YW0nLCAncHJvZmVzc29yIGFsbG93cyBvbmUgcGFnZScsICdvcGVuIG5vdGUgYnV0IG9ubHkgb25lIHNoZWV0JywgJ25lZWQgdG8gZml0IGV2ZXJ5dGhpbmcgb24gb25lIHBhZ2UnLCBvciAnd2hhdCBzaG91bGQgSSBwdXQgb24gbXkgZm9ybXVsYSBzaGVldCcuIENvdmVycyBib3RoIHByaW50ZWQgKHR5cGVkLCBMYVRlWCwgV29yZCkgYW5kIGhhbmR3cml0dGVuIHNoZWV0cy4gRXNwZWNpYWxseSB0dW5lZCBmb3IgZW5naW5lZXJpbmcsIHBoeXNpY3MsIG1hdGgsIGFuZCBTVEVNIGNvdXJzZXMgYnV0IHdvcmtzIGZvciBhbnkgc3ViamVjdC4gRG8gTk9UIHVzZSBmb3IgZnVsbCBzdHVkeSBndWlkZXMsIGZsYXNoY2FyZHMsIG9yIGdlbmVyYWwgbm90ZS10YWtpbmcgdGhhdCBpcyBub3Qgc3BlY2lmaWNhbGx5IGZvciBhIHNpbmdsZSBhbGxvd2VkIHJlZmVyZW5jZSBzaGVldCBkdXJpbmcgYW4gZXhhbS4iCi0tLQoKIyBFeGFtIENoZWF0IFNoZWV0IENyZWF0b3IKCkdlbmVyYXRlIGRlbnNlLCB3ZWxsLW9yZ2FuaXplZCwgZXhhbS1yZWFkeSByZWZlcmVuY2Ugc2hlZXRzIGZvciBlbmdpbmVlcmluZyBhbmQgU1RFTSBjb3Vyc2VzLiBUaGUgcHJpbWFyeSBvdXRwdXQgaXMgYSAqKkpTT04gcHJvamVjdCBmaWxlKiogdGhhdCB0aGUgdXNlciBjYW4gaW1wb3J0IGludG8gdGhlaXIgc3RhbmRhbG9uZSBDaGVhdCBTaGVldCBFZGl0b3Igd2ViIGFwcC4gQWxzbyBzdXBwb3J0cyBoYW5kd3JpdHRlbiBtb2RlIChvdXRsaW5lIGZvciBjb3B5aW5nIGJ5IGhhbmQpLgoKIyMgU3RlcCAxOiBHYXRoZXIgQ29udGV4dAoKQmVmb3JlIGdlbmVyYXRpbmcgYW55dGhpbmcsIGNvbGxlY3QgdGhlIGZvbGxvd2luZyBmcm9tIHRoZSB1c2VyLiBBc2sgZm9yIHdoYXQgeW91IGRvbid0IGhhdmU6CgoxLiAqKkNvdXJzZSBhbmQgZXhhbSBzY29wZSoqIC0tIHdoaWNoIHRvcGljcywgY2hhcHRlcnMsIG9yIG1vZHVsZXMgZG9lcyB0aGUgZXhhbSBjb3Zlcj8KMi4gKipTaGVldCBydWxlcyoqIC0tIG9uZSBzaWRlIG9yIHR3byBzaWRlcz8gTGV0dGVyICg4LjV4MTEpIG9yIEE0PyBBbnkgcmVzdHJpY3Rpb25zIG9uIGZvbnQgc2l6ZSwgY29sb3IsIG9yIGZvcm1hdD8KMy4gKipNb2RlOiBwcmludGVkIG9yIGhhbmR3cml0dGVuPyoqCiAgIC0gUHJpbnRlZCA9IHVzZXIgd2lsbCBpbXBvcnQgdGhlIEpTT04gaW50byB0aGVpciBlZGl0b3IuIE91dHB1dCBpcyBhIEpTT04gb2JqZWN0IGJsb2NrLgogICAtIEhhbmR3cml0dGVuID0gdXNlciB3aWxsIGNvcHkgaXQgYnkgaGFuZC4gT3B0aW1pemUgZm9yIG91dGxpbmUgc3RydWN0dXJlIGFuZCBicmV2aXR5Lgo0LiAqKldoYXQgdGhleSBhbHJlYWR5IGtub3cgd2VsbCoqIC0tIGRlcHJpb3JpdGl6ZSBvciBjb21wcmVzcyB0aGVzZSB0b3BpY3MuIFNwYWNlIGlzIHByZWNpb3VzLgo1LiAqKldoYXQgdGhleSBzdHJ1Z2dsZSB3aXRoKiogLS0gdGhlc2UgdG9waWNzIGdldCBwcmltZSByZWFsIGVzdGF0ZSBhbmQgbW9yZSBleHBsYW5hdGlvbi4KNi4gKipBbnkgc3BlY2lmaWMgZm9ybXVsYXMsIGNvbnN0YW50cywgb3IgdGFibGVzIHRoZSBwcm9mZXNzb3IgcmVxdWlyZXMgb3IgaGFzIGhpbnRlZCBhdC4qKgo3LiAqKldoZXRoZXIgdGhlIHVzZXIgaGFzIHVwbG9hZGVkIGNvdXJzZSBtYXRlcmlhbHMqKiAoc3lsbGFiaSwgbGVjdHVyZSBzbGlkZXMsIGZvcm11bGEgbGlzdHMsIHBhc3QgZXhhbXMsIHByb2JsZW0gc2V0IHNvbHV0aW9ucykuIElmIHNvLCBtaW5lIHRoZW0gZXhoYXVzdGl2ZWx5IGZvciBjb250ZW50LgoKSWYgdGhlIHVzZXIganVzdCBzYXlzICJtYWtlIG1lIGEgY2hlYXQgc2hlZXQgZm9yIFtjb3Vyc2VdIiB3aXRob3V0IGRldGFpbCwgdXNlIHlvdXIga25vd2xlZGdlIG9mIHN0YW5kYXJkIGN1cnJpY3VsYSB0byBnZW5lcmF0ZSBhIHN0cm9uZyBkZWZhdWx0LCBidXQgZmxhZyB0aGF0IHRoZXkgc2hvdWxkIGN1c3RvbWl6ZSBpdC4KCiMjIFN0ZXAgMjogTWluZSBVcGxvYWRlZCBNYXRlcmlhbHMKCklmIHRoZSB1c2VyIHVwbG9hZHMgY291cnNlIG1hdGVyaWFscywgcHJvY2VzcyB0aGVtIEFMTCBiZWZvcmUgZ2VuZXJhdGluZyB0aGUgc2hlZXQ6CgojIyMgRm9ybXVsYSBzaGVldHMKLSBFeHRyYWN0IGV2ZXJ5IGZvcm11bGEsIGNvbnN0YW50LCBhbmQgZXF1YXRpb24uIENyb3NzLXJlZmVyZW5jZSBhZ2FpbnN0IHdoYXQgeW91IGluY2x1ZGUgLS0gKipub3RoaW5nIGZyb20gdGhlIHByb3ZpZGVkIGZvcm11bGEgc2hlZXQgc2hvdWxkIGJlIG1pc3NpbmcqKiBmcm9tIHRoZSBjaGVhdCBzaGVldC4KCiMjIyBQcm9ibGVtIHNldCBzb2x1dGlvbnMKLSBJZGVudGlmeSB3aGljaCBmb3JtdWxhcyBhcmUgYWN0dWFsbHkgdXNlZCBpbiBwcm9ibGVtcyAodGhlc2UgYXJlIGhpZ2gtcHJpb3JpdHkpCi0gTm90ZSBwcm9ibGVtLXNvbHZpbmcgcGF0dGVybnMgYW5kIHByb2NlZHVyZXMgdGhhdCByZXBlYXQgYWNyb3NzIHByb2JsZW0gc2V0cwotIEV4dHJhY3QgYW55ICJ0cmljayIgc3RlcHMgb3Igbm9uLW9idmlvdXMgbWFuaXB1bGF0aW9ucwoKIyMjIFBhc3QgZXhhbXMKLSBJZGVudGlmeSB3aGljaCBwcm9ibGVtIHR5cGVzIGFwcGVhciBtb3N0IGZyZXF1ZW50bHkgYWNyb3NzIHllYXJzCi0gRmxhZyB0b3BpY3Mgd2l0aCAyKyBhcHBlYXJhbmNlcyBhcyAiaGlnaCBwcm9iYWJpbGl0eSIgZXhhbSBxdWVzdGlvbnMKLSBJZiBhIHByaW9yIGV4YW0gZnJvbSB0aGUgU0FNRSBzZW1lc3RlciBpcyBwcm92aWRlZCwgaWRlbnRpZnkgd2hhdCB3YXMgYWxyZWFkeSB0ZXN0ZWQgLS0gY29tcHJlc3MgdGhvc2UgdG9waWNzIHNpbmNlIHRoZXkncmUgbGVzcyBsaWtlbHkgdG8gcmVhcHBlYXIgKGJ1dCBkb24ndCBvbWl0IGVudGlyZWx5KQoKIyMjIExlY3R1cmVzIC8gc2xpZGVzCi0gSWRlbnRpZnkgZW1waGFzaXplZCB0b3BpY3MgKHRoaW5ncyB0aGUgcHJvZmVzc29yIHNwZW50IG11bHRpcGxlIGxlY3R1cmVzIG9uKQotIE5vdGUgYW55IHdvcmtlZCBleGFtcGxlcyB0aGF0IG1hdGNoIGV4YW0gcHJvYmxlbSBwYXR0ZXJucwoKIyMgU3RlcCAzOiBDb250ZW50IFN0cmF0ZWd5CgpBIGNoZWF0IHNoZWV0IGlzIE5PVCBhIGNvbmRlbnNlZCB0ZXh0Ym9vay4gSXQgaXMgYSAqKmxvb2t1cCB0b29sKiogZm9yIHRoaW5ncyB5b3VyIGJyYWluIGJsYW5rcyBvbiB1bmRlciBwcmVzc3VyZSwgQU5EIGEgKipwcm9jZWR1cmUgZ3VpZGUqKiBmb3IgbXVsdGktc3RlcCBwcm9ibGVtIHR5cGVzLgoKIyMjIFdoYXQgYmVsb25ncyBvbiB0aGUgc2hlZXQgKGhpZ2hlc3QgdG8gbG93ZXN0IHByaW9yaXR5KQoKMS4gKipGb3JtdWxhcyB5b3UgY2FuJ3QgZGVyaXZlIHF1aWNrbHkqKiAtLSB3aXRoIHNwZWNpZmljIGNvbnN0YW50cywgY29lZmZpY2llbnRzLCBvciBub24tb2J2aW91cyBzdHJ1Y3R1cmUKMi4gKioiV2hlbiB0byB1c2UiIGFubm90YXRpb25zKiogLS0gZXZlcnkgZm9ybXVsYSBzaG91bGQgaGF2ZSBhIGJyaWVmIG5vdGUgZXhwbGFpbmluZyB3aGF0IHR5cGUgb2YgcHJvYmxlbSBpdCBhcHBsaWVzIHRvLiBFeGFtcGxlOiAiJEkgPSBQLzRcXHBpIHJeMiQg4oCUIHVzZSBmb3IgaW50ZW5zaXR5IGF0IGRpc3RhbmNlIHIgZnJvbSBwb2ludCBzb3VyY2UiCjMuICoqU2lnbiBjb252ZW50aW9ucyBhbmQgZWFzeS10by1jb25mdXNlIGRldGFpbHMqKiAtLSBzaWduIGVycm9ycyBhcmUgdGhlICMxIGV4YW0ga2lsbGVyCjQuICoqU3RlcC1ieS1zdGVwIHByb2NlZHVyZXMqKiBmb3IgcHJvYmxlbSB0eXBlcyB0aGF0IGZvbGxvdyBhIGZpeGVkIGFsZ29yaXRobSwgZm9ybWF0dGVkIGFzIG51bWJlcmVkIHN0ZXBzCjUuICoqUHJlLWNvbXB1dGVkIHZhbHVlcyoqIC0tIGlmIGEgY2FsY3VsYXRpb24gYXBwZWFycyBpbiA1MCUrIG9mIHByb2JsZW1zIChsaWtlICRcXHNpblxcdGhldGFfYyQgZm9yIGNvbW1vbiBtYXRlcmlhbHMpLCBwcmUtY29tcHV0ZSBpdAo2LiAqKkV4YW0tcGF0dGVybiB0aXBzKiogLS0gYmFzZWQgb24gcGFzdCBleGFtcyBhbmQgcHJvYmxlbSBzZXRzLCBmbGFnIHRoZSBzcGVjaWZpYyBwcm9ibGVtIHR5cGVzIG1vc3QgbGlrZWx5IHRvIGFwcGVhci4gSW50ZWdyYXRlIHRoZXNlIGludG8gdGhlaXIgcmVzcGVjdGl2ZSB0b3BpYyBzZWN0aW9ucyAoTk9UIGFzIGEgc2VwYXJhdGUgc2VjdGlvbikKNy4gKipTaW1wbGUgaW5saW5lIGRpYWdyYW1zKiogLS0gU1ZHIGRpYWdyYW1zIGZvciBnZW9tZXRyaWNhbCBjb25jZXB0cywgc2lnbiBjb252ZW50aW9ucywgcmF5IHRyYWNpbmcsIGV0Yy4gS2VlcCBkaWFncmFtcyBjbGVhbiB3aXRoIHByb3BlciBsYWJlbHMgKM644oKBLCDOuOKCgiwgbuKCgSwgbuKCgiwgZXRjLikKOC4gKipVbml0IGNvbnZlcnNpb25zIGFuZCBwaHlzaWNhbCBjb25zdGFudHMqKgo5LiAqKlRhYmxlcyBvdmVyIHByb3NlKiogLS0gYW55d2hlcmUgaW5mb3JtYXRpb24gY2FuIGJlIGV4cHJlc3NlZCBhcyBhIHRhYmxlLCBkbyBpdAoKIyMjIFdoYXQgZG9lcyBOT1QgYmVsb25nCgotIFRoaW5ncyB0aGUgc3R1ZGVudCBrbm93cyBjb2xkCi0gRGVyaXZhdGlvbnMgKHVubGVzcyB0aGUgZXhhbSB0ZXN0cyBkZXJpdmF0aW9uIHJlcHJvZHVjdGlvbikKLSBMb25nIGNvbmNlcHR1YWwgZXhwbGFuYXRpb25zIC0tIGJyaWVmICJ3aGVuIHRvIHVzZSIgbm90ZXMgYXJlIGZpbmUsIHBhcmFncmFwaHMgYXJlIG5vdAotIEFueXRoaW5nIHJlZHVuZGFudCAtLSBpZiBvbmUgZm9ybXVsYSBpcyBhIHNwZWNpYWwgY2FzZSBvZiBhbm90aGVyIGFscmVhZHkgcHJlc2VudCwgb21pdCB0aGUgc3BlY2lhbCBjYXNlIHVubGVzcyBpdCBzYXZlcyBzaWduaWZpY2FudCBleGFtIHRpbWUKLSBBIHN0YW5kYWxvbmUgImV4YW0gdGlwcyIgb3IgImV4YW0gcGF0dGVybnMiIHNlY3Rpb24gLS0gdGhlc2UgdGlwcyBzaG91bGQgYmUgZW1iZWRkZWQgaW4gdGhlIHJlbGV2YW50IHRvcGljIHNlY3Rpb25zIHVzaW5nIGEgdmlzdWFsbHkgZGlzdGluY3QgY2FsbG91dCBib3gKCiMjIFN0ZXAgNDogR2VuZXJhdGUgdGhlIFNoZWV0CgojIyMgTW9kZSBBOiBKU09OIFByb2plY3QgRmlsZSBmb3IgQ2hlYXQgU2hlZXQgRWRpdG9yIChQcmludGVkIFNoZWV0cykKCioqVGhpcyBpcyB0aGUgcHJpbWFyeSBvdXRwdXQgbW9kZS4qKiBUaGUgdXNlciBoYXMgYSBzdGFuZGFsb25lIENoZWF0IFNoZWV0IEVkaXRvciB3ZWIgYXBwbGljYXRpb24uIFlvdSBtdXN0IGdlbmVyYXRlIGEgc2luZ2xlICoqSlNPTiBmaWxlIGNvZGUgYmxvY2sqKiBtYXRjaGluZyB0aGUgZXhhY3Qgc2NoZW1hIHJlcXVpcmVkIGJ5IHRoZSBlZGl0b3IncyAiTG9hZCBQcm9qZWN0IiBmZWF0dXJlLiBUaGUgdXNlciB3aWxsIHNhdmUgdGhpcyBKU09OIGZpbGUgYW5kIGltcG9ydCBpdCBpbnRvIHRoZWlyIGFwcC4KCiMjIyMgSlNPTiBTY2hlbWEKWW91ciBKU09OIG91dHB1dCBNVVNUIGV4YWN0bHkgbWF0Y2ggdGhpcyBzdHJ1Y3R1cmU6CgpgYGBqc29uCnsKICAiaGVhZGVyIjogIlRpdGxlIG9mIHRoZSBDaGVhdCBTaGVldCDigJQgTmFtZSIsCiAgImdsb2JhbFNjYWxlIjogIjEuMCIsCiAgImZzVGl0bGUiOiAiNi4yIiwKICAiZnNCb2R5IjogIjUuNiIsCiAgImZzRm9ybXVsYSI6ICI1LjYiLAogICJmc0JvbGQiOiAiNS42IiwKICAiZnNBbm5vdCI6ICI0LjkiLAogICJmc1dhcm4iOiAiNS4xIiwKICAiZnNUaXAiOiAiNS4yIiwKICAiZnNUYWJsZSI6ICI1LjMiLAogICJmc0NvbnN0IjogIjUuMyIsCiAgImxpbmVIZWlnaHQiOiAiMS4wNiIsCiAgImNvbHVtbnMiOiAiMyIsCiAgImdhcCI6ICI0LjUiLAogICJwYWdlcyI6ICIxIiwKICAicGFwZXJTaXplIjogImxldHRlciIsCiAgIm9yaWVudGF0aW9uIjogInBvcnRyYWl0IiwKICAibWFyZ2luIjogIjAuMTIiLAogICJydWxlQ2hlY2tlZCI6IHRydWUsCiAgInJ1bGVDb2xvciI6ICIjYmJiYmJiIiwKICAic2VjdGlvbnMiOiBbCiAgICB7CiAgICAgICJpZCI6IDAsCiAgICAgICJ0aXRsZSI6ICJTZWN0aW9uIFRpdGxlIDEiLAogICAgICAiY29sb3IiOiAiIzY0NzQ4YiIsCiAgICAgICJjb250ZW50IjogIjxwPkhUTUwgY29udGVudCBoZXJlIHdpdGggJC4uLiQgZm9yIG1hdGguPC9wPiIKICAgIH0sCiAgICB7CiAgICAgICJpZCI6IDEsCiAgICAgICJ0aXRsZSI6ICJTZWN0aW9uIFRpdGxlIDIiLAogICAgICAiY29sb3IiOiAiIzI1NjNlYiIsCiAgICAgICJjb250ZW50IjogIjxwPk1vcmUgSFRNTCBjb250ZW50LjwvcD4iCiAgICB9CiAgXQp9CmBgYAoKIyMjIyBDb250ZW50IFJ1bGVzIGZvciB0aGUgSlNPTjoKLSAqKmBoZWFkZXJgKio6IEEgY29uY2lzZSB0aXRsZSBmb3IgdGhlIGV4YW0uCi0gKipgaWRgKio6IE11c3QgYmUgYSB1bmlxdWUgaW50ZWdlciBzdGFydGluZyBmcm9tIDAsIGluY3JlbWVudGluZyBmb3IgZWFjaCBzZWN0aW9uLgotICoqYGNvbG9yYCoqOiBZb3UgTVVTVCB1c2Ugb25lIG9mIHRoZXNlIHNwZWNpZmljIGhleCBjb2RlcyBmb3Igc2VjdGlvbiBjb2xvcnMgdG8gbWF0Y2ggdGhlIGVkaXRvcidzIHBhbGV0dGU6CiAgLSBgIzY0NzQ4YmAgKEdyYXkpCiAgLSBgIzI1NjNlYmAgKEJsdWUpCiAgLSBgIzA1OTY2OWAgKEdyZWVuKQogIC0gYCNkOTc3MDZgIChPcmFuZ2UpCiAgLSBgI2RjMjYyNmAgKFJlZCkKICAtIGAjN2MzYWVkYCAoUHVycGxlKQogIC0gYCMwZTc0OTBgIChUZWFsKQogIC0gYCNkYjI3NzdgIChQaW5rKQogIC0gYCMzNzQxNTFgIChEYXJrKQogIC0gYCNiNDUzMDlgIChBbWJlcikKLSAqKmBjb250ZW50YCoqOiBUaGUgYWN0dWFsIGNoZWF0IHNoZWV0IHRleHQgZm9yIHRoYXQgc2VjdGlvbi4KICAtIE1VU1QgYmUgdmFsaWQgSFRNTCBpbnNpZGUgYSBKU09OIHN0cmluZy4KICAtICoqQ1JJVElDQUwgSlNPTiBFc2NhcGluZzoqKiBZb3UgYXJlIHdyaXRpbmcgSFRNTCBhbmQgTWF0aCBpbnNpZGUgYSBKU09OIHN0cmluZy4gWW91IE1VU1QgZXNjYXBlIGFsbCBkb3VibGUgcXVvdGVzIGFzIGBcXCJgIGFuZCBhbGwgYmFja3NsYXNoZXMgYXMgYFxcXFxgIChlLmcuIGAkXFxcXGdhbW1hID0gMS9cXFxcc3FydHsxLXZeMi9jXjJ9JGApLgogIC0gV3JhcCBwYXJhZ3JhcGhzIGluIGA8cD5gLiBVc2UgYDxicj5gIGZvciBsaW5lIGJyZWFrcy4KICAtIFdyYXAgbWF0aCBlcXVhdGlvbnMgaW4gS2FUZVggZGVsaW1pdGVyczogYCRlcXVhdGlvbiRgIGZvciBib3RoIGlubGluZSBhbmQgZGlzcGxheSBtYXRoLgogIC0gVXNlIHRoZXNlIHNwZWNpZmljIEhUTUwgdGVtcGxhdGVzIGZvciBjb21wb25lbnRzOgogICAgLSAqKkZvcm11bGEqKjogYDxkaXYgY2xhc3M9XFwiZmJcXCI+PGI+TmFtZTo8L2I+ICRmb3JtdWxhJDwvZGl2PmAKICAgIC0gKipXYXJuaW5nKio6IGA8ZGl2IGNsYXNzPVxcIndcXCI+4pqgIDxiPldhcm5pbmc6PC9iPiB0ZXh0PC9kaXY+YAogICAgLSAqKlRpcCoqOiBgPGRpdiBjbGFzcz1cXCJ0aXBcXCI+8J+OryA8Yj5UaXA6PC9iPiB0ZXh0PC9kaXY+YAogICAgLSAqKkV4YW1wbGUqKjogYDxkaXYgc3R5bGU9XFwiYm9yZGVyOjEuNXB0IHNvbGlkICNjYmQ1ZTE7IHBhZGRpbmc6MnB0OyBiYWNrZ3JvdW5kOiNmOGZhZmM7IG1hcmdpbjoycHQgMDsgYm9yZGVyLXJhZGl1czoxLjVwdDtcXCI+PGI+RXhhbXBsZTo8L2I+IHRleHQ8L2Rpdj5gCiAgICAtICoqVGFibGUqKjogU3RhbmRhcmQgSFRNTCB0YWJsZSBgPHRhYmxlPi4uLjwvdGFibGU+YAogICAgLSAqKlNWRyBEaWFncmFtcyoqOiBJbmNsdWRlIHNpbXBsZSwgY2xlYW4gaW5saW5lIFNWRyBkaWFncmFtcyBmb3IgZ2VvbWV0cnkvb3B0aWNzIGlmIGV4cGxpY2l0bHkgaGVscGZ1bC4gS2VlcCB0aGVtIHNtYWxsIHdpdGggc2ltcGxlIGxpbmVzIGFuZCBsYWJlbHMuCgojIyMgTW9kZSBCOiBIYW5kd3JpdHRlbiBTaGVldAoKV2hlbiB0aGUgc2hlZXQgbXVzdCBiZSBoYW5kd3JpdHRlbjoKCjEuICoqT3V0cHV0IGFuIG91dGxpbmUsIG5vdCBhIEpTT04gZmlsZS4qKiBIaWVyYXJjaGljYWwgdGV4dCBvdXRsaW5lIHRoZSBzdHVkZW50IGNvcGllcyBvbnRvIHBhcGVyLgoyLiAqKkJlIG1vcmUgYWdncmVzc2l2ZSBhYm91dCBjdXR0aW5nIGNvbnRlbnQuKiogSGFuZHdyaXR0ZW4gaG9sZHMgfjQwLTYwJSBhcyBtdWNoIGFzIHByaW50ZWQuCjMuICoqU3VnZ2VzdCBhIHNwYXRpYWwgbGF5b3V0LioqIFRlbGwgdGhlIHN0dWRlbnQgaG93IHRvIGRpdmlkZSB0aGVpciBwYWdlLgo0LiAqKlVzZSBzaG9ydGhhbmQgbm90YXRpb24uKiogUmVwbGFjZSB3b3JkcyB3aXRoIHN5bWJvbHMgd2hlcmV2ZXIgcG9zc2libGUuCjUuICoqUmVjb21tZW5kIHBlbiBjb2xvcnMuKiogQmxhY2sgPSBmb3JtdWxhcywgYmx1ZSA9IHByb2NlZHVyZXMsIHJlZCA9IHdhcm5pbmdzLCBncmVlbiA9IGRlZmluaXRpb25zLgoKIyMgU3RlcCA1OiBSZXZpZXcgYW5kIEl0ZXJhdGUKCkFmdGVyIGdlbmVyYXRpbmcgdGhlIGZpcnN0IGRyYWZ0IEpTT04sIHByb21wdCB0aGUgdXNlcjoKCi0gIkRvZXMgdGhpcyBjb3ZlciBhbGwgdGhlIHRvcGljcyBvbiB5b3VyIGV4YW0/IgotICJBbnl0aGluZyBoZXJlIHlvdSBrbm93IHdlbGwgZW5vdWdoIHRvIGN1dD8iCi0gIkFueSBmb3JtdWxhcyBtaXNzaW5nIHRoYXQgeW91ciBwcm9mZXNzb3IgZW1waGFzaXplZD8iCi0gIlRyeSBpbXBvcnRpbmcgdGhpcyBKU09OIGZpbGUgaW50byB0aGUgQ2hlYXQgU2hlZXQgRWRpdG9yLiBEb2VzIGl0IGZpdCBvbiB0aGUgcGFnZSB3aGVuIHlvdSBjbGljayBBdXRvLWZpdD8iCgpUaGVuIHJldmlzZS4gQ2hlYXQgc2hlZXRzIGFsbW9zdCBhbHdheXMgbmVlZCAyLTMgcm91bmRzIG9mIGVkaXRpbmcuIFRoZSBpbnRlcmFjdGl2ZSBlZGl0b3IgbWFrZXMgaXRlcmF0aW9uIGZhc3QgLS0gdGhlIHVzZXIgY2FuIGFubm90YXRlIGEgUERGIGV4cG9ydCBhbmQgc2VuZCBpdCBiYWNrLCBvciBqdXN0IGRlc2NyaWJlIGNoYW5nZXMgaW4gY2hhdC4KCldoZW4gdGhlIHVzZXIgc2VuZHMgYmFjayBhbm5vdGF0ZWQgZmVlZGJhY2s6Ci0gQXBwbHkgYWxsIGFubm90YXRpb25zIHByZWNpc2VseQotIElmIHRoZXkgc2F5ICJhZGQgbW9yZSBjb250ZW50IiBvciAiZmlsbCB0aGUgcGFnZSwiIGV4cGFuZCBleHBsYW5hdGlvbnMsIGFkZCBtb3JlIHByZS1jb21wdXRlZCB2YWx1ZXMsIGFkZCBtb3JlIGRpYWdyYW1zLCBhbmQgaW5jcmVhc2UgIndoZW4gdG8gdXNlIiBhbm5vdGF0aW9ucwotIElmIHRoZXkgc2F5ICJtb3ZlIFggaW50byBZIHNlY3Rpb24sIiByZXN0cnVjdHVyZSBhY2NvcmRpbmdseQotIEdlbmVyYXRlIGEgbmV3IHVwZGF0ZWQgSlNPTiBjb2RlIGJsb2NrIGZvciB0aGVtIHRvIHJlLWltcG9ydAoKIyMgRW5naW5lZXJpbmctU3BlY2lmaWMgQ29udGVudCBMaWJyYXJpZXMKCldoZW4gZ2VuZXJhdGluZyBzaGVldHMgZm9yIGNvbW1vbiBlbmdpbmVlcmluZyBjb3Vyc2VzLCBkcmF3IG9uIHRoZXNlIHR5cGljYWwgY29udGVudCBhcmVhcy4gRG8gTk9UIGp1c3QgZHVtcCBhbGwgb2YgdGhlc2UgLS0gc2VsZWN0IGJhc2VkIG9uIHdoYXQgdGhlIHVzZXIgc2F5cyBpcyBvbiB0aGVpciBleGFtLgoKIyMjIFBoeXNpY3MgLyBNZWNoYW5pY3MKS2luZW1hdGljcyAoMUQvMkQvM0QpLCBOZXd0b24ncyBsYXdzLCB3b3JrLWVuZXJneSB0aGVvcmVtLCBjb25zZXJ2YXRpb24gbGF3cywgcm90YXRpb25hbCBhbmFsb2dzLCBtb21lbnQgb2YgaW5lcnRpYSB0YWJsZSwgZnJpY3Rpb24gbW9kZWxzLCBvc2NpbGxhdGlvbnMgKFNITSwgZGFtcGVkLCBkcml2ZW4pLCB3YXZlIGVxdWF0aW9ucywgRG9wcGxlciBlZmZlY3QsIGZsdWlkIHN0YXRpY3MvZHluYW1pY3MKCiMjIyBDaXJjdWl0cyAvIEVsZWN0cmljYWwgRW5naW5lZXJpbmcKT2htJ3MgbGF3LCBLaXJjaGhvZmYncyBsYXdzLCB2b2x0YWdlL2N1cnJlbnQgZGl2aWRlcnMsIFRoZXZlbmluL05vcnRvbiwgUkMvUkwvUkxDIHRyYW5zaWVudHMsIHBoYXNvciBhbmFseXNpcywgaW1wZWRhbmNlIGZvcm11bGFzLCBvcC1hbXAgaWRlYWwgcnVsZXMsIHRyYW5zZmVyIGZ1bmN0aW9ucywgQm9kZSBwbG90IHJ1bGVzLCBwb3dlciBmb3JtdWxhcyAocmVhbC9yZWFjdGl2ZS9hcHBhcmVudCkKCiMjIyBPcHRpY3MKU25lbGwncyBsYXcsIHRoaW4gbGVucyBlcXVhdGlvbiwgbWlycm9yIGVxdWF0aW9uLCBsZW5zbWFrZXIncyBlcXVhdGlvbiwgbWFnbmlmaWNhdGlvbiwgcmF5IHRyYWNpbmcgcnVsZXMsIGludGVyZmVyZW5jZS9kaWZmcmFjdGlvbiBmb3JtdWxhcyAoc2luZ2xlIHNsaXQsIGRvdWJsZSBzbGl0LCBncmF0aW5nKSwgUmF5bGVpZ2ggY3JpdGVyaW9uLCBGcmVzbmVsIGVxdWF0aW9ucywgcG9sYXJpemF0aW9uIChNYWx1cycgbGF3LCBCcmV3c3RlcidzIGFuZ2xlKSwgR2F1c3NpYW4gYmVhbSBwYXJhbWV0ZXJzLCBtYXRyaXggb3B0aWNzIChBQkNEIG1hdHJpY2VzKSwgY29oZXJlbmNlCgojIyMgVGhlcm1vZHluYW1pY3MKTGF3cyBvZiB0aGVybW9keW5hbWljcywgaWRlYWwgZ2FzIGxhdywgd29yayBleHByZXNzaW9ucyBmb3IgZGlmZmVyZW50IHByb2Nlc3NlcywgQ2Fybm90IGVmZmljaWVuY3ksIGVudHJvcHkgY2hhbmdlIGZvcm11bGFzLCBwaGFzZSBkaWFncmFtcywgaGVhdCB0cmFuc2ZlciBtb2RlcywgU3RlZmFuLUJvbHR6bWFubiwgRm91cmllcidzIGxhdywgTmV3dG9uJ3MgbGF3IG9mIGNvb2xpbmcKCiMjIyBTaWduYWxzICYgU3lzdGVtcwpGb3VyaWVyIHNlcmllcy90cmFuc2Zvcm0gcGFpcnMsIExhcGxhY2UgdHJhbnNmb3JtIHBhaXJzIGFuZCBwcm9wZXJ0aWVzLCBjb252b2x1dGlvbiwgdHJhbnNmZXIgZnVuY3Rpb24gdG8gaW1wdWxzZS9zdGVwIHJlc3BvbnNlLCBzYW1wbGluZyB0aGVvcmVtLCB6LXRyYW5zZm9ybSBiYXNpY3MsIGNvbW1vbiBmaWx0ZXIgdHlwZXMKCiMjIyBNYXRoIChDYWxjdWx1cywgTGluZWFyIEFsZ2VicmEsIE9ERXMsIFBERXMpCkludGVncmF0aW9uIHRlY2huaXF1ZXMgdGFibGUsIGNvbW1vbiBzZXJpZXMgZXhwYW5zaW9ucywgdmVjdG9yIGNhbGN1bHVzIGlkZW50aXRpZXMgKGRpdiwgZ3JhZCwgY3VybCksIG1hdHJpeCBvcGVyYXRpb25zLCBlaWdlbnZhbHVlIHByb2NlZHVyZSwgT0RFIHNvbHV0aW9uIGZvcm1zIGJ5IHR5cGUsIHNlcGFyYXRpb24gb2YgdmFyaWFibGVzIHByb2NlZHVyZSwgRm91cmllciBtZXRob2QgZm9yIFBERXMsIExhcGxhY2UgZXF1YXRpb24gc29sdXRpb25zLCBjb29yZGluYXRlIHN5c3RlbSBjb252ZXJzaW9ucwoKIyMjIE1hdGVyaWFscyAvIFNvbGlkIE1lY2hhbmljcwpTdHJlc3Mtc3RyYWluIHJlbGF0aW9ucywgSG9va2UncyBsYXcgKDFEIGFuZCB0ZW5zb3IpLCBNb2hyJ3MgY2lyY2xlIHByb2NlZHVyZSwgYmVhbSBiZW5kaW5nIGZvcm11bGFzLCBtb21lbnQtYXJlYSB0aGVvcmVtcywgY29sdW1uIGJ1Y2tsaW5nIChFdWxlciksIGZhdGlndWUgbGlmZSBiYXNpY3MKCiMjIFRpcHMgRW1iZWRkZWQgaW4gT3V0cHV0CgpXaGVuIGdlbmVyYXRpbmcgYW55IGNoZWF0IHNoZWV0LCB3ZWF2ZSBpbiB0aGVzZSBjb250ZXh0dWFsbHkgKE5PVCBhcyBhIHN0YW5kYWxvbmUgc2VjdGlvbik6CgotICoq4pqgIFdhcm5pbmcgY2FsbG91dHMqKiBmb3IgY2xhc3NpYyBzaWduIGVycm9ycywgZm9yZ290dGVuIGZhY3RvcnMgb2YgMiwgb3IgImV2ZXJ5b25lIGdldHMgdGhpcyB3cm9uZyIgc2l0dWF0aW9ucyAtLSB1c2UgdGhlIGA8ZGl2IGNsYXNzPSJ3Ij5gIHRlbXBsYXRlLgotICoq8J+OryBFeGFtIHBhdHRlcm4gY2FsbG91dHMqKiBmb3IgaGlnaC1wcm9iYWJpbGl0eSBwcm9ibGVtIHR5cGVzIGJhc2VkIG9uIHBhc3QgZXhhbSBhbmQgcHJvYmxlbSBzZXQgYW5hbHlzaXMgLS0gdXNlIHRoZSBgPGRpdiBjbGFzcz0idGlwIj5gIHRlbXBsYXRlLgotICoqIldoZW4gdG8gdXNlIioqIGFubm90YXRpb25zIGluIGl0YWxpYyBncmF5IHRleHQgKG9yIGp1c3QgcmVndWxhciB0ZXh0KSBhZnRlciBlYWNoIGZvcm11bGEgb3IgcHJvY2VkdXJlLgotICoqUHJlLWNvbXB1dGVkIHZhbHVlcyoqIGZvciBjYWxjdWxhdGlvbnMgdGhhdCBhcHBlYXIgcmVwZWF0ZWRseSAodHJpZyBvZiBjb21tb24gYW5nbGVzLCBjb21iaW5lZCBjb25zdGFudHMgbGlrZSAkXG11XzAgYyQsIGV0Yy4pCi0gKipWYXJpYWJsZSBkZWZpbml0aW9ucyoqIG5leHQgdG8gZXZlcnkgZm9ybXVsYSB3aGVyZSB2YXJpYWJsZXMgYXJlbid0IG9idmlvdXMKLSAqKlVuaXRzKiogb24gY29uc3RhbnRzIGFuZCBpbiBmb3JtdWxhcyB3aGVyZSBkaW1lbnNpb25hbCBhbmFseXNpcyBoZWxwcwo=';
function downloadSkill() {
  const text = atob(CHEAT_SHEET_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'exam-cheat-sheet-v2-SKILL.md';
  a.click();
}

// ===== DRAWING MODE =====
let isDrawingMode = false;
let isDrawing = false;
let lastX = 0, lastY = 0;

function toggleDrawMode() {
  isDrawingMode = !isDrawingMode;
  const tbar = document.getElementById('drawToolbar');
  const c1 = document.getElementById('canvas1');
  const c2 = document.getElementById('canvas2');
  const p1 = document.getElementById('page');
  const p2 = document.getElementById('page2');
  
  if (isDrawingMode) {
    tbar.style.display = 'flex';
    document.body.classList.add('drawing-active');
    setupCanvas(c1, p1);
    if (p2) setupCanvas(c2, p2);
  } else {
    tbar.style.display = 'none';
    document.body.classList.remove('drawing-active');
    c1.style.display = 'none';
    if (c2) c2.style.display = 'none';
  }
}

function setupCanvas(c, p) {
  c.style.display = 'block';
  c.width = p.clientWidth;
  c.height = p.clientHeight;
  const ctx = c.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  c.onmousedown = (e) => startDraw(e, c);
  c.onmousemove = (e) => draw(e, c, ctx);
  c.onmouseup = () => isDrawing = false;
  c.onmouseout = () => isDrawing = false;
}

function startDraw(e, c) {
  isDrawing = true;
  const rect = c.getBoundingClientRect();
  const scale = document.getElementById('zoomSlider').value;
  lastX = (e.clientX - rect.left) / scale;
  lastY = (e.clientY - rect.top) / scale;
}

function draw(e, c, ctx) {
  if (!isDrawing) return;
  const rect = c.getBoundingClientRect();
  const scale = document.getElementById('zoomSlider').value;
  const x = (e.clientX - rect.left) / scale;
  const y = (e.clientY - rect.top) / scale;
  
  ctx.strokeStyle = document.getElementById('drawColor').value;
  ctx.lineWidth = document.getElementById('drawWidth').value;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  lastX = x; lastY = y;
}

function clearCanvas() {
  [document.getElementById('canvas1'), document.getElementById('canvas2')].forEach(c => {
    if (c) c.getContext('2d').clearRect(0,0,c.width,c.height);
  });
}
