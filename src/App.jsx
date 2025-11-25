// Ocean-Themed Animated Blog Website (React)
// Dependencies: react, react-router-dom, framer-motion, styled-components
// Install: npm install react-router-dom framer-motion styled-components

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

/* ------------------ GLOBAL STYLES & ANIMATIONS ------------------ */
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const wave = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const ripple = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
`;

const sway = keyframes`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(76, 201, 240, 0.5); }
  50% { box-shadow: 0 0 20px rgba(76, 201, 240, 0.8); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideInLeft = keyframes`
  0% { transform: translateX(-100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  0% { transform: translateX(100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const zoomIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const typewriter = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

const jelly = keyframes`
  0%, 100% { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.1, 0.9); }
  75% { transform: scale(0.95, 1.05); }
`;

const flip = keyframes`
  0% { transform: perspective(400px) rotateY(0); }
  100% { transform: perspective(400px) rotateY(360deg); }
`;

const wobble = keyframes`
  0%, 100% { transform: translateX(0%); }
  15% { transform: translateX(-5%) rotate(-5deg); }
  30% { transform: translateX(4%) rotate(3deg); }
  45% { transform: translateX(-3%) rotate(-3deg); }
  60% { transform: translateX(2%) rotate(2deg); }
  75% { transform: translateX(-1%) rotate(-1deg); }
`;

const tada = keyframes`
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0); }
`;

const flash = keyframes`
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const swing = keyframes`
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const rubberBand = keyframes`
  0% { transform: scale(1); }
  30% { transform: scaleX(1.25) scaleY(0.75); }
  40% { transform: scaleX(0.75) scaleY(1.25); }
  60% { transform: scaleX(1.15) scaleY(0.85); }
  100% { transform: scale(1); }
`;

const lightSpeedIn = keyframes`
  0% { transform: translateX(100%) skewX(-30deg); opacity: 0; }
  60% { transform: translateX(-20%) skewX(30deg); opacity: 1; }
  80% { transform: translateX(0%) skewX(-15deg); opacity: 1; }
  100% { transform: translateX(0%) skewX(0deg); opacity: 1; }
`;

const hinge = keyframes`
  0% { transform: rotate(0); transform-origin: top left; }
  20%, 60% { transform: rotate(80deg); transform-origin: top left; }
  40% { transform: rotate(60deg); transform-origin: top left; }
  80% { transform: rotate(60deg) translateY(0); opacity: 1; transform-origin: top left; }
  100% { transform: translateY(700px); opacity: 0; }
`;

const rollIn = keyframes`
  0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); }
  100% { opacity: 1; transform: translateX(0px) rotate(0deg); }
`;

const rollOut = keyframes`
  0% { opacity: 1; transform: translateX(0px) rotate(0deg); }
  100% { opacity: 0; transform: translateX(100%) rotate(120deg); }
`;

const rotateIn = keyframes`
  0% { transform-origin: center; transform: rotate(-200deg); opacity: 0; }
  100% { transform-origin: center; transform: rotate(0); opacity: 1; }
`;

const rotateOut = keyframes`
  0% { transform-origin: center; transform: rotate(0); opacity: 1; }
  100% { transform-origin: center; transform: rotate(200deg); opacity: 0; }
`;

// NEW: Wave background animation for blog cards
const waveBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// NEW: Big wave animation for page transitions
const bigWave = keyframes`
  0% { 
    transform: translateY(100%) scaleX(1);
    opacity: 0;
  }
  50% { 
    transform: translateY(0%) scaleX(1.2);
    opacity: 1;
  }
  100% { 
    transform: translateY(-100%) scaleX(1);
    opacity: 0;
  }
`;

// NEW ANIMATIONS
const slideDown = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const scaleIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Global = createGlobalStyle`
  :root{
    --ocean-dark: #001d3d;
    --ocean-mid: #003566;
    --ocean-light: #00a8e8;
    --ocean-accent: #4cc9f0;
    --text-light: #e9f5ff;
    --muted: #9ab8d0;
    --card-bg: rgba(255,255,255,0.08);
  }
  
  [data-theme="light"] {
    --ocean-dark: #e6f7ff;
    --ocean-mid: #b3e0ff;
    --ocean-light: #0077b6;
    --ocean-accent: #0096c7;
    --text-light: #001d3d;
    --muted: #4a6572;
    --card-bg: rgba(255,255,255,0.9);
  }
  
  *{box-sizing:border-box;}
  body{
    margin:0;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(180deg, var(--ocean-dark), var(--ocean-mid));
    color: var(--text-light);
    min-height: 100vh;
    overflow-x: hidden;
    transition: all 0.3s ease;
  }
  a{color:inherit;text-decoration:none;}
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--ocean-dark);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--ocean-light);
    border-radius: 4px;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

/* ------------------ ANIMATED BACKGROUND ELEMENTS ------------------ */
const OceanBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const Bubble = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(76, 201, 240, 0.1);
  border: 1px solid rgba(76, 201, 240, 0.3);
  bottom: -50px;
`;

const Wave = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%2300a8e8'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%2300a8e8'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%2300a8e8'/%3E%3C/svg%3E");
  background-size: 1200px 100px;
  ${css`animation: ${wave} 15s linear infinite;`}
`;

/* ------------------ WAVE TRANSITION COMPONENT ------------------ */
const WaveTransition = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(0, 168, 232, 0.8) 0%, 
    rgba(76, 201, 240, 0.6) 50%, 
    rgba(144, 224, 239, 0.4) 100%);
  z-index: 9999;
  pointer-events: none;
  transform: translateY(100%);
  
  ${props => props.animate && css`
    animation: ${bigWave} 1.2s ease-in-out;
  `}
`;

/* ------------------ NEW COMPONENTS ------------------ */

// Search Bar Component
const SearchContainer = styled(motion.div)`
  position: relative;
  margin: 20px 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 20px;
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: var(--text-light);
  font-size: 1rem;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--ocean-accent);
    box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.1);
  }

  &::placeholder {
    color: var(--muted);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  cursor: pointer;
`;

// Category Filter Component
const CategoryFilter = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0;
  justify-content: center;
`;

const CategoryButton = styled(motion.button)`
  background: ${props => props.active ? 'linear-gradient(90deg, var(--ocean-light), var(--ocean-accent))' : 'var(--card-bg)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${props => props.active ? 'white' : 'var(--text-light)'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 168, 232, 0.3);
  }
`;

// Theme Toggle Component
const ThemeToggle = styled(motion.button)`
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  font-size: 1.2rem;
  
  &:hover {
    ${css`animation: ${spin} 1s;`}
  }
`;

// Loading Spinner Component
const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(76, 201, 240, 0.3);
  border-top: 3px solid var(--ocean-accent);
  border-radius: 50%;
  margin: 40px auto;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

// Back to Top Button
const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(90deg, var(--ocean-light), var(--ocean-accent));
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 168, 232, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  &:hover {
    ${css`animation: ${bounce} 0.6s;`}
  }
`;

// Newsletter Component
const NewsletterSection = styled(motion.section)`
  background: var(--card-bg);
  padding: 40px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 60px 0;
  text-align: center;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 15px;
  max-width: 400px;
  margin: 20px auto 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--ocean-accent);
  }

  &::placeholder {
    color: var(--muted);
  }
`;

/* ------------------ NAVBAR ------------------ */
const NavBar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Logo = styled(motion.div)`
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(90deg, #00a8e8, #4cc9f0, #90e0ef);
  -webkit-background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::after {
    content: "🌊";
    font-size: 28px;
    ${css`animation: ${float} 3s ease-in-out infinite;`}
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 30px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
  
  a {
    position: relative;
    padding: 8px 0;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--ocean-accent);
      ${css`animation: ${rubberBand} 1s;`}
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--ocean-accent);
      transition: width 0.3s ease;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
`;

/* ------------------ HERO SECTION ------------------ */
const HeroSection = styled(motion.section)`
  text-align: center;
  padding: 60px 0;
  margin-bottom: 60px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(76, 201, 240, 0.2) 0%, rgba(0, 168, 232, 0) 70%);
    border-radius: 50%;
    z-index: -1;
    ${css`animation: ${pulse} 4s ease-in-out infinite;`}
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #e9f5ff, #4cc9f0, #90e0ef);
  -webkit-background-clip: text;
  color: transparent;
  line-height: 1.2;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--ocean-accent), transparent);
    ${css`animation: ${shimmer} 3s infinite;`}
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
  ${css`animation: ${fadeInUp} 1s ease-out;`}
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(90deg, var(--ocean-light), var(--ocean-accent));
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 168, 232, 0.3);
  position: relative;
  overflow: hidden;
  ${css`animation: ${glow} 2s infinite;`}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    ${css`
      animation: ${bounce} 0.6s, ${glow} 2s infinite;
    `}
  }
`;

/* ------------------ BLOG CARD WITH WAVE BACKGROUND ------------------ */
const BlogCard = styled(motion.article)`
  background: var(--card-bg);
  padding: 30px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  /* Wave background effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(76, 201, 240, 0.1),
      rgba(0, 168, 232, 0.2),
      rgba(76, 201, 240, 0.1),
      transparent
    );
    transform: skewX(-15deg);
    transition: left 0.6s ease;
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
    ${css`animation: ${waveBackground} 2s ease-in-out;`}
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--ocean-light), var(--ocean-accent));
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleY(1);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  /* Content wrapper to stay above wave effect */
  .card-content {
    position: relative;
    z-index: 2;
  }
`;

const BlogImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    ${css`animation: ${glow} 1.5s infinite;`}
  }
`;

const BlogTitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--text-light);
  line-height: 1.4;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--ocean-accent);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const BlogExcerpt = styled(motion.p)`
  color: var(--muted);
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ReadMoreLink = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ocean-accent);
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(5px);
    ${css`animation: ${shake} 0.5s;`}
  }
  
  &:hover {
    ${css`animation: ${tada} 0.5s;`}
  }
`;

/* ------------------ BLOG GRID ------------------ */
const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

/* ------------------ IMAGE MODAL ------------------ */
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 29, 61, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const ModalContent = styled(motion.div)`
  max-width: 90%;
  max-height: 90%;
  position: relative;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -40px;
  right: 0;
  background: var(--ocean-accent);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  
  &:hover {
    ${css`
      animation: ${spin} 0.5s, ${glow} 1s infinite;
    `}
  }
`;

/* ------------------ FORM STYLES ------------------ */
const FormContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background: var(--card-bg);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-light);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--ocean-accent);
    box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.1);
  }

  &::placeholder {
    color: var(--muted);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: var(--ocean-accent);
    box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.1);
  }

  &::placeholder {
    color: var(--muted);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(90deg, var(--ocean-light), var(--ocean-accent));
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 168, 232, 0.3);
  position: relative;
  overflow: hidden;

  &:hover {
    ${css`
      animation: ${glow} 1s infinite;
    `}
  }
`;

/* ------------------ BLOG DATA ------------------ */
const posts = [
  {
    id: "ocean-secrets",
    title: "10 Secrets Hidden Under the Ocean",
    excerpt: "You won't believe what lies beneath the deep blue waves. From underwater rivers to glowing creatures, the ocean holds mysteries beyond imagination.",
    content: `
# The Uncharted Depths: 10 Astonishing Secrets of Our Oceans

Our planet's oceans cover more than 70% of Earth's surface, yet we've explored less than 5% of this vast underwater realm. What lies beneath the waves represents one of the last great frontiers of discovery on our planet.

![Underwater river flowing through ocean depths](https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

## The Mysterious Underwater Rivers

Beneath the surface of the ocean, there exist rivers that flow with water of different density, carving channels through the seafloor just like their terrestrial counterparts. These underwater rivers, known as "brine pools," form when highly saline water sinks and flows along the ocean bottom.

![Lost City hydrothermal vents](https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

## The Lost City Hydrothermal Field

Deep in the Atlantic Ocean, approximately 2,500 feet below the surface, lies one of the most extraordinary geological formations ever discovered: The Lost City Hydrothermal Field. Unlike black smoker vents that spew superheated, mineral-rich water, the Lost City features towering white carbonate chimneys that vent warm, alkaline fluids.

![Blue hole in the ocean](https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

The preservation of these underwater wonders is crucial, not just for scientific discovery but for maintaining the health of our planet. As we continue to explore, we must also commit to protecting these fragile ecosystems.
    `,
    readTime: "25 min read",
    category: "Mysteries",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "marine-life",
    title: "The Most Beautiful Marine Life Ever Discovered",
    excerpt: "From glowing jellyfish to rainbow corals, the diversity of marine life will leave you in awe of nature's creativity.",
    content: `
# Nature's Living Art: The Most Beautiful Marine Life on Earth

The ocean is home to some of the most spectacular and otherworldly creatures on our planet. From the shallow coral reefs to the mysterious depths of the abyss, marine life displays an incredible array of colors, forms, and behaviors.

![Mandarin fish with vibrant colors](https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

## The Mandarin Fish: A Living Rainbow

The Mandarin fish (Synchiropus splendidus) is often described as the most beautiful fish in the ocean. Native to the Pacific Ocean, from the Ryukyu Islands to Australia, this small, slow-moving fish rarely grows longer than three inches but makes up for its size with an explosion of color.

![Sea sapphire copepod glowing](https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

## The Sea Sapphire: The Disappearing Jewel

The sea sapphire (Sapphirina) is a tiny copepod that possesses one of the most remarkable optical properties in the animal kingdom. These millimeter-long crustaceans appear as flashing jewels in the ocean, changing from invisible to brilliant sapphire blue and then back to transparent in seconds.

The beauty of these creatures isn't merely aesthetic—it represents sophisticated adaptations for survival, communication, and reproduction in one of Earth's most challenging environments.
    `,
    readTime: "28 min read",
    category: "Marine Life",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "coral-reefs",
    title: "The Future of Coral Reefs in a Warming World",
    excerpt: "How climate change is affecting our precious coral ecosystems and what scientists are doing to save them.",
    content: `
# The Future of Coral Reefs in a Warming World

Coral reefs are among the most diverse ecosystems on Earth, but they're facing unprecedented threats from climate change. Rising sea temperatures, ocean acidification, and pollution are causing widespread coral bleaching.

![Coral reef ecosystem](https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

Scientists around the world are racing against time to develop innovative solutions to protect and restore these vital underwater habitats. From assisted evolution to 3D-printed coral structures, discover the cutting-edge techniques being used to give coral reefs a fighting chance.
    `,
    readTime: "6 min read",
    category: "Conservation",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "deep-sea-exploration",
    title: "Breaking Boundaries: The New Era of Deep Sea Exploration",
    excerpt: "Advanced submersibles and robotics are revealing secrets from the ocean's deepest trenches.",
    content: `
# Breaking Boundaries: The New Era of Deep Sea Exploration

For centuries, the deepest parts of the ocean remained inaccessible to humans. But recent technological advances in submersibles, ROVs (remotely operated vehicles), and underwater drones are changing that.

![Deep sea submersible](https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

We're now able to explore hydrothermal vents, underwater volcanoes, and the mysterious creatures that thrive in complete darkness under immense pressure. This article explores the groundbreaking discoveries made possible by these technological marvels.
    `,
    readTime: "8 min read",
    category: "Technology",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "ocean-plastic",
    title: "The Plastic Problem: Cleaning Our Oceans",
    excerpt: "Innovative solutions to the global crisis of plastic pollution in our seas.",
    content: `
# The Plastic Problem: Cleaning Our Oceans

Every year, millions of tons of plastic waste enter our oceans, harming marine life and ecosystems. But there's hope on the horizon. From massive cleanup systems to biodegradable alternatives, scientists and entrepreneurs are developing creative solutions.

![Ocean cleanup](https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

This article examines the scale of the problem, its impact on marine ecosystems, and the most promising technologies and initiatives working to clean up our oceans and prevent further pollution.
    `,
    readTime: "5 min read",
    category: "Environment",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "whale-communication",
    title: "The Secret Language of Whales",
    excerpt: "Discover how these gentle giants communicate across thousands of miles of ocean.",
    content: `
# The Secret Language of Whales

Whales possess one of the most complex communication systems in the animal kingdom. Their songs can travel for hundreds of miles through the ocean, carrying messages we're only beginning to understand.

![Humpback whale](https://images.unsplash.com/photo-1568430462989-48e4f1de4b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

Researchers have discovered that different whale populations have distinct dialects, and their songs evolve over time in patterns similar to human language development.
    `,
    readTime: "7 min read",
    category: "Marine Life",
    images: [
      "https://images.unsplash.com/photo-1568430462989-48e4f1de4b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "underwater-volcanoes",
    title: "Fire Under the Sea: The Power of Underwater Volcanoes",
    excerpt: "Exploring the volcanic activity that shapes our ocean floors and supports unique ecosystems.",
    content: `
# Fire Under the Sea: The Power of Underwater Volcanoes

Beneath the ocean's surface lies a world of volcanic activity that rivals anything on land. Underwater volcanoes, or seamounts, create unique habitats and play crucial roles in ocean chemistry and circulation.

![Underwater volcano](https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

These volcanic systems support extraordinary ecosystems where life thrives in extreme conditions, from superheated vents to toxic chemical environments.
    `,
    readTime: "6 min read",
    category: "Geology",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "marine-conservation",
    title: "Success Stories in Marine Conservation",
    excerpt: "Inspiring examples of how dedicated efforts are bringing marine ecosystems back from the brink.",
    content: `
# Success Stories in Marine Conservation

Despite the many challenges facing our oceans, there are remarkable success stories that give us hope. From the recovery of whale populations to the restoration of coral reefs, conservation efforts are making a real difference.

![Marine conservation](https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

This article highlights the most inspiring marine conservation victories from around the world and the strategies that made them possible.
    `,
    readTime: "8 min read",
    category: "Conservation",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "ocean-currents",
    title: "The Global Conveyor Belt: How Ocean Currents Shape Our World",
    excerpt: "Understanding the massive underwater rivers that regulate Earth's climate and distribute nutrients.",
    content: `
# The Global Conveyor Belt: How Ocean Currents Shape Our World

Ocean currents are the planet's circulatory system, moving heat, nutrients, and marine life across the globe. The Great Ocean Conveyor Belt is a massive, continuous flow of water that connects all the world's oceans.

![Ocean currents](https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

This global system regulates our climate, influences weather patterns, and supports the incredible biodiversity of our oceans.
    `,
    readTime: "7 min read",
    category: "Science",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "deep-sea-creatures",
    title: "Aliens of the Deep: Bizarre Creatures from the Abyss",
    excerpt: "Meet the strange and wonderful animals that call the deep ocean home.",
    content: `
# Aliens of the Deep: Bizarre Creatures from the Abyss

The deep sea is home to some of the most extraordinary and alien-like creatures on Earth. From giant squid to glowing jellyfish, these animals have evolved incredible adaptations to survive in complete darkness under immense pressure.

![Deep sea creature](https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

Discover the fascinating biology and behavior of these deep-sea dwellers and learn how they thrive in one of Earth's most extreme environments.
    `,
    readTime: "9 min read",
    category: "Marine Life",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "ocean-myths",
    title: "Ancient Ocean Myths and Legends",
    excerpt: "Exploring the sea monsters, lost cities, and maritime legends that have captivated humanity for centuries.",
    content: `
# Ancient Ocean Myths and Legends

Throughout history, the ocean has inspired some of humanity's most enduring myths and legends. From sea monsters and mermaids to lost continents like Atlantis, the sea has always captured our imagination.

![Ancient map](https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

This article explores the origins of these maritime legends and examines how some myths may have been inspired by real marine phenomena and discoveries.
    `,
    readTime: "6 min read",
    category: "History",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "marine-biology",
    title: "The Science of Marine Biology: Exploring Ocean Life",
    excerpt: "How marine biologists study ocean ecosystems and the incredible discoveries they're making.",
    content: `
# The Science of Marine Biology: Exploring Ocean Life

Marine biology is the scientific study of organisms in the ocean and other marine bodies of water. This field combines biology with oceanography, chemistry, and physics to understand marine ecosystems.

![Marine biology research](https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)

From microscopic plankton to massive whales, marine biologists work to understand the complex relationships between ocean life and their environment, helping to protect these vital ecosystems for future generations.
    `,
    readTime: "7 min read",
    category: "Science",
    images: [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

/* ------------------ NEW HOOKS AND UTILITIES ------------------ */

// Custom hook for theme
const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return { theme, toggleTheme };
};

// Custom hook for scroll to top
const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { isVisible, scrollToTop };
};

/* ------------------ ANIMATED BACKGROUND COMPONENT ------------------ */
function AnimatedBackground() {
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    // Create initial bubbles
    const initialBubbles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 10,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 10
    }));
    setBubbles(initialBubbles);
  }, []);
  
  return (
    <OceanBackground>
      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`
          }}
          animate={{
            y: [-50, -window.innerHeight],
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.2, 0.9]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}
      <Wave />
    </OceanBackground>
  );
}

/* ------------------ IMAGE MODAL COMPONENT ------------------ */
function ImageModal({ image, onClose }) {
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.5, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, rotateY: -180 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          ×
        </CloseButton>
        <motion.img 
          src={image} 
          alt="Enlarged view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </ModalContent>
    </ModalOverlay>
  );
}

/* ------------------ BLOG CARD COMPONENT ------------------ */
function BlogCardComponent({ post, index, onCardClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BlogCard
      key={post.id}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        transition: { type: "spring", stiffness: 300 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onCardClick(post.id)}
    >
      <div className="card-content">
        {post.images && post.images[0] && (
          <BlogImage 
            src={post.images[0]} 
            alt={post.title}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        )}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "10px" 
        }}>
          <span style={{ 
            fontSize: "0.8rem", 
            color: "var(--ocean-accent)", 
            fontWeight: "600",
            background: "rgba(76, 201, 240, 0.1)",
            padding: "4px 10px",
            borderRadius: "20px"
          }}>
            {post.category}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
            {post.readTime}
          </span>
        </div>
        <BlogTitle>{post.title}</BlogTitle>
        <BlogExcerpt>{post.excerpt}</BlogExcerpt>
        <ReadMoreLink 
          to={`/blog/${post.id}`}
          whileHover={{ x: 5 }}
        >
          Read More
        </ReadMoreLink>
      </div>
    </BlogCard>
  );
}

/* ------------------ PAGES ------------------ */
function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTo, setTransitionTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isVisible, scrollToTop } = useScrollToTop();

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (postId) => {
    setTransitionTo(postId);
    setIsTransitioning(true);
    setIsLoading(true);
    
    setTimeout(() => {
      navigate(`/blog/${postId}`);
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionTo(null);
        setIsLoading(false);
      }, 100);
    }, 800);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          filter: isTransitioning ? 'blur(10px)' : 'none',
          transition: 'filter 0.5s ease'
        }}
      >
        <HeroSection>
          <HeroTitle
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          >
            Dive Into The Depths Of Ocean Discovery
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the mysteries of the deep blue, from hidden ecosystems to marine wonders. 
            Join our community of ocean enthusiasts and expand your knowledge of our planet's most vital ecosystem.
          </HeroSubtitle>
          <CTAButton
            whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0, 168, 232, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Start Exploring
          </CTAButton>
        </HeroSection>

        {/* Search Bar */}
        <SearchContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SearchInput
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <SearchIcon>🔍</SearchIcon>
        </SearchContainer>

        {/* Category Filter */}
        <CategoryFilter
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {categories.map(category => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              onClick={() => handleCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ marginBottom: "30px", fontSize: "2rem" }}
        >
          {filteredPosts.length} Article{filteredPosts.length !== 1 ? 's' : ''} Found
        </motion.h2>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <BlogGrid>
            {filteredPosts.map((post, index) => (
              <BlogCardComponent 
                key={post.id} 
                post={post} 
                index={index} 
                onCardClick={handleCardClick}
              />
            ))}
          </BlogGrid>
        )}

        {/* Newsletter Section */}
        <NewsletterSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 style={{ marginBottom: '10px', color: 'var(--ocean-accent)' }}>
            Stay Updated with Ocean Discoveries
          </h3>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
            Subscribe to our newsletter for the latest articles and ocean news
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email"
              required
            />
            <CTAButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '12px 20px' }}
            >
              Subscribe
            </CTAButton>
          </NewsletterForm>
        </NewsletterSection>
      </motion.div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <BackToTop
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
          >
            ↑
          </BackToTop>
        )}
      </AnimatePresence>

      {/* Wave Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <WaveTransition
            initial={{ y: "100%" }}
            animate={{ 
              y: ["100%", "0%", "-100%"],
              opacity: [0, 1, 0]
            }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            animate={true}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.id === slug);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for smooth entrance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Parse markdown-like content
  const renderContent = (content) => {
    const sections = content.split('\n## ');
    return sections.map((section, index) => {
      if (index === 0) {
        const lines = section.split('\n').filter(line => line.trim());
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {lines.map((line, lineIndex) => {
              if (line.startsWith('![')) {
                const altText = line.match(/\!\[(.*?)\]/)?.[1];
                const imageUrl = line.match(/\((.*?)\)/)?.[1];
                const imageIndex = post.images?.indexOf(imageUrl) || 0;
                
                return (
                  <motion.div
                    key={lineIndex}
                    className="image-container"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BlogImage 
                      src={imageUrl} 
                      alt={altText}
                      onClick={() => setSelectedImage(imageUrl)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + (imageIndex * 0.1) }}
                    />
                  </motion.div>
                );
              } else if (line.startsWith('#')) {
                return <h1 key={lineIndex} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{line.replace('#', '').trim()}</h1>;
              } else {
                return <p key={lineIndex} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>{line}</p>;
              }
            })}
          </motion.div>
        );
      } else {
        const [header, ...bodyLines] = section.split('\n');
        const imageLines = bodyLines.filter(line => line.startsWith('!['));
        const textLines = bodyLines.filter(line => !line.startsWith('!['));
        
        return (
          <motion.section
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ marginBottom: '3rem' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--ocean-accent)' }}>{header}</h2>
            
            {textLines.map((line, lineIndex) => (
              <p key={lineIndex} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>{line}</p>
            ))}
            
            {imageLines.map((line, lineIndex) => {
              const altText = line.match(/\!\[(.*?)\]/)?.[1];
              const imageUrl = line.match(/\((.*?)\)/)?.[1];
              const imageIndex = post.images?.indexOf(imageUrl) || 0;
              
              return (
                <motion.div
                  key={lineIndex}
                  className="image-container"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BlogImage 
                    src={imageUrl} 
                    alt={altText}
                    onClick={() => setSelectedImage(imageUrl)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + (imageIndex * 0.1) }}
                  />
                </motion.div>
              );
            })}
          </motion.section>
        );
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ 
        opacity: isLoaded ? 1 : 0, 
        filter: isLoaded ? "blur(0px)" : "blur(20px)" 
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: "30px" }}
      >
        <span style={{ 
          fontSize: "0.9rem", 
          color: "var(--ocean-accent)", 
          fontWeight: "600",
          background: "rgba(76, 201, 240, 0.1)",
          padding: "6px 12px",
          borderRadius: "20px",
          display: "inline-block",
          marginBottom: "15px"
        }}>
          {post.category}
        </span>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", lineHeight: "1.2" }}>
          {post.title}
        </h1>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "15px",
          color: "var(--muted)",
          fontSize: "0.9rem",
          marginBottom: "30px"
        }}>
          <span>Ocean Blog</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </motion.div>

      <BlogCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {renderContent(post.content)}
      </BlogCard>

      <motion.div
        style={{ marginTop: "40px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <ReadMoreLink 
          to="/"
          whileHover={{ x: -5 }}
        >
          ← Back to home
        </ReadMoreLink>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------ ABOUT PAGE ------------------ */
function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection>
        <HeroTitle
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          About OceanBlog
        </HeroTitle>
        <HeroSubtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Dedicated to exploring and preserving the wonders of our world's oceans
        </HeroSubtitle>
      </HeroSection>

      <BlogCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--ocean-accent)' }}>
          Our Mission
        </h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          OceanBlog was founded with a simple yet profound mission: to share the incredible stories, 
          discoveries, and mysteries of our planet's oceans with the world. We believe that by 
          understanding and appreciating the wonders beneath the waves, we can inspire a new 
          generation of ocean advocates and conservationists.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--ocean-accent)' }}>
          What We Do
        </h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          Our team of marine biologists, oceanographers, and passionate writers work together to 
          bring you the latest discoveries, research, and insights from the world of marine science. 
          From the deepest trenches to the most vibrant coral reefs, we explore every aspect of 
          ocean life and share our findings with you.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--ocean-accent)' }}>
          Join Our Community
        </h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          Whether you're a seasoned marine enthusiast or just beginning your journey into ocean 
          discovery, OceanBlog welcomes you. Together, we can explore, learn, and work towards 
          protecting our precious marine ecosystems for generations to come.
        </p>
      </BlogCard>
    </motion.div>
  );
}

/* ------------------ CONTACT PAGE ------------------ */
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection>
        <HeroTitle
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          Get In Touch
        </HeroTitle>
        <HeroSubtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have questions, suggestions, or want to collaborate? We'd love to hear from you.
        </HeroSubtitle>
      </HeroSection>

      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind..."
              required
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </SubmitButton>
        </form>
      </FormContainer>

      <motion.div
        style={{ marginTop: '40px', textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
          Or reach out to us directly at:{' '}
          <a href="mailto:hello@oceanblog.com" style={{ color: 'var(--ocean-accent)' }}>
            hello@oceanblog.com
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------ FOOTER ------------------ */
const Footer = styled(motion.footer)`
  text-align: center;
  padding: 40px 0;
  margin-top: 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted);
  font-size: 0.9rem;
`;

/* ------------------ MAIN APP COMPONENT ------------------ */
function AppContent() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <>
      <Global />
      <AnimatedBackground />
      <Container>
        <NavBar
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Logo
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            OceanBlog
          </Logo>
          <NavLinks
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <ThemeToggle
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </ThemeToggle>
          </NavLinks>
        </NavBar>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </AnimatePresence>

        <Footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} OceanBlog. All rights reserved.</p>
          <p>Dive deeper into the mysteries of the ocean with us.</p>
        </Footer>
      </Container>
    </>
  );
}

/* ------------------ ROOT APP COMPONENT ------------------ */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

/* ------------------ Usage ------------------ */
// 1. Create Vite App: npm create vite@latest ocean-blog -- --template react
// 2. Replace src/App.jsx with this file
// 3. Install: npm install framer-motion styled-components react-router-dom
// 4. Run: npm run dev