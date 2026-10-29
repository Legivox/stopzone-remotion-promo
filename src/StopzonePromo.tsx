import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {format: 'vertical' | 'landscape'; audioEnabled?: boolean};
const RED = '#ff4038';
const WHITE = '#f6f4ef';
const MUTED = '#aaa9ae';
const BG = '#08090b';
const scenes = [
  {title:'Never miss\nyour stop again.', body:'A real alarm that wakes you\nwhen you’re nearly there.', image:'01-home-phone.webp', kicker:'SLEEP THROUGH THE JOURNEY'},
  {title:'Drop a pin.\nSet your zone.', body:'Choose how early we wake you.\nFrom a mile out to a few hundred feet.', image:'02-zone-map-phone.webp', kicker:'YOUR DESTINATION, YOUR RULES'},
  {title:'Then close\nyour eyes.', body:'Stopzone counts down the miles\nwhile you rest.', image:'03-countdown-phone.webp', kicker:'REST WITHOUT WATCHING THE MAP'},
  {title:'It rings even\non Silent.', body:'A wake-up screen built to get\nyour attention when it matters.', image:'04-wakeup-phone.webp', kicker:'YOUR STOP. YOUR MOMENT'},
  {title:'Every stop,\ncounted.', body:'Your journeys. Your places.\nYour stops, kept personal.', image:'05-stats-phone.webp', kicker:'STOPZONE'},
];

const Scene: React.FC<{index:number; format:Props['format']}> = ({index, format}) => {
  const frame = useCurrentFrame();
  const {width,height,fps} = useVideoConfig();
  const vertical = format === 'vertical';
  const enter = spring({frame:Math.max(0,frame),fps,config:{damping:20,stiffness:75,mass:.9}});
  const out = interpolate(frame,[157,179],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const fade = enter*out;
  const scale = interpolate(frame,[0,179],[1.02,1.09],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const float = Math.sin(frame/17)*(vertical?8:5);
  const tilt = Math.sin(frame/38)*.45;
  const isWake = index===3;
  const isEnd = index===4;
  const textStyle:React.CSSProperties = vertical
    ? {position:'absolute',left:68,right:68,top:140,zIndex:3,opacity:fade,transform:`translateY(${(1-enter)*26}px)`}
    : {position:'absolute',left:130,top:'50%',width:width*.43,zIndex:3,opacity:fade,transform:`translateY(calc(-50% + ${(1-enter)*26}px))`};
  const phoneStyle:React.CSSProperties = vertical
    ? {position:'absolute',width:width*.72,height:height*.54,objectFit:'contain',left:'50%',top:height*.425,transform:`translate(-50%,${float}px) scale(${scale}) rotate(${tilt}deg)`,opacity:fade,filter:'drop-shadow(0 36px 70px rgba(0,0,0,.72))'}
    : {position:'absolute',height:height*.91,width:width*.42,objectFit:'contain',right:width*.045,top:height*.025,transform:`translateY(${float}px) scale(${scale}) rotate(${tilt}deg)`,opacity:fade,filter:'drop-shadow(0 32px 70px rgba(0,0,0,.72))'};
  return <AbsoluteFill style={{background:BG,color:WHITE,overflow:'hidden',fontFamily:'Inter, SF Pro Display, Helvetica, Arial, sans-serif'}}>
    <AbsoluteFill style={{background:`radial-gradient(ellipse at ${vertical?'50% 72%':'77% 56%'}, ${isWake?'rgba(255,64,56,.19)':'rgba(255,64,56,.11)'}, transparent 50%)`,opacity:fade}}/>
    <div style={{position:'absolute',inset:0,opacity:.12,backgroundImage:'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)',backgroundSize:vertical?'72px 72px':'90px 90px',maskImage:'linear-gradient(to bottom,transparent,black 25%,black 78%,transparent)'}}/>
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:fade}} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={vertical?`M -40 ${height*.39} C ${width*.2} ${height*.34},${width*.58} ${height*.42},${width+40} ${height*.33}`:`M -40 ${height*.74} C ${width*.2} ${height*.64},${width*.58} ${height*.32},${width+40} ${height*.43}`} fill="none" stroke="rgba(255,64,56,.5)" strokeWidth="1.5" strokeDasharray="7 12" strokeDashoffset={-frame*1.5}/>
      <path d={vertical?`M ${width*.08} ${height*.31} H ${width*.92}`:`M ${width*.04} ${height*.82} H ${width*.96}`} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1"/>
      <circle cx={vertical?width*.5:width*.55} cy={vertical?height*.31:height*.82} r={7+Math.sin(frame/7)*3} fill="none" stroke={RED} strokeWidth="2"/>
      <circle cx={vertical?width*.5:width*.55} cy={vertical?height*.31:height*.82} r="2.5" fill={RED}/>
    </svg>
    <div style={textStyle}>
      <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:vertical?28:24}}><div style={{width:52,height:5,borderRadius:8,background:RED}}/><div style={{fontSize:15,letterSpacing:'.18em',color:MUTED}}>0{index+1} <span style={{color:'#55545a'}}>/ 05</span></div></div>
      <div style={{fontSize:vertical?82:76,lineHeight:.99,letterSpacing:'-.055em',fontWeight:760,whiteSpace:'pre-line',maxWidth:vertical?900:790}}>{scenes[index].title}</div>
      <div style={{fontSize:vertical?31:27,lineHeight:1.34,color:MUTED,whiteSpace:'pre-line',marginTop:24,maxWidth:vertical?820:690}}>{scenes[index].body}</div>
      <div style={{marginTop:vertical?30:34,color:RED,letterSpacing:'.17em',fontSize:15,fontWeight:700}}>{scenes[index].kicker}</div>
    </div>
    <Img src={staticFile(`assets/${scenes[index].image}`)} style={phoneStyle}/>
    {isWake && <AbsoluteFill style={{zIndex:4,pointerEvents:'none',background:'radial-gradient(ellipse at 50% 70%,rgba(255,64,56,.24),transparent 55%)',opacity:interpolate(frame,[0,7,13,24],[0,.72,.08,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/>}
    {isEnd && <AbsoluteFill style={{zIndex:8,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:80,background:'radial-gradient(ellipse at 50% 48%,rgba(255,64,56,.15),rgba(8,9,11,.97) 62%)',opacity:interpolate(frame,[85,108],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),transform:`translateY(${interpolate(frame,[85,108],[24,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}px)`}}>
      <Img src={staticFile('assets/stopzone-icon.webp')} style={{width:112,height:112,borderRadius:28,boxShadow:'0 0 70px rgba(255,64,56,.18)'}}/>
      <div style={{fontSize:18,letterSpacing:'.28em',color:MUTED,marginTop:26,fontWeight:700}}>STOPZONE</div>
      <div style={{fontSize:vertical?76:68,lineHeight:.98,letterSpacing:'-.055em',fontWeight:760,marginTop:24,whiteSpace:'pre-line'}}>Get off where{'\n'}you meant to.</div>
      <Img src={staticFile('assets/app-store.svg')} style={{width:206,height:68,objectFit:'contain',marginTop:34}}/>
      <div style={{fontSize:19,color:MUTED,marginTop:16}}>Your stop. Your time.</div>
    </AbsoluteFill>}
    <div style={{position:'absolute',bottom:vertical?78:48,left:vertical?68:130,right:vertical?68:130,display:'flex',alignItems:'center',gap:10,opacity:fade}}>
      {scenes.map((_,i)=><div key={i} style={{height:3,flex:1,borderRadius:3,background:i===index?RED:'rgba(255,255,255,.17)'}}/>)}<div style={{fontSize:13,color:MUTED,marginLeft:7,letterSpacing:'.08em'}}>STOPZONE</div>
    </div>
  </AbsoluteFill>;
};

export const StopzonePromo:React.FC<Props> = ({format,audioEnabled=true}) => <AbsoluteFill style={{background:BG}}>
  {scenes.map((_,index)=><Sequence key={index} from={index*180} durationInFrames={180}><Scene index={index} format={format}/></Sequence>)}
  {audioEnabled && <Audio src={staticFile('audio/music.mp3')} volume={0.18}/>}
  {audioEnabled && <Audio src={staticFile('audio/voiceover-original.mp3')} volume={1}/>
</AbsoluteFill>;
