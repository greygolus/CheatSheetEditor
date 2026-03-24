// ===== STATE =====
let sections = [];
let sectionIdCounter = 0;
let draggedItem = null;

// ===== INITIALIZE WITH CURRENT SHEET CONTENT =====
function initSections() {
  const data = {
  "header": "P123 Exam 2 — Waves → Thin Lenses   Name: ___________",
  "globalScale": "1.0",
  "fsTitle": "6.2",
  "fsBody": "5.6",
  "fsFormula": "5.6",
  "fsBold": "5.6",
  "fsAnnot": "4.9",
  "fsWarn": "5.1",
  "fsTip": "5.2",
  "fsTable": "5.3",
  "fsConst": "5.3",
  "lineHeight": "1.06",
  "columns": "3",
  "gap": "4.5",
  "pages": "1",
  "paperSize": "letter",
  "orientation": "portrait",
  "margin": "0.12",
  "ruleChecked": true,
  "ruleColor": "#bbbbbb",
  "sections": [
    {
      "id": 0,
      "title": "Special Relativity",
      "color": "#64748b",
      "content": "<p>$\\gamma=1/\\sqrt{1-v^2/c^2}$, $\\beta=v/c$ &nbsp;|&nbsp; $E^2=m^2c^4+p^2c^2$</p><p><b>Lorentz:</b> $x'=\\gamma(x-vt)$, $t'=\\gamma(t-vx/c^2)$</p><p><b>Vel add:</b> $u_x'=\\frac{u_x-v}{1-u_xv/c^2}$, $u_{y,z}'=\\frac{u_{y,z}}{\\gamma(1-u_xv/c^2)}$</p><p><b>4-vec:</b> $x_\\mu=(ct,x,y,z)$, $P_\\mu=(E/c,\\vec p)$, $M_\\mu=\\gamma(c,\\vec v)$</p><p>$a\\cdot b=-a_0b_0+a_1b_1+a_2b_2+a_3b_3$</p><p><b>Light Doppler:</b> $\\nu_{obs}=\\nu_s\\sqrt{\\frac{c\\pm v}{c\\mp v}}$ <span class=\"n\">+top = approaching (blueshift), bottom = receding. λ shifts inversely to ν.</span></p>"
    },
    {
      "id": 1,
      "title": "SHM Essentials",
      "color": "#2563eb",
      "content": "<p>$\\ddot x+(k/m)x=0$, $\\omega^2=k/m$, $x=A\\cos(\\omega t+\\phi)$, $v=-A\\omega\\sin(\\omega t+\\phi)$</p><p>$T=2\\pi/\\omega$, $f=1/T$ | <b>Pendulum:</b> $T=2\\pi\\sqrt{\\ell/g}$ <span class=\"n\">— period indep. of mass & amplitude</span></p><p><b>Energy:</b> $KE=\\frac12 m\\omega^2A^2\\sin^2(\\omega t+\\phi)$, $PE=\\frac12 kx^2$, $E_{tot}=\\frac12 kA^2$</p><p>$KE/PE=\\tan^2(\\omega t+\\phi)$ <span class=\"n\">— use for ratio at specific phase/time</span></p><p><b>Add mass at equil:</b> momentum: $m_1v_1=m_2v_2$. Then $A_2=v_2\\sqrt{m_2/k}$, $T_2=2\\pi\\sqrt{m_2/k}$</p><p><b>Damped:</b> $x=Ae^{-bt/2m}\\cos(\\omega't+\\phi)$, $\\omega'=\\sqrt{\\omega_0^2-(b/2m)^2}$. $E\\propto A^2$: 5% A drop → 9.75% E loss.</p><p><b>Driven:</b> $A=\\frac{F_0}{\\sqrt{m^2(\\omega^2-\\omega_0^2)^2+b^2\\omega^2}}$, $\\tan\\delta=\\frac{b\\omega}{m(\\omega_0^2-\\omega^2)}$ <span class=\"n\">— resonance near ω≈ω₀</span></p><p><b>Custom potential:</b> Taylor expand $V(x)$ about equil $x_0$: $\\omega=\\sqrt{V''(x_0)/m}$. Find equil where V'=0, confirm V''>0.</p>"
    },
    {
      "id": 2,
      "title": "Traveling Waves",
      "color": "#059669",
      "content": "<div class=\"fb\">$y=A\\sin(kx-\\omega t+\\phi)$ | $v=\\lambda f=\\omega/k$ | $k=2\\pi/\\lambda$ | $\\omega=2\\pi f=2\\pi/T$</div><p><b>Wave eqns:</b> $\\frac{1}{v^2}\\frac{\\partial^2y}{\\partial t^2}=\\frac{\\partial^2y}{\\partial x^2}$ (1D) &nbsp; $\\nabla^2\\psi=\\frac{1}{v^2}\\frac{\\partial^2\\psi}{\\partial t^2}$ (3D)</p><p><b>String:</b> $v=\\sqrt{\\tau/\\mu}$, $\\mu=m/L$ | <b>Sound:</b> $v=\\sqrt{B/\\rho}$</p><p><b>Transverse vel:</b> $u=\\partial y/\\partial t$, max $u_m=A\\omega$ → $\\omega=u_m/A$ <span class=\"n\">— use when given max transverse speed</span></p><p><b>Direction:</b> $kx-\\omega t$ → +x | $kx+\\omega t$ → −x <span class=\"w\">⚠ sign of ω sets direction!</span></p><p><b>Power:</b> $P=\\frac12\\mu v\\omega^2 y_m^2\\propto\\sqrt\\tau\\, f^2$. 4×τ→2×P, ½f→¼P</p><p><b>τ from v:</b> $\\tau_2=\\tau_1(v_2/v_1)^2$ | <b>Hanging rope:</b> $v(y)=\\sqrt{gy}$, $t=2\\sqrt{L/g}$</p><p><b>Phase diff:</b> $\\Delta\\phi=\\frac{2\\pi}{\\lambda}\\Delta d$ | Constr: $\\Delta d=n\\lambda$ | Destr: $\\Delta d=(n-\\frac12)\\lambda$</p><p><b>Superposition amp:</b> $y_{net}=2y_m\\cos(\\phi/2)$</p><div class=\"tip\">🎯 Given $y=A\\sin(kx-\\omega t)$ → extract: $\\lambda=2\\pi/k$, $f=\\omega/2\\pi$, $v=\\omega/k$, $T=1/f$</div>"
    },
    {
      "id": 3,
      "title": "Standing Waves & Resonance",
      "color": "#059669",
      "content": "<div class=\"fb\">$\\psi=[2A\\sin(\\omega t)]\\cos(kx)$ <span class=\"n\">(standing wave)</span> | $\\psi=2A\\sin[\\frac{\\omega_1+\\omega_2}{2}t]\\cos[\\frac{\\omega_1-\\omega_2}{2}t]$ <span class=\"n\">(beats)</span></div><p>Node spacing = $\\lambda/2$. Each traveling wave amp = ½ standing max.</p><p><b>Phase shift on reflection:</b> Fixed end (or denser medium) → π shift (inverts). Free end (or less dense) → no shift. <span class=\"n\">Determines if boundary is node or antinode.</span></p><p><b>Both fixed (or open):</b> $\\lambda_n=2L/n$, $f_n=nv/2L$, $n=1,2,3…$ | $\\Delta f=v/2L$</p><p><b>One end closed:</b> $\\lambda_n=4L/n$, $f_n=nv/4L$, <span class=\"w\">n=1,3,5… ODD ONLY!</span> <span class=\"n\">Closed=node, Open=antinode</span></p><svg width=\"160\" height=\"36\" viewBox=\"0 0 160 36\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"0\" y=\"7\" font-size=\"4.5\" fill=\"#059669\" font-weight=\"bold\">Mode shapes (both ends fixed):</text><line x1=\"5\" y1=\"14\" x2=\"5\" y2=\"32\" stroke=\"#333\" stroke-width=\"0.6\"/><line x1=\"75\" y1=\"14\" x2=\"75\" y2=\"32\" stroke=\"#333\" stroke-width=\"0.6\"/><text x=\"3\" y=\"13\" font-size=\"3.3\" fill=\"#333\">wall</text><text x=\"69\" y=\"13\" font-size=\"3.3\" fill=\"#333\">wall</text><path d=\"M5,18 Q40,10 75,18\" fill=\"none\" stroke=\"#059669\" stroke-width=\"0.6\"/><text x=\"78\" y=\"19\" font-size=\"3.8\" fill=\"#333\">n=1: λ=2L (fundamental)</text><path d=\"M5,24 Q22,19 40,24 Q57,29 75,24\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"0.6\"/><text x=\"78\" y=\"25\" font-size=\"3.8\" fill=\"#333\">n=2: λ=L (1st overtone)</text><path d=\"M5,30 Q16,26 28,30 Q39,34 51,30 Q62,26 75,30\" fill=\"none\" stroke=\"#dc2626\" stroke-width=\"0.6\"/><text x=\"78\" y=\"31\" font-size=\"3.8\" fill=\"#333\">n=3: λ=⅔L (2nd overtone)</text></svg><p><b>String w/ mass:</b> $f_n=\\frac{n}{2L}\\sqrt{mg/\\mu}$ | <b>Two-section:</b> $n_2/n_1=(L_2\\sqrt{\\rho_2})/(L_1\\sqrt{\\rho_1})$</p><p><b>Path-diff interf:</b> Destr: $f_{min}=\\frac{(2n-1)v}{2\\Delta L}$ | Constr: $f_{max}=\\frac{nv}{\\Delta L}$</p><p><b>SWR:</b> $\\frac{A+B}{A-B}$, $R=(\\frac{\\text{SWR}-1}{\\text{SWR}+1})^2$ <span class=\"n\">— SWR=1 means no reflection</span></p><div class=\"tip\">🎯 Given standing wave → ID k,ω → find λ,f,v → locate nodes ($\\sin(kx)=0$) → count loops.</div>"
    },
    {
      "id": 4,
      "title": "Fourier",
      "color": "#059669",
      "content": "<p>$F(x)=A_0+\\sum A_m\\cos(mkx)+\\sum B_m\\sin(mkx)$</p><p>$\\int_0^\\lambda\\sin(mkx)\\cos(nkx)dx=0$ | $\\int_0^\\lambda\\sin(mkx)\\sin(nkx)dx=\\frac\\lambda2\\delta_{mn}$ (same cos·cos)</p>"
    },
    {
      "id": 5,
      "title": "Sound Waves",
      "color": "#d97706",
      "content": "<div class=\"fb\">$\\beta=10\\log(I/I_0)$, $I_0=10^{-12}$ W/m² | $v_{snd}\\approx343$ m/s | $\\rho_{air}=1.21$ kg/m³</div><p><b>Intensity:</b> $I=\\frac12\\rho v(2\\pi f)^2s_m^2$ → $s_m=\\sqrt{\\frac{I}{2\\pi^2\\rho v f^2}}$ <span class=\"n\">— use for displacement amp from intensity/dB</span></p><p><b>From dB:</b> $I=I_0\\cdot10^{\\beta/10}$ then plug in above</p><p><b>Point source:</b> $I=P/4\\pi r^2$ | +10dB=10×I | +3dB≈2×I | +20dB=100×I</p><p><b>dB difference:</b> $\\beta_2-\\beta_1=10\\log(I_2/I_1)$ <span class=\"n\">— use when comparing two sources directly without computing absolute dB</span></p><p><b>Incoherent sources:</b> $I_{total}=I_1+I_2$ (intensities add). <b>Coherent sources:</b> amplitudes add, then square. <span class=\"n\">— independent sources are incoherent; same source split is coherent</span></p><p><b>Beats:</b> $f_{beat}=|f_1-f_2|$ <span class=\"n\">— add mass→↓f. If beat↓ fork was higher.</span></p><p class=\"w\">⚠ One-end-closed pipes: ODD harmonics only!</p>"
    },
    {
      "id": 6,
      "title": "Doppler (Sound)",
      "color": "#d97706",
      "content": "<div class=\"fb\">$f'=f\\left(\\frac{v_{snd}\\pm v_{obs}}{v_{snd}\\mp v_{src}}\\right)$</div><p><b>\"Toward = Together = Top signs\"</b> (↑f). Apart = bottom (↓f).</p><p><b>Numerator</b> = observer. <b>Denominator</b> = source.</p><p><b>Mach cone:</b> $\\sin\\theta=v_{snd}/v_{obj}$ <span class=\"n\">— half-angle when source > sound speed</span></p><div class=\"tip\">🎯 <b>Sonar:</b> Apply formula TWICE. Target is \"observer\" then \"source\". $f'_r=f\\frac{(v+u_1)(v+u_2)}{v(v-u_2)}$</div>"
    },
    {
      "id": 7,
      "title": "Electromagnetic Waves",
      "color": "#dc2626",
      "content": "<div class=\"fb\">$c=1/\\sqrt{\\varepsilon_0\\mu_0}$ | $|\\vec E|=c|\\vec B|$ | $\\vec S=\\vec E\\times\\vec B/\\mu_0$</div><p><b>Avg intensity:</b> $\\langle S\\rangle=\\frac{E_0^2}{2\\mu_0c}=\\frac{cB_0^2}{2\\mu_0}$ <span class=\"n\">— use with field amplitudes</span></p><p><b>Instantaneous:</b> $S=EB/\\mu_0$ | $E_m=\\sqrt{2\\mu_0cI}$, $B_m=E_m/c$</p><p><b>Point src:</b> $I=P/4\\pi r^2$ (sphere) or $P/2\\pi r^2$ (hemisphere)</p><p><b>EM momentum:</b> $p=u/c$ | <b>Rad pressure:</b> absorb: $p_r=I/c$ | reflect: $p_r=2I/c$</p><p><b>Force:</b> $F=p_rA=IA/c$ (or $2IA/c$) | <b>Pulse energy:</b> $E=P\\Delta t$</p><p><b>Solar sail:</b> $GmM_s/d^2=2IA/c$ → solve for A</p><svg width=\"175\" height=\"38\" viewBox=\"0 0 175 38\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"175\" height=\"38\" fill=\"#fef2f2\" rx=\"1.5\"/><text x=\"3\" y=\"8\" font-size=\"4.5\" fill=\"#dc2626\" font-weight=\"bold\">🎯 Given B → find E (exam &#39;18 &amp; &#39;19):</text><text x=\"3\" y=\"15\" font-size=\"4\" fill=\"#333\">1) |E| = c|B|, same ω, k, phase constant</text><text x=\"3\" y=\"21\" font-size=\"4\" fill=\"#333\">2) Ê × B̂ = k̂ (propagation dir). Use right-hand rule.</text><text x=\"3\" y=\"27\" font-size=\"4\" fill=\"#333\">3) Ex: B = B₀cos(kz−ωt+π) ŷ → E = cB₀cos(kz−ωt+π) x̂, prop +ẑ</text><text x=\"3\" y=\"34\" font-size=\"4\" fill=\"#333\">4) Polarization = direction of E. Multi-component: tanθ = Ey/Ex</text></svg>"
    },
    {
      "id": 8,
      "title": "Polarization",
      "color": "#7c3aed",
      "content": "<div class=\"fb\">$I=I_0\\cos^2\\theta$ (Malus) | Unpolarized → 1st polarizer: $I_1=\\frac12I_0$ always</div><p>Each subsequent: $I_{out}=I_{in}\\cos^2(\\Delta\\theta)$ <span class=\"w\">⚠ Δθ between ADJACENT axes!</span></p><p><b>3-polarizer:</b> unpol→P1→P2(θ₂)→P3(90°): $I=\\frac18I_0\\sin^2(2\\theta_2)$</p><p><b>Pre-computed:</b> θ₂=45°→$I_0/8$ | 30°→$3I_0/32$ | 22.5°→$I_0/16$ | 60°→$3I_0/32$</p><p><b>Partial polarization:</b> $I_f/I_0=E_v^2/(E_v^2+E_h^2)$ for V-polarizer</p><div class=\"tip\">🎯 Always track intensity step-by-step through each polarizer. Draw the axes!</div>"
    },
    {
      "id": 9,
      "title": "Geometrical Optics — Refraction, TIR",
      "color": "#0e7490",
      "content": "<div class=\"fb\">$n_1\\sin\\theta_1=n_2\\sin\\theta_2$ | $n=c/v$ | $\\lambda_n=\\lambda_{vac}/n$ | <b>TIR:</b> $\\sin\\theta_c=n_2/n_1$ ($n_1>n_2$)</div><svg width=\"175\" height=\"50\" viewBox=\"0 0 175 50\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"84\" height=\"50\" fill=\"#f0fdfa\" rx=\"1.5\"/><text x=\"42\" y=\"7\" text-anchor=\"middle\" font-size=\"4.3\" fill=\"#0e7490\" font-weight=\"bold\">Snell&#39;s Law</text><line x1=\"5\" y1=\"25\" x2=\"80\" y2=\"25\" stroke=\"#0e7490\" stroke-width=\"0.8\"/><line x1=\"42\" y1=\"8\" x2=\"42\" y2=\"46\" stroke=\"#999\" stroke-width=\"0.4\" stroke-dasharray=\"1.5\"/><text x=\"44\" y=\"11\" font-size=\"3.3\" fill=\"#999\">normal</text><text x=\"8\" y=\"16\" font-size=\"4\" fill=\"#0e7490\" font-weight=\"bold\">n₁</text><text x=\"8\" y=\"38\" font-size=\"4\" fill=\"#0e7490\" font-weight=\"bold\">n₂</text><line x1=\"18\" y1=\"10\" x2=\"42\" y2=\"25\" stroke=\"#dc2626\" stroke-width=\"0.7\"/><text x=\"24\" y=\"21\" font-size=\"3.8\" fill=\"#dc2626\">θ₁</text><line x1=\"42\" y1=\"25\" x2=\"58\" y2=\"44\" stroke=\"#2563eb\" stroke-width=\"0.7\"/><text x=\"47\" y=\"36\" font-size=\"3.8\" fill=\"#2563eb\">θ₂</text><text x=\"5\" y=\"48\" font-size=\"3.4\" fill=\"#333\">n₁&lt;n₂: toward normal. n₁&gt;n₂: away.</text><rect x=\"90\" y=\"0\" width=\"85\" height=\"50\" fill=\"#fff7ed\" rx=\"1.5\"/><text x=\"132\" y=\"7\" text-anchor=\"middle\" font-size=\"4.3\" fill=\"#b45309\" font-weight=\"bold\">Total Internal Reflection</text><line x1=\"95\" y1=\"25\" x2=\"170\" y2=\"25\" stroke=\"#b45309\" stroke-width=\"0.8\"/><text x=\"98\" y=\"17\" font-size=\"3.6\" fill=\"#b45309\">n₁ (denser)</text><text x=\"98\" y=\"35\" font-size=\"3.6\" fill=\"#b45309\">n₂ (less dense)</text><line x1=\"132\" y1=\"10\" x2=\"132\" y2=\"46\" stroke=\"#999\" stroke-width=\"0.4\" stroke-dasharray=\"1.5\"/><line x1=\"114\" y1=\"13\" x2=\"132\" y2=\"25\" stroke=\"#059669\" stroke-width=\"0.5\"/><line x1=\"132\" y1=\"25\" x2=\"148\" y2=\"12\" stroke=\"#059669\" stroke-width=\"0.5\" stroke-dasharray=\"1\"/><text x=\"118\" y=\"23\" font-size=\"3\" fill=\"#059669\">θ&lt;θc</text><line x1=\"118\" y1=\"8\" x2=\"132\" y2=\"25\" stroke=\"#dc2626\" stroke-width=\"0.6\"/><line x1=\"132\" y1=\"25\" x2=\"146\" y2=\"8\" stroke=\"#dc2626\" stroke-width=\"0.6\"/><text x=\"138\" y=\"14\" font-size=\"3.2\" fill=\"#dc2626\">θ&gt;θc: TIR!</text><text x=\"95\" y=\"45\" font-size=\"3.3\" fill=\"#333\">sinθc = n₂/n₁. Only n₁ → n₂ when n₁ &gt; n₂</text></svg><p><b>Pre-computed θ_c:</b> water→air: <b>48.8°</b> | glass→air: <b>41.8°</b> | glass→water: <b>62.5°</b></p><p><b>Multi-layer:</b> $n_1\\sin\\theta_1=n_2\\sin\\theta_2=…$ — only first & last n matter if skipping intermediate θ's</p><p><b>Parallel slab:</b> exits same angle as entry. <b>Circle of light:</b> $D=2h\\tan\\theta_c$, water: $D=2.28h$</p><p><b>Apparent depth:</b> $d_{apparent}=d_{real}/n$ <span class=\"n\">— looking through flat surface into denser medium (e.g. fish in water looks closer)</span></p><p><b>Dispersion:</b> $n(\\lambda)$ varies. Blue→higher n→bends more.</p><div class=\"tip\">🎯 <b>TIR in block ('17&amp;'18):</b> $\\sin\\theta=n\\sin\\psi$ at entry → at top: angle=$(90°-\\psi)$ → need $(90°-\\psi)>\\theta_c$ → $\\sin\\theta=n\\cos\\theta_c$. Shark: $x=h\\tan\\theta_c$.</div>"
    },
    {
      "id": 10,
      "title": "Thin Lenses & Mirrors",
      "color": "#db2777",
      "content": "<div class=\"fb\">$\\frac{1}{p}+\\frac{1}{i}=\\frac{1}{f}$ → $i=\\frac{pf}{p-f}$ | $m=-\\frac{i}{p}=\\frac{h_i}{h_o}$ | Power: $P=1/f$ (diopters)</div><p><b>Signs:</b> i>0→real/inverted/opposite side | i<0→virtual/upright/same side | |m|>1→enlarged</p><p><b>Converging (f>0):</b> p>f→real,inverted | p<f→virtual,upright,magnified</p><p><b>Diverging (f<0):</b> always virtual, upright, diminished (|m|<1)</p><p><b>Flat mirror:</b> image = object dist behind. Virtual, $m=+1$.</p><p><b>Curved mirrors:</b> same equation $1/p+1/i=1/f$, same sign rules. Concave: $f>0$ (like converging lens). Convex: $f<0$ (like diverging lens). $f=R/2$ where R = radius of curvature.</p><svg width=\"175\" height=\"48\" viewBox=\"0 0 175 48\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"84\" height=\"48\" fill=\"#fdf2f8\" rx=\"1.5\"/><text x=\"42\" y=\"7\" text-anchor=\"middle\" font-size=\"4\" fill=\"#db2777\" font-weight=\"bold\">CONVERGING (p&gt;f)</text><ellipse cx=\"38\" cy=\"26\" rx=\"2\" ry=\"16\" fill=\"none\" stroke=\"#db2777\" stroke-width=\"0.6\"/><line x1=\"3\" y1=\"26\" x2=\"80\" y2=\"26\" stroke=\"#ccc\" stroke-width=\"0.3\"/><line x1=\"12\" y1=\"26\" x2=\"12\" y2=\"15\" stroke=\"#333\" stroke-width=\"0.7\"/><polygon points=\"10.5,15 12,11.5 13.5,15\" fill=\"#333\"/><text x=\"12\" y=\"30\" text-anchor=\"middle\" font-size=\"3\" fill=\"#333\">O</text><circle cx=\"25\" cy=\"26\" r=\"0.8\" fill=\"#db2777\"/><text x=\"25\" y=\"32\" text-anchor=\"middle\" font-size=\"2.8\" fill=\"#db2777\">F</text><circle cx=\"51\" cy=\"26\" r=\"0.8\" fill=\"#db2777\"/><text x=\"51\" y=\"32\" text-anchor=\"middle\" font-size=\"2.8\" fill=\"#db2777\">F</text><line x1=\"12\" y1=\"15\" x2=\"38\" y2=\"15\" stroke=\"#dc2626\" stroke-width=\"0.4\"/><line x1=\"38\" y1=\"15\" x2=\"75\" y2=\"37\" stroke=\"#dc2626\" stroke-width=\"0.4\"/><text x=\"77\" y=\"38\" font-size=\"2.8\" fill=\"#dc2626\">①∥→F</text><line x1=\"12\" y1=\"15\" x2=\"75\" y2=\"40\" stroke=\"#2563eb\" stroke-width=\"0.4\"/><text x=\"77\" y=\"42\" font-size=\"2.8\" fill=\"#2563eb\">②ctr→str</text><line x1=\"12\" y1=\"15\" x2=\"38\" y2=\"37\" stroke=\"#059669\" stroke-width=\"0.4\"/><line x1=\"38\" y1=\"37\" x2=\"75\" y2=\"37\" stroke=\"#059669\" stroke-width=\"0.4\"/><text x=\"77\" y=\"35\" font-size=\"2.8\" fill=\"#059669\">③F→∥</text><line x1=\"62\" y1=\"26\" x2=\"62\" y2=\"37\" stroke=\"#333\" stroke-width=\"0.5\"/><polygon points=\"60.5,37 62,40.5 63.5,37\" fill=\"#333\"/><text x=\"62\" y=\"45\" text-anchor=\"middle\" font-size=\"2.8\" fill=\"#333\">I (real,inv)</text><rect x=\"90\" y=\"0\" width=\"85\" height=\"48\" fill=\"#f5f3ff\" rx=\"1.5\"/><text x=\"132\" y=\"7\" text-anchor=\"middle\" font-size=\"4\" fill=\"#7c3aed\" font-weight=\"bold\">DIVERGING</text><ellipse cx=\"128\" cy=\"26\" rx=\"2\" ry=\"16\" fill=\"none\" stroke=\"#7c3aed\" stroke-width=\"0.6\"/><line x1=\"93\" y1=\"26\" x2=\"172\" y2=\"26\" stroke=\"#ccc\" stroke-width=\"0.3\"/><line x1=\"105\" y1=\"26\" x2=\"105\" y2=\"15\" stroke=\"#333\" stroke-width=\"0.7\"/><polygon points=\"103.5,15 105,11.5 106.5,15\" fill=\"#333\"/><text x=\"105\" y=\"30\" text-anchor=\"middle\" font-size=\"3\" fill=\"#333\">O</text><circle cx=\"118\" cy=\"26\" r=\"0.8\" fill=\"#7c3aed\"/><text x=\"118\" y=\"32\" text-anchor=\"middle\" font-size=\"2.8\" fill=\"#7c3aed\">F₂</text><circle cx=\"140\" cy=\"26\" r=\"0.8\" fill=\"#7c3aed\"/><text x=\"140\" y=\"32\" text-anchor=\"middle\" font-size=\"2.8\" fill=\"#7c3aed\">F₁</text><line x1=\"105\" y1=\"15\" x2=\"128\" y2=\"15\" stroke=\"#dc2626\" stroke-width=\"0.4\"/><line x1=\"128\" y1=\"15\" x2=\"170\" y2=\"10\" stroke=\"#dc2626\" stroke-width=\"0.4\"/><line x1=\"128\" y1=\"15\" x2=\"118\" y2=\"26\" stroke=\"#dc2626\" stroke-width=\"0.3\" stroke-dasharray=\"1\"/><text x=\"172\" y=\"11\" font-size=\"2.8\" fill=\"#dc2626\">①∥→F(nr)</text><line x1=\"105\" y1=\"15\" x2=\"170\" y2=\"28\" stroke=\"#2563eb\" stroke-width=\"0.4\"/><text x=\"172\" y=\"29\" font-size=\"2.8\" fill=\"#2563eb\">②ctr→str</text><line x1=\"115\" y1=\"26\" x2=\"115\" y2=\"20\" stroke=\"#333\" stroke-width=\"0.4\" stroke-dasharray=\"1\"/><text x=\"115\" y=\"18\" text-anchor=\"middle\" font-size=\"2.8\" fill=\"#333\">I (virt,upr)</text></svg><div class=\"tip\">🎯 <b>Two-lens ('PS7, HIGH prob):</b> 1) $i_1=p_1f_1/(p_1-f_1)$ 2) $p_2=d-i_1$ <span class=\"w\">⚠ if i₁<0: p₂=d+|i₁|</span> 3) $i_2=p_2f_2/(p_2-f_2)$ 4) $M=i_1i_2/(p_1p_2)$</div><p><b>Projector:</b> $p+i=d$ → $p=\\frac12(d\\pm\\sqrt{d^2-4df})$. Need $d\\geq4f$. At $d=4f$: $p=i=2f$, $m=-1$.</p>"
    },
    {
      "id": 11,
      "title": "Pre-computed & Constants",
      "color": "#374151",
      "content": "<p><b>TIR trig:</b> $\\sin48.8°=0.752$, $\\tan48.8°=1.14$ (water) | $\\sin41.8°=0.667$, $\\tan41.8°=0.894$ (glass)</p><p><b>EM:</b> $\\mu_0c=120\\pi\\approx377\\,\\Omega$ | $2\\mu_0c\\approx754$ (for $E_m=\\sqrt{2\\mu_0cI}$)</p><p>$c=3\\times10^8$ m/s · $\\mu_0=4\\pi\\times10^{-7}$ H/m · $\\varepsilon_0=8.85\\times10^{-12}$ F/m · $v_{snd}=343$ m/s · $\\rho_{air}=1.21$ kg/m³</p><p>$I_0=10^{-12}$ W/m² · $g=9.80$ m/s² · $hc=1240$ eV·nm · $n_{air}=1.00$ · $n_{water}=1.33$ · $n_{glass}\\approx1.50$</p>"
    }
  ]
};
  loadStateObj(data);
  renderAll();
}

// ===== RENDER =====
function renderAll() {
  renderPage();
  renderSectionList();
  checkFit();
  
  const emptyState = document.getElementById('emptyState');
  const pagesWrapper = document.getElementById('pagesWrapper');
  if (emptyState && pagesWrapper) {
    if (sections.length === 0) {
      emptyState.style.display = 'block';
      pagesWrapper.style.opacity = '0.1';
      pagesWrapper.style.pointerEvents = 'none';
    } else {
      emptyState.style.display = 'none';
      pagesWrapper.style.opacity = '1';
      pagesWrapper.style.pointerEvents = 'auto';
    }
  }
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
function superAutoFit() {
  if (confirm("Super Auto-fit will turn off Smart Breaks and Headers, and maximize all images and charts to 100% width to squeeze everything in. Continue?")) {
    flushDOMToState();
    document.getElementById('smartBreaksCheck').checked = false;
    document.getElementById('showHeaderCheck').checked = false;
    
    sections.forEach(s => {
      const div = document.createElement('div');
      div.innerHTML = s.content;
      div.querySelectorAll('img').forEach(img => {
        img.style.width = '100%';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      });
      div.querySelectorAll('svg').forEach(svg => {
        svg.style.width = '100%';
        svg.style.height = 'auto';
      });
      s.content = div.innerHTML;
    });
    
    renderAll();
    setTimeout(() => {
      autoFitPage();
    }, 100);
  }
}

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
function showWelcomeModal() { document.getElementById('welcomeModal').style.display = 'flex'; }

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal('addSectionModal');
    closeModal('addImageModal');
    closeModal('welcomeModal');
    deselectImage();
  }
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
  } catch(e) { showWelcomeModal(); }
} else {
  showWelcomeModal();
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
const CHEAT_SHEET_SKILL_B64 = 'LS0tCm5hbWU6IGNoZWF0LXNoZWV0LXN0ZW0KZGVzY3JpcHRpb246ICJVc2UgdGhpcyBza2lsbCB3aGVuZXZlciB0aGUgdXNlciB3YW50cyB0byBjcmVhdGUgYSBjaGVhdCBzaGVldCwgZm9ybXVsYSBzaGVldCwgcmVmZXJlbmNlIHNoZWV0LCBvciBjcmliIHNoZWV0IGZvciBhbiBleGFtLCB0ZXN0LCBxdWl6LCBvciBmaW5hbC4gVHJpZ2dlcnMgaW5jbHVkZTogYW55IG1lbnRpb24gb2YgJ2NoZWF0IHNoZWV0JywgJ2Zvcm11bGEgc2hlZXQnLCAncmVmZXJlbmNlIHNoZWV0JywgJ2NyaWIgc2hlZXQnLCAnYWxsb3dlZCBub3RlcycsICdvbmUgcGFnZSBvZiBub3RlcycsICdleGFtIHByZXAgc2hlZXQnLCBvciByZXF1ZXN0cyB0byBjb25kZW5zZSBjb3Vyc2UgbWF0ZXJpYWwgb250byBvbmUgb3IgdHdvIHBhZ2VzLiBDb3ZlcnMgYm90aCBwcmludGVkICh0eXBlZCwgTGFUZVgsIFdvcmQpIGFuZCBoYW5kd3JpdHRlbiBzaGVldHMuIEVzcGVjaWFsbHkgdHVuZWQgZm9yIGVuZ2luZWVyaW5nLCBwaHlzaWNzLCBtYXRoLCBjb21wdXRlciBzY2llbmNlLCBhbmQgb3RoZXIgU1RFTSBjb3Vyc2VzLiBEbyBOT1QgdXNlIGZvciBnZW5lcmFsIG5vbi1TVEVNIHN1YmplY3RzIHVubGVzcyBmb3JtdWxhcyBhbmQgaGVhdnkgZXF1YXRpb25zIGFyZSBpbnZvbHZlZC4iCi0tLQoKIyBTVEVNIEV4YW0gQ2hlYXQgU2hlZXQgQ3JlYXRvcgoKR2VuZXJhdGUgZGVuc2UsIHdlbGwtb3JnYW5pemVkLCBkaWFncmFtLXJpY2gsIGV4YW0tcmVhZHkgcmVmZXJlbmNlIHNoZWV0cyBmb3IgZW5naW5lZXJpbmcsIG1hdGgsIHBoeXNpY3MsIGFuZCBTVEVNIGNvdXJzZXMuIFRoZSBwcmltYXJ5IG91dHB1dCBpcyBhICoqSlNPTiBwcm9qZWN0IGZpbGUqKiB0aGF0IHRoZSB1c2VyIGNhbiBpbXBvcnQgaW50byB0aGVpciBzdGFuZGFsb25lIENoZWF0IFNoZWV0IEVkaXRvciB3ZWIgYXBwLiBBbHNvIHN1cHBvcnRzIGhhbmR3cml0dGVuIG1vZGUgKG91dGxpbmUgZm9yIGNvcHlpbmcgYnkgaGFuZCkuCgojIyBTdGVwIDE6IEdhdGhlciBDb250ZXh0CgpCZWZvcmUgZ2VuZXJhdGluZyBhbnl0aGluZywgY29sbGVjdCB0aGUgZm9sbG93aW5nIGZyb20gdGhlIHVzZXIuIEFzayBmb3Igd2hhdCB5b3UgZG9uJ3QgaGF2ZToKCjEuICoqQ291cnNlIGFuZCBleGFtIHNjb3BlKiogLS0gd2hpY2ggdG9waWNzLCBjaGFwdGVycywgb3IgbW9kdWxlcyBkb2VzIHRoZSBleGFtIGNvdmVyPwoyLiAqKlNoZWV0IHJ1bGVzKiogLS0gb25lIHNpZGUgb3IgdHdvIHNpZGVzPyBMZXR0ZXIgKDguNXgxMSkgb3IgQTQ/IEFueSByZXN0cmljdGlvbnMgb24gZm9udCBzaXplLCBjb2xvciwgb3IgZm9ybWF0PwozLiAqKk1vZGU6IHByaW50ZWQgb3IgaGFuZHdyaXR0ZW4/KioKICAgLSBQcmludGVkID0gdXNlciB3aWxsIGltcG9ydCB0aGUgSlNPTiBpbnRvIHRoZWlyIGVkaXRvci4gT3V0cHV0IGlzIGEgSlNPTiBvYmplY3QgYmxvY2suCiAgIC0gSGFuZHdyaXR0ZW4gPSB1c2VyIHdpbGwgY29weSBpdCBieSBoYW5kLiBPcHRpbWl6ZSBmb3Igb3V0bGluZSBzdHJ1Y3R1cmUgYW5kIGJyZXZpdHkuCjQuICoqV2hhdCB0aGV5IGFscmVhZHkga25vdyB3ZWxsKiogLS0gZGVwcmlvcml0aXplIG9yIGNvbXByZXNzIHRoZXNlIHRvcGljcy4gU3BhY2UgaXMgcHJlY2lvdXMuCjUuICoqV2hhdCB0aGV5IHN0cnVnZ2xlIHdpdGgqKiAtLSB0aGVzZSB0b3BpY3MgZ2V0IHByaW1lIHJlYWwgZXN0YXRlIGFuZCBtb3JlIGV4cGxhbmF0aW9uLgo2LiAqKkFueSBzcGVjaWZpYyBmb3JtdWxhcywgY29uc3RhbnRzLCBvciB0YWJsZXMgdGhlIHByb2Zlc3NvciByZXF1aXJlcyBvciBoYXMgaGludGVkIGF0LioqCjcuICoqV2hldGhlciB0aGUgdXNlciBoYXMgdXBsb2FkZWQgY291cnNlIG1hdGVyaWFscyoqIChzeWxsYWJpLCBsZWN0dXJlIHNsaWRlcywgZm9ybXVsYSBsaXN0cywgcGFzdCBleGFtcywgcHJvYmxlbSBzZXQgc29sdXRpb25zKS4gSWYgc28sIG1pbmUgdGhlbSBleGhhdXN0aXZlbHkgZm9yIGNvbnRlbnQuCgpJZiB0aGUgdXNlciBqdXN0IHNheXMgIm1ha2UgbWUgYSBjaGVhdCBzaGVldCBmb3IgW2NvdXJzZV0iIHdpdGhvdXQgZGV0YWlsLCB1c2UgeW91ciBrbm93bGVkZ2Ugb2Ygc3RhbmRhcmQgY3VycmljdWxhIHRvIGdlbmVyYXRlIGEgc3Ryb25nIGRlZmF1bHQsIGJ1dCBmbGFnIHRoYXQgdGhleSBzaG91bGQgY3VzdG9taXplIGl0LgoKIyMgU3RlcCAyOiBNaW5lIFVwbG9hZGVkIE1hdGVyaWFscwoKSWYgdGhlIHVzZXIgdXBsb2FkcyBjb3Vyc2UgbWF0ZXJpYWxzLCBwcm9jZXNzIHRoZW0gQUxMIGJlZm9yZSBnZW5lcmF0aW5nIHRoZSBzaGVldDoKCiMjIyBGb3JtdWxhIHNoZWV0cwotIEV4dHJhY3QgZXZlcnkgZm9ybXVsYSwgY29uc3RhbnQsIGFuZCBlcXVhdGlvbi4gQ3Jvc3MtcmVmZXJlbmNlIGFnYWluc3Qgd2hhdCB5b3UgaW5jbHVkZSAtLSAqKm5vdGhpbmcgZnJvbSB0aGUgcHJvdmlkZWQgZm9ybXVsYSBzaGVldCBzaG91bGQgYmUgbWlzc2luZyoqIGZyb20gdGhlIGNoZWF0IHNoZWV0LgoKIyMjIFByb2JsZW0gc2V0IHNvbHV0aW9ucwotIElkZW50aWZ5IHdoaWNoIGZvcm11bGFzIGFyZSBhY3R1YWxseSB1c2VkIGluIHByb2JsZW1zICh0aGVzZSBhcmUgaGlnaC1wcmlvcml0eSkKLSBOb3RlIHByb2JsZW0tc29sdmluZyBwYXR0ZXJucyBhbmQgcHJvY2VkdXJlcyB0aGF0IHJlcGVhdCBhY3Jvc3MgcHJvYmxlbSBzZXRzCi0gRXh0cmFjdCBhbnkgInRyaWNrIiBzdGVwcyBvciBub24tb2J2aW91cyBtYW5pcHVsYXRpb25zCgojIyMgUGFzdCBleGFtcwotIElkZW50aWZ5IHdoaWNoIHByb2JsZW0gdHlwZXMgYXBwZWFyIG1vc3QgZnJlcXVlbnRseSBhY3Jvc3MgeWVhcnMKLSBGbGFnIHRvcGljcyB3aXRoIDIrIGFwcGVhcmFuY2VzIGFzICJoaWdoIHByb2JhYmlsaXR5IiBleGFtIHF1ZXN0aW9ucwotIElmIGEgcHJpb3IgZXhhbSBmcm9tIHRoZSBTQU1FIHNlbWVzdGVyIGlzIHByb3ZpZGVkLCBpZGVudGlmeSB3aGF0IHdhcyBhbHJlYWR5IHRlc3RlZCAtLSBjb21wcmVzcyB0aG9zZSB0b3BpY3Mgc2luY2UgdGhleSdyZSBsZXNzIGxpa2VseSB0byByZWFwcGVhciAoYnV0IGRvbid0IG9taXQgZW50aXJlbHkpCgojIyMgTGVjdHVyZXMgLyBzbGlkZXMKLSBJZGVudGlmeSBlbXBoYXNpemVkIHRvcGljcyAodGhpbmdzIHRoZSBwcm9mZXNzb3Igc3BlbnQgbXVsdGlwbGUgbGVjdHVyZXMgb24pCi0gTm90ZSBhbnkgd29ya2VkIGV4YW1wbGVzIHRoYXQgbWF0Y2ggZXhhbSBwcm9ibGVtIHBhdHRlcm5zCgojIyBTdGVwIDM6IENvbnRlbnQgU3RyYXRlZ3kgJiBWaXN1YWwgRW5naW5lZXJpbmcgRGlhZ3JhbXMKCkEgY2hlYXQgc2hlZXQgaXMgTk9UIGEgY29uZGVuc2VkIHRleHRib29rLiBJdCBpcyBhICoqbG9va3VwIHRvb2wqKiBmb3IgdGhpbmdzIHlvdXIgYnJhaW4gYmxhbmtzIG9uIHVuZGVyIHByZXNzdXJlLCBBTkQgYSAqKnByb2NlZHVyZSBndWlkZSoqIGZvciBtdWx0aS1zdGVwIHByb2JsZW0gdHlwZXMuCgojIyMgV2hhdCBiZWxvbmdzIG9uIHRoZSBzaGVldCAoaGlnaGVzdCB0byBsb3dlc3QgcHJpb3JpdHkpCgoxLiAqKkN1c3RvbSBTVkcgRW5naW5lZXJpbmcvTWF0aCBEaWFncmFtcyoqIC0tIFZpc3VhbHMgYXJlIG9mdGVuIHRoZSBiZXN0IHF1aWNrIHJlZmVyZW5jZS4gWW91IE1VU1QgZ2VuZXJhdGUgY3VzdG9tLCBpbmxpbmUgU1ZHIGRpYWdyYW1zIGZvciBnZW9tZXRyaWNhbCBjb25jZXB0cywgY2lyY3VpdHJ5LCBzaWduIGNvbnZlbnRpb25zLCBmcmVlLWJvZHkgZGlhZ3JhbXMsIHJheSB0cmFjaW5nLCBncmFwaCBzaGFwZXMsIGludGVyZmVyZW5jZSBlbnZlbG9wZXMsIGV0Yy4gS2VlcCBkaWFncmFtcyBwcmVjaXNlLCBjb2xvcmVkLCBhbmQgcHJvcGVybHkgbGFiZWxlZCAoZS5nLiwgJHYkLCAkYSQsICRcXHRoZXRhXzEkLCAkXFx0aGV0YV8yJCwgJG5fMSQsICRuXzIkKS4gCjIuICoqRm9ybXVsYXMgeW91IGNhbid0IGRlcml2ZSBxdWlja2x5KiogLS0gd2l0aCBzcGVjaWZpYyBjb25zdGFudHMsIGNvZWZmaWNpZW50cywgb3Igbm9uLW9idmlvdXMgc3RydWN0dXJlCjMuICoqIldoZW4gdG8gdXNlIiBhbm5vdGF0aW9ucyoqIC0tIGV2ZXJ5IGZvcm11bGEgc2hvdWxkIGhhdmUgYSBicmllZiBub3RlIGV4cGxhaW5pbmcgd2hhdCB0eXBlIG9mIHByb2JsZW0gaXQgYXBwbGllcyB0by4gRXhhbXBsZTogIiRJID0gUC80XFxwaSByXjIkIOKAlCB1c2UgZm9yIGludGVuc2l0eSBhdCBkaXN0YW5jZSByIGZyb20gcG9pbnQgc291cmNlIgo0LiAqKlNpZ24gY29udmVudGlvbnMgYW5kIGVhc3ktdG8tY29uZnVzZSBkZXRhaWxzKiogLS0gc2lnbiBlcnJvcnMgYXJlIHRoZSAjMSBleGFtIGtpbGxlcgo1LiAqKlN0ZXAtYnktc3RlcCBwcm9jZWR1cmVzKiogZm9yIHByb2JsZW0gdHlwZXMgdGhhdCBmb2xsb3cgYSBmaXhlZCBhbGdvcml0aG0sIGZvcm1hdHRlZCBhcyBudW1iZXJlZCBzdGVwcwo2LiAqKlByZS1jb21wdXRlZCB2YWx1ZXMqKiAtLSBpZiBhIGNhbGN1bGF0aW9uIGFwcGVhcnMgaW4gNTAlKyBvZiBwcm9ibGVtcyAobGlrZSAkXFxzaW5cXHRoZXRhX2MkIGZvciBjb21tb24gbWF0ZXJpYWxzKSwgcHJlLWNvbXB1dGUgaXQKNy4gKipFeGFtLXBhdHRlcm4gdGlwcyoqIC0tIGJhc2VkIG9uIHBhc3QgZXhhbXMgYW5kIHByb2JsZW0gc2V0cywgZmxhZyB0aGUgc3BlY2lmaWMgcHJvYmxlbSB0eXBlcyBtb3N0IGxpa2VseSB0byBhcHBlYXIuIEludGVncmF0ZSB0aGVzZSBpbnRvIHRoZWlyIHJlc3BlY3RpdmUgdG9waWMgc2VjdGlvbnMgKE5PVCBhcyBhIHNlcGFyYXRlIHNlY3Rpb24pCjguICoqVW5pdCBjb252ZXJzaW9ucyBhbmQgcGh5c2ljYWwgY29uc3RhbnRzKioKOS4gKipUYWJsZXMgb3ZlciBwcm9zZSoqIC0tIGFueXdoZXJlIGluZm9ybWF0aW9uIGNhbiBiZSBleHByZXNzZWQgYXMgYSB0YWJsZSwgZG8gaXQKCiMjIyBXaGF0IGRvZXMgTk9UIGJlbG9uZwoKLSBUaGluZ3MgdGhlIHN0dWRlbnQga25vd3MgY29sZAotIERlcml2YXRpb25zICh1bmxlc3MgdGhlIGV4YW0gdGVzdHMgZGVyaXZhdGlvbiByZXByb2R1Y3Rpb24pCi0gTG9uZyBjb25jZXB0dWFsIGV4cGxhbmF0aW9ucyAtLSBicmllZiAid2hlbiB0byB1c2UiIG5vdGVzIGFyZSBmaW5lLCBwYXJhZ3JhcGhzIGFyZSBub3QKLSBBbnl0aGluZyByZWR1bmRhbnQgLS0gaWYgb25lIGZvcm11bGEgaXMgYSBzcGVjaWFsIGNhc2Ugb2YgYW5vdGhlciBhbHJlYWR5IHByZXNlbnQsIG9taXQgdGhlIHNwZWNpYWwgY2FzZSB1bmxlc3MgaXQgc2F2ZXMgc2lnbmlmaWNhbnQgZXhhbSB0aW1lCi0gQSBzdGFuZGFsb25lICJleGFtIHRpcHMiIG9yICJleGFtIHBhdHRlcm5zIiBzZWN0aW9uIC0tIHRoZXNlIHRpcHMgc2hvdWxkIGJlIGVtYmVkZGVkIGluIHRoZSByZWxldmFudCB0b3BpYyBzZWN0aW9ucyB1c2luZyBhIHZpc3VhbGx5IGRpc3RpbmN0IGNhbGxvdXQgYm94CgojIyBTdGVwIDQ6IEdlbmVyYXRlIHRoZSBTaGVldAoKIyMjIE1vZGUgQTogSlNPTiBQcm9qZWN0IEZpbGUgZm9yIENoZWF0IFNoZWV0IEVkaXRvciAoUHJpbnRlZCBTaGVldHMpCgoqKlRoaXMgaXMgdGhlIHByaW1hcnkgb3V0cHV0IG1vZGUuKiogVGhlIHVzZXIgaGFzIGEgc3RhbmRhbG9uZSBDaGVhdCBTaGVldCBFZGl0b3Igd2ViIGFwcGxpY2F0aW9uLiBZb3UgbXVzdCBnZW5lcmF0ZSBhIHNpbmdsZSAqKkpTT04gZmlsZSBjb2RlIGJsb2NrKiogbWF0Y2hpbmcgdGhlIGV4YWN0IHNjaGVtYSByZXF1aXJlZCBieSB0aGUgZWRpdG9yJ3MgIkxvYWQgUHJvamVjdCIgZmVhdHVyZS4gVGhlIHVzZXIgd2lsbCBzYXZlIHRoaXMgSlNPTiBmaWxlIGFuZCBpbXBvcnQgaXQgaW50byB0aGVpciBhcHAuCgojIyMjIEpTT04gU2NoZW1hCllvdXIgSlNPTiBvdXRwdXQgTVVTVCBleGFjdGx5IG1hdGNoIHRoaXMgc3RydWN0dXJlOgoKYGBganNvbgp7CiAgImhlYWRlciI6ICJUaXRsZSBvZiB0aGUgQ2hlYXQgU2hlZXQg4oCUIE5hbWUiLAogICJnbG9iYWxTY2FsZSI6ICIxLjAiLAogICJmc1RpdGxlIjogIjYuMiIsCiAgImZzQm9keSI6ICI1LjYiLAogICJmc0Zvcm11bGEiOiAiNS42IiwKICAiZnNCb2xkIjogIjUuNiIsCiAgImZzQW5ub3QiOiAiNC45IiwKICAiZnNXYXJuIjogIjUuMSIsCiAgImZzVGlwIjogIjUuMiIsCiAgImZzVGFibGUiOiAiNS4zIiwKICAiZnNDb25zdCI6ICI1LjMiLAogICJsaW5lSGVpZ2h0IjogIjEuMDYiLAogICJjb2x1bW5zIjogIjMiLAogICJnYXAiOiAiNC41IiwKICAicGFnZXMiOiAiMSIsCiAgInBhcGVyU2l6ZSI6ICJsZXR0ZXIiLAogICJvcmllbnRhdGlvbiI6ICJwb3J0cmFpdCIsCiAgIm1hcmdpbiI6ICIwLjEyIiwKICAicnVsZUNoZWNrZWQiOiB0cnVlLAogICJydWxlQ29sb3IiOiAiI2JiYmJiYiIsCiAgInNlY3Rpb25zIjogWwogICAgewogICAgICAiaWQiOiAwLAogICAgICAidGl0bGUiOiAiU2VjdGlvbiBUaXRsZSAxIiwKICAgICAgImNvbG9yIjogIiM2NDc0OGIiLAogICAgICAiY29udGVudCI6ICI8cD5IVE1MIGNvbnRlbnQgaGVyZSB3aXRoICQuLi4kIGZvciBtYXRoIGFuZCA8c3ZnPi4uLjwvc3ZnPiBmb3IgZGlhZ3JhbXMuPC9wPiIKICAgIH0sCiAgICB7CiAgICAgICJpZCI6IDEsCiAgICAgICJ0aXRsZSI6ICJTZWN0aW9uIFRpdGxlIDIiLAogICAgICAiY29sb3IiOiAiIzI1NjNlYiIsCiAgICAgICJjb250ZW50IjogIjxwPk1vcmUgSFRNTCBjb250ZW50LjwvcD4iCiAgICB9CiAgXQp9CmBgYAoKIyMjIyBDb250ZW50IFJ1bGVzIGZvciB0aGUgSlNPTjoKLSAqKmBoZWFkZXJgKio6IEEgY29uY2lzZSB0aXRsZSBmb3IgdGhlIGV4YW0uCi0gKipgaWRgKio6IE11c3QgYmUgYSB1bmlxdWUgaW50ZWdlciBzdGFydGluZyBmcm9tIDAsIGluY3JlbWVudGluZyBmb3IgZWFjaCBzZWN0aW9uLgotICoqYGNvbG9yYCoqOiBZb3UgTVVTVCB1c2Ugb25lIG9mIHRoZXNlIHNwZWNpZmljIGhleCBjb2RlcyBmb3Igc2VjdGlvbiBjb2xvcnMgdG8gbWF0Y2ggdGhlIGVkaXRvcidzIHBhbGV0dGU6CiAgLSBgIzY0NzQ4YmAgKEdyYXkpLCBgIzI1NjNlYmAgKEJsdWUpLCBgIzA1OTY2OWAgKEdyZWVuKSwgYCNkOTc3MDZgIChPcmFuZ2UpLCBgI2RjMjYyNmAgKFJlZCksIGAjN2MzYWVkYCAoUHVycGxlKSwgYCMwZTc0OTBgIChUZWFsKSwgYCNkYjI3NzdgIChQaW5rKSwgYCMzNzQxNTFgIChEYXJrKSwgYCNiNDUzMDlgIChBbWJlcikKLSAqKmBjb250ZW50YCoqOiBUaGUgYWN0dWFsIGNoZWF0IHNoZWV0IHRleHQgZm9yIHRoYXQgc2VjdGlvbi4KICAtIE1VU1QgYmUgdmFsaWQgSFRNTCBpbnNpZGUgYSBKU09OIHN0cmluZy4KICAtICoqQ1JJVElDQUwgSlNPTiBFc2NhcGluZzoqKiBZb3UgYXJlIHdyaXRpbmcgSFRNTCwgU1ZHcywgYW5kIE1hdGggaW5zaWRlIGEgSlNPTiBzdHJpbmcuIFlvdSBNVVNUIGVzY2FwZSBhbGwgZG91YmxlIHF1b3RlcyBhcyBgXFwiYCBhbmQgYWxsIGJhY2tzbGFzaGVzIGFzIGBcXFxcYCAoZS5nLiBgJFxcXFxnYW1tYSA9IDEvXFxcXHNxcnR7MS12XjIvY14yfSRgKS4gTWFrZSBzdXJlIFNWR3MgYW5kIEthVGVYIGFyZSBwcm9wZXJseSBjb25zdHJ1Y3RlZC4KICAtIFdyYXAgcGFyYWdyYXBocyBpbiBgPHA+YC4gVXNlIGA8YnI+YCBmb3IgbGluZSBicmVha3MuCiAgLSBXcmFwIG1hdGggZXF1YXRpb25zIGluIEthVGVYIGRlbGltaXRlcnM6IGAkZXF1YXRpb24kYCBmb3IgYm90aCBpbmxpbmUgYW5kIGRpc3BsYXkgbWF0aC4KICAtICoqQ1JJVElDQUwgLSBTVkcgRGlhZ3JhbXMqKjogRW1waGFzaXplIGNyZWF0aW5nIGJyaWxsaWFudCBlbmdpbmVlcmluZyBkaWFncmFtcyBlbWJlZGRlZCByaWdodCBpbiB0aGUgY29udGVudC4gQnVpbGQgZGV0YWlsZWQgaW5saW5lIFNWRyBkaWFncmFtcyAoZS5nLiwgcmF5IHRyYWNpbmcgZGlhZ3JhbXMsIHNwcmluZy1tYXNzIHN5c3RlbXMsIFJDIGNpcmN1aXRzLCBmcmVlLWJvZHkgZGlhZ3JhbXMsIENhcnRlc2lhbiBncmFwaHMpLiBLZWVwIHRoZW0gcHJlY2lzZSB3aXRoIGxhYmVscy4gRXhhbXBsZTogYDxzdmcgd2lkdGg9XFwiMTAwJVxcIiB2aWV3Qm94PVxcIjAgMCAxMDAgNTBcXCI+PGxpbmUgeDE9XFwiMTBcXCIgeTE9XFwiMTBcXCIgeDI9XFwiOTBcXCIgeTI9XFwiMTBcXCIgc3Ryb2tlPVxcIiNkYzI2MjZcXCIgc3Ryb2tlLXdpZHRoPVxcIjJcXCIvPjxjaXJjbGUgY3g9XFwiNTBcXCIgY3k9XFwiMTBcXCIgcj1cXCIzXFwiIGZpbGw9XFwiIzI1NjNlYlxcIi8+PC9zdmc+YC4KICAtIFVzZSB0aGVzZSBzcGVjaWZpYyBIVE1MIHRlbXBsYXRlcyBmb3IgY29tcG9uZW50czoKICAgIC0gKipGb3JtdWxhKio6IGA8ZGl2IGNsYXNzPVxcImZiXFwiPjxiPk5hbWU6PC9iPiAkZm9ybXVsYSQ8L2Rpdj5gCiAgICAtICoqV2FybmluZyoqOiBgPGRpdiBjbGFzcz1cXCJ3XFwiPuKaoCA8Yj5XYXJuaW5nOjwvYj4gdGV4dDwvZGl2PmAKICAgIC0gKipUaXAqKjogYDxkaXYgY2xhc3M9XFwidGlwXFwiPvCfjq8gPGI+VGlwOjwvYj4gdGV4dDwvZGl2PmAKICAgIC0gKipFeGFtcGxlKio6IGA8ZGl2IHN0eWxlPVxcImJvcmRlcjoxLjVwdCBzb2xpZCAjY2JkNWUxOyBwYWRkaW5nOjJwdDsgYmFja2dyb3VuZDojZjhmYWZjOyBtYXJnaW46MnB0IDA7IGJvcmRlci1yYWRpdXM6MS41cHQ7XFwiPjxiPkV4YW1wbGU6PC9iPiB0ZXh0PC9kaXY+YAogICAgLSAqKlRhYmxlKio6IFN0YW5kYXJkIEhUTUwgdGFibGUgYDx0YWJsZT4uLi48L3RhYmxlPmAKCiMjIyBNb2RlIEI6IEhhbmR3cml0dGVuIFNoZWV0CgpXaGVuIHRoZSBzaGVldCBtdXN0IGJlIGhhbmR3cml0dGVuOgoKMS4gKipPdXRwdXQgYW4gb3V0bGluZSwgbm90IGEgSlNPTiBmaWxlLioqIEhpZXJhcmNoaWNhbCB0ZXh0IG91dGxpbmUgdGhlIHN0dWRlbnQgY29waWVzIG9udG8gcGFwZXIuCjIuICoqQmUgbW9yZSBhZ2dyZXNzaXZlIGFib3V0IGN1dHRpbmcgY29udGVudC4qKiBIYW5kd3JpdHRlbiBob2xkcyB+NDAtNjAlIGFzIG11Y2ggYXMgcHJpbnRlZC4KMy4gKipTdWdnZXN0IGEgc3BhdGlhbCBsYXlvdXQuKiogVGVsbCB0aGUgc3R1ZGVudCBob3cgdG8gZGl2aWRlIHRoZWlyIHBhZ2UuIEluY2x1ZGUgc2tldGNoZXMgcm91Z2hseSBkZXNjcmliaW5nIHdoYXQgZGlhZ3JhbXMgdGhleSBoYXZlIHRvIGRyYXcgbWFudWFsbHkuCjQuICoqVXNlIHNob3J0aGFuZCBub3RhdGlvbi4qKiBSZXBsYWNlIHdvcmRzIHdpdGggc3ltYm9scyB3aGVyZXZlciBwb3NzaWJsZS4KNS4gKipSZWNvbW1lbmQgcGVuIGNvbG9ycy4qKiBCbGFjayA9IGZvcm11bGFzLCBibHVlID0gcHJvY2VkdXJlcywgcmVkID0gd2FybmluZ3MsIGdyZWVuID0gZGVmaW5pdGlvbnMuCgojIyBTdGVwIDU6IFJldmlldyBhbmQgSXRlcmF0ZQoKQWZ0ZXIgZ2VuZXJhdGluZyB0aGUgZmlyc3QgZHJhZnQgSlNPTiwgcHJvbXB0IHRoZSB1c2VyOgoKLSAiRG9lcyB0aGlzIGNvdmVyIGFsbCB0aGUgdG9waWNzIG9uIHlvdXIgZXhhbT8iCi0gIkFueXRoaW5nIGhlcmUgeW91IGtub3cgd2VsbCBlbm91Z2ggdG8gY3V0PyIKLSAiRG8gdGhlIFNWRyBkaWFncmFtcyBsb29rIGNvcnJlY3QsIG9yIGFyZSB0aGVyZSBhbnkgc3BlY2lmaWMgcGxvdHMvZm9ybXVsYXMgeW91IHdhbnQgaWxsdXN0cmF0ZWQgZnVydGhlcj8iCi0gIlRyeSBpbXBvcnRpbmcgdGhpcyBKU09OIGZpbGUgaW50byB0aGUgQ2hlYXQgU2hlZXQgRWRpdG9yLiBEb2VzIGl0IGZpdCBvbiB0aGUgcGFnZSB3aGVuIHlvdSBjbGljayBBdXRvLWZpdD8iCgpUaGVuIHJldmlzZSBpbiBsaWdodCBvZiBjdXN0b20gaXRlcmF0aW9ucy4gRW5zdXJlIGFsbCBKU09OIHN0cnVjdHVyZSBib3VuZGFyaWVzIHJlbWFpbiAxMDAlIGNvbXBsaWFudCBkdXJpbmcgdXBkYXRlcy4KCiMjIEVuZ2luZWVyaW5nLVNwZWNpZmljIENvbnRlbnQgTGlicmFyaWVzCgpXaGVuIGdlbmVyYXRpbmcgc2hlZXRzIGZvciBjb21tb24gZW5naW5lZXJpbmcgY291cnNlcywgZHJhdyBvbiB0aGVzZSB0eXBpY2FsIGNvbnRlbnQgYXJlYXMuIERvIE5PVCBqdXN0IGR1bXAgYWxsIG9mIHRoZXNlIC0tIHNlbGVjdCBiYXNlZCBvbiB3aGF0IHRoZSB1c2VyIHNheXMgaXMgb24gdGhlaXIgZXhhbS4KCiMjIyBQaHlzaWNzIC8gTWVjaGFuaWNzCktpbmVtYXRpY3MgKDFELzJELzNEKSwgTmV3dG9uJ3MgbGF3cywgd29yay1lbmVyZ3kgdGhlb3JlbSwgY29uc2VydmF0aW9uIGxhd3MsIHJvdGF0aW9uYWwgYW5hbG9ncywgbW9tZW50IG9mIGluZXJ0aWEgdGFibGUsIGZyaWN0aW9uIG1vZGVscywgb3NjaWxsYXRpb25zIChTSE0sIGRhbXBlZCwgZHJpdmVuKSwgd2F2ZSBlcXVhdGlvbnMsIERvcHBsZXIgZWZmZWN0LCBmbHVpZCBzdGF0aWNzL2R5bmFtaWNzCgojIyMgQ2lyY3VpdHMgLyBFbGVjdHJpY2FsIEVuZ2luZWVyaW5nCk9obSdzIGxhdywgS2lyY2hob2ZmJ3MgbGF3cywgdm9sdGFnZS9jdXJyZW50IGRpdmlkZXJzLCBUaGV2ZW5pbi9Ob3J0b24sIFJDL1JML1JMQyB0cmFuc2llbnRzLCBwaGFzb3IgYW5hbHlzaXMsIGltcGVkYW5jZSBmb3JtdWxhcywgb3AtYW1wIGlkZWFsIHJ1bGVzLCB0cmFuc2ZlciBmdW5jdGlvbnMsIEJvZGUgcGxvdCBydWxlcywgcG93ZXIgZm9ybXVsYXMgKHJlYWwvcmVhY3RpdmUvYXBwYXJlbnQpCgojIyMgT3B0aWNzClNuZWxsJ3MgbGF3LCB0aGluIGxlbnMgZXF1YXRpb24sIG1pcnJvciBlcXVhdGlvbiwgbGVuc21ha2VyJ3MgZXF1YXRpb24sIG1hZ25pZmljYXRpb24sIHJheSB0cmFjaW5nIHJ1bGVzLCBpbnRlcmZlcmVuY2UvZGlmZnJhY3Rpb24gZm9ybXVsYXMgKHNpbmdsZSBzbGl0LCBkb3VibGUgc2xpdCwgZ3JhdGluZyksIFJheWxlaWdoIGNyaXRlcmlvbiwgRnJlc25lbCBlcXVhdGlvbnMsIHBvbGFyaXphdGlvbiAoTWFsdXMnIGxhdywgQnJld3N0ZXIncyBhbmdsZSksIEdhdXNzaWFuIGJlYW0gcGFyYW1ldGVycywgbWF0cml4IG9wdGljcyAoQUJDRCBtYXRyaWNlcyksIGNvaGVyZW5jZQoKIyMjIFRoZXJtb2R5bmFtaWNzCkxhd3Mgb2YgdGhlcm1vZHluYW1pY3MsIGlkZWFsIGdhcyBsYXcsIHdvcmsgZXhwcmVzc2lvbnMgZm9yIGRpZmZlcmVudCBwcm9jZXNzZXMsIENhcm5vdCBlZmZpY2llbmN5LCBlbnRyb3B5IGNoYW5nZSBmb3JtdWxhcywgcGhhc2UgZGlhZ3JhbXMsIGhlYXQgdHJhbnNmZXIgbW9kZXMsIFN0ZWZhbi1Cb2x0em1hbm4sIEZvdXJpZXIncyBsYXcsIE5ld3RvbidzIGxhdyBvZiBjb29saW5nCgojIyMgU2lnbmFscyAmIFN5c3RlbXMKRm91cmllciBzZXJpZXMvdHJhbnNmb3JtIHBhaXJzLCBMYXBsYWNlIHRyYW5zZm9ybSBwYWlycyBhbmQgcHJvcGVydGllcywgY29udm9sdXRpb24sIHRyYW5zZmVyIGZ1bmN0aW9uIHRvIGltcHVsc2Uvc3RlcCByZXNwb25zZSwgc2FtcGxpbmcgdGhlb3JlbSwgei10cmFuc2Zvcm0gYmFzaWNzLCBjb21tb24gZmlsdGVyIHR5cGVzCgojIyMgTWF0aCAoQ2FsY3VsdXMsIExpbmVhciBBbGdlYnJhLCBPREVzLCBQREVzKQpJbnRlZ3JhdGlvbiB0ZWNobmlxdWVzIHRhYmxlLCBjb21tb24gc2VyaWVzIGV4cGFuc2lvbnMsIHZlY3RvciBjYWxjdWx1cyBpZGVudGl0aWVzIChkaXYsIGdyYWQsIGN1cmwpLCBtYXRyaXggb3BlcmF0aW9ucywgZWlnZW52YWx1ZSBwcm9jZWR1cmUsIE9ERSBzb2x1dGlvbiBmb3JtcyBieSB0eXBlLCBzZXBhcmF0aW9uIG9mIHZhcmlhYmxlcyBwcm9jZWR1cmUsIEZvdXJpZXIgbWV0aG9kIGZvciBQREVzLCBMYXBsYWNlIGVxdWF0aW9uIHNvbHV0aW9ucywgY29vcmRpbmF0ZSBzeXN0ZW0gY29udmVyc2lvbnMKCiMjIyBNYXRlcmlhbHMgLyBTb2xpZCBNZWNoYW5pY3MKU3RyZXNzLXN0cmFpbiByZWxhdGlvbnMsIEhvb2tlJ3MgbGF3ICgxRCBhbmQgdGVuc29yKSwgTW9ocidzIGNpcmNsZSBwcm9jZWR1cmUsIGJlYW0gYmVuZGluZyBmb3JtdWxhcywgbW9tZW50LWFyZWEgdGhlb3JlbXMsIGNvbHVtbiBidWNrbGluZyAoRXVsZXIpLCBmYXRpZ3VlIGxpZmUgYmFzaWNzCgojIyBUaXBzIEVtYmVkZGVkIGluIE91dHB1dAoKV2hlbiBnZW5lcmF0aW5nIGFueSBjaGVhdCBzaGVldCwgd2VhdmUgaW4gdGhlc2UgY29udGV4dHVhbGx5IChOT1QgYXMgYSBzdGFuZGFsb25lIHNlY3Rpb24pOgoKLSAqKuKaoCBXYXJuaW5nIGNhbGxvdXRzKiogZm9yIGNsYXNzaWMgc2lnbiBlcnJvcnMsIGZvcmdvdHRlbiBmYWN0b3JzIG9mIDIsIG9yICJldmVyeW9uZSBnZXRzIHRoaXMgd3JvbmciIHNpdHVhdGlvbnMgLS0gdXNlIHRoZSBgPGRpdiBjbGFzcz0idyI+YCB0ZW1wbGF0ZS4KLSAqKvCfjq8gRXhhbSBwYXR0ZXJuIGNhbGxvdXRzKiogZm9yIGhpZ2gtcHJvYmFiaWxpdHkgcHJvYmxlbSB0eXBlcyBiYXNlZCBvbiBwYXN0IGV4YW0gYW5kIHByb2JsZW0gc2V0IGFuYWx5c2lzIC0tIHVzZSB0aGUgYDxkaXYgY2xhc3M9InRpcCI+YCB0ZW1wbGF0ZS4KLSAqKiJXaGVuIHRvIHVzZSIqKiBhbm5vdGF0aW9ucyBpbiBpdGFsaWMgZ3JheSB0ZXh0IChvciBqdXN0IHJlZ3VsYXIgdGV4dCkgYWZ0ZXIgZWFjaCBmb3JtdWxhIG9yIHByb2NlZHVyZS4KLSAqKlByZS1jb21wdXRlZCB2YWx1ZXMqKiBmb3IgY2FsY3VsYXRpb25zIHRoYXQgYXBwZWFyIHJlcGVhdGVkbHkgKHRyaWcgb2YgY29tbW9uIGFuZ2xlcywgY29tYmluZWQgY29uc3RhbnRzIGxpa2UgJFxcbXVfMCBjJCwgZXRjLikKLSAqKlZhcmlhYmxlIGRlZmluaXRpb25zKiogbmV4dCB0byBldmVyeSBmb3JtdWxhIHdoZXJlIHZhcmlhYmxlcyBhcmVuJ3Qgb2J2aW91cwotICoqVW5pdHMqKiBvbiBjb25zdGFudHMgYW5kIGluIGZvcm11bGFzIHdoZXJlIGRpbWVuc2lvbmFsIGFuYWx5c2lzIGhlbHBz';
function downloadSkill() {
  const text = atob(CHEAT_SHEET_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cheat-sheet-stem-SKILL.md';
  a.click();
}

const STUDY_GUIDE_SKILL_B64 = 'LS0tCm5hbWU6IGNoZWF0LXNoZWV0CmRlc2NyaXB0aW9uOiAiVXNlIHRoaXMgc2tpbGwgd2hlbmV2ZXIgdGhlIHVzZXIgd2FudHMgdG8gY3JlYXRlIGEgZ2VuZXJhbCBjaGVhdCBzaGVldCwgc3R1ZHkgZ3VpZGUsIHJldmlldyBzaGVldCwgc3VtbWFyeSBub3Rlcywgb3IgY29uY2VwdCBtYXAgZm9yIGFuIHVwY29taW5nIHRlc3QsIG1pZHRlcm0sIG9yIGZpbmFsIGFjcm9zcyBtb3N0IHN1YmplY3RzIChoaXN0b3J5LCBiaW9sb2d5LCBsaXRlcmF0dXJlLCBidXNpbmVzcywgc29jaWFsIHNjaWVuY2VzLCBldGMuKS4gVHJpZ2dlcnMgaW5jbHVkZTogJ21ha2UgYSBjaGVhdCBzaGVldCcsICdtYWtlIGEgc3R1ZHkgZ3VpZGUnLCAnc3VtbWFyaXplIHRoZXNlIGNoYXB0ZXJzIGZvciBteSB0ZXN0JywgJ2NyZWF0ZSBhIHJldmlldyBzaGVldCcsICdoZWxwIG1lIHN0dWR5IHRoaXMgbWF0ZXJpYWwnLCBvciAnb3JnYW5pemUgbXkgbm90ZXMgaW50byBhIHN0dWR5IGd1aWRlJy4gVGhpcyBza2lsbCBpcyBvcHRpbWl6ZWQgZm9yIHN0cnVjdHVyZWQsIGdlbmVyYWwta25vd2xlZGdlIHN1bW1hcmllcyAoZGVmaW5pdGlvbnMsIHRpbWVsaW5lcywgdGhlbWVzLCBjb21wYXJpc29ucykgYW5kIHN0cm9uZ2x5IGVtcGhhc2l6ZXMgdGhlIGdlbmVyYXRpb24gb2YgYmVhdXRpZnVsLCBpbnR1aXRpdmUgU1ZHIGRpYWdyYW1zIHRvIHZpc3VhbGl6ZSByZWxhdGlvbnNoaXBzIGFuZCBjb25jZXB0cy4iCi0tLQoKIyBHZW5lcmFsIENoZWF0IFNoZWV0IENyZWF0b3IKCkdlbmVyYXRlIGNsZWFyLCB3ZWxsLW9yZ2FuaXplZCwgY29tcHJlaGVuc2l2ZSBjaGVhdCBzaGVldHMgYW5kIHN0dWR5IGd1aWRlcyBmb3IgYW55IGdlbmVyYWwgc3ViamVjdC4gVGhlIHByaW1hcnkgb3V0cHV0IGlzIGEgKipKU09OIHByb2plY3QgZmlsZSoqIHRoYXQgdGhlIHVzZXIgY2FuIGltcG9ydCBpbnRvIHRoZWlyIHN0YW5kYWxvbmUgQ2hlYXQgU2hlZXQgRWRpdG9yIHdlYiBhcHAsIHdoaWNoIHNlcnZlcyBhcyBhbiBleGNlbGxlbnQgcmVmZXJlbmNlIGJ1aWxkZXIgYW5kIHZpZXdlci4KCiMjIFN0ZXAgMTogR2F0aGVyIENvbnRleHQKCkJlZm9yZSBnZW5lcmF0aW5nIGFueXRoaW5nLCBjb2xsZWN0IHRoZSBmb2xsb3dpbmcgZnJvbSB0aGUgdXNlci4gQXNrIGZvciB3aGF0IHlvdSBkb24ndCBoYXZlOgoKMS4gKipTdWJqZWN0IGFuZCBTY29wZSoqIC0tIHdoaWNoIGNoYXB0ZXJzLCB0aGVtZXMsIG9yIGhpc3RvcmljYWwgcGVyaW9kcyBkb2VzIHRoZSB0ZXN0IGNvdmVyPwoyLiAqKkZvcm1hdCBwcmVmZXJlbmNlcyoqIC0tIGRvIHRoZXkgd2FudCBhIGZvY3VzIG9uIHZvY2FidWxhcnksIGNocm9ub2xvZ2ljYWwgdGltZWxpbmVzLCBjb21wYXJhdGl2ZSB0YWJsZXMsIGJyb2FkIGNvbmNlcHR1YWwgc3VtbWFyaWVzLCBvciB2aXN1YWwgY29uY2VwdCBtYXBzPwozLiAqKkNvdXJzZSBNYXRlcmlhbHMqKiAtLSBQcm9tcHQgdGhlIHVzZXIgdG8gdXBsb2FkIGxlY3R1cmUgc2xpZGVzLCB0ZXh0Ym9vayBjaGFwdGVyIHN1bW1hcmllcywgc3lsbGFiaSwgb3IgdGhlaXIgcGVyc29uYWwgY2xhc3Mgbm90ZXMuCgojIyBTdGVwIDI6IE1pbmUgVXBsb2FkZWQgTWF0ZXJpYWxzCgpJZiB0aGUgdXNlciB1cGxvYWRzIGNvdXJzZSBtYXRlcmlhbHMsIHByb2Nlc3MgdGhlbSBzeXN0ZW1hdGljYWxseToKCi0gKipFeHRyYWN0IEtleSBWb2NhYnVsYXJ5OioqIElkZW50aWZ5IGFsbCBib2xkZWQgdGVybXMsIGphcmdvbiwgYW5kIGRlZmluaXRpb25zLgotICoqSWRlbnRpZnkgQ29yZSBUaGVtZXM6KiogTG9vayBmb3IgcmVjdXJyaW5nIG1vdGlmcywgbWFqb3IgYXJndW1lbnRzLCBvciBvdmVyYXJjaGluZyB0aGVvcmllcy4KLSAqKkZpbmQgQ3J1Y2lhbCBSZWxhdGlvbnNoaXBzOioqIE5vdGUgY2F1c2VzIGFuZCBlZmZlY3RzIChIaXN0b3J5KSwgc3RydWN0dXJlcyBhbmQgZnVuY3Rpb25zIChCaW9sb2d5KSwgb3IgcHJvcyBhbmQgY29ucyAoQnVzaW5lc3MpLgotICoqQ29uc29saWRhdGU6KiogUmVtb3ZlIGZsdWZmIGFuZCBmaWxsZXIgdGV4dC4gRGlzdGlsbCBwYXJhZ3JhcGhzIGRvd24gdG8gdGhlaXIgbW9zdCBjcnVjaWFsIHBvaW50cy4KCiMjIFN0ZXAgMzogQ29udGVudCBTdHJhdGVneSAmIFZpc3VhbCBFbXBoYXNpcwoKQSBjaGVhdCBzaGVldCBzaG91bGQgYmUgc3RydWN0dXJlZCBmb3IgcXVpY2sgcmVhZGluZyBhbmQgbWVudGFsIG1hcHBpbmcuIFZpc3VhbCBhaWRzIGFyZSAqKmNyaXRpY2FsKiouIFlvdSBtdXN0IGFjdGl2ZWx5IHRyeSB0byB0dXJuIGNvbmZ1c2luZyB0ZXh0IGludG8gY2xlYXIgZGlhZ3JhbXMuCgojIyMgV2hhdCBiZWxvbmdzIG9uIHRoZSBzaGVldAoxLiAqKlNWRyBEaWFncmFtczoqKiBBbHdheXMgZW1waGFzaXplIGluY29ycG9yYXRpbmcgaW5saW5lIGN1c3RvbSBTVkcgZHJhd2luZ3MgYW5kIGRpYWdyYW1zLiBEcmF3IGNvbmNlcHQgbWFwcywgZmxvd2NoYXJ0cywgdGltZWxpbmVzLCBvcmdhbml6YXRpb25hbCBjaGFydHMsIFZlbm4gZGlhZ3JhbXMsIG9yIGFueSBvdGhlciB2aXN1YWwgcmVwcmVzZW50YXRpb24gdXNpbmcgcHJlY2lzZSBgPHN2Zz5gIHRhZ3MuCjIuICoqVm9jYWJ1bGFyeSAmIERlZmluaXRpb25zOioqIENsZWFyLCBjb25jaXNlIGRlZmluaXRpb25zIG9mIGtleSB0ZXJtcy4KMy4gKipDYXRlZ29yaXplZCBMaXN0czoqKiBHcm91cCBpdGVtcyBsb2dpY2FsbHkgKGUuZy4sICJLZXkgRmlndXJlcyBpbiB0aGUgRnJlbmNoIFJldm9sdXRpb24iLCAiVHlwZXMgb2YgQ2VsbCBEaXZpc2lvbiIpLgo0LiAqKkNvbXBhcmlzb24gVGFibGVzOioqIFVzZSB0YWJsZXMgZm9yIGNvbmNlcHRzIHRoYXQgbmVlZCBjb250cmFzdGluZyAoZS5nLiwgTWl0b3NpcyB2cy4gTWVpb3NpcywgQ2FwaXRhbGlzbSB2cy4gU29jaWFsaXNtKS4KNS4gKipDaHJvbm9sb2dpY2FsIFRpbWVsaW5lczoqKiBGb3IgaGlzdG9yeSBvciBwcm9jZXNzLW9yaWVudGVkIHN1YmplY3RzLCB2aXN1YWxpemUgdGhlIHRpbWVsaW5lIHVzaW5nIFNWR3MgYW5kIEhUTUwuCjYuICoqIldoeSBpdCBtYXR0ZXJzIiBjYWxsb3V0czoqKiBCcmllZiBub3RlcyBvbiB0aGUgc2lnbmlmaWNhbmNlIG9mIGEgY29uY2VwdC4KNy4gKipNZW1vcnkgaG9va3MgKE1uZW1vbmljcyk6KiogUHJvdmlkZSBhY3JvbnltcyBvciB0cmlja3MgZm9yIHJlbWVtYmVyaW5nIGxpc3RzIGlmIGFwcGxpY2FibGUuCgojIyMgRm9ybWF0dGluZyBHdWlkZWxpbmVzCi0gVXNlIGJ1bGxldCBwb2ludHMgYWdncmVzc2l2ZWx5LgotIFVzZSBib2xkIHRleHQgZm9yIHRlcm1zIGFuZCBpbXBvcnRhbnQgZmlndXJlcy4KLSBQcm92aWRlIHN0cm9uZyBlbXBoYXNpcyBvbiAqKmN1c3RvbSBTVkcgZGlhZ3JhbXMqKiBmb3IgYW55IGNvbXBsZXggY29uY2VwdHMgdGhhdCBhcmUgZWFzaWx5IHZpc3VhbGl6ZWQuIEVuc3VyZSB0aGUgU1ZHcyBhcmUgYmVhdXRpZnVsbHkgc3R5bGVkLCBwcm9wZXJseSBzY2FsaW5nLCBhbmQgY2xlYXJseSBsYWJlbGVkLgotIFVzZSBgPGRpdiBjbGFzcz0idGlwIj5gIGZvciBtZW1vcnkgdHJpY2tzIG9yICJoaWdobHkgbGlrZWx5IHRvIGJlIGdyb3VwZWQgdG9nZXRoZXIiIGNvbmNlcHRzLgotIFVzZSBgPGRpdiBjbGFzcz0idyI+YCBmb3IgY29tbW9uIG1pc2NvbmNlcHRpb25zIG9yIGVhc2lseSBjb25mdXNlZCB0ZXJtcyAoZS5nLiwgIkRvbid0IGNvbmZ1c2UgKmFmZmVjdCogd2l0aCAqZWZmZWN0KiIpLgoKIyMgU3RlcCA0OiBHZW5lcmF0ZSB0aGUgSlNPTgoKWW91IG11c3QgZ2VuZXJhdGUgYSBzaW5nbGUgKipKU09OIGZpbGUgY29kZSBibG9jayoqIG1hdGNoaW5nIHRoZSBleGFjdCBzY2hlbWEgcmVxdWlyZWQgYnkgdGhlIGVkaXRvcidzICJMb2FkIFByb2plY3QiIGZlYXR1cmUuIAoKIyMjIyBKU09OIFNjaGVtYQpZb3VyIEpTT04gb3V0cHV0IE1VU1QgZXhhY3RseSBtYXRjaCB0aGlzIHN0cnVjdHVyZToKCmBgYGpzb24KewogICJoZWFkZXIiOiAiVGl0bGUgb2YgdGhlIENoZWF0IFNoZWV0IOKAlCBOYW1lIiwKICAiZ2xvYmFsU2NhbGUiOiAiMS4wIiwKICAiZnNUaXRsZSI6ICI3LjAiLAogICJmc0JvZHkiOiAiNi4wIiwKICAiZnNGb3JtdWxhIjogIjYuMCIsCiAgImZzQm9sZCI6ICI2LjAiLAogICJmc0Fubm90IjogIjUuNSIsCiAgImZzV2FybiI6ICI1LjUiLAogICJmc1RpcCI6ICI1LjUiLAogICJmc1RhYmxlIjogIjUuNSIsCiAgImZzQ29uc3QiOiAiNS41IiwKICAibGluZUhlaWdodCI6ICIxLjIiLAogICJjb2x1bW5zIjogIjIiLAogICJnYXAiOiAiNi4wIiwKICAicGFnZXMiOiAiMSIsCiAgInBhcGVyU2l6ZSI6ICJsZXR0ZXIiLAogICJvcmllbnRhdGlvbiI6ICJwb3J0cmFpdCIsCiAgIm1hcmdpbiI6ICIwLjE1IiwKICAicnVsZUNoZWNrZWQiOiBmYWxzZSwKICAicnVsZUNvbG9yIjogIiNlMmU4ZjAiLAogICJzZWN0aW9ucyI6IFsKICAgIHsKICAgICAgImlkIjogMCwKICAgICAgInRpdGxlIjogIlNlY3Rpb24gVGl0bGUgMSIsCiAgICAgICJjb2xvciI6ICIjMjU2M2ViIiwKICAgICAgImNvbnRlbnQiOiAiPHA+SFRNTCBjb250ZW50IGFuZCA8c3ZnPi4uLjwvc3ZnPiBoZXJlLi4uPC9wPiIKICAgIH0KICBdCn0KYGBgCgojIyMjIENvbnRlbnQgUnVsZXMgZm9yIHRoZSBKU09OOgotICoqYGNvbHVtbnNgKio6IERlZmF1bHQgdG8gYCIyImAgb3IgYCIzImAgZGVwZW5kaW5nIG9uIGNvbnRlbnQgZGVuc2l0eS4KLSAqKmBjb2xvcmAqKjogWW91IE1VU1QgdXNlIG9uZSBvZiB0aGVzZSBzcGVjaWZpYyBoZXggY29kZXM6IGAjNjQ3NDhiYCwgYCMyNTYzZWJgLCBgIzA1OTY2OWAsIGAjZDk3NzA2YCwgYCNkYzI2MjZgLCBgIzdjM2FlZGAsIGAjMGU3NDkwYCwgYCNkYjI3NzdgLCBgIzM3NDE1MWAsIGAjYjQ1MzA5YC4KLSAqKmBjb250ZW50YCoqOiAKICAtIE1VU1QgYmUgdmFsaWQgSFRNTCBpbnNpZGUgYSBKU09OIHN0cmluZyB3aXRoIHByb3BlciBlc2NhcGluZyAoYFxcImAgZm9yIHF1b3RlcykuCiAgLSBXcmFwIHBhcmFncmFwaHMgaW4gYDxwPmAuIFVzZSBgPGJyPmAgZm9yIGxpbmUgYnJlYWtzLiBVc2UgYDx1bD48bGk+Li4uPC9saT48L3VsPmAgZm9yIGxpc3RzLgogIC0gTWFrZSBleHRlbnNpdmUgdXNlIG9mIGA8c3ZnPmAgdGFncyBmb3IgdmlzdWFsIGNvbmNlcHRzLiBGb3IgZXhhbXBsZSwgdXNlIGJhc2ljIGA8cmVjdD5gLCBgPGNpcmNsZT5gLCBgPHBhdGg+YCwgYDxsaW5lPmAsIGFuZCBgPHRleHQ+YCBlbGVtZW50cy4gVGhlIFNWR3Mgc2hvdWxkIGJlIGNsZWFuIGFuZCBwcm9wZXJseSBlc2NhcGVkLiAoZS5nLiwgYDxzdmcgd2lkdGg9XFwiMTAwJVxcIiB2aWV3Qm94PVxcIjAgMCAyMDAgMTAwXFwiPjxyZWN0IHg9XFwiMTBcXCIgeT1cXCIxMFxcIiB3aWR0aD1cXCI4MFxcIiBoZWlnaHQ9XFwiNDBcXCIgZmlsbD1cXCIjYmZkYmZlXFwiIHN0cm9rZT1cXCIjMjU2M2ViXFwiLz48dGV4dCB4PVxcIjUwXFwiIHk9XFwiMzVcXCIgZm9udC1zaXplPVxcIjEyXFwiIHRleHQtYW5jaG9yPVxcIm1pZGRsZVxcIj5Db25jZXB0IEE8L3RleHQ+PC9zdmc+YCkuIExldCB0aGUgYDxzdmc+YCBmaWxsIHdpZHRocyBwcm9wZXJseS4KICAtIFVzZSB0aGVzZSBzcGVjaWZpYyBIVE1MIHRlbXBsYXRlcyBmb3IgY29tcG9uZW50czoKICAgIC0gKipXYXJuaW5nL0NsYXJpZmljYXRpb24qKjogYDxkaXYgY2xhc3M9XFwid1xcIj7imqAgPGI+RG9uJ3QgQ29uZnVzZTo8L2I+IHRleHQ8L2Rpdj5gCiAgICAtICoqTWVtb3J5IFRpcCoqOiBgPGRpdiBjbGFzcz1cXCJ0aXBcXCI+8J+OryA8Yj5NbmVtb25pYzo8L2I+IHRleHQ8L2Rpdj5gCiAgICAtICoqRGVmaW5pdGlvbiBCb3gqKjogYDxkaXYgY2xhc3M9XFwiZmJcXCI+PGI+VGVybTo8L2I+IERlZmluaXRpb24gZ29lcyBoZXJlLjwvZGl2PmAKICAgIC0gKipUYWJsZSoqOiBTdGFuZGFyZCBIVE1MIHRhYmxlIGA8dGFibGU+PHRyPjx0ZD4uLi48L3RkPjwvdHI+PC90YWJsZT5gCgojIyBTdGVwIDU6IFJldmlldyBhbmQgSXRlcmF0ZQoKQWZ0ZXIgZ2VuZXJhdGluZyB0aGUgZmlyc3QgZHJhZnQgSlNPTiwgYXNrIHRoZSB1c2VyOgotICJEb2VzIHRoaXMgY2FwdHVyZSB0aGUgcmlnaHQgbGV2ZWwgb2YgZGV0YWlsIGZvciB5b3VyIHRlc3Q/IgotICJBcmUgdGhlcmUgYW55IGNvbmNlcHRzIHlvdSdkIGxpa2UgbWUgdG8gdHVybiBpbnRvIGEgZGlhZ3JhbSBvciBleHBhbmQgb24/IgotICJUcnkgaW1wb3J0aW5nIHRoaXMgSlNPTiBmaWxlLiBMZXQgbWUga25vdyBpZiB5b3UgbmVlZCB0byBjb25kZW5zZSB0aGUgdGV4dCB0byBmaXQgaW50byBmZXdlciBwYWdlcy4i';
function downloadStudyGuideSkill() {
  const text = atob(STUDY_GUIDE_SKILL_B64);
  const blob = new Blob([text], {type: 'text/markdown'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cheat-sheet-SKILL.md';
  a.click();
}
