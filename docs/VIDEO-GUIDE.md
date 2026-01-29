# Demo Video Recording Guide

## Overview
Create a compelling 2-3 minute demo video showcasing PromptSmith's innovative features and real-world value for hackathon judges.

## Pre-Recording Setup

### 1. Environment Preparation
```bash
# Start the application
cd /mnt/c/Users/Elolo/Desktop/projects/prompt-smith
npm run dev

# Open browser to http://localhost:3000
# Clear browser cache and cookies for clean demo
```

### 2. Screen Recording Setup
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30 FPS minimum
- **Audio**: Clear microphone, no background noise
- **Browser**: Chrome/Edge with clean profile (no extensions visible)

### 3. Demo Data Preparation
Prepare these example prompts:

**Bad Prompt Example:**
```
Write code
```

**Medium Prompt Example:**
```
Create a Python function that processes user data and returns results
```

**Good Prompt Example:**
```
**ASK**
Create a Python function that validates and processes user registration data

**CONTEXT**
- Function will be used in a web application user registration system
- Must handle email validation, password strength checking, and data sanitization
- Should return structured results for frontend consumption

**CONSTRAINTS**
- Return a dictionary with 'valid' boolean and 'errors' list
- Use built-in Python libraries only (no external dependencies)
- Include comprehensive error messages for validation failures

**EXAMPLE**
Input: {"email": "user@example.com", "password": "SecurePass123!"}
Output: {"valid": True, "errors": []}

Input: {"email": "invalid", "password": "weak"}
Output: {"valid": False, "errors": ["Invalid email format", "Password too weak"]}
```

## Recording Script (2-3 minutes)

### Opening (15 seconds)
**Visual**: PromptSmith homepage with hero section
**Script**: 
> "Hi! I'm demonstrating PromptSmith, an AI prompt optimization platform that transforms how we write and improve AI prompts. Instead of trial-and-error, PromptSmith provides systematic analysis and intelligent improvements."

### Problem Demonstration (30 seconds)
**Visual**: Input the bad prompt "Write code"
**Script**:
> "Let's start with a common problem - a vague prompt that leads to poor AI results."

**Actions**:
1. Type "Write code" in the input field
2. Click "Analyze Prompt"
3. Show the low score (likely 20-30/100)
4. Highlight the red/yellow category scores

**Script**:
> "As you can see, this scores only [X]/100. The analysis shows exactly what's missing - no clear intent, no context, no constraints."

### Feature 1: Rule-Based Analysis (45 seconds)
**Visual**: Analysis tab showing detailed rule breakdown
**Script**:
> "PromptSmith uses 25 expert-crafted rules across 5 categories to analyze prompts systematically."

**Actions**:
1. Click through Analysis tab
2. Show specific rule failures with suggestions
3. Highlight the educational value

**Script**:
> "Each rule provides specific feedback and suggestions. This isn't just scoring - it's teaching better prompt engineering."

### Feature 2: Performance Prediction (30 seconds)
**Visual**: Performance Predictor component
**Script**:
> "Here's our Performance Prediction System - the first tool to predict prompt success before you use it."

**Actions**:
1. Point out Success Rate, Efficiency, and Complexity scores
2. Show the recommended use case
3. Highlight confidence level

**Script**:
> "It predicts success likelihood, token efficiency, and recommends the best use cases. This helps you choose the right prompt before deployment."

### Feature 3: Intelligent Variations (45 seconds)
**Visual**: Generate and show variations
**Script**:
> "Now for our flagship feature - Intelligent Prompt Variations. Instead of one 'correct' answer, we generate three distinct optimization approaches."

**Actions**:
1. Click "Generate Variations"
2. Show the three approaches: Structured, Conversational, Technical
3. Compare their scores
4. Copy one variation

**Script**:
> "Each variation targets different use cases - structured for complex tasks, conversational for user-friendly interactions, technical for precise specifications. All score higher than the original."

### Feature 4: Visual Prompt Builder (30 seconds)
**Visual**: Open Visual Prompt Builder
**Script**:
> "For users who prefer visual construction, our drag-and-drop Visual Prompt Builder makes MPF structure accessible."

**Actions**:
1. Click "Visual Prompt Builder"
2. Add a few sections (ASK, CONTEXT, CONSTRAINTS)
3. Use a template
4. Generate the prompt

**Script**:
> "Add sections, use templates, and build professional prompts visually. Perfect for non-technical users or learning MPF structure."

### Before/After Comparison (15 seconds)
**Visual**: Show the good prompt example and its high score
**Script**:
> "Here's a well-structured prompt scoring [X]/100 - demonstrating the dramatic improvement possible."

**Actions**:
1. Quickly input the good prompt example
2. Show the high score (85-95/100)
3. Highlight green category scores

### Closing (10 seconds)
**Visual**: Return to homepage or show all features together
**Script**:
> "PromptSmith transforms prompt engineering from guesswork to systematic optimization. Try it yourself and see the difference structured prompts make."

## Technical Recording Tips

### Screen Recording Tools
- **Windows**: OBS Studio (free), Camtasia (paid)
- **Mac**: QuickTime, ScreenFlow (paid)
- **Cross-platform**: Loom (online)

### Recording Settings
```
Resolution: 1920x1080
Frame Rate: 30 FPS
Audio: 44.1kHz, 16-bit minimum
Format: MP4 (H.264)
Bitrate: 5-10 Mbps
```

### Audio Tips
- Use external microphone if possible
- Record in quiet environment
- Speak clearly and at moderate pace
- Leave 1-2 second pauses between sections

### Visual Tips
- Keep cursor movements smooth and deliberate
- Highlight important elements with cursor
- Use browser zoom if text is too small
- Ensure good contrast and readability

## Post-Production

### Editing Checklist
- [ ] Trim dead space at beginning/end
- [ ] Add title slide with "PromptSmith - AI Prompt Optimization Platform"
- [ ] Add your name and hackathon info
- [ ] Ensure audio levels are consistent
- [ ] Add captions if possible
- [ ] Export in high quality (1080p minimum)

### Final Checks
- [ ] Video length: 2-3 minutes
- [ ] All three innovative features demonstrated
- [ ] Clear before/after improvement shown
- [ ] Audio is clear and professional
- [ ] No sensitive information visible
- [ ] File size reasonable for upload

## Upload and Submission

### Recommended Platforms
- **YouTube**: Unlisted video for easy sharing
- **Vimeo**: Professional appearance
- **Direct Upload**: If hackathon platform supports it

### Video Description Template
```
PromptSmith - AI Prompt Optimization Platform
Dynamous × Kiro Hackathon 2026

PromptSmith transforms AI prompt engineering from trial-and-error to systematic optimization. Features:

🔍 25-Rule Analysis System
📊 Performance Prediction
🎯 Intelligent Variations Generator  
🎨 Visual Prompt Builder

Built with Kiro CLI for accelerated development.

GitHub: [Your Repository URL]
Demo: [Live Demo URL if available]
```

## Backup Plan

If live demo fails during recording:
1. Have screenshots ready of each feature
2. Pre-record the application working
3. Use static images with voiceover
4. Focus on explaining the innovation and value

## Success Metrics

Your video should demonstrate:
- [ ] Clear problem/solution narrative
- [ ] All three innovative features working
- [ ] Measurable improvement (score increase)
- [ ] Professional presentation quality
- [ ] Real-world value proposition
- [ ] Technical sophistication

This video is worth 3 points of your final score - make it count!
