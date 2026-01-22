---
description: Mark tasks as completed after successful implementation
argument-hint: [spec-folder-name]
---

# Mark Tasks as Done

## Purpose

Automatically update the tasks.md file to mark all tasks as completed after successful implementation and validation.

## Usage

```
@mark-tasks-as-done rule-engine-and-analysis
@mark-tasks-as-done ui-components-and-interface
```

## Process

### 1. Locate Tasks File

Find the tasks.md file in the specified spec folder:
- Path: `.kiro/specs/$ARGUMENTS/tasks.md`
- Verify file exists before proceeding

### 2. Update Task Status

**Status Line Update:**
- Change `**Status**: Ready for Implementation` → `**Status**: ✅ COMPLETED`
- Add completion date: `**Completion Date**: [current date]`
- Add actual effort if estimated effort exists

**Task Checkboxes:**
- Change all `- [ ]` → `- [x]` (mark as completed)
- Preserve task hierarchy and numbering
- Keep all task descriptions intact

### 3. Add Implementation Summary

Append completion summary at the end:

```markdown
## Implementation Summary

### ✅ Completed Phases
- **Phase 1**: [Phase name] (100%)
- **Phase 2**: [Phase name] (100%)
- [List all completed phases]

### 🚀 Key Achievements
- [List major accomplishments from implementation]
- [Technical highlights]
- [Architecture decisions]

### 📋 Validation Results
- ✅ TypeScript compilation: No errors
- ✅ Build: Successful
- ✅ Linting: No warnings or errors
- ✅ [Other validations passed]

### 🔄 Next Steps
Ready for [next sprint/phase]
```

### 4. Verification

Before completing:
- ✅ All `[ ]` changed to `[x]`
- ✅ Status updated to COMPLETED
- ✅ Summary section added
- ✅ File syntax is valid markdown
- ✅ No content lost or corrupted

## Implementation

1. **Read the tasks file**
   ```bash
   # Verify file exists
   if [ ! -f ".kiro/specs/$ARGUMENTS/tasks.md" ]; then
     echo "Error: tasks.md not found in .kiro/specs/$ARGUMENTS/"
     exit 1
   fi
   ```

2. **Update status and checkboxes**
   ```bash
   # Update status line
   sed -i 's/\*\*Status\*\*: Ready for Implementation/\*\*Status\*\*: ✅ COMPLETED/' .kiro/specs/$ARGUMENTS/tasks.md
   
   # Mark all tasks as completed
   sed -i 's/- \[ \]/- [x]/g' .kiro/specs/$ARGUMENTS/tasks.md
   ```

3. **Add completion metadata**
   - Current date
   - Actual vs estimated effort
   - Key achievements from recent implementation

4. **Add summary section**
   - Parse phases from the file
   - List major accomplishments
   - Include validation results
   - Suggest next steps

## Error Handling

- **File not found**: Clear error message with correct path
- **Permission issues**: Suggest alternative approach
- **Malformed markdown**: Preserve original and report issues
- **Partial updates**: Ensure atomic operations or rollback

## Output

Provide confirmation:
```
✅ Tasks marked as completed: .kiro/specs/[spec-name]/tasks.md
📊 Summary: [X] phases, [Y] tasks completed
🎯 Status: Ready for next implementation phase
```

## Notes

- Only run this AFTER successful implementation and validation
- Preserve all original task descriptions and hierarchy
- Add meaningful completion summary, not just checkmarks
- Consider this the "official" completion of a spec implementation
