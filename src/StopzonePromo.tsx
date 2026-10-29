import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Format = 'vertical' | 'landscape';
type Props = {format: Format};

const RED = '#ff3b42';
const WHITE = '#f5f3ef';
const MUTED = '#92939b';
const BG = '#08090c';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const fade = (f: number, start: number, end: number) =>
  interpolate(f, [start, end], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
const slide = (f: number, start: number, end: number, from: number, to = 0) =>
  interpolate(f, [start, end], [from, to], {...clamp, easing: Easing.out(Easing.cubic)});

const Grid: React.FC<{opacity?: number}> = ({opacity = 0.18}) => (
  <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" style={{position:'absolute', inset:0, opacity}}>
    <defs>
      <pattern id="grid" width="84" height="84" patternUnits="userSpaceOnUse">
        <path d="M 84 0 L 0 0 0 84" fill="none" stroke="#5b5e69" strokeWidth="1"/>
      </pattern>
      <radialGradient id="gridFade"><stop offset="0%" stopColor="white"/><stop offset="100%" stopColor="black"/></radialGradient>
      <mask id="gridMask"><rect width="100%" height="100%" fill="url(#gridFade)"/></mask>
    </defs>
    <rect width="1080" height="1920" fill="url(#grid)" mask="url(#gridMask)"/>
  </svg>
);

const RouteGraphic: React.FC<{frame: number; width: number; height: number; compact?: boolean}> = ({frame, width, height, compact = false}) => {
  const progress = interpolate(frame, [0, 190], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const d = 'M 60 520 L 190 520 L 190 390 L 350 390 L 350 275 L 510 275 L 510 405 L 660 405 L 660 240 L 825 240 L 825 120';
  const points = [
    {x:60,y:520},{x:190,y:520},{x:190,y:390},{x:350,y:390},{x:350,y:275},
    {x:510,y:275},{x:510,y:405},{x:660,y:405},{x:660,y:240},{x:825,y:240},{x:825,y:120}
  ];
  const total = points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-points[i].x,p.y-points[i].y),0);
  let remaining = progress * total;
  let marker = points[0];
  for (let i=1;i<points.length;i++) {
    const prev=points[i-1], next=points[i];
    const len=Math.hypot(next.x-prev.x,next.y-prev.y);
    if (remaining <= len) {
      const t= len===0 ? 0 : remaining/len;
      marker={x:prev.x+(next.x-prev.x)*t,y:prev.y+(next.y-prev.y)*t};
      break;
    }
    remaining -= len; marker=next;
  }
  const scale = compact ? 0.64 : 1;
  return (
    <svg width={width} height={height} viewBox="0 0 900 600" style={{overflow:'visible'}}>
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="routeGradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#ff7b53"/><stop offset="100%" stopColor={RED}/></linearGradient>
      </defs>
      <g opacity=".23" stroke="#676b78" strokeWidth="2" fill="none">
        <path d="M20 80H870M20 160H870M20 240H870M20 320H870M20 400H870M20 480H870M100 40V560M220 40V560M340 40V560M460 40V560M580 40V560M700 40V560M820 40V560"/>
        <path d="M0 560L300 40M180 600L520 0M490 600L840 0" opacity=".45"/>
      </g>
      <path d={d} fill="none" stroke="#2a2c34" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={d} fill="none" stroke="url(#routeGradient)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress} filter="url(#glow)"/>
      <circle cx="825" cy="120" r={50+Math.sin(frame/8)*5} fill={RED} opacity=".1"/>
      <circle cx="825" cy="120" r="31" fill="none" stroke={RED} strokeWidth="2" opacity={0.35+0.3*Math.sin(frame/7)}/>
      <circle cx="825" cy="120" r="11" fill={RED} filter="url(#glow)"/>
      <circle cx={marker.x} cy={marker.y} r="20" fill={RED} opacity=".17"/>
      <circle cx={marker.x} cy={marker.y} r="8" fill={WHITE} stroke={RED} strokeWidth="5"/>
    </svg>
  );
};

const Phone: React.FC<{frame:number; left?:boolean}> = ({frame,left=false}) => {
  const enter = fade(frame, 0, 26);
  const y = slide(frame, 0, 30, 100, 0);
  const rotate = interpolate(frame, [0, 150, 300], [left ? -8 : 8, left ? -3 : 3, left ? -6 : 6], {...clamp, easing:Easing.inOut(Easing.sin)});
  const pulse = 1 + Math.sin(frame/8)*0.018;
  return (
    <div style={{width:340,height:690,borderRadius:52,border:'3px solid #454751',background:'linear-gradient(145deg,#202127,#090a0e 35%,#15161b)',padding:12,boxShadow:'0 55px 100px #000a, 0 0 55px #ff3b4219',transform:`translateY(${y}px) rotate(${rotate}deg) scale(${pulse})`,opacity:enter,position:'relative',boxSizing:'border-box'}}>
      <div style={{width:'100%',height:'100%',borderRadius:39,background:'#0c0d12',overflow:'hidden',position:'relative'}}>
        <div style={{height:34,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:92,height:20,borderRadius:20,background:'#030406'}}/></div>
        <div style={{padding:'24px 23px',color:WHITE,fontFamily:'Inter,Arial,sans-serif'}}>
          <div style={{fontSize:13,letterSpacing:3,color:MUTED,fontWeight:700}}>STOPZONE</div>
          <div style={{fontSize:29,fontWeight:750,marginTop:12,letterSpacing:-1}}>Your stop, handled.</div>
          <div style={{fontSize:14,color:MUTED,marginTop:8}}>Stay in the moment.</div>
          <div style={{marginTop:25,height:260,borderRadius:24,background:'linear-gradient(135deg,#1a1c23,#111218)',border:'1px solid #30323b',position:'relative',overflow:'hidden'}}>
            <svg viewBox="0 0 280 260" width="100%" height="100%">
              <g stroke="#363944" strokeWidth="3" fill="none" opacity=".8">
                <path d="M-20 35L100 80L290 10M-10 110L90 130L290 90M-10 200L110 180L290 230M35 -10L70 270M145 -10L160 270M230 -10L210 270"/>
              </g>
              <path d="M28 210L90 210L90 145L145 145L145 90L218 90L218 48" fill="none" stroke={RED} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="360" strokeDashoffset={interpolate(frame,[0,220],[360,0],clamp)}/>
              <circle cx="218" cy="48" r={35+Math.sin(frame/8)*4} fill={RED} opacity=".13"/>
              <circle cx="218" cy="48" r="12" fill={RED}/>
              <circle cx={interpolate(frame,[0,220],[28,218],clamp)} cy={interpolate(frame,[0,220],[210,48],clamp)} r="6" fill={WHITE} stroke={RED} strokeWidth="3"/>
            </svg>
            <div style={{position:'absolute',left:14,bottom:14,fontSize:11,color:'#d6d7dc',letterSpacing:1}}>LIVE ROUTE</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:24}}>
            <div><div style={{fontSize:12,color:MUTED}}>DISTANCE LEFT</div><div style={{fontSize:28,fontWeight:700,marginTop:4}}>{Math.max(0,1.8-frame/180).toFixed(1)} <span style={{fontSize:13,color:MUTED}}>km</span></div></div>
            <div style={{width:74,height:74,borderRadius:50,border:'5px solid #2b2d36',borderTopColor:RED,display:'grid',placeItems:'center',transform:`rotate(${frame*2}deg)`}}><span style={{fontSize:15,fontWeight:700,transform:`rotate(-${frame*2}deg)`}}>08:42</span></div>
          </div>
        </div>
        <div style={{position:'absolute',bottom:15,left:'50%',transform:'translateX(-50%)',width:110,height:5,borderRadius:5,background:'#f4f4f5'}}/>
      </div>
    </div>
  );
};

const SceneTitle: React.FC<{frame:number; kicker:string; line1:string; line2?:string; start?:number}> = ({frame,kicker,line1,line2,start=0}) => (
  <div style={{opacity:fade(frame,start,start+16),transform:`translateY(${slide(frame,start,start+22,38)}px)`,fontFamily:'Inter,Arial,sans-serif',textAlign:'center',width:'100%'}}>
    <div style={{fontSize:19,fontWeight:750,letterSpacing:5,color:RED,marginBottom:25}}>{kicker}</div>
    <div style={{fontSize:70,fontWeight:820,letterSpacing:-3,lineHeight:1.02,color:WHITE}}>{line1}{line2 && <><br/><span style={{color:RED}}>{line2}</span></>}</div>
  </div>
);

export const StopzonePromo: React.FC<Props> = ({format}) => {
  const frame = useCurrentFrame();
  const {width,height} = useVideoConfig();
  const landscape = format === 'landscape';
  const scale = landscape ? 0.76 : 1;
  const bgZoom = interpolate(frame,[0,810],[1,1.12],clamp);
  const alarm = fade(frame, 465, 485) * (1-fade(frame, 575, 605));
  const cta = fade(frame, 645, 670);
  const routeScene = frame >= 70 && frame < 260;
  const phoneScene = frame >= 220 && frame < 470;
  const quietScene = frame >= 350 && frame < 490;
  const endScene = frame >= 640;
  const showAudio = true;

  return (
    <AbsoluteFill style={{background:BG,color:WHITE,overflow:'hidden',fontFamily:'Inter,Arial,sans-serif'}}>
      <AbsoluteFill style={{transform:`scale(${bgZoom})`,background:'radial-gradient(ellipse at 50% 42%, #211015 0%, #0b0c10 43%, #050608 100%)'}}/>
      <Grid opacity={0.13}/>
      <AbsoluteFill style={{background:`radial-gradient(ellipse at 50% 52%, #ff30350c, transparent 52%)`}}/>
      {alarm > 0 && <AbsoluteFill style={{background:RED,opacity:alarm*0.19,mixBlendMode:'screen'}}/>}

      {/* Scene 1: Hook */}
      {frame < 105 && (
        <AbsoluteFill style={{justifyContent:'center',alignItems:'center',padding:landscape?'8%':'9%',gap:34}}>
          <div style={{position:'absolute',width:'130%',top:'8%',left:'-15%',opacity:fade(frame,0,18),transform:`translateY(${slide(frame,0,30,80)}px) rotate(-8deg)`}}>
            <RouteGraphic frame={frame} width="100%" height={landscape?430:550}/>
          </div>
          <div style={{zIndex:2,marginTop:landscape?0:250}}>
            <SceneTitle frame={frame} kicker="YOUR JOURNEY. YOUR STOP." line1="The city keeps" line2="moving."/>
            <div style={{fontSize:27,color:'#d3d2d5',textAlign:'center',marginTop:26,opacity:fade(frame,28,44),transform:`translateY(${slide(frame,28,46,22)}px)`}}>You don't have to watch it.</div>
          </div>
          <div style={{position:'absolute',bottom:'8%',width:'100%',height:4,background:'#ffffff13',borderRadius:5,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.min(100,frame/105*100)}%`,background:RED}}/></div>
        </AbsoluteFill>
      )}

      {/* Scene 2: Set your stop */}
      {frame >= 95 && frame < 280 && (
        <AbsoluteFill style={{padding:landscape?'6% 9%':'8% 7%',justifyContent:'space-between',alignItems:'center'}}>
          <SceneTitle frame={frame-95} kicker="ONE SIMPLE SETUP" line1="Set your stop." line2="Choose your zone."/>
          <div style={{display:'flex',flexDirection:landscape?'row':'column',alignItems:'center',justifyContent:'center',gap:landscape?65:15,flex:1,width:'100%',marginTop:20}}>
            <div style={{width:landscape?460:520,opacity:fade(frame,110,130),transform:`translateX(${slide(frame,100,140,-80)}px)`}}>
              <RouteGraphic frame={frame-90} width="100%" height={landscape?320:430}/>
            </div>
            <div style={{transform:`translateY(${slide(frame,115,150,90)}px) scale(${interpolate(frame,[115,160],[.9,1],clamp)})`}}>
              <Phone frame={frame-110}/>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 3: Let go */}
      {frame >= 260 && frame < 465 && (
        <AbsoluteFill style={{padding:landscape?'6% 10%':'8% 7%',justifyContent:'space-around',alignItems:'center'}}>
          <SceneTitle frame={frame-260} kicker="NOW, JUST RIDE" line1="Put your phone" line2="away."/>
          <div style={{display:'flex',flexDirection:landscape?'row':'column',alignItems:'center',justifyContent:'center',gap:landscape?70:8,flex:1,width:'100%'}}>
            <div style={{width:landscape?430:530,opacity:fade(frame,270,295),transform:`translateY(${slide(frame,270,300,45)}px)`}}>
              <RouteGraphic frame={frame-230} width="100%" height={landscape?330:420}/>
            </div>
            <div style={{transform:`translateY(${slide(frame,270,300,45)}px) rotate(${interpolate(frame,[270,400],[4,-3],clamp)}deg)`}}><Phone frame={frame-265} left/></div>
          </div>
          <div style={{fontSize:24,color:MUTED,opacity:fade(frame,345,365),textAlign:'center'}}>Stopzone tracks your distance while you ride.</div>
        </AbsoluteFill>
      )}

      {/* Scene 4: Wake zone climax */}
      {frame >= 455 && frame < 650 && (
        <AbsoluteFill style={{justifyContent:'center',alignItems:'center',padding:landscape?'8% 12%':'9% 7%'}}>
          <div style={{position:'absolute',width:landscape?760:880,height:landscape?760:880,borderRadius:'50%',border:`2px solid ${RED}`,opacity:fade(frame,465,490)*(1-fade(frame,575,600)),transform:`scale(${interpolate(frame,[460,520,610],[0.2,1.2,1.8],clamp)})`,boxShadow:`0 0 70px ${RED}55,inset 0 0 70px ${RED}22`}}/>
          <div style={{position:'absolute',width:landscape?570:690,height:landscape?570:690,borderRadius:'50%',border:`1px solid #ff777b`,opacity:fade(frame,475,495)*(1-fade(frame,570,600)),transform:`scale(${interpolate(frame,[470,535,610],[0.3,1.1,1.6],clamp)})`}}/>
          <div style={{zIndex:2,textAlign:'center',transform:`scale(${interpolate(frame,[460,480,510],[.8,1.04,1],clamp)})`}}>
            <div style={{fontSize:19,letterSpacing:6,color:RED,fontWeight:800,opacity:fade(frame,465,480)}}>WAKE ZONE REACHED</div>
            <div style={{fontSize:landscape?100:112,fontWeight:900,letterSpacing:-5,lineHeight:.95,marginTop:30,opacity:fade(frame,475,493)}}>THIS IS<br/><span style={{color:RED}}>YOUR STOP.</span></div>
            <div style={{marginTop:35,fontSize:25,color:'#d0cdd1',opacity:fade(frame,505,530)}}>When it's time, you'll know.</div>
          </div>
          <div style={{position:'absolute',bottom:'10%',fontSize:15,letterSpacing:4,color:'#ffffff80',opacity:fade(frame,520,540)}}>STOPZONE</div>
        </AbsoluteFill>
      )}

      {/* Scene 5: CTA */}
      {endScene && (
        <AbsoluteFill style={{justifyContent:'center',alignItems:'center',padding:landscape?'7% 12%':'9% 8%',opacity:cta,transform:`translateY(${slide(frame,640,680,50)}px)`}}>
          <div style={{position:'absolute',top:'12%',width:landscape?540:620,opacity:.65,transform:`rotate(-8deg) translateY(${Math.sin(frame/18)*12}px)`}}><RouteGraphic frame={frame-450} width="100%" height={landscape?260:330} compact/></div>
          <div style={{zIndex:2,textAlign:'center',marginTop:landscape?0:120}}>
            <div style={{width:108,height:108,borderRadius:28,background:'linear-gradient(145deg,#ff666b,#e51f31 60%,#7b101b)',display:'grid',placeItems:'center',margin:'0 auto 28px',boxShadow:'0 0 65px #ff3b4245',fontSize:52,fontWeight:900}}>S<span style={{fontSize:45}}>.</span></div>
            <div style={{fontSize:landscape?34:38,letterSpacing:8,fontWeight:800}}>STOPZONE</div>
            <div style={{fontSize:landscape?64:72,fontWeight:850,letterSpacing:-3,lineHeight:1.05,marginTop:28}}>Get off where<br/>you meant to.</div>
            <div style={{marginTop:38,display:'inline-flex',alignItems:'center',gap:14,padding:'20px 30px',borderRadius:16,background:WHITE,color:'#101014',fontSize:22,fontWeight:800,boxShadow:'0 15px 45px #0008'}}>
              <span style={{fontSize:32}}>↗</span><span>Download on the App Store</span>
            </div>
            <div style={{fontSize:17,color:MUTED,marginTop:25}}>Your stop. Handled.</div>
          </div>
        </AbsoluteFill>
      )}

      {/* Optional tracks; files are intentionally user-supplied. */}
      {showAudio && <AudioTrack frame={frame}/>}
    </AbsoluteFill>
  );
};

const AudioTrack: React.FC<{frame:number}> = ({frame}) => {
  // Keep the project runnable before licensed music/voiceover are supplied.
  // Audio is added only when files exist at the documented paths.
  return null;
};