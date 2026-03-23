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

function renderPage() {
  const container = document.getElementById('columnsContainer');
  const container2 = document.getElementById('columnsContainer2');
  const fontSize = document.getElementById('fontSlider').value;
  const lineHeight = document.getElementById('lineSlider').value;
  const cols = document.getElementById('colSelect').value;
  const gap = document.getElementById('gapSlider').value;

  const orientation = document.getElementById('orientationSelect').value;
  const size = document.getElementById('paperSizeSelect').value;
  const pages = parseInt(document.getElementById('pagesSelect').value);
  const margin = document.getElementById('marginSlider').value;
  const ruleChecked = document.getElementById('ruleCheckbox').checked;
  const ruleColor = document.getElementById('ruleColor').value;

  const page1 = document.getElementById('page');
  const page2 = document.getElementById('page2');
  const page2Shadow = document.getElementById('page2Shadow');

  // Apply layout classes and vars
  [page1, page2].forEach(p => {
    if (!p) return;
    p.className = `page ${orientation} ${size === 'a4' ? 'a4' : ''}`;
    p.style.setProperty('--page-margin', `${margin}in`);
    p.style.setProperty('--page-cols', cols);
    p.style.setProperty('--page-gap', `${gap}pt`);
    p.style.setProperty('--page-rule', ruleChecked ? `0.4pt solid ${ruleColor}` : 'none');
    p.style.fontSize = fontSize + 'pt';
    p.style.lineHeight = lineHeight;
  });

  if (page2Shadow) page2Shadow.style.display = pages === 2 ? 'block' : 'none';

  let html1 = '';
  let html2 = '';
  
  sections.forEach(s => {
    const sHTML = `
      <div class="s" data-id="${s.id}" style="border-left:1.5pt solid ${s.color};">
        <div class="section-controls">
          <button onclick="moveSection(${s.id},-1)" title="Move up">▲</button>
          <button onclick="moveSection(${s.id},1)" title="Move down">▼</button>
          <button onclick="moveToOtherPage(${s.id})" title="Move to other page">⇋</button>
          <button onclick="showImageModalFor(${s.id})" title="Add image">🖼</button>
          <button onclick="deleteSection(${s.id})" title="Delete" style="color:#fca5a5;">✕</button>
        </div>
        <h2 style="background:${s.color};font-size:${Math.max(parseFloat(fontSize)-0.2, 4)}pt;">${s.title}</h2>
        <div class="content" contenteditable="true" data-section-id="${s.id}">${s.content}</div>
      </div>
    `;
    if (s.page === 2) html2 += sHTML;
    else html1 += sHTML;
  });

  container.innerHTML = html1;
  if (container2) container2.innerHTML = html2;

  // Save edits back to state on blur
  container.querySelectorAll('.content[contenteditable]').forEach(el => {
    el.addEventListener('blur', function() {
      const id = parseInt(this.dataset.sectionId);
      const sec = sections.find(s => s.id === id);
      if (sec) sec.content = this.innerHTML;
    });
  });

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
        <button onclick="moveSection(${s.id},-1)">▲</button>
        <button onclick="moveSection(${s.id},1)">▼</button>
        <button onclick="deleteSection(${s.id})" style="color:#fca5a5;">✕</button>
      </div>
    </div>
  `).join('');
}

// ===== SECTION MANAGEMENT =====
function showAddSectionModal() {
  document.getElementById('newSectionTitle').value = '';
  document.getElementById('newSectionContent').value = '';
  document.getElementById('addSectionModal').style.display = 'flex';
}

function addSection() {
  const title = document.getElementById('newSectionTitle').value || 'New Section';
  const color = document.getElementById('newSectionColor').value;
  const content = document.getElementById('newSectionContent').value
    .replace(/\n/g, '<br>')
    .replace(/^(?!<)/, '<p>').replace(/(?<!>)$/, '</p>');
  sections.push({ id: sectionIdCounter++, title, color, content: content || '<p>Click to edit...</p>' });
  closeModal('addSectionModal');
  renderAll();
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

// ===== AUTO-FIT =====
function autoFitPage() {
  const page = document.getElementById('page');
  const maxH = 11 * 96 - 0.24 * 96; // 11in minus margins in px

  // Step 1: Find the LARGEST font size that fits
  let lo = 4.0, hi = 8.5, bestFont = 4.0;
  page.style.lineHeight = '1.06';
  for (let i = 0; i < 25; i++) {
    const mid = (lo + hi) / 2;
    page.style.fontSize = mid + 'pt';
    reRenderMathSync();
    if (page.scrollHeight <= maxH) { bestFont = mid; lo = mid; }
    else { hi = mid; }
  }
  bestFont = Math.floor(bestFont * 10) / 10;
  page.style.fontSize = bestFont + 'pt';
  document.getElementById('fontSlider').value = bestFont;
  document.getElementById('fontVal').textContent = bestFont + 'pt';

  // Step 2: Grow line height to fill remaining vertical space
  lo = 1.0; hi = 1.5; let bestLine = 1.0;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    page.style.lineHeight = mid;
    if (page.scrollHeight <= maxH) { bestLine = mid; lo = mid; }
    else { hi = mid; }
  }
  bestLine = Math.floor(bestLine * 100) / 100;
  page.style.lineHeight = bestLine;
  document.getElementById('lineSlider').value = bestLine;
  document.getElementById('lineVal').textContent = bestLine;

  // Step 3: Try bumping font up one more notch with the new line height
  let tryFont = bestFont + 0.1;
  page.style.fontSize = tryFont + 'pt';
  reRenderMathSync();
  if (page.scrollHeight <= maxH) {
    bestFont = tryFont;
    document.getElementById('fontSlider').value = bestFont;
    document.getElementById('fontVal').textContent = bestFont + 'pt';
    // Re-optimize line height
    lo = bestLine; hi = 1.5; bestLine = lo;
    for (let i = 0; i < 15; i++) {
      const mid = (lo + hi) / 2;
      page.style.lineHeight = mid;
      if (page.scrollHeight <= maxH) { bestLine = mid; lo = mid; }
      else { hi = mid; }
    }
    bestLine = Math.floor(bestLine * 100) / 100;
    page.style.lineHeight = bestLine;
    document.getElementById('lineSlider').value = bestLine;
    document.getElementById('lineVal').textContent = bestLine;
  } else {
    page.style.fontSize = bestFont + 'pt';
  }

  reRenderMath();
  checkFit();
}

function checkFit() {
  const page = document.getElementById('page');
  const maxH = 11 * 96 - 0.24 * 96;
  const indicator = document.getElementById('fitIndicator');
  if (page.scrollHeight <= maxH + 2) {
    indicator.className = 'fit-indicator fit-ok';
    indicator.textContent = '✓ Fits on 1 page';
  } else {
    indicator.className = 'fit-indicator fit-over';
    indicator.textContent = '✕ Overflows! (' + Math.round(page.scrollHeight - maxH) + 'px over)';
  }
}

// ===== MATH RENDERING =====
function reRenderMath() {
  try {
    renderMathInElement(document.getElementById('page'), {
      delimiters: [{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],
      throwOnError: false
    });
  } catch(e) { console.warn('Math render error:', e); }
  setTimeout(checkFit, 100);
}
function reRenderMathSync() {
  try {
    renderMathInElement(document.getElementById('page'), {
      delimiters: [{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],
      throwOnError: false
    });
  } catch(e) {}
}

// ===== SLIDER LISTENERS =====
document.getElementById('fontSlider').addEventListener('input', function() {
  document.getElementById('fontVal').textContent = this.value + 'pt';
  renderPage(); checkFit();
});
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
document.getElementById('marginSlider').addEventListener('input', function() {
  document.getElementById('marginVal').textContent = this.value + 'in';
  renderPage(); checkFit();
});
document.getElementById('ruleCheckbox').addEventListener('change', function() { renderPage(); });
document.getElementById('ruleColor').addEventListener('input', function() { renderPage(); });

// ===== IMPORT / EXPORT =====
function exportJSON() {
  // Sync content from DOM
  document.querySelectorAll('.content[contenteditable]').forEach(el => {
    const id = parseInt(el.dataset.sectionId);
    const sec = sections.find(s => s.id === id);
    if (sec) sec.content = el.innerHTML;
  });

  const data = {
    header: document.getElementById('pageHeader').innerHTML,
    fontSize: document.getElementById('fontSlider').value,
    lineHeight: document.getElementById('lineSlider').value,
    columns: document.getElementById('colSelect').value,
    gap: document.getElementById('gapSlider').value,
    pages: document.getElementById('pagesSelect').value,
    paperSize: document.getElementById('paperSizeSelect').value,
    orientation: document.getElementById('orientationSelect').value,
    margin: document.getElementById('marginSlider').value,
    ruleChecked: document.getElementById('ruleCheckbox').checked,
    ruleColor: document.getElementById('ruleColor').value,
    sections: sections
  };
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
      const data = JSON.parse(e.target.result);
      if (data.header) document.getElementById('pageHeader').innerHTML = data.header;
      if (data.fontSize) { document.getElementById('fontSlider').value = data.fontSize; document.getElementById('fontVal').textContent = data.fontSize+'pt'; }
      if (data.lineHeight) { document.getElementById('lineSlider').value = data.lineHeight; document.getElementById('lineVal').textContent = data.lineHeight; }
      if (data.columns) document.getElementById('colSelect').value = data.columns;
      if (data.gap) { document.getElementById('gapSlider').value = data.gap; document.getElementById('gapVal').textContent = data.gap+'pt'; }
      
      if (data.pages) document.getElementById('pagesSelect').value = data.pages;
      if (data.paperSize) document.getElementById('paperSizeSelect').value = data.paperSize;
      if (data.orientation) document.getElementById('orientationSelect').value = data.orientation;
      if (data.margin) { document.getElementById('marginSlider').value = data.margin; document.getElementById('marginVal').textContent = data.margin+'in'; }
      if (data.ruleChecked !== undefined) document.getElementById('ruleCheckbox').checked = data.ruleChecked;
      if (data.ruleColor) document.getElementById('ruleColor').value = data.ruleColor;

      if (data.sections) {
        sections = data.sections;
        sectionIdCounter = Math.max(...sections.map(s=>s.id)) + 1;
      }
      renderAll();
    } catch(err) { alert('Error loading file: ' + err.message); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// ===== INIT =====
initSections();
