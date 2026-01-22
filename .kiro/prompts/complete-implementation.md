---
description: Complete implementation workflow from execution to documentation
argument-hint: [plan-path]
---

# Complete Implementation Workflow

## Purpose

Execute a complete implementation workflow: plan execution → task completion → commit → documentation update.

## Usage

```
@complete-implementation rule-engine-and-analysis/tasks.md
@complete-implementation ui-components-and-interface/tasks.md
```

## Workflow Chain

### 1. Execute Implementation Plan
```
@execute $ARGUMENTS
```
- Follow plan step-by-step
- Implement all tasks
- Run validation checks
- Complete implementation

### 2. Mark Tasks as Done
```
@mark-tasks-as-done [spec-folder-name]
```
- Update tasks.md with completion status
- Add implementation summary
- Document achievements

### 3. Commit Implementation
```
@commit-implementation [feature-name]
```
- Run security and quality checks
- Generate descriptive commit message
- Commit locally (manual push)

### 4. Update Development Log
```
@devlog-update
```
- Document session work
- Update time tracking
- Record key decisions
- Note Kiro CLI usage

## Execution Flow

**Step 1: Confirm Plan**
- Verify plan file exists
- Show plan summary
- Confirm execution intent

**Step 2: Execute Chain**
- Run each step in sequence
- Stop on any failures
- Provide clear status updates

**Step 3: Final Summary**
- Show completion status
- List all changes made
- Provide next steps

## Error Handling

**Plan Execution Fails:**
- Stop workflow immediately
- Show specific error
- Don't proceed to subsequent steps

**Task Marking Fails:**
- Continue with warning
- Manual task update needed
- Proceed to commit

**Commit Fails:**
- Stop workflow
- Show validation errors
- Don't update DEVLOG until fixed

**DEVLOG Update Fails:**
- Show warning only
- Implementation still complete
- Manual DEVLOG update needed

## Output Format

**Success:**
```
✅ Complete Implementation Workflow Finished!

🔧 Implementation: Complete
📋 Tasks: Marked as done
💾 Commit: f08042d feat: implement [feature]
📝 DEVLOG: Updated

Next Steps:
- Push manually: git push origin master
- Begin next sprint phase
- Review implementation in GitHub
```

**Partial Success:**
```
⚠️ Implementation Workflow Partially Complete

✅ Implementation: Complete
✅ Tasks: Marked as done  
❌ Commit: Failed validation
⏸️ DEVLOG: Skipped (commit failed)

Fix Issues:
- [Specific validation errors]
- Run @commit-implementation manually after fixes
```

## Benefits

- **Consistency**: Same workflow every time
- **Efficiency**: 4 manual steps → 1 command
- **Quality**: All validation checks included
- **Documentation**: Automatic DEVLOG updates
- **Hackathon Ready**: Complete audit trail

## Notes

- Only use after plan is fully ready for execution
- Each step can still be run individually if needed
- Manual push still required after commit
- Stops on first error to prevent incomplete states
