---
name: devlog-update
description: Automatically update DEVLOG.md with today's work, decisions, and Kiro usage
version: 1.0.0
tags: [documentation, devlog, tracking, hackathon]
---

# @devlog-update - Development Log Updater

## Purpose

Automatically analyze the current session's work and update `docs/DEVLOG.md` with:

- Activities completed
- Technical decisions made
- Time estimates
- Kiro CLI usage statistics
- Key learnings and reflections

## Instructions

When this prompt is invoked:

1. **Analyze Current Session**
   - Review git history since last devlog update (if available)
   - Check file modifications in the workspace
   - Identify new files created
   - Note deleted or moved files
   - Review open editor files for context

2. **Gather Work Summary**
   - List major activities completed
   - Identify features implemented
   - Note bugs fixed or issues resolved
   - Document refactoring or cleanup work
   - Track specification or documentation updates

3. **Extract Technical Decisions**
   - Identify architecture choices made
   - Note technology selections
   - Document design patterns chosen
   - Capture trade-offs considered
   - Record rationale for key decisions

4. **Calculate Time Estimates**
   - Estimate time spent on each major activity
   - Break down by category (coding, testing, docs, etc.)
   - Update cumulative time tracking
   - Note any time-saving techniques used

5. **Track Kiro CLI Usage**
   - Count prompts used in this session
   - List specific prompts invoked
   - Note custom prompts created
   - Track steering document updates
   - Count specifications created/updated

6. **Capture Learnings**
   - What worked well?
   - What challenges were encountered?
   - What solutions were found?
   - What would you do differently?
   - What insights were gained?

7. **Read Existing DEVLOG.md**
   - Parse current structure and format
   - Identify the current day/session
   - Determine where to add new content
   - Preserve existing formatting

8. **Update DEVLOG.md**
   - Add new session section if starting a new day
   - Append to current day if continuing
   - Update time breakdown table
   - Update Kiro CLI usage statistics
   - Add to notes & reflections section
   - Maintain consistent formatting

## Usage

```bash
@devlog-update
```

With custom message:

```bash
@devlog-update "Completed rule engine implementation"
```

## Output Format

The devlog should follow this structure:

```markdown
## Day X (Date) - Session Title

### Activity Name [Xh]

- **Time**: Duration estimate
- **Activities**:
  - Bullet list of what was done
  - Specific files created/modified
  - Features implemented

### Technical Decisions

- **Decision**: What was decided
- **Rationale**: Why this choice was made
- **Alternatives Considered**: Other options
- **Trade-offs**: Pros and cons

### Kiro CLI Usage

- Prompts used in this session
- Custom prompts created
- Steering documents updated

## Time Breakdown

| Category | Hours | Notes |
| -------- | ----- | ----- |
| ...      | ...   | ...   |

## Kiro CLI Usage Statistics

- **Total Prompts Used**: X
- **Prompts**: List with counts
- **Custom Prompts Created**: X
- **Steering Document Updates**: X
- **Specifications Created**: X

## Notes & Reflections

### What's Working Well

- Positive observations

### Challenges

- Issues encountered
- Solutions found

### Key Learnings

- Insights gained
- Best practices discovered
```

## Quality Checks

Before completing, verify:

- [ ] All major activities are documented
- [ ] Time estimates are reasonable
- [ ] Technical decisions include rationale
- [ ] Kiro usage is accurately tracked
- [ ] Formatting is consistent with existing devlog
- [ ] No duplicate entries
- [ ] Cumulative totals are updated correctly

## Smart Features

**Auto-Detection**:

- Detect new spec files and summarize them
- Identify test files and count tests added
- Notice configuration changes
- Track dependency additions

**Context Awareness**:

- Understand project phase (setup, implementation, testing, etc.)
- Adjust detail level based on activity type
- Group related activities together
- Highlight milestone achievements

**Time Estimation**:

- Use file complexity for estimates
- Consider typical task durations
- Account for testing and debugging time
- Be conservative with estimates

## Example Update

```markdown
## Day 1 (Jan 21) - Specification Development

### Complete Rule Engine Spec [2.5h]

- **Time**: 2.5 hours
- **Activities**:
  - Created comprehensive requirements document
  - Designed complete architecture with type system
  - Defined 8 correctness properties for property-based testing
  - Broke down implementation into 28 tasks across 9 phases
  - Estimated 8-12 hours total implementation time

### Technical Decisions

- **Decision**: Use fast-check for property-based testing
- **Rationale**: Provides robust correctness validation with minimal code
- **Alternatives Considered**: Manual test cases only
- **Trade-offs**: Learning curve vs. higher confidence in correctness

- **Decision**: Class-based analyzer instead of pure functions
- **Rationale**: Better encapsulation, easier testing, future state management
- **Alternatives Considered**: Functional approach with closures
- **Trade-offs**: Slightly more boilerplate vs. better organization

### Kiro CLI Usage

- Used `@plan-feature` to create complete spec
- Updated steering documents with prompt principles
- Created comprehensive design with correctness properties

## Time Breakdown

| Category          | Hours  | Notes                                        |
| ----------------- | ------ | -------------------------------------------- |
| Project Setup     | 2h     | Kiro config + Next.js initialization         |
| Project Cleanup   | 0.5h   | Removed template files                       |
| Specification Dev | 2.5h   | Complete spec with requirements/design/tasks |
| **Total**         | **5h** | **Day 1**                                    |

## Notes & Reflections

### What's Working Well

- Spec-driven development creates clear implementation path
- Property-based testing designed upfront ensures quality

### Key Learnings

- Defining correctness properties early prevents bugs later
- Breaking complex features into phases makes work manageable
```

## Notes

- This prompt is designed for hackathon development tracking
- Devlog is required for hackathon submission
- Updates should be concise but comprehensive
- Focus on decisions and learnings, not just activities
- Maintain professional tone suitable for judges
